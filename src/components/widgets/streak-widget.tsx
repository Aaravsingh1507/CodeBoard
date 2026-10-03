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
    <Card className="overflow-hidden rounded-[24px] border border-[#1e2846]/70 bg-gradient-to-b from-[#0e1426]/95 to-[#0a0f1e]/95 p-0 shadow-2xl shadow-black/60 backdrop-blur-md">
      <CardContent className="p-5 sm:p-6 lg:p-7">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-stretch">
          {/* Left Column (7 cols): Header, Stat Tiles, Heatmap */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center justify-between pb-3">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/streak-flame-transparent.png"
                  alt="Coding streak flame"
                  className="h-9 w-auto object-contain drop-shadow-[0_0_12px_rgba(249,115,22,0.6)]"
                />
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-white leading-tight">
                    Coding streak
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-400 font-normal leading-tight">
                    Keep showing up. Every commit counts.
                  </p>
                </div>
              </div>
              <button
                onClick={syncNow}
                disabled={syncing}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-slate-300 transition-all hover:bg-white/[0.08] hover:border-white/20 hover:text-white disabled:opacity-50 shadow-xs"
              >
                <RefreshCw size={13} className={syncing ? "animate-spin text-teal-400" : "text-slate-400"} />
                <span>Sync today</span>
              </button>
            </div>

            {!previewData && loading && <Skeleton className="h-44 w-full rounded-2xl" />}
            {!previewData && error && <ErrorState message={error} onRetry={() => refetch()} />}

            {data && (
              <>
                {/* Stat Tiles */}
                <div className="mb-3.5 grid grid-cols-2 gap-3.5">
                  {/* Day Streak */}
                  <div className="flex items-center justify-between rounded-2xl border border-white/[0.07] bg-[#12192e]/60 p-3.5 shadow-inner backdrop-blur-md">
                    <div className="flex items-center">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl overflow-hidden border border-white/5 bg-[#172036]/80 p-1 shadow-inner">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/streak-flame-badge.png"
                          alt="Streak flame badge"
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="ml-3">
                        <p className="font-data text-2xl font-bold leading-none text-white tracking-tight">
                          {data.currentStreak}
                        </p>
                        <p className="mt-1 text-xs font-medium text-slate-400">day streak</p>
                      </div>
                    </div>
                    {/* Cyan rising bars */}
                    <div className="flex items-end gap-1 select-none pr-1">
                      <span className="w-1.5 h-2 rounded-full bg-gradient-to-t from-teal-500/40 to-cyan-400/50" />
                      <span className="w-1.5 h-3.5 rounded-full bg-gradient-to-t from-teal-500/60 to-cyan-400/70" />
                      <span className="w-1.5 h-5 rounded-full bg-gradient-to-t from-teal-500 to-cyan-400 drop-shadow-[0_0_4px_rgba(6,182,212,0.5)]" />
                      <span className="w-1.5 h-6.5 rounded-full bg-gradient-to-t from-teal-400 to-cyan-300 drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]" />
                      <span className="w-1.5 h-8 rounded-full bg-gradient-to-t from-teal-300 to-cyan-200 drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
                    </div>
                  </div>

                  {/* Longest Streak */}
                  <div className="flex items-center justify-between rounded-2xl border border-white/[0.07] bg-[#12192e]/60 p-3.5 shadow-inner backdrop-blur-md">
                    <div className="flex items-center">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl overflow-hidden border border-white/5 bg-[#172036]/80 p-1 shadow-inner">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/streak-trophy-badge.png"
                          alt="Longest streak trophy"
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="ml-3">
                        <p className="font-data text-2xl font-bold leading-none text-white tracking-tight">
                          {data.longestStreak}
                        </p>
                        <p className="mt-1 text-xs font-medium text-slate-400">longest streak</p>
                      </div>
                    </div>
                    {/* Purple rising bars */}
                    <div className="flex items-end gap-1 select-none pr-1">
                      <span className="w-1.5 h-2 rounded-full bg-gradient-to-t from-indigo-500/40 to-purple-400/50" />
                      <span className="w-1.5 h-3.5 rounded-full bg-gradient-to-t from-indigo-500/60 to-purple-400/70" />
                      <span className="w-1.5 h-5 rounded-full bg-gradient-to-t from-indigo-500 to-purple-400 drop-shadow-[0_0_4px_rgba(168,85,247,0.5)]" />
                      <span className="w-1.5 h-6.5 rounded-full bg-gradient-to-t from-indigo-400 to-purple-300 drop-shadow-[0_0_6px_rgba(192,132,252,0.7)]" />
                      <span className="w-1.5 h-8 rounded-full bg-gradient-to-t from-indigo-300 to-purple-200 drop-shadow-[0_0_8px_rgba(192,132,252,0.9)]" />
                    </div>
                  </div>
                </div>

                {/* Heatmap Grid */}
                <div className="rounded-2xl border border-white/[0.07] bg-[#0c1122]/70 p-4 sm:p-5 backdrop-blur-md">
                  <StreakHeatmap days={data.heatmap} />
                </div>
              </>
            )}
          </div>

          {/* Right Column (5 cols): 3D Developer Desk Artwork */}
          <div className="hidden lg:flex lg:col-span-5 h-full items-stretch">
            <div className="relative w-full h-full min-h-[300px] rounded-2xl border border-white/10 bg-[#070b16] overflow-hidden shadow-2xl flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/streak-workspace.png"
                alt="Developer Workspace"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
