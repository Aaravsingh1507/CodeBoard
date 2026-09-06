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
    <div className="relative min-h-screen overflow-hidden bg-[#080c17] px-4 py-12">
      {/* Ambient Nebula Glows */}
      <div className="pointer-events-none absolute right-1/4 top-0 h-[500px] w-[500px] rounded-full bg-purple-600/15 blur-[140px]" />
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-indigo-600/12 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-2xl space-y-6">
        <div className="flex items-center gap-4">
          {profile.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.image} alt="" className="h-16 w-16 rounded-full border border-border/80 object-cover shadow-md" />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 font-data text-xl font-bold text-white shadow-md">
              {(profile.name ?? profile.githubUsername ?? "A").slice(0, 2).toUpperCase()}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              {profile.name ?? profile.githubUsername}
            </h1>
            <p className="mt-0.5 text-sm text-slate-400">
              {profile.targetRole ?? "Software Engineer"}
              {profile.githubUsername && (
                <>
                  {" · "}
                  <a
                    href={`https://github.com/${profile.githubUsername}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#818cf8] hover:underline"
                  >
                    @{profile.githubUsername}
                  </a>
                </>
              )}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat label="Readiness score" value={`${profile.readinessScore}/100`} highlight />
          <Stat label="Current streak" value={`${profile.currentStreak}d`} />
          <Stat label="Longest streak" value={`${profile.longestStreak}d`} />
          <Stat label="LeetCode solved" value={String(profile.leetcodeStats?.totalSolved ?? "—")} />
        </div>

        <div className="rounded-[22px] border border-[#1e263d] bg-gradient-to-b from-[#111728]/95 to-[#0d1220]/95 p-5 shadow-xl shadow-black/40 backdrop-blur-md">
          <h2 className="mb-3 text-sm font-bold tracking-tight text-white">Activity</h2>
          <StreakHeatmap days={profile.heatmap.slice(-182)} />
        </div>

        {profile.githubStats && (
          <div className="rounded-[22px] border border-[#1e263d] bg-gradient-to-b from-[#111728]/95 to-[#0d1220]/95 p-5 shadow-xl shadow-black/40 backdrop-blur-md">
            <h2 className="mb-3 text-sm font-bold tracking-tight text-white">GitHub</h2>
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
                    className="rounded-full border border-border/80 bg-surface-2/80 px-2.5 py-1 text-xs text-slate-300"
                  >
                    {l.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {profile.leetcodeStats && (
          <div className="rounded-[22px] border border-[#1e263d] bg-gradient-to-b from-[#111728]/95 to-[#0d1220]/95 p-5 shadow-xl shadow-black/40 backdrop-blur-md">
            <h2 className="mb-3 text-sm font-bold tracking-tight text-white">LeetCode</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <Stat label="Easy" value={String(profile.leetcodeStats.easySolved)} />
              <Stat label="Medium" value={String(profile.leetcodeStats.mediumSolved)} />
              <Stat label="Hard" value={String(profile.leetcodeStats.hardSolved)} />
            </div>
          </div>
        )}

        <p className="pt-4 text-center text-xs text-slate-500">
          Built with{" "}
          <Link href="/" className="font-semibold text-indigo-400 hover:underline">
            CodeBoard
          </Link>
        </p>
      </div>
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="rounded-2xl border border-[#1e263d] bg-[#121829]/70 p-4 text-center shadow-inner">
      <p className={`font-data text-xl font-bold ${highlight ? "text-purple-400" : "text-white"}`}>
        {value}
      </p>
      <p className="mt-1 text-xs text-slate-400">{label}</p>
    </div>
  );
}
