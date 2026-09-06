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

          {/* Right Column (5 cols): 3D Laptop Desk Illustration with Floating Card */}
          <div className="relative hidden lg:flex lg:col-span-5 items-center justify-center select-none pt-2">
            {/* Ambient Purple Glow */}
            <div className="pointer-events-none absolute h-40 w-40 rounded-full bg-purple-600/20 blur-2xl" />

            <div className="relative flex items-end gap-3 z-10">
              {/* Potted Plant */}
              <div className="flex flex-col items-center mb-1">
                <svg width="46" height="54" viewBox="0 0 48 58" fill="none" className="drop-shadow-lg">
                  {/* Outer / Back Leaves */}
                  <path d="M24 48 C 14 30, 8 16, 5 7 C 14 13, 21 28, 24 48 Z" fill="#15803d" />
                  <path d="M24 48 C 34 30, 40 16, 43 7 C 34 13, 27 28, 24 48 Z" fill="#166534" />
                  {/* Middle Leaves */}
                  <path d="M24 48 C 16 32, 14 18, 14 4 C 21 15, 23 31, 24 48 Z" fill="#22c55e" />
                  <path d="M24 48 C 32 32, 34 18, 34 4 C 27 15, 25 31, 24 48 Z" fill="#15803d" />
                  {/* Center Fresh Sprout */}
                  <path d="M24 48 C 22 28, 21 12, 24 0 C 27 12, 26 28, 24 48 Z" fill="#4ade80" />
                </svg>
                {/* Ceramic Pot */}
                <div className="h-8 w-11 rounded-b-xl rounded-t-sm bg-gradient-to-b from-slate-100 to-slate-300 shadow-md border-t border-slate-200 flex flex-col items-center justify-center">
                  <div className="h-0.5 w-6 rounded-full bg-slate-400/40" />
                </div>
              </div>

              {/* Laptop & Screen */}
              <div className="relative flex flex-col items-center">
                {/* Laptop Screen */}
                <div className="relative h-28 w-44 rounded-t-xl border-2 border-slate-700 bg-[#0c101c] p-2.5 shadow-2xl overflow-hidden flex flex-col justify-between">
                  {/* Code lines */}
                  <div className="space-y-1.5 z-10">
                    <div className="h-1.5 w-14 rounded-full bg-pink-400/90" />
                    <div className="flex items-center gap-1.5 pl-2">
                      <div className="h-1.5 w-8 rounded-full bg-cyan-400/90" />
                      <div className="h-1.5 w-6 rounded-full bg-indigo-300/80" />
                    </div>
                    <div className="flex items-center gap-1.5 pl-4">
                      <div className="h-1.5 w-12 rounded-full bg-emerald-400/90" />
                    </div>
                    <div className="flex items-center gap-1.5 pl-2">
                      <div className="h-1.5 w-7 rounded-full bg-amber-400/90" />
                      <div className="h-1.5 w-10 rounded-full bg-cyan-300/80" />
                    </div>
                    <div className="h-1.5 w-9 rounded-full bg-purple-400/90" />
                  </div>

                  {/* Large glowing purple </> on screen */}
                  <div className="absolute right-3 top-4 text-purple-400 font-mono text-xl font-bold opacity-80 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">
                    &lt;/&gt;
                  </div>
                </div>

                {/* Laptop Base / Keyboard */}
                <div className="h-2.5 w-52 rounded-b-lg bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 shadow-md border-t border-slate-500 flex items-center justify-center">
                  <div className="h-1 w-10 rounded-full bg-slate-400/60" />
                </div>
              </div>

              {/* Purple Mug with </> */}
              <div className="relative flex flex-col items-center mb-1">
                {/* Steam */}
                <svg width="18" height="14" viewBox="0 0 24 20" fill="none" className="mb-0.5 text-purple-300/60">
                  <path d="M7 16 C 5 11, 9 7, 7 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M14 16 C 12 10, 16 6, 14 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {/* Mug Body */}
                <div className="relative flex h-9 w-10 items-center justify-center rounded-b-md rounded-t-sm bg-gradient-to-br from-indigo-600 to-purple-700 shadow-md">
                  <span className="font-mono text-[9px] font-bold text-white">&lt;/&gt;</span>
                  {/* Mug Handle */}
                  <div className="absolute -right-2 top-1.5 h-5 w-2.5 rounded-r-md border-2 border-l-0 border-purple-500 bg-transparent" />
                </div>
              </div>

              {/* Floating Glassmorphic Badge: Plan, Code, Improve, Repeat */}
              <div className="ml-2 mb-1 flex flex-col gap-1.5 rounded-2xl border border-purple-500/30 bg-[#12162a]/80 p-3 shadow-xl backdrop-blur-md">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                  <span>Plan</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_6px_#60a5fa]" />
                  <span>Code</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_6px_#fbbf24]" />
                  <span>Improve</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <span className="h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_6px_#c084fc]" />
                  <span>Repeat</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
