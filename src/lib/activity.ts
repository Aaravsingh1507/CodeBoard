import { prisma } from "@/lib/prisma";
import { fetchGithubStats } from "@/lib/github";
import { fetchLeetcodeStats } from "@/lib/leetcode";
import { startOfUTCDay } from "@/lib/utils";

/**
 * Pulls yesterday's activity for a single user and writes (or updates) one
 * ActivityLog row for that day. Designed to be run once daily per user by
 * a cron job, but safely re-runnable (upsert) if triggered manually too.
 */
export async function syncActivityForUser(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");

  const today = startOfUTCDay(new Date());

  let githubContributions = 0;
  if (user.githubUsername && user.githubAccessToken) {
    try {
      const stats = await fetchGithubStats(user.githubUsername, user.githubAccessToken);
      const todayStr = today.toISOString().slice(0, 10);
      const todayEntry = stats.contributionCalendar.find((d) => d.date === todayStr);
      githubContributions = todayEntry?.count ?? 0;
      await prisma.user.update({
        where: { id: userId },
        data: { githubStatsCache: JSON.stringify(stats), githubStatsSyncedAt: new Date() },
      });
    } catch {
      // Non-fatal — activity log just records 0 for GitHub today if the API is down.
    }
  }

  let leetcodeSubmissions = 0;
  if (user.leetcodeUsername) {
    try {
      const stats = await fetchLeetcodeStats(user.leetcodeUsername);
      const todayStart = today.getTime();
      const tomorrowStart = todayStart + 24 * 60 * 60 * 1000;
      leetcodeSubmissions = stats.recentSubmissions.filter((s) => {
        const ts = Number(s.timestamp) * 1000;
        return ts >= todayStart && ts < tomorrowStart;
      }).length;
      await prisma.user.update({
        where: { id: userId },
        data: { leetcodeStatsCache: JSON.stringify(stats), leetcodeStatsSyncedAt: new Date() },
      });
    } catch {
      // Non-fatal — same reasoning as above.
    }
  }

  await prisma.activityLog.upsert({
    where: { userId_date: { userId, date: today } },
    update: { githubContributions, leetcodeSubmissions },
    create: { userId, date: today, githubContributions, leetcodeSubmissions },
  });

  return { githubContributions, leetcodeSubmissions };
}

export interface StreakResult {
  currentStreak: number;
  longestStreak: number;
  heatmap: { date: string; count: number }[]; // last 365 days, count = combined activity
}

export function computeStreaks(
  logs: { date: Date; githubContributions: number; leetcodeSubmissions: number }[]
): StreakResult {
  const byDate = new Map<string, number>();
  for (const log of logs) {
    const key = log.date.toISOString().slice(0, 10);
    byDate.set(key, log.githubContributions + log.leetcodeSubmissions);
  }

  // Build a continuous 365-day window ending today so gaps show as zero.
  const today = startOfUTCDay(new Date());
  const heatmap: { date: string; count: number }[] = [];
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
    const key = d.toISOString().slice(0, 10);
    heatmap.push({ date: key, count: byDate.get(key) ?? 0 });
  }

  let currentStreak = 0;
  for (let i = heatmap.length - 1; i >= 0; i--) {
    if (heatmap[i].count > 0) currentStreak++;
    else break;
  }

  let longestStreak = 0;
  let running = 0;
  for (const day of heatmap) {
    if (day.count > 0) {
      running++;
      longestStreak = Math.max(longestStreak, running);
    } else {
      running = 0;
    }
  }

  return { currentStreak, longestStreak, heatmap };
}
