import { prisma } from "@/lib/prisma";
import { computeStreaks } from "@/lib/activity";

export interface ReadinessBreakdown {
  label: string;
  score: number; // 0-25
  max: 25;
  detail: string;
}

export interface ReadinessResult {
  score: number; // 0-100
  breakdown: ReadinessBreakdown[];
  focusArea: string; // the weakest category, in plain language
  nudges: string[]; // 0-3 short, specific, actionable prompts
}

/**
 * A single number that answers "am I actually placement-ready right now?"
 * instead of making the user mentally combine four separate stat pages.
 * Weighted evenly across four things that actually matter for a student
 * prepping for internships/placements: consistency, problem-solving
 * volume, job-search momentum, and whether they're hitting their own goals.
 */
export async function computeReadiness(userId: string): Promise<ReadinessResult> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  const logs = await prisma.activityLog.findMany({ where: { userId } });
  const { currentStreak, longestStreak } = computeStreaks(logs);

  // 1. Consistency (streak) — 25 pts, caps at a 21-day streak
  const consistencyScore = Math.round(Math.min(currentStreak / 21, 1) * 25);

  // 2. Problem-solving volume (LeetCode) — 25 pts, caps at 150 solved
  let totalSolved = 0;
  if (user?.leetcodeStatsCache) {
    totalSolved = JSON.parse(user.leetcodeStatsCache).totalSolved ?? 0;
  }
  const volumeScore = Math.round(Math.min(totalSolved / 150, 1) * 25);

  // 3. Job-search momentum — 25 pts: half from recent activity, half from response rate
  const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
  const recentApplications = await prisma.application.count({
    where: { userId, createdAt: { gte: fourteenDaysAgo } },
  });
  const totalApplied = await prisma.application.count({
    where: { userId, status: { not: "wishlist" } },
  });
  const responded = await prisma.application.count({
    where: { userId, status: { in: ["oa_screen", "interview", "offer"] } },
  });
  const recentActivityScore = Math.min(recentApplications / 5, 1) * 12.5;
  const responseRateScore = totalApplied > 0 ? (responded / totalApplied) * 12.5 : 0;
  const momentumScore = Math.round(recentActivityScore + responseRateScore);

  // 4. Goal follow-through — 25 pts, based on % of active goals on pace
  const goals = await prisma.goal.findMany({ where: { userId } });
  let goalScore = 12; // neutral default if no goals set yet — not a penalty
  if (goals.length > 0) {
    const onPace = goals.filter((g) => {
      if (g.status === "completed") return true;
      const totalDays = Math.max(
        1,
        Math.round((g.deadline.getTime() - g.createdAt.getTime()) / 86400000)
      );
      const daysElapsed = Math.round((Date.now() - g.createdAt.getTime()) / 86400000);
      const expectedPct = Math.min(1, daysElapsed / totalDays);
      const actualPct = g.current / g.target;
      return actualPct >= expectedPct * 0.85; // small grace margin
    }).length;
    goalScore = Math.round((onPace / goals.length) * 25);
  }

  const breakdown: ReadinessBreakdown[] = [
    {
      label: "Consistency",
      score: consistencyScore,
      max: 25,
      detail: `${currentStreak}-day streak (best: ${longestStreak})`,
    },
    {
      label: "Problem-solving",
      score: volumeScore,
      max: 25,
      detail: `${totalSolved} LeetCode problems solved`,
    },
    {
      label: "Job-search momentum",
      score: momentumScore,
      max: 25,
      detail:
        totalApplied > 0
          ? `${responded}/${totalApplied} applications got a response`
          : "No applications tracked yet",
    },
    {
      label: "Goal follow-through",
      score: goalScore,
      max: 25,
      detail: goals.length > 0 ? `${goals.length} goal(s) tracked` : "No goals set yet",
    },
  ];

  const score = breakdown.reduce((s, b) => s + b.score, 0);
  const weakest = [...breakdown].sort((a, b) => a.score - b.score)[0];

  const nudges: string[] = [];
  const daysSinceLastLeetcode = (() => {
    const withLc = logs
      .filter((l) => l.leetcodeSubmissions > 0)
      .sort((a, b) => b.date.getTime() - a.date.getTime())[0];
    if (!withLc) return null;
    return Math.round((Date.now() - withLc.date.getTime()) / 86400000);
  })();
  if (daysSinceLastLeetcode !== null && daysSinceLastLeetcode >= 3) {
    nudges.push(`It's been ${daysSinceLastLeetcode} days since your last LeetCode submission.`);
  }
  const staleApplications = await prisma.application.count({
    where: {
      userId,
      status: { in: ["applied", "oa_screen", "interview"] },
      updatedAt: { lt: fourteenDaysAgo },
    },
  });
  if (staleApplications > 0) {
    nudges.push(
      `${staleApplications} application${staleApplications > 1 ? "s haven't" : " hasn't"} moved in 2+ weeks — worth a follow-up email.`
    );
  }
  if (currentStreak === 0 && longestStreak > 0) {
    nudges.push(`Your streak reset — your best was ${longestStreak} days. Today's a good day to restart it.`);
  }

  return {
    score,
    breakdown,
    focusArea: weakest.label,
    nudges: nudges.slice(0, 3),
  };
}
