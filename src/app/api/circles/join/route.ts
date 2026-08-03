import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { user, error } = await requireUser();
  if (error) return error;

  const body = await req.json();
  const inviteCode = String(body.inviteCode ?? "").trim().toUpperCase();
  if (!inviteCode) return NextResponse.json({ error: "Invite code is required." }, { status: 400 });

  const circle = await prisma.circle.findUnique({ where: { inviteCode } });
  if (!circle) return NextResponse.json({ error: "Invalid invite code." }, { status: 404 });

  const existing = await prisma.circleMembership.findUnique({
    where: { circleId_userId: { circleId: circle.id, userId: user.id } },
  });
  if (existing) return NextResponse.json({ error: "You're already in this circle." }, { status: 400 });

  await prisma.circleMembership.create({ data: { circleId: circle.id, userId: user.id } });
  return NextResponse.json({ data: circle }, { status: 201 });
}
