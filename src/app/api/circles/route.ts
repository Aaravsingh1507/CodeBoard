import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";
import { computeStreaks } from "@/lib/activity";
import { computeReadiness } from "@/lib/readiness";
import { startOfWeek } from "date-fns";

function generateInviteCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

export async function GET() {
  const { user, error } = await requireUser();
  if (error) return error;

  const memberships = await prisma.circleMembership.findMany({
    where: { userId: user.id },
    include: {
      circle: {
        include: {
          members: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  });

  // Collect all unique member user IDs across all circles
  const allMemberUserIds = Array.from(
    new Set(
      memberships.flatMap((m) => m.circle?.members.map((mem) => mem.userId) ?? [])
    )
  );

  // Scoped Prisma query to fetch activity logs for all circle members
  const allLogs = await prisma.activityLog.findMany({
    where: { userId: { in: allMemberUserIds } },
    orderBy: { date: "asc" },
  });

  // Group logs by userId for efficient O(1) lookups
  const logsByUserId = new Map<string, typeof allLogs>();
  for (const log of allLogs) {
    const list = logsByUserId.get(log.userId) ?? [];
    list.push(log);
    logsByUserId.set(log.userId, list);
  }

  // Precompute 7-day keys (index 0 = 6 days ago, index 6 = today)
  const now = new Date();
  const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const last7DaysKeys: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(todayUTC.getTime() - i * 24 * 60 * 60 * 1000);
    last7DaysKeys.push(d.toISOString().slice(0, 10));
  }

  // Monday of the current week for weekly leader reset (weekStartsOn: 1)
  const monday = startOfWeek(now, { weekStartsOn: 1 });
  const mondayUTC = new Date(Date.UTC(monday.getUTCFullYear(), monday.getUTCMonth(), monday.getUTCDate()));
  const mondayKey = mondayUTC.toISOString().slice(0, 10);

  const circles = await Promise.all(
    memberships.map(async (m) => {
      const circle = m.circle;
      if (!circle) return null;

      const members = await Promise.all(
        (circle.members ?? []).map(async (member) => {
          const userLogs = logsByUserId.get(member.userId) ?? [];
          const userLogsMap = new Map<string, typeof userLogs[0]>();
          for (const l of userLogs) {
            const key = l.date.toISOString().slice(0, 10);
            userLogsMap.set(key, l);
          }

          // 7-day metrics
          let lcSolvesThisWeek = 0;
          let ghCommitsThisWeek = 0;
          let weeklyCombinedActivity = 0;
          const activityLast7Days: boolean[] = [];

          for (const key of last7DaysKeys) {
            const log = userLogsMap.get(key);
            const solves = log?.leetcodeSubmissions ?? 0;
            const commits = log?.githubContributions ?? 0;
            lcSolvesThisWeek += solves;
            ghCommitsThisWeek += commits;
            activityLast7Days.push(solves > 0 || commits > 0);

            if (key >= mondayKey) {
              weeklyCombinedActivity += solves + commits;
            }
          }

          // Most recent active date
          let lastActiveDate = "";
          for (let i = userLogs.length - 1; i >= 0; i--) {
            const l = userLogs[i];
            if ((l.githubContributions ?? 0) > 0 || (l.leetcodeSubmissions ?? 0) > 0) {
              lastActiveDate = l.date.toISOString();
              break;
            }
          }

          const { currentStreak, heatmap } = computeStreaks(userLogs);
          const readiness = await computeReadiness(member.userId);

          // Compute score delta (current score minus score 7 days ago)
          let streak7DaysAgo = 0;
          for (let i = 357; i >= 0; i--) {
            if (heatmap[i] && heatmap[i].count > 0) streak7DaysAgo++;
            else break;
          }
          const consistencyScoreToday = Math.round(Math.min(currentStreak / 21, 1) * 25);
          const consistencyScore7DaysAgo = Math.round(Math.min(streak7DaysAgo / 21, 1) * 25);
          const consistencyDelta = consistencyScoreToday - consistencyScore7DaysAgo;

          let totalSolved = 0;
          if (member.user?.leetcodeStatsCache) {
            try {
              totalSolved = JSON.parse(member.user.leetcodeStatsCache).totalSolved ?? 0;
            } catch {}
          }
          const volumeScoreToday = Math.round(Math.min(totalSolved / 150, 1) * 25);
          const totalSolved7DaysAgo = Math.max(0, totalSolved - lcSolvesThisWeek);
          const volumeScore7DaysAgo = Math.round(Math.min(totalSolved7DaysAgo / 150, 1) * 25);
          const volumeDelta = volumeScoreToday - volumeScore7DaysAgo;

          const scoreDelta = consistencyDelta + volumeDelta;

          return {
            id: member.userId,
            name: member.user?.name ?? member.user?.githubUsername ?? "Member",
            image: member.user?.image ?? null,
            currentStreak,
            readinessScore: readiness.score,
            scoreDelta,
            lcSolvesThisWeek,
            ghCommitsThisWeek,
            weeklyCombinedActivity,
            activityLast7Days,
            lastActiveDate,
          };
        })
      );

      return {
        id: circle.id,
        name: circle.name,
        inviteCode: circle.inviteCode,
        isOwner: circle.ownerId === user.id,
        members: members.sort((a, b) => b.readinessScore - a.readinessScore),
      };
    })
  );

  const validCircles = circles.filter((c): c is NonNullable<typeof c> => c !== null);

  return NextResponse.json({ data: validCircles });
}

export async function POST(req: Request) {
  const { user, error } = await requireUser();
  if (error) return error;

  const body = await req.json();
  const name = String(body.name ?? "").trim();
  if (!name) return NextResponse.json({ error: "A circle name is required." }, { status: 400 });

  let inviteCode = generateInviteCode();
  while (await prisma.circle.findUnique({ where: { inviteCode } })) {
    inviteCode = generateInviteCode();
  }

  const circle = await prisma.circle.create({
    data: {
      name,
      inviteCode,
      ownerId: user.id,
      members: { create: { userId: user.id } },
    },
  });

  return NextResponse.json({ data: circle }, { status: 201 });
}