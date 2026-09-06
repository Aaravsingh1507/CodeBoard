"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { useFetch } from "@/lib/use-fetch";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { StreakHeatmap } from "@/components/streak-heatmap";

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  heatmap: { date: string; count: number }[];
}

export function StreakWidget({ previewData }: { previewData?: StreakData } = {}) {
  const { data: fetchedData, loading, error, refetch } = useFetch<StreakData>("/api/activity/streak");
  const data = previewData ?? fetchedData;
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
    <Card className="overflow-hidden rounded-[22px] border border-[#1e263d] bg-gradient-to-b from-[#111728]/95 to-[#0d1220]/95 p-0 shadow-2xl shadow-black/50 backdrop-blur-md">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-center">
          {/* Left Column (7 cols): Header, Stat Tiles, Heatmap */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between pb-4">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">🔥</span>
                <h3 className="text-base font-bold tracking-tight text-white">Coding streak</h3>
              </div>
              <button
                onClick={syncNow}
                disabled={syncing}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50"
              >
                <RefreshCw size={12} className={syncing ? "animate-spin text-purple-400" : "text-slate-400"} />
                <span>Sync today</span>
              </button>
            </div>

            {!previewData && loading && <Skeleton className="h-44 w-full rounded-xl" />}
            {!previewData && error && <ErrorState message={error} onRetry={() => refetch()} />}

            {data && (
              <>
                {/* Stat Tiles */}
                <div className="mb-4 grid grid-cols-2 gap-3.5">
                  {/* Day Streak */}
                  <div className="flex items-center gap-3.5 rounded-xl border border-[#1c2438] bg-[#121829]/70 p-3.5 shadow-inner">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-500/15 text-orange-400 text-lg">
                      🔥
                    </div>
                    <div>
                      <p className="font-data text-2xl font-bold leading-none text-white">
                        {data.currentStreak}
                      </p>
                      <p className="mt-1 text-xs text-slate-400 font-medium">day streak</p>
                    </div>
                  </div>

                  {/* Longest Streak */}
                  <div className="flex items-center gap-3.5 rounded-xl border border-[#1c2438] bg-[#121829]/70 p-3.5 shadow-inner">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400 text-lg">
                      🏆
                    </div>
                    <div>
                      <p className="font-data text-2xl font-bold leading-none text-white">
                        {data.longestStreak}
                      </p>
                      <p className="mt-1 text-xs text-slate-400 font-medium">longest streak</p>
                    </div>
                  </div>
                </div>

                {/* Heatmap Grid */}
                <div className="rounded-xl border border-[#1c2438] bg-[#0c101c]/60 p-3.5">
                  <StreakHeatmap days={data.heatmap.slice(-182)} />
                </div>
              </>
            )}
          </div>

          {/* Right Column (5 cols): 3D Developer Desk Artwork */}
          <div className="relative hidden lg:flex lg:col-span-5 items-center justify-center select-none">
            {/* Ambient Purple Glow */}
            <div className="pointer-events-none absolute h-48 w-48 rounded-full bg-purple-600/20 blur-3xl" />

            <div className="relative z-10 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/streak-desk-3d.png"
                alt="Coding Desk"
                className="max-h-[168px] w-auto rounded-xl object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
