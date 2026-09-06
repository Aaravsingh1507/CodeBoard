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

  // Auto-sync real GitHub contributions on first visit if logs are empty
  if (logs.length <= 1 && user.githubUsername && user.githubAccessToken) {
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
