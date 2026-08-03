import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";

async function assertOwnership(userId: string, applicationId: string) {
  const app = await prisma.application.findUnique({ where: { id: applicationId } });
  return app && app.userId === userId ? app : null;
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { user, error } = await requireUser();
  if (error) return error;
  const { id } = await params;

  const app = await assertOwnership(user.id, id);
  if (!app) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const rounds = await prisma.interviewRound.findMany({
    where: { applicationId: id },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json({ data: rounds });
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { user, error } = await requireUser();
  if (error) return error;
  const { id } = await params;

  const app = await assertOwnership(user.id, id);
  if (!app) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json();
  const roundName = String(body.roundName ?? "").trim();
  if (!roundName) {
    return NextResponse.json({ error: "Round name is required." }, { status: 400 });
  }

  const round = await prisma.interviewRound.create({
    data: {
      applicationId: id,
      roundName,
      scheduledAt: body.scheduledAt ? new Date(body.scheduledAt) : null,
    },
  });
  return NextResponse.json({ data: round }, { status: 201 });
}
