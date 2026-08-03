import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string; roundId: string }> }
) {
  const { user, error } = await requireUser();
  if (error) return error;
  const { id, roundId } = await params;

  const round = await prisma.interviewRound.findUnique({ where: { id: roundId } });
  if (!round || round.applicationId !== id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const app = await prisma.application.findUnique({ where: { id } });
  if (!app || app.userId !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await req.json();
  const data: Record<string, unknown> = {};
  if (body.outcome !== undefined) data.outcome = body.outcome;
  if (body.debrief !== undefined) data.debrief = body.debrief;
  if (body.scheduledAt !== undefined) {
    data.scheduledAt = body.scheduledAt ? new Date(body.scheduledAt) : null;
  }

  const updated = await prisma.interviewRound.update({ where: { id: roundId }, data });
  return NextResponse.json({ data: updated });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string; roundId: string }> }
) {
  const { user, error } = await requireUser();
  if (error) return error;
  const { id, roundId } = await params;

  const round = await prisma.interviewRound.findUnique({ where: { id: roundId } });
  if (!round || round.applicationId !== id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const app = await prisma.application.findUnique({ where: { id } });
  if (!app || app.userId !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.interviewRound.delete({ where: { id: roundId } });
  return NextResponse.json({ data: { id: roundId } });
}
