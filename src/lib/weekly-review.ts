import { prisma } from "@/lib/prisma";
import { generateWeeklyReview, type WeeklyReviewInput } from "@/lib/claude";
import { computeStreaks } from "@/lib/activity";
import { startOfUTCDay } from "@/lib/utils";

function weekBounds(reference = new Date()) {
  const end = startOfUTCDay(reference);
  const start = new Date(end.getTime() - 6 * 24 * 60 * 60 * 1000);
  return { start, end };
}

export async function buildWeeklyReviewInput(userId: string): Promise<WeeklyReviewInput> {
  const { start, end } = weekBounds();
  const weekEndExclusive = new Date(end.getTime() + 24 * 60 * 60 * 1000);

  const logs = await prisma.activityLog.findMany({
    where: { userId, date: { gte: start, lt: weekEndExclusive } },
  });
  const githubContributionsThisWeek = logs.reduce((s, l) => s + l.githubContributions, 0);
  const leetcodeSubmissionsThisWeek = logs.reduce((s, l) => s + l.leetcodeSubmissions, 0);

  const allLogs = await prisma.activityLog.findMany({ where: { userId } });
  const { currentStreak, longestStreak } = computeStreaks(allLogs);

  const user = await prisma.user.findUnique({ where: { id: userId } });
  let githubPRsThisWeek = 0;
  let leetcodeTotalsAllTime = { easy: 0, medium: 0, hard: 0 };
  if (user?.githubStatsCache) {
    const stats = JSON.parse(user.githubStatsCache);
    githubPRsThisWeek = (stats.recentActivity ?? []).filter(
      (a: any) => a.type === "pr" && new Date(a.date) >= start
    ).length;
  }
  if (user?.leetcodeStatsCache) {
    const stats = JSON.parse(user.leetcodeStatsCache);
    leetcodeTotalsAllTime = {
      easy: stats.easySolved ?? 0,
      medium: stats.mediumSolved ?? 0,
      hard: stats.hardSolved ?? 0,
    };
  }

  const applicationsAdded = await prisma.application.count({
    where: { userId, createdAt: { gte: start, lt: weekEndExclusive } },
  });
  const applicationsAdvanced = await prisma.application.count({
    where: {
      userId,
      updatedAt: { gte: start, lt: weekEndExclusive },
      status: { in: ["oa_screen", "interview", "offer"] },
    },
  });

  const goals = await prisma.goal.findMany({ where: { userId, status: "in_progress" } });
  const goalsProgress = goals.map((g) => ({ label: g.label, current: g.current, target: g.target }));

  return {
    githubContributionsThisWeek,
    githubPRsThisWeek,
    leetcodeSubmissionsThisWeek,
    leetcodeTotalsAllTime,
    currentStreak,
    longestStreak,
    applicationsAdded,
    applicationsAdvanced,
    goalsProgress,
  };
}

export async function generateAndStoreWeeklyReview(userId: string) {
  const { start, end } = weekBounds();
  const input = await buildWeeklyReviewInput(userId);
  const output = await generateWeeklyReview(input);

  return prisma.weeklyReview.upsert({
    where: { userId_weekStart: { userId, weekStart: start } },
    update: {
      weekEnd: end,
      summaryText: output.summary,
      observations: JSON.stringify(output.observations),
      suggestions: JSON.stringify(output.suggestions),
      generatedAt: new Date(),
    },
    create: {
      userId,
      weekStart: start,
      weekEnd: end,
      summaryText: output.summary,
      observations: JSON.stringify(output.observations),
      suggestions: JSON.stringify(output.suggestions),
    },
  });
}
