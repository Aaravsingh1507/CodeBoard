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

  // Auto-sync real GitHub contributions on first visit, or if today's log is missing/stale
  if (
    user.githubUsername &&
    user.githubAccessToken &&
    (logs.length <= 1 || !todayLog || isStale)
  ) {
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

  const result = computeStreaks(logs);
  return NextResponse.json({ data: result });
}
