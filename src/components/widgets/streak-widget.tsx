"use client";

import { Flame, RefreshCw } from "lucide-react";
import { useFetch } from "@/lib/use-fetch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { StreakHeatmap } from "@/components/streak-heatmap";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  heatmap: { date: string; count: number }[];
}

export function StreakWidget() {
  const { data, loading, error, refetch } = useFetch<StreakData>("/api/activity/streak");
  const [syncing, setSyncing] = useState(false);

  async function syncNow() {
    setSyncing(true);
    try {
      await fetch("/api/activity/sync", { method: "POST" });
      refetch();
    } finally {
      setSyncing(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Coding streak</CardTitle>
        <Button variant="ghost" size="sm" onClick={syncNow} disabled={syncing}>
          <RefreshCw size={13} className={syncing ? "animate-spin" : ""} />
          Sync today
        </Button>
      </CardHeader>
      <CardContent>
        {loading && <Skeleton className="h-24 w-full" />}
        {error && <ErrorState message={error} onRetry={() => refetch()} />}
        {data && (
          <>
            <div className="mb-4 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Flame className="text-warn" size={20} />
                <div>
                  <p className="font-data text-2xl font-semibold leading-none">
                    {data.currentStreak}
                  </p>
                  <p className="text-xs text-muted">day streak</p>
                </div>
              </div>
              <div>
                <p className="font-data text-2xl font-semibold leading-none">
                  {data.longestStreak}
                </p>
                <p className="text-xs text-muted">longest streak</p>
              </div>
            </div>
            <StreakHeatmap days={data.heatmap.slice(-182)} />
          </>
        )}
      </CardContent>
    </Card>
  );
}
