import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";
import { computeStreaks } from "@/lib/activity";
import { computeReadiness } from "@/lib/readiness";

function generateInviteCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

export async function GET() {
  const { user, error } = await requireUser();
  if (error) return error;

  const memberships = await prisma.circleMembership.findMany({
    where: { userId: user.id },
    include: { circle: { include: { members: { include: { user: true } } } } },
  });

  const circles = await Promise.all(
    memberships.map(async (m) => {
      const circle = m.circle;
      if (!circle) return null;
      const members = await Promise.all(
        (circle.members ?? []).map(async (member) => {
          const logs = await prisma.activityLog.findMany({ where: { userId: member.userId } });
          const { currentStreak } = computeStreaks(logs);
          const readiness = await computeReadiness(member.userId);
          return {
            id: member.userId,
            name: member.user?.name ?? member.user?.githubUsername ?? "Member",
            image: member.user?.image ?? null,
            currentStreak,
            readinessScore: readiness.score,
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
