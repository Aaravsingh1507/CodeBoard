import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";
import { computeStreaks } from "@/lib/activity";

export async function GET() {
  const { user, error } = await requireUser();
  if (error) return error;

  const logs = await prisma.activityLog.findMany({
    where: { userId: user.id },
    orderBy: { date: "asc" },
  });

  const result = computeStreaks(logs);
  return NextResponse.json({ data: result });
}
