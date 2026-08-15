"use client";

import {
  RefreshCw,
  ExternalLink,
  GitCommit,
  GitPullRequest,
  CircleDot,
  Star,
  GitFork,
  Eye,
  Users,
  UserPlus,
  Download,
  BarChart3,
  Globe,
  BookOpen,
  Bug,
} from "lucide-react";
import { useFetch } from "@/lib/use-fetch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { StreakHeatmap } from "@/components/streak-heatmap";
import { LanguageDonut } from "@/components/language-donut";
import type { GithubStats } from "@/lib/github";

function StatTile({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-surface-2/60 px-3 py-2.5">
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
        style={{ background: color }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="font-data text-lg font-semibold leading-tight">{value.toLocaleString()}</p>
        <p className="truncate text-[11px] text-muted">{label}</p>
      </div>
    </div>
  );
}

export default function GithubPage() {
  const { data, loading, error, warning, refetch } = useFetch<GithubStats>("/api/github/stats");

  const notConnected = error?.includes("No GitHub account");

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">GitHub</h1>
          <p className="mt-1 text-sm text-muted">Contribution activity, languages, and recent work.</p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => refetch({ force: true })} disabled={loading}>
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh
        </Button>
      </div>

      {loading && (
        <div className="space-y-5">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      )}

      {error && !notConnected && <ErrorState message={error} onRetry={() => refetch()} />}
      {notConnected && (
        <EmptyState
          title="GitHub not connected"
          description="Reconnect your GitHub account from Settings to pull live stats."
        />
      )}

      {data && (
        <div className="space-y-5">
          {warning && (
            <p className="rounded-lg bg-warn/10 px-3 py-2 text-xs text-warn">{warning}</p>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Contribution activity</CardTitle>
              <span className="font-data text-xs text-muted">
                {data.totalContributionsLastYear} in the last year
              </span>
            </CardHeader>
            <CardContent>
              <StreakHeatmap days={data.contributionCalendar} />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top languages</CardTitle>
              </CardHeader>
              <CardContent>
                {data.topLanguages.length === 0 ? (
                  <EmptyState title="No language data yet" description="Push some code to see this fill in." />
                ) : (
                  <LanguageDonut data={data.topLanguages} />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profile overview</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2.5">
                <StatTile
                  icon={<BookOpen size={15} className="text-white" />}
                  label="Repositories"
                  value={data.publicRepos}
                  color="hsl(250 70% 55%)"
                />
                <StatTile
                  icon={<Star size={15} className="text-white" />}
                  label="Stars earned"
                  value={data.totalStars}
                  color="hsl(45 90% 50%)"
                />
                <StatTile
                  icon={<Users size={15} className="text-white" />}
                  label="Followers"
                  value={data.followers}
                  color="hsl(200 75% 50%)"
                />
                <StatTile
                  icon={<UserPlus size={15} className="text-white" />}
                  label="Following"
                  value={data.following}
                  color="hsl(170 60% 45%)"
                />
                <StatTile
                  icon={<GitFork size={15} className="text-white" />}
                  label="Forks"
                  value={data.totalForks}
                  color="hsl(280 60% 55%)"
                />
                <StatTile
                  icon={<Eye size={15} className="text-white" />}
                  label="Watchers"
                  value={data.totalWatchers}
                  color="hsl(220 65% 55%)"
                />
                <StatTile
                  icon={<GitPullRequest size={15} className="text-white" />}
                  label="Pull requests"
                  value={data.totalPRs}
                  color="hsl(150 60% 45%)"
                />
                <StatTile
                  icon={<Bug size={15} className="text-white" />}
                  label="Issues"
                  value={data.totalIssues}
                  color="hsl(0 65% 55%)"
                />
              </CardContent>
            </Card>
          </div>

          {/* Traffic Insights — 14 day window */}
          <Card>
            <CardHeader>
              <CardTitle>Traffic insights</CardTitle>
              <span className="text-[11px] text-muted">Last 14 days · top 10 repos</span>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Clone & View counters */}
                <div className="flex gap-3">
                  <div className="flex flex-1 items-center gap-3 rounded-lg bg-surface-2/60 px-4 py-3">
                    <Download size={18} className="shrink-0 text-accent" />
                    <div>
                      <p className="font-data text-xl font-semibold">{data.totalClones.toLocaleString()}</p>
                      <p className="text-[11px] text-muted">Git clones</p>
                    </div>
                  </div>
                  <div className="flex flex-1 items-center gap-3 rounded-lg bg-surface-2/60 px-4 py-3">
                    <BarChart3 size={18} className="shrink-0 text-accent-2" />
                    <div>
                      <p className="font-data text-xl font-semibold">{data.totalViews.toLocaleString()}</p>
                      <p className="text-[11px] text-muted">Page views</p>
                    </div>
                  </div>
                </div>

                {/* Top referrers */}
                <div>
                  <p className="mb-2 text-xs font-semibold text-muted">Top referrers</p>
                  {data.topReferrers.length === 0 ? (
                    <p className="text-xs text-muted/70">No referrer data available yet.</p>
                  ) : (
                    <ul className="space-y-1.5">
                      {data.topReferrers.map((r) => (
                        <li key={r.referrer} className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1.5 truncate text-foreground">
                            <Globe size={12} className="shrink-0 text-muted" />
                            {r.referrer}
                          </span>
                          <span className="font-data text-xs text-muted">
                            {r.count} <span className="text-muted/60">({r.uniques} unique)</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent activity</CardTitle>
            </CardHeader>
            <CardContent>
              {data.recentActivity.length === 0 ? (
                <EmptyState
                  title="No recent activity"
                  description="Commits, PRs, and issues from the last 90 days show up here."
                />
              ) : (
                <ul className="divide-y divide-border">
                  {data.recentActivity.map((a, i) => (
                    <li key={i} className="flex items-start gap-3 py-2.5">
                      <span className="mt-0.5 text-muted">
                        {a.type === "commit" && <GitCommit size={15} />}
                        {a.type === "pr" && <GitPullRequest size={15} />}
                        {a.type === "issue" && <CircleDot size={15} />}
                      </span>
                      <div className="min-w-0 flex-1">
                        <a
                          href={a.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 truncate text-sm text-foreground hover:text-accent"
                        >
                          <span className="truncate">{a.title}</span>
                          <ExternalLink size={11} className="shrink-0" />
                        </a>
                        <p className="text-xs text-muted">{a.repo}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

