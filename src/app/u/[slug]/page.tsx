import { notFound } from "next/navigation";
import Link from "next/link";
import { getPublicProfile } from "@/lib/public-profile";
import { StreakHeatmap } from "@/components/streak-heatmap";

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = await getPublicProfile(slug);
  if (!profile) notFound();

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center gap-4">
          {profile.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.image} alt="" className="h-16 w-16 rounded-full" />
          )}
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              {profile.name ?? profile.githubUsername}
            </h1>
            <p className="text-sm text-muted">
              {profile.targetRole ?? "Software Engineer"}
              {profile.githubUsername && (
                <>
                  {" · "}
                  <a
                    href={`https://github.com/${profile.githubUsername}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent hover:underline"
                  >
                    @{profile.githubUsername}
                  </a>
                </>
              )}
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat label="Readiness score" value={`${profile.readinessScore}/100`} />
          <Stat label="Current streak" value={`${profile.currentStreak}d`} />
          <Stat label="Longest streak" value={`${profile.longestStreak}d`} />
          <Stat label="LeetCode solved" value={String(profile.leetcodeStats?.totalSolved ?? "—")} />
        </div>

        <div className="mt-8 rounded-xl border border-border bg-surface p-5">
          <h2 className="mb-3 text-sm font-semibold text-foreground">Activity</h2>
          <StreakHeatmap days={profile.heatmap.slice(-182)} />
        </div>

        {profile.githubStats && (
          <div className="mt-5 rounded-xl border border-border bg-surface p-5">
            <h2 className="mb-3 text-sm font-semibold text-foreground">GitHub</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <Stat label="Repos" value={String(profile.githubStats.publicRepos)} />
              <Stat label="Stars" value={String(profile.githubStats.totalStars)} />
              <Stat label="Followers" value={String(profile.githubStats.followers)} />
            </div>
            {profile.githubStats.topLanguages.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {profile.githubStats.topLanguages.map((l) => (
                  <span
                    key={l.name}
                    className="rounded-full bg-surface-2 px-2.5 py-1 text-xs text-foreground"
                  >
                    {l.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {profile.leetcodeStats && (
          <div className="mt-5 rounded-xl border border-border bg-surface p-5">
            <h2 className="mb-3 text-sm font-semibold text-foreground">LeetCode</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <Stat label="Easy" value={String(profile.leetcodeStats.easySolved)} />
              <Stat label="Medium" value={String(profile.leetcodeStats.mediumSolved)} />
              <Stat label="Hard" value={String(profile.leetcodeStats.hardSolved)} />
            </div>
          </div>
        )}

        <p className="mt-8 text-center text-xs text-muted">
          Built with{" "}
          <Link href="/" className="text-accent hover:underline">
            CodeBoard
          </Link>
        </p>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4 text-center">
      <p className="font-data text-xl font-semibold text-foreground">{value}</p>
      <p className="mt-0.5 text-xs text-muted">{label}</p>
    </div>
  );
}
