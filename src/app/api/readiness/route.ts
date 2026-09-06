import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";
import { computeReadiness } from "@/lib/readiness";

export async function GET() {
  const { user, error } = await requireUser();
  if (error) return error;

  const logCount = await prisma.activityLog.count({ where: { userId: user.id } });
  if (logCount <= 1 && user.githubUsername && user.githubAccessToken) {
    try {
      const { syncActivityForUser } = await import("@/lib/activity");
      await syncActivityForUser(user.id);
    } catch {
      // Non-fatal
    }
  }

  const result = await computeReadiness(user.id);
  return NextResponse.json({ data: result });
}
