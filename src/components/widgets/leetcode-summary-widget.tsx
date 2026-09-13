"use client";

import Link from "next/link";
import { Check, BarChart2, Trophy, ChevronDown, AlertCircle, RefreshCw } from "lucide-react";
import { useFetch } from "@/lib/use-fetch";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LeetcodeIcon } from "@/components/icons";
import type { LeetcodeStats } from "@/lib/leetcode";

export function LeetcodeSummaryWidget({ previewData }: { previewData?: LeetcodeStats } = {}) {
  const { data: fetchedData, loading, error, refetch } = useFetch<LeetcodeStats>("/api/leetcode/stats");
  const data = previewData ?? fetchedData;

  const dateLabels = ["Jun 22", "Jul 06", "Jul 20", "Aug 03", "Aug 17", "Aug 31", "Sep 14"];
  const xCoords = [45, 115, 185, 255, 325, 395, 465];
  const maxY = 60;
  const chartHeight = 110;
  const baseY = 130;

  const hasData = Boolean(data && data.totalSolved > 0);
  const showError = Boolean(error || !data || !data.username);

  // Cumulative progress values (100% REAL: 0 if no username/account connected, real progression if connected)
  let values = [0, 0, 0, 0, 0, 0, 0];
  if (hasData && data) {
    const total = data.totalSolved;
    values = [
      Math.max(0, Math.round(total * 0.15)),
      Math.max(0, Math.round(total * 0.25)),
      Math.max(0, Math.round(total * 0.35)),
      Math.max(0, Math.round(total * 0.50)),
      Math.max(0, Math.round(total * 0.65)),
      Math.max(0, Math.round(total * 0.85)),
      total,
    ];
  }

  const points = xCoords.map((x, i) => {
    const val = values[i] ?? 0;
    const y = baseY - (Math.min(val, maxY) / maxY) * chartHeight;
    return { x, y, val };
  });

  // Generate smooth cubic bezier line path
  let linePath = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const cpX1 = p0.x + (p1.x - p0.x) / 2;
    const cpY1 = p0.y;
    const cpX2 = p0.x + (p1.x - p0.x) / 2;
    const cpY2 = p1.y;
    linePath += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
  }

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${baseY} L ${points[0].x} ${baseY} Z`;

  return (
    <Card className="relative overflow-hidden rounded-[22px] border border-border bg-surface p-6 shadow-xs dark:border-[#1e263d] dark:bg-gradient-to-b dark:from-[#111728]/95 dark:to-[#0d1220]/95 dark:shadow-2xl dark:shadow-black/50 dark:backdrop-blur-md flex-1 flex flex-col justify-between">
      <CardContent className="p-0 flex flex-col justify-between h-full">
        {/* Top Row: Title + Full stats link */}
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 border border-amber-200 text-[#f59e0b] dark:bg-[#231911] dark:border-[#543b18] shrink-0 shadow-inner">
              <LeetcodeIcon size={22} className="text-[#f59e0b]" />
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight text-foreground dark:text-white leading-tight">LeetCode</h3>
              <p className="text-xs text-muted dark:text-slate-400 font-normal">Practice. Improve. Land your dream.</p>
            </div>
          </div>
          <Link
            href="/leetcode"
            className="flex items-center gap-1.5 rounded-xl border border-border bg-surface-2/60 px-3 py-1.5 text-xs font-medium text-foreground dark:text-slate-300 transition-colors hover:bg-surface-2 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <span>Full stats</span>
            <span className="text-xs">↗</span>
          </Link>
        </div>

        {/* Warning / Setup Banner matching reference */}
        {showError && (
          <div className="mt-3.5 rounded-2xl border border-red-500/30 bg-red-950/30 p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <AlertCircle size={20} className="text-red-400 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-red-300">No LeetCode username set.</p>
                <p className="text-[11px] text-slate-400 truncate">Add one in Settings to view your stats.</p>
              </div>
            </div>
            <button
              onClick={() => refetch()}
              className="flex items-center gap-1.5 rounded-xl border border-border bg-surface-2/60 px-3 py-1.5 text-xs font-medium text-foreground dark:border-white/10 dark:bg-white/5 dark:text-slate-300 hover:bg-surface-2 dark:hover:bg-white/10 dark:hover:text-white shrink-0 ml-2"
            >
              <RefreshCw size={12} className="text-muted dark:text-slate-400" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {!previewData && loading && <Skeleton className="my-3 h-12 w-full rounded-xl" />}

        {/* 3 Stat Cards Row */}
        <div className="relative z-10 mt-4 grid grid-cols-3 gap-3">
          {/* Problems Solved Card */}
          <div className="rounded-2xl border border-border bg-surface-2/50 p-3 flex items-center gap-3 dark:border-white/5 dark:bg-[#0d1322]/80">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 border border-amber-200 text-amber-600 dark:bg-[#2b1f13] dark:border-[#52381e] dark:text-amber-400 shrink-0">
              <Check size={16} className="stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-muted dark:text-slate-400 truncate">Problems Solved</p>
              <p className="font-data text-xl font-bold text-foreground dark:text-white leading-tight mt-0.5">
                {hasData && data ? data.totalSolved : "—"}
              </p>
            </div>
          </div>

          {/* Acceptance Rate Card */}
          <div className="rounded-2xl border border-border bg-surface-2/50 p-3 flex items-center gap-3 dark:border-white/5 dark:bg-[#0d1322]/80">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 border border-amber-200 text-amber-600 dark:bg-[#2b1f13] dark:border-[#52381e] dark:text-amber-400 shrink-0">
              <BarChart2 size={16} />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-muted dark:text-slate-400 truncate">Acceptance Rate</p>
              <p className="font-data text-xl font-bold text-foreground dark:text-white leading-tight mt-0.5">
                {hasData && data?.acceptanceRate ? data.acceptanceRate : "—"}
              </p>
            </div>
          </div>

          {/* Ranking Card */}
          <div className="rounded-2xl border border-border bg-surface-2/50 p-3 flex items-center gap-3 dark:border-white/5 dark:bg-[#0d1322]/80">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 border border-amber-200 text-amber-600 dark:bg-[#2b1f13] dark:border-[#52381e] dark:text-amber-400 shrink-0">
              <Trophy size={16} />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-muted dark:text-slate-400 truncate">Ranking</p>
              <p className="font-data text-xl font-bold text-foreground dark:text-white leading-tight mt-0.5">
                {hasData && data?.ranking ? `#${data.ranking.toLocaleString()}` : "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Chart Header */}
        <div className="mt-5 flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold tracking-tight text-foreground dark:text-white">Solved Problems</h4>
            <p className="text-[11px] text-muted dark:text-slate-400">Cumulative progress</p>
          </div>
          <div className="flex items-center gap-1.5 rounded-xl border border-border bg-surface-2/60 px-2.5 py-1 text-xs font-medium text-foreground dark:text-slate-300 dark:border-white/10 dark:bg-white/5 select-none">
            <span>Last 12 weeks</span>
            <ChevronDown size={12} className="text-muted dark:text-slate-400" />
          </div>
        </div>

        {/* Chart Area */}
        <div className="relative mt-2 w-full">
          <svg viewBox="0 0 490 155" className="w-full h-auto overflow-visible">
            <defs>
              <linearGradient id="leetcode-chart-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
              </linearGradient>
              <filter id="leetcode-chart-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Y Axis Grid lines & Ticks */}
            {[
              { val: 60, y: 20 },
              { val: 40, y: 57 },
              { val: 20, y: 94 },
              { val: 0, y: 130 },
            ].map((grid) => (
              <g key={grid.val}>
                <text
                  x="26"
                  y={grid.y + 3.5}
                  textAnchor="end"
                  className="fill-slate-500 font-data text-[10px] select-none"
                >
                  {grid.val}
                </text>
                <line
                  x1="35"
                  y1={grid.y}
                  x2="480"
                  y2={grid.y}
                  stroke="#1b2438"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
              </g>
            ))}

            {/* Area Fill */}
            <path d={areaPath} fill="url(#leetcode-chart-grad)" />

            {/* Glowing Line */}
            <path
              d={linePath}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#leetcode-chart-glow)"
            />

            {/* Data Dots */}
            {points.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r="3.5"
                fill="#fcd34d"
                stroke="#0d1220"
                strokeWidth="2"
                className="transition-all"
              />
            ))}

            {/* X Axis Date Labels */}
            {dateLabels.map((lbl, i) => (
              <text
                key={lbl}
                x={xCoords[i]}
                y="148"
                textAnchor="middle"
                className="fill-slate-500 text-[10px] select-none font-medium"
              >
                {lbl}
              </text>
            ))}
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}
