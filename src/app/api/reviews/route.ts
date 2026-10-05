import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { user, error } = await requireUser();
  if (error) return error;

  const reviews = await prisma.weeklyReview.findMany({
    where: { userId: user.id },
    orderBy: [{ generatedAt: "desc" }, { weekStart: "desc" }],
  });

  // Retain only the current (latest) review and immediate previous review.
  // Automatically erase any older reviews from the database.
  if (reviews.length > 2) {
    const toDelete = reviews.slice(2).map((r) => r.id);
    await prisma.weeklyReview.deleteMany({
      where: { id: { in: toDelete } },
    });
  }

  const activeReviews = reviews.slice(0, 2);

  return NextResponse.json({
    data: activeReviews.map((r) => ({
      ...r,
      observations: JSON.parse(r.observations),
      suggestions: JSON.parse(r.suggestions),
    })),
  });
}

export async function DELETE(req: Request) {
  const { user, error } = await requireUser();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing review ID" }, { status: 400 });
  }

  await prisma.weeklyReview.deleteMany({
    where: { id, userId: user.id },
  });

  return NextResponse.json({ ok: true });
}
