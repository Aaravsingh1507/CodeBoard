import { NextResponse } from "next/server";
import { requireCronSecret } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";
import { sendWeeklyDigest } from "@/lib/email";

async function runDigest() {
  const users = await prisma.user.findMany({
    where: { onboarded: true, digestEnabled: true },
    select: { id: true, email: true, name: true },
  });
  const results = await Promise.allSettled(users.map((u) => sendWeeklyDigest(u)));
  const sent = results.filter((r) => r.status === "fulfilled" && (r.value as any).sent).length;
  return NextResponse.json({ sent, total: users.length });
}

// Same pattern as the other cron routes — GET for Vercel Cron's auto bearer
// token, POST for manual triggers.
export async function GET(req: Request) {
  const unauthorized = requireCronSecret(req);
  if (unauthorized) return unauthorized;
  return runDigest();
}

export async function POST(req: Request) {
  const unauthorized = requireCronSecret(req);
  if (unauthorized) return unauthorized;
  return runDigest();
}
