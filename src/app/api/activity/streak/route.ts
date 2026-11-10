import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";
import { computeStreaks } from "@/lib/activity";

export async function GET() {
  const { user, error } = await requireUser();
  if (error) return error;

  let logs = await prisma.activityLog.findMany({
    where: { userId: user.id },
    orderBy: { date: "asc" },
  });

  const now = new Date();
  const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const todayLog = logs.find((l) => l.date.getTime() === todayUTC.getTime());
  const lastSync = user.githubStatsSyncedAt;
  const isStale = !lastSync || Date.now() - lastSync.getTime() > 10 * 60 * 1000;

  // If we already have logs, return them immediately so UI is instant (<20ms).
  // Background-sync if stale (stale-while-revalidate pattern).
  const hasLogs = logs.length > 0;
  if (user.githubUsername && user.githubAccessToken && (logs.length <= 1 || !todayLog || isStale)) {
    if (hasLogs) {
      // Non-blocking background sync
      import("@/lib/activity")
        .then(({ syncActivityForUser }) => syncActivityForUser(user.id))
        .catch(() => {});
    } else {
      // First visit initial population
      try {
        const { syncActivityForUser } = await import("@/lib/activity");
        await syncActivityForUser(user.id);
        logs = await prisma.activityLog.findMany({
          where: { userId: user.id },
          orderBy: { date: "asc" },
        });
      } catch {
        // Non-fatal
      }
    }
  }

  // Fallback: if logs table is still empty, populate in-memory from user's GitHub stats cache
  if (logs.length === 0 && user.githubStatsCache) {
    try {
      const stats = JSON.parse(user.githubStatsCache);
      if (Array.isArray(stats.contributionCalendar)) {
        logs = stats.contributionCalendar.map((d: any) => ({
          date: new Date(d.date + "T00:00:00Z"),
          githubContributions: Number(d.count) || 0,
          leetcodeSubmissions: 0,
        }));
      }
    } catch {
      // Non-fatal
    }
  }

  const result = computeStreaks(logs);
  return NextResponse.json(
    { data: result },
    {
      headers: {
        "Cache-Control": "private, max-age=15, stale-while-revalidate=60",
      },
    }
  );
}
