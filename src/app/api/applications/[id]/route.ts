import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { user, error } = await requireUser();
  if (error) return error;
  const { id } = await params;

  const existing = await prisma.application.findUnique({ where: { id } });
  if (!existing || existing.userId !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await req.json();
  const data: Record<string, unknown> = {};
  for (const key of ["company", "role", "link", "notes", "status"] as const) {
    if (body[key] !== undefined) data[key] = body[key];
  }
  if (body.appliedAt !== undefined) {
    data.appliedAt = body.appliedAt ? new Date(body.appliedAt) : null;
  }
  // Moving into "applied" for the first time without an appliedAt set — default to now.
  if (data.status === "applied" && !existing.appliedAt && !data.appliedAt) {
    data.appliedAt = new Date();
  }

  const updated = await prisma.application.update({ where: { id }, data });
  return NextResponse.json({ data: updated });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { user, error } = await requireUser();
  if (error) return error;
  const { id } = await params;

  const existing = await prisma.application.findUnique({ where: { id } });
  if (!existing || existing.userId !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.application.delete({ where: { id } });
  return NextResponse.json({ data: { id } });
}
