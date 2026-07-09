import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { user, error } = await requireUser();
  if (error) return error;

  const goals = await prisma.goal.findMany({
    where: { userId: user.id },
    orderBy: { deadline: "asc" },
  });

  // Auto-refresh progress for goal types we can compute from tracked data,
  // rather than trusting a stale "current" value.
  const { computeStreaks } = await import("@/lib/activity");
  const logs = await prisma.activityLog.findMany({ where: { userId: user.id } });
  const currentStreak = computeStreaks(logs).currentStreak;
  const leetcodeTotal = user.leetcodeStatsCache
    ? JSON.parse(user.leetcodeStatsCache).totalSolved ?? 0
    : null;
  const applicationsSent = await prisma.application.count({
    where: { userId: user.id, status: { not: "wishlist" } },
  });

  const updated = await Promise.all(
    goals.map(async (g) => {
      if (g.status !== "in_progress") return g;
      let current: number | null = null;
      if (g.type === "github_streak") current = currentStreak;
      else if (g.type === "leetcode_count" && leetcodeTotal !== null) current = leetcodeTotal;
      else if (g.type === "applications_sent") current = applicationsSent;

      if (current === null || current === g.current) return g;
      const status = current >= g.target ? "completed" : "in_progress";
      return prisma.goal.update({ where: { id: g.id }, data: { current, status } });
    })
  );

  return NextResponse.json({ data: updated });
}

export async function POST(req: Request) {
  const { user, error } = await requireUser();
  if (error) return error;

  const body = await req.json();
  const label = String(body.label ?? "").trim();
  const type = String(body.type ?? "custom");
  const target = Number(body.target);
  const deadline = body.deadline ? new Date(body.deadline) : null;

  if (!label || !target || !deadline) {
    return NextResponse.json({ error: "Label, target, and deadline are required." }, { status: 400 });
  }
  if (deadline.getTime() < Date.now() - 24 * 60 * 60 * 1000) {
    return NextResponse.json({ error: "Deadline can't be in the past." }, { status: 400 });
  }

  // For trackable goal types, seed "current" from live data immediately.
  let current = 0;
  if (type === "leetcode_count" && user.leetcodeStatsCache) {
    current = JSON.parse(user.leetcodeStatsCache).totalSolved ?? 0;
  } else if (type === "github_streak") {
    const logs = await prisma.activityLog.findMany({ where: { userId: user.id } });
    const { computeStreaks } = await import("@/lib/activity");
    current = computeStreaks(logs).currentStreak;
  } else if (type === "applications_sent") {
    current = await prisma.application.count({
      where: { userId: user.id, status: { not: "wishlist" } },
    });
  }

  const goal = await prisma.goal.create({
    data: { userId: user.id, type, label, target, deadline, current },
  });

  return NextResponse.json({ data: goal }, { status: 201 });
}
