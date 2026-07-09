import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { user, error } = await requireUser();
  if (error) return error;

  const applications = await prisma.application.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ data: applications });
}

export async function POST(req: Request) {
  const { user, error } = await requireUser();
  if (error) return error;

  const body = await req.json();
  const company = String(body.company ?? "").trim();
  const role = String(body.role ?? "").trim();

  if (!company || !role) {
    return NextResponse.json({ error: "Company and role are required." }, { status: 400 });
  }

  const application = await prisma.application.create({
    data: {
      userId: user.id,
      company,
      role,
      link: body.link || null,
      notes: body.notes || null,
      status: body.status || "wishlist",
      appliedAt: body.appliedAt ? new Date(body.appliedAt) : null,
    },
  });

  return NextResponse.json({ data: application }, { status: 201 });
}
