import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";
import { fetchLeetcodeStats, LEETCODE_CACHE_HOURS } from "@/lib/leetcode";

export async function GET(req: Request) {
  const { user, error } = await requireUser();
  if (error) return error;

  const force = new URL(req.url).searchParams.get("force") === "1";

  if (!user.leetcodeUsername) {
    return NextResponse.json(
      { error: "No LeetCode username set. Add one in Settings." },
      { status: 400 }
    );
  }

  const isFresh =
    !force &&
    user.leetcodeStatsCache &&
    user.leetcodeStatsSyncedAt &&
    Date.now() - user.leetcodeStatsSyncedAt.getTime() < LEETCODE_CACHE_HOURS * 60 * 60 * 1000;

  if (isFresh) {
    return NextResponse.json({
      data: JSON.parse(user.leetcodeStatsCache!),
      cached: true,
      syncedAt: user.leetcodeStatsSyncedAt,
    });
  }

  try {
    const stats = await fetchLeetcodeStats(user.leetcodeUsername);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        leetcodeStatsCache: JSON.stringify(stats),
        leetcodeStatsSyncedAt: new Date(),
      },
    });
    return NextResponse.json({ data: stats, cached: false, syncedAt: new Date() });
  } catch (err) {
    if (user.leetcodeStatsCache) {
      return NextResponse.json({
        data: JSON.parse(user.leetcodeStatsCache),
        cached: true,
        stale: true,
        syncedAt: user.leetcodeStatsSyncedAt,
        warning: "Couldn't refresh from LeetCode — showing last known data.",
      });
    }
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch LeetCode stats." },
      { status: 502 }
    );
  }
}
