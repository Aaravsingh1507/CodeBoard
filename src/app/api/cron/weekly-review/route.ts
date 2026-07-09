import { NextResponse } from "next/server";
import { requireCronSecret } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";
import { generateAndStoreWeeklyReview } from "@/lib/weekly-review";

async function runWeeklyReviews() {
  const users = await prisma.user.findMany({ where: { onboarded: true }, select: { id: true } });
  const results = await Promise.allSettled(users.map((u) => generateAndStoreWeeklyReview(u.id)));
  const succeeded = results.filter((r) => r.status === "fulfilled").length;
  return NextResponse.json({ generated: succeeded, total: users.length });
}

// Scheduled for Sunday night via vercel.json. Vercel Cron uses GET + an
// auto-attached CRON_SECRET bearer token; POST is kept for manual triggers.
export async function GET(req: Request) {
  const unauthorized = requireCronSecret(req);
  if (unauthorized) return unauthorized;
  return runWeeklyReviews();
}

export async function POST(req: Request) {
  const unauthorized = requireCronSecret(req);
  if (unauthorized) return unauthorized;
  return runWeeklyReviews();
}
