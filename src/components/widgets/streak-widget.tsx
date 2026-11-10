"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { useFetch } from "@/lib/use-fetch";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";
import Image from "next/image";
import { StreakHeatmap } from "@/components/streak-heatmap";
import { DeveloperClock } from "@/components/widgets/developer-clock";

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
    <Card className="overflow-hidden min-w-0 max-w-full rounded-[24px] border border-neutral-800/80 dark:border-neutral-800/80 bg-black dark:bg-black p-0 shadow-2xl shadow-black dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] md:backdrop-blur-md">
      <CardContent className="p-4 sm:p-6 lg:p-7 min-w-0 bg-black dark:bg-black">
        <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-12 items-stretch min-w-0">
          {/* Left Column (7 cols): Header, Stat Tiles, Heatmap */}
          <div className="lg:col-span-7 flex flex-col justify-between min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between gap-2 pb-3 min-w-0">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/streak-flame-clean.png"
                  alt="Coding streak flame"
                  className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 object-contain drop-shadow-[0_0_10px_rgba(249,115,22,0.6)]"
                />
                <div className="min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white dark:text-white leading-tight">
                    Coding streak
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-400 font-normal leading-tight truncate">
                    Keep showing up. Every commit counts.
                  </p>
                </div>
              </div>
              <button
                onClick={syncNow}
                disabled={syncing}
                className="inline-flex shrink-0 items-center gap-1.5 sm:gap-2 rounded-full border border-neutral-800 bg-[#0e1320] px-3 py-1.5 sm:px-4 text-xs font-medium text-slate-300 transition-all hover:bg-[#141b2d] hover:border-neutral-700 hover:text-white dark:border-neutral-800 dark:bg-[#0e1320] dark:text-slate-300 dark:hover:bg-[#141b2d] dark:hover:border-neutral-700 dark:hover:text-white disabled:opacity-50 shadow-md shadow-black/80 dark:shadow-[0_4px_14px_rgba(0,0,0,0.7)] cursor-pointer"
              >
                <RefreshCw size={13} className={syncing ? "animate-spin text-teal-400" : "text-slate-400"} />
                <span>Sync today</span>
              </button>
            </div>

            {!previewData && loading && <Skeleton className="h-44 w-full rounded-2xl bg-neutral-900" />}
            {!previewData && error && <ErrorState message={error} onRetry={() => refetch()} />}

            {data && (
              <>
                {/* Stat Tiles - formatted so text doesn't awkwardly stack on mobile */}
                <div className="mb-3.5 grid grid-cols-2 gap-2 sm:gap-3.5 min-w-0">
                  {/* Day Streak */}
                  <div className="flex items-center justify-between rounded-xl sm:rounded-2xl border border-neutral-800/80 bg-[#0c101b] p-2.5 sm:p-3.5 shadow-xl shadow-black/90 dark:border-neutral-800/80 dark:bg-[#0c101b] dark:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.85),0_4px_12px_rgba(0,0,0,0.6)] md:backdrop-blur-md min-w-0 transition-shadow">
                    <div className="flex items-center min-w-0">
                      <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl overflow-hidden border border-orange-500/40 bg-gradient-to-b from-[#1f130a] to-[#0c0804] p-1 shadow-lg shadow-black/80 dark:border-orange-500/40 dark:bg-gradient-to-b dark:from-[#1f130a] dark:to-[#0c0804] dark:shadow-[0_0_18px_rgba(249,115,22,0.35),0_4px_14px_rgba(0,0,0,0.8)]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/streak-flame-clean.png"
                          alt="Streak flame badge"
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="ml-2.5 sm:ml-3 min-w-0 flex flex-col justify-center">
                        <p className="font-data text-xl sm:text-2xl font-bold leading-none text-white dark:text-white tracking-tight">
                          {data.currentStreak}
                        </p>
                        <p className="mt-1 text-[11px] sm:text-xs font-medium text-slate-400 dark:text-slate-400 whitespace-nowrap truncate leading-none">
                          day streak
                        </p>
                      </div>
                    </div>
                    {/* Cyan rising bars */}
                    <div className="flex items-end gap-0.5 sm:gap-1 select-none shrink-0 pl-1 pr-0.5 sm:pr-1">
                      <span className="w-1 sm:w-1.5 h-2 rounded-full bg-gradient-to-t from-teal-500/40 to-cyan-400/50" />
                      <span className="w-1 sm:w-1.5 h-3 sm:h-3.5 rounded-full bg-gradient-to-t from-teal-500/60 to-cyan-400/70" />
                      <span className="w-1 sm:w-1.5 h-4 sm:h-5 rounded-full bg-gradient-to-t from-teal-500 to-cyan-400 drop-shadow-[0_0_4px_rgba(6,182,212,0.5)]" />
                      <span className="w-1 sm:w-1.5 h-5 sm:h-6.5 rounded-full bg-gradient-to-t from-teal-400 to-cyan-300 drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]" />
                      <span className="w-1 sm:w-1.5 h-6.5 sm:h-8 rounded-full bg-gradient-to-t from-teal-300 to-cyan-200 drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
                    </div>
                  </div>

                  {/* Longest Streak */}
                  <div className="flex items-center justify-between rounded-xl sm:rounded-2xl border border-neutral-800/80 bg-[#0c101b] p-2.5 sm:p-3.5 shadow-xl shadow-black/90 dark:border-neutral-800/80 dark:bg-[#0c101b] dark:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.85),0_4px_12px_rgba(0,0,0,0.6)] md:backdrop-blur-md min-w-0 transition-shadow">
                    <div className="flex items-center min-w-0">
                      <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl overflow-hidden border border-amber-500/40 bg-gradient-to-b from-[#1c1407] to-[#0b0803] p-1 shadow-lg shadow-black/80 dark:border-amber-500/40 dark:bg-gradient-to-b dark:from-[#1c1407] dark:to-[#0b0803] dark:shadow-[0_0_18px_rgba(245,158,11,0.35),0_4px_14px_rgba(0,0,0,0.8)]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/streak-trophy-clean.png"
                          alt="Longest streak trophy"
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="ml-2.5 sm:ml-3 min-w-0 flex flex-col justify-center">
                        <p className="font-data text-xl sm:text-2xl font-bold leading-none text-white dark:text-white tracking-tight">
                          {data.longestStreak}
                        </p>
                        <p className="mt-1 text-[11px] sm:text-xs font-medium text-slate-400 dark:text-slate-400 whitespace-nowrap truncate leading-none">
                          longest streak
                        </p>
                      </div>
                    </div>
                    {/* Purple rising bars */}
                    <div className="flex items-end gap-0.5 sm:gap-1 select-none shrink-0 pl-1 pr-0.5 sm:pr-1">
                      <span className="w-1 sm:w-1.5 h-2 rounded-full bg-gradient-to-t from-indigo-500/40 to-purple-400/50" />
                      <span className="w-1 sm:w-1.5 h-3 sm:h-3.5 rounded-full bg-gradient-to-t from-indigo-500/60 to-purple-400/70" />
                      <span className="w-1 sm:w-1.5 h-4 sm:h-5 rounded-full bg-gradient-to-t from-indigo-500 to-purple-400 drop-shadow-[0_0_4px_rgba(168,85,247,0.5)]" />
                      <span className="w-1 sm:w-1.5 h-5 sm:h-6.5 rounded-full bg-gradient-to-t from-indigo-400 to-purple-300 drop-shadow-[0_0_6px_rgba(192,132,252,0.7)]" />
                      <span className="w-1 sm:w-1.5 h-6.5 sm:h-8 rounded-full bg-gradient-to-t from-indigo-300 to-purple-200 drop-shadow-[0_0_8px_rgba(192,132,252,0.9)]" />
                    </div>
                  </div>
                </div>

                {/* Heatmap Grid */}
                <div className="rounded-2xl border border-neutral-800/80 bg-[#090d16] p-3 sm:p-5 md:backdrop-blur-md min-w-0 overflow-hidden shadow-2xl shadow-black/95 dark:border-neutral-800/80 dark:bg-[#090d16] dark:shadow-[0_16px_40px_-6px_rgba(0,0,0,0.95),0_6px_16px_rgba(0,0,0,0.8)]">
                  <StreakHeatmap days={data.heatmap} />
                </div>
              </>
            )}
          </div>

          {/* Right Column (5 cols): Real-Time Glassmorphic Developer Clock */}
          <div className="hidden lg:flex lg:col-span-5 h-full items-stretch">
            <DeveloperClock />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
