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

      // Populate full historical contribution calendar (up to 365 days) into ActivityLog
      if (stats.contributionCalendar && stats.contributionCalendar.length > 0) {
        const existingLogs = await prisma.activityLog.findMany({
          where: { userId },
          select: { id: true, date: true, githubContributions: true },
        });
        const existingMap = new Map(
          existingLogs.map((l) => [l.date.toISOString().slice(0, 10), l])
        );

        const toCreate: {
          userId: string;
          date: Date;
          githubContributions: number;
          leetcodeSubmissions: number;
        }[] = [];
        const toUpdate: any[] = [];

        for (const item of stats.contributionCalendar) {
          const existing = existingMap.get(item.date);
          if (!existing) {
            toCreate.push({
              userId,
              date: new Date(item.date + "T00:00:00Z"),
              githubContributions: item.count,
              leetcodeSubmissions: 0,
            });
          } else if (existing.githubContributions !== item.count) {
            toUpdate.push(
              prisma.activityLog.update({
                where: { id: existing.id },
                data: { githubContributions: item.count },
              })
            );
          }
        }

        if (toCreate.length > 0) {
          await prisma.activityLog.createMany({
            data: toCreate,
            skipDuplicates: true,
          });
        }
        if (toUpdate.length > 0) {
          await prisma.$transaction(toUpdate);
        }
      }
    } catch {
      // Non-fatal — activity log just records 0 for GitHub today if the API is down.
    }
  }

  // Auto-detect LeetCode account if not set
  let leetcodeUser = user.leetcodeUsername;
  if (!leetcodeUser && user.githubUsername) {
    try {
      const detected = await fetchLeetcodeStats(user.githubUsername);
      if (detected && detected.totalSolved > 0) {
        leetcodeUser = user.githubUsername;
        await prisma.user.update({
          where: { id: userId },
          data: {
            leetcodeUsername: leetcodeUser,
            leetcodeStatsCache: JSON.stringify(detected),
            leetcodeStatsSyncedAt: new Date(),
          },
        });
      }
    } catch {
      // User doesn't have same username on LeetCode
    }
  }

  let leetcodeSubmissions = 0;
  if (leetcodeUser) {
    try {
      const stats = await fetchLeetcodeStats(leetcodeUser);
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

      // Update past days where LeetCode submissions occurred
      const lcSubByDate = new Map<string, number>();
      for (const s of stats.recentSubmissions) {
        const dStr = new Date(Number(s.timestamp) * 1000).toISOString().slice(0, 10);
        lcSubByDate.set(dStr, (lcSubByDate.get(dStr) ?? 0) + 1);
      }

      for (const [dateStr, count] of lcSubByDate.entries()) {
        const d = new Date(dateStr + "T00:00:00Z");
        await prisma.activityLog.upsert({
          where: { userId_date: { userId, date: d } },
          update: { leetcodeSubmissions: count },
          create: { userId, date: d, githubContributions: 0, leetcodeSubmissions: count },
        });
      }
    } catch {
      // Non-fatal
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
