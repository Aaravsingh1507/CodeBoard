import { NextResponse } from "next/server";
import { requireCronSecret } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";
import { syncActivityForUser } from "@/lib/activity";

async function runSync() {
  const users = await prisma.user.findMany({ where: { onboarded: true }, select: { id: true } });
  const results = await Promise.allSettled(users.map((u) => syncActivityForUser(u.id)));
  const succeeded = results.filter((r) => r.status === "fulfilled").length;
  return NextResponse.json({ synced: succeeded, total: users.length });
}

// Vercel Cron calls this with GET and auto-attaches "Authorization: Bearer
// $CRON_SECRET" when the CRON_SECRET env var is set. POST is kept too, for
// manually triggering the same job from curl or another scheduler.
export async function GET(req: Request) {
  const unauthorized = requireCronSecret(req);
  if (unauthorized) return unauthorized;
  return runSync();
}

export async function POST(req: Request) {
  const unauthorized = requireCronSecret(req);
  if (unauthorized) return unauthorized;
  return runSync();
}
