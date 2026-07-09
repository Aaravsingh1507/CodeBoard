import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function requireUser() {
  const session = await auth();
  if (!session?.user) {
    return { user: null, error: NextResponse.json({ error: "Not authenticated" }, { status: 401 }) };
  }
  const user = await prisma.user.findUnique({ where: { id: (session.user as any).id } });
  if (!user) {
    return { user: null, error: NextResponse.json({ error: "User not found" }, { status: 401 }) };
  }
  return { user, error: null };
}

export function requireCronSecret(req: Request) {
  const auth = req.headers.get("authorization");
  const expected = `Bearer ${process.env.CRON_SECRET}`;
  if (!process.env.CRON_SECRET || auth !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
