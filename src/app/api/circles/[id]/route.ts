import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";

// Leave a circle. If the owner leaves and others remain, ownership is not
// reassigned automatically — kept simple for now.
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { user, error } = await requireUser();
  if (error) return error;
  const { id } = await params;

  const membership = await prisma.circleMembership.findUnique({
    where: { circleId_userId: { circleId: id, userId: user.id } },
  });
  if (!membership) return NextResponse.json({ error: "Not a member" }, { status: 404 });

  await prisma.circleMembership.delete({ where: { id: membership.id } });
  return NextResponse.json({ data: { id } });
}
