import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Short-lived in-memory cache to deduplicate simultaneous API requests from the same user session
const userSessionCache = new Map<string, { user: any; expiresAt: number }>();
const USER_CACHE_TTL_MS = 15_000; // 15 seconds

export function invalidateUserCache(userId?: string) {
  if (userId) {
    userSessionCache.delete(userId);
  } else {
    userSessionCache.clear();
  }
}

export async function requireUser() {
  const session = await auth();
  if (!session?.user) {
    return { user: null, error: NextResponse.json({ error: "Not authenticated" }, { status: 401 }) };
  }

  const userId = (session.user as any).id;
  const now = Date.now();
  const cached = userSessionCache.get(userId);

  if (cached && cached.expiresAt > now) {
    return { user: cached.user, error: null };
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return { user: null, error: NextResponse.json({ error: "User not found" }, { status: 401 }) };
  }

  userSessionCache.set(userId, { user, expiresAt: now + USER_CACHE_TTL_MS });

  return { user, error: null };
}

export function requireCronSecret(req: Request) {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || !authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const expected = `Bearer ${cronSecret}`;
  const authBuf = Buffer.from(authHeader);
  const expectedBuf = Buffer.from(expected);

  if (authBuf.length !== expectedBuf.length || !timingSafeEqual(authBuf, expectedBuf)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}
