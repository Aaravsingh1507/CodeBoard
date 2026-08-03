import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { user, error } = await requireUser();
  if (error) return error;

  const reviews = await prisma.weeklyReview.findMany({
    where: { userId: user.id },
    orderBy: { weekStart: "desc" },
  });

  return NextResponse.json({
    data: reviews.map((r) => ({
      ...r,
      observations: JSON.parse(r.observations),
      suggestions: JSON.parse(r.suggestions),
    })),
  });
}
