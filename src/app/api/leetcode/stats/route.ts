import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";
import { fetchLeetcodeStats, LEETCODE_CACHE_HOURS } from "@/lib/leetcode";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const queryUsername = url.searchParams.get("username");
  const force = url.searchParams.get("force") === "1";

  // Check auth optionally
  const { user } = await requireUser();

  // Determine target username: query param -> authenticated user's setting (NO FAKE PRELOADED DEFAULT)
  const username = queryUsername || user?.leetcodeUsername;

  if (!username) {
    return NextResponse.json({
      data: {
        username: "",
        ranking: null,
        totalSolved: 0,
        easySolved: 0,
        mediumSolved: 0,
        hardSolved: 0,
        acceptanceRate: "0.0%",
        recentSubmissions: [],
        topicBreakdown: [],
      },
      configured: false,
      warning: "No LeetCode account connected. Add your username in Settings to sync your real LeetCode data.",
      message: "No LeetCode username provided or set in Settings.",
    });
  }

  // Check user cache if authenticated and querying own username
  const isUserOwnStats = user && user.leetcodeUsername?.toLowerCase() === username.toLowerCase();

  if (isUserOwnStats) {
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
  }

  try {
    const stats = await fetchLeetcodeStats(username);

    // Save to user cache if authenticated for this account
    if (isUserOwnStats && user) {
      try {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            leetcodeStatsCache: JSON.stringify(stats),
            leetcodeStatsSyncedAt: new Date(),
          },
        });
      } catch {
        // Non-critical if DB cache update fails
      }
    }

    return NextResponse.json({ data: stats, cached: false, syncedAt: new Date() });
  } catch (err) {
    if (isUserOwnStats && user?.leetcodeStatsCache) {
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

