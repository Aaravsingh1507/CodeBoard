import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";
import { fetchGithubStats, GITHUB_CACHE_HOURS } from "@/lib/github";

export async function GET(req: Request) {
  const { user, error } = await requireUser();
  if (error) return error;

  const force = new URL(req.url).searchParams.get("force") === "1";

  if (!user.githubUsername || !user.githubAccessToken) {
    return NextResponse.json(
      { error: "No GitHub account connected. Reconnect GitHub in Settings." },
      { status: 400 }
    );
  }

  const isFresh =
    !force &&
    user.githubStatsCache &&
    user.githubStatsSyncedAt &&
    Date.now() - user.githubStatsSyncedAt.getTime() < GITHUB_CACHE_HOURS * 60 * 60 * 1000;

  if (isFresh) {
    return NextResponse.json({
      data: JSON.parse(user.githubStatsCache!),
      cached: true,
      syncedAt: user.githubStatsSyncedAt,
    });
  }

  try {
    const stats = await fetchGithubStats(user.githubUsername, user.githubAccessToken);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        githubStatsCache: JSON.stringify(stats),
        githubStatsSyncedAt: new Date(),
      },
    });
    return NextResponse.json({ data: stats, cached: false, syncedAt: new Date() });
  } catch (err) {
    // Fall back to last known cache rather than a hard failure, if we have one.
    if (user.githubStatsCache) {
      return NextResponse.json({
        data: JSON.parse(user.githubStatsCache),
        cached: true,
        stale: true,
        syncedAt: user.githubStatsSyncedAt,
        warning: "Couldn't refresh from GitHub — showing last known data.",
      });
    }
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch GitHub stats." },
      { status: 502 }
    );
  }
}
