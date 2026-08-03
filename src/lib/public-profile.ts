import { prisma } from "@/lib/prisma";
import { computeStreaks } from "@/lib/activity";
import { computeReadiness } from "@/lib/readiness";

export interface PublicProfile {
  name: string | null;
  githubUsername: string | null;
  image: string | null;
  targetRole: string | null;
  readinessScore: number;
  currentStreak: number;
  longestStreak: number;
  heatmap: { date: string; count: number }[];
  githubStats: { publicRepos: number; totalStars: number; followers: number; topLanguages: { name: string; bytes: number }[] } | null;
  leetcodeStats: { totalSolved: number; easySolved: number; mediumSolved: number; hardSolved: number } | null;
}

/**
 * Deliberately a narrow, sanitized view — this is public. Applications,
 * resume, email, nudges, and target companies never leave this function.
 */
export async function getPublicProfile(slug: string): Promise<PublicProfile | null> {
  const user = await prisma.user.findUnique({
    where: { publicProfileSlug: slug },
  });
  if (!user || !user.publicProfileEnabled) return null;

  const logs = await prisma.activityLog.findMany({ where: { userId: user.id } });
  const { currentStreak, longestStreak, heatmap } = computeStreaks(logs);
  const readiness = await computeReadiness(user.id);

  let githubStats: PublicProfile["githubStats"] = null;
  if (user.githubStatsCache) {
    const s = JSON.parse(user.githubStatsCache);
    githubStats = {
      publicRepos: s.publicRepos,
      totalStars: s.totalStars,
      followers: s.followers,
      topLanguages: (s.topLanguages ?? []).slice(0, 5),
    };
  }

  let leetcodeStats: PublicProfile["leetcodeStats"] = null;
  if (user.leetcodeStatsCache) {
    const s = JSON.parse(user.leetcodeStatsCache);
    leetcodeStats = {
      totalSolved: s.totalSolved,
      easySolved: s.easySolved,
      mediumSolved: s.mediumSolved,
      hardSolved: s.hardSolved,
    };
  }

  return {
    name: user.name,
    githubUsername: user.githubUsername,
    image: user.image,
    targetRole: user.targetRole,
    readinessScore: readiness.score,
    currentStreak,
    longestStreak,
    heatmap,
    githubStats,
    leetcodeStats,
  };
}

/** Generates a URL-safe, unique slug seeded from the GitHub username. */
export async function ensurePublicSlug(userId: string): Promise<string> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");
  if (user.publicProfileSlug) return user.publicProfileSlug;

  const base = (user.githubUsername ?? "user").toLowerCase().replace(/[^a-z0-9-]/g, "");
  let slug = base;
  let attempt = 0;
  while (await prisma.user.findUnique({ where: { publicProfileSlug: slug } })) {
    attempt++;
    slug = `${base}-${attempt}`;
  }

  await prisma.user.update({ where: { id: userId }, data: { publicProfileSlug: slug } });
  return slug;
}
