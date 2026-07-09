import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";
import { deleteFile } from "@/lib/storage";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { user, error } = await requireUser();
  if (error) return error;
  const { id } = await params;

  const existing = await prisma.resumeVersion.findUnique({ where: { id } });
  if (!existing || existing.userId !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await req.json();
  if (body.isActive === true) {
    // Only one version can be active at a time.
    await prisma.$transaction([
      prisma.resumeVersion.updateMany({
        where: { userId: user.id },
        data: { isActive: false },
      }),
      prisma.resumeVersion.update({ where: { id }, data: { isActive: true } }),
    ]);
  }

  const updated = await prisma.resumeVersion.findUnique({ where: { id } });
  return NextResponse.json({ data: updated });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { user, error } = await requireUser();
  if (error) return error;
  const { id } = await params;

  const existing = await prisma.resumeVersion.findUnique({ where: { id } });
  if (!existing || existing.userId !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await deleteFile(existing.fileUrl);
  await prisma.resumeVersion.delete({ where: { id } });
  return NextResponse.json({ data: { id } });
}
