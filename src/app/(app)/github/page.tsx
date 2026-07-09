"use client";

import { RefreshCw, ExternalLink, GitCommit, GitPullRequest, CircleDot } from "lucide-react";
import { useFetch } from "@/lib/use-fetch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { StreakHeatmap } from "@/components/streak-heatmap";
import { LanguageDonut } from "@/components/language-donut";
import type { GithubStats } from "@/lib/github";

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
                <CardTitle>Profile</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="font-data text-2xl font-semibold">{data.publicRepos}</p>
                  <p className="text-xs text-muted">Repos</p>
                </div>
                <div>
                  <p className="font-data text-2xl font-semibold">{data.totalStars}</p>
                  <p className="text-xs text-muted">Stars</p>
                </div>
                <div>
                  <p className="font-data text-2xl font-semibold">{data.followers}</p>
                  <p className="text-xs text-muted">Followers</p>
                </div>
              </CardContent>
            </Card>
          </div>

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
