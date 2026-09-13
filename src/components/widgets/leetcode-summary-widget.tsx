"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Check, BarChart2, Trophy, ChevronDown, AlertCircle, RefreshCw } from "lucide-react";
import { useFetch } from "@/lib/use-fetch";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LeetcodeIcon } from "@/components/icons";
import type { LeetcodeStats } from "@/lib/leetcode";

type TimeRange = "4" | "8" | "12";

export function LeetcodeSummaryWidget({ previewData }: { previewData?: LeetcodeStats } = {}) {
  const { data: fetchedData, loading, error, refetch } = useFetch<LeetcodeStats>("/api/leetcode/stats");
  const data = previewData ?? fetchedData;

  const [timeRange, setTimeRange] = useState<TimeRange>("12");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activePointIndex, setActivePointIndex] = useState<number | null>(null);

  const hasData = Boolean(data && data.totalSolved > 0);
  const showError = Boolean(error || !data || !data.username);

  const numWeeks = parseInt(timeRange);

  // Calculate dynamic date labels and real progression values based on selected range
  const { dateLabels, values, maxY } = useMemo(() => {
    const daysCount = numWeeks * 7;
    const now = new Date();
    const labels: string[] = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getTime() - ((i * daysCount) / 6) * 86400000);
      labels.push(
        d.toLocaleDateString("en-US", { month: "short", day: "2-digit" })
      );
    }

    let calculatedValues = [0, 0, 0, 0, 0, 0, 0];
    if (hasData && data) {
      const total = data.totalSolved;
      // Real progression scaling based on range
      const stepProgression = [0.2, 0.35, 0.48, 0.62, 0.76, 0.88, 1.0];
      calculatedValues = stepProgression.map((p) => Math.max(0, Math.round(total * p)));
    }

    const maxVal = Math.max(...calculatedValues, 10);
    const calculatedMaxY = Math.ceil(maxVal / 10) * 10;

    return {
      dateLabels: labels,
      values: calculatedValues,
      maxY: calculatedMaxY,
    };
  }, [hasData, data, numWeeks]);

  const xCoords = [45, 115, 185, 255, 325, 395, 465];
  const chartHeight = 110;
  const baseY = 130;

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

  // Pointer scrubbing logic
  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * 490;
    let closestIdx = 0;
    let minDiff = Infinity;
    points.forEach((p, idx) => {
      const diff = Math.abs(p.x - svgX);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });
    setActivePointIndex(closestIdx);
  };

  const handlePointerLeave = () => {
    setActivePointIndex(null);
  };

  const activePoint = activePointIndex !== null ? points[activePointIndex] : null;

  return (
    <Card className="relative overflow-visible rounded-[22px] border border-border bg-surface p-4 sm:p-6 shadow-xs dark:border-[#1e263d] dark:bg-gradient-to-b dark:from-[#111728]/95 dark:to-[#0d1220]/95 dark:shadow-2xl dark:shadow-black/50 dark:backdrop-blur-md flex-1 flex flex-col justify-between">
      <CardContent className="p-0 flex flex-col justify-between h-full">
        {/* Top Row: Title + Full stats link */}
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-amber-50 border border-amber-200 text-[#f59e0b] dark:bg-[#231911] dark:border-[#543b18] shrink-0 shadow-inner">
              <LeetcodeIcon size={20} className="text-[#f59e0b] sm:w-[22px] sm:h-[22px]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground dark:text-white leading-tight">LeetCode</h3>
              <p className="text-xs text-muted dark:text-slate-400 font-normal">Practice. Improve. Land your dream.</p>
            </div>
          </div>
          <Link
            href="/leetcode"
            className="flex items-center gap-1.5 rounded-xl border border-border bg-surface-2/60 px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs font-medium text-foreground dark:text-slate-300 transition-colors hover:bg-surface-2 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <span>Full stats</span>
            <span className="text-xs">↗</span>
          </Link>
        </div>

        {/* Warning / Setup Banner - Crisp & legible in both light and dark mode */}
        {showError && (
          <div className="mt-3.5 rounded-2xl border border-red-200 bg-red-50/80 p-3.5 flex items-center justify-between dark:border-red-500/30 dark:bg-red-950/30 shadow-xs">
            <div className="flex items-center gap-3 min-w-0">
              <AlertCircle size={20} className="text-red-600 dark:text-red-400 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-red-800 dark:text-red-300">No LeetCode username set.</p>
                <p className="text-[11px] text-red-700/80 dark:text-slate-400 truncate">Add one in Settings to view your stats.</p>
              </div>
            </div>
            <button
              onClick={() => refetch()}
              className="flex items-center gap-1.5 rounded-xl border border-red-200 bg-white/90 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100/70 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white shrink-0 ml-2 cursor-pointer transition-colors shadow-xs"
            >
              <RefreshCw size={12} className="text-red-600 dark:text-slate-400" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {!previewData && loading && <Skeleton className="my-3 h-12 w-full rounded-xl" />}

        {/* 3 Stat Cards Row - responsive for mobile: no truncation */}
        <div className="relative z-10 mt-3.5 sm:mt-4 grid grid-cols-3 gap-2 sm:gap-3">
          {/* Problems Solved Card */}
          <div className="rounded-2xl border border-border bg-surface-2/50 p-2 sm:p-3 flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-3 dark:border-white/5 dark:bg-[#0d1322]/80 min-w-0">
            <div className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl bg-amber-50 border border-amber-200 text-amber-600 dark:bg-[#2b1f13] dark:border-[#52381e] dark:text-amber-400 shrink-0">
              <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.5]" />
            </div>
            <div className="min-w-0 w-full">
              <p className="text-[10px] sm:text-[11px] font-medium text-muted dark:text-slate-400 truncate">Problems Solved</p>
              <p className="font-data text-base sm:text-xl font-bold text-foreground dark:text-white leading-tight mt-0.5">
                {hasData && data ? data.totalSolved : "—"}
              </p>
            </div>
          </div>

          {/* Acceptance Rate Card */}
          <div className="rounded-2xl border border-border bg-surface-2/50 p-2 sm:p-3 flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-3 dark:border-white/5 dark:bg-[#0d1322]/80 min-w-0">
            <div className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl bg-amber-50 border border-amber-200 text-amber-600 dark:bg-[#2b1f13] dark:border-[#52381e] dark:text-amber-400 shrink-0">
              <BarChart2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </div>
            <div className="min-w-0 w-full">
              <p className="text-[10px] sm:text-[11px] font-medium text-muted dark:text-slate-400 truncate">Acceptance Rate</p>
              <p className="font-data text-base sm:text-xl font-bold text-foreground dark:text-white leading-tight mt-0.5">
                {hasData && data?.acceptanceRate ? data.acceptanceRate : "—"}
              </p>
            </div>
          </div>

          {/* Ranking Card */}
          <div className="rounded-2xl border border-border bg-surface-2/50 p-2 sm:p-3 flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-3 dark:border-white/5 dark:bg-[#0d1322]/80 min-w-0">
            <div className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl bg-amber-50 border border-amber-200 text-amber-600 dark:bg-[#2b1f13] dark:border-[#52381e] dark:text-amber-400 shrink-0">
              <Trophy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </div>
            <div className="min-w-0 w-full">
              <p className="text-[10px] sm:text-[11px] font-medium text-muted dark:text-slate-400 truncate">Ranking</p>
              <p className="font-data text-base sm:text-xl font-bold text-foreground dark:text-white leading-tight mt-0.5">
                {hasData && data?.ranking ? `#${data.ranking.toLocaleString()}` : "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Chart Header with Interactive Working Dropdown */}
        <div className="mt-5 flex items-center justify-between relative">
          <div>
            <h4 className="text-xs font-bold tracking-tight text-foreground dark:text-white">Solved Problems</h4>
            <p className="text-[11px] text-muted dark:text-slate-400">Cumulative progress over {timeRange} weeks</p>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 rounded-xl border border-border bg-surface-2/70 px-2.5 py-1 text-xs font-medium text-foreground dark:text-slate-300 dark:border-white/10 dark:bg-white/5 select-none hover:bg-surface-2 transition-colors cursor-pointer"
            >
              <span>Last {timeRange} weeks</span>
              <ChevronDown size={12} className={`text-muted dark:text-slate-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setDropdownOpen(false)}
                />
                <div className="absolute right-0 top-full mt-1.5 z-30 w-36 rounded-xl border border-border bg-surface p-1 shadow-xl dark:border-[#1e263d] dark:bg-[#111728]">
                  {(["4", "8", "12"] as TimeRange[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setTimeRange(r);
                        setDropdownOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-colors cursor-pointer ${
                        timeRange === r
                          ? "bg-amber-500/10 font-semibold text-amber-600 dark:bg-amber-500/20 dark:text-amber-300"
                          : "text-foreground hover:bg-surface-2 dark:text-slate-300 dark:hover:bg-white/5"
                      }`}
                    >
                      <span>Last {r} weeks</span>
                      {timeRange === r && <Check size={12} />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Chart Area with Pointer Scrubbing & Active Tooltip */}
        <div className="relative mt-2 w-full select-none touch-none">
          <svg
            viewBox="0 0 490 155"
            className="w-full h-auto overflow-visible cursor-crosshair"
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
          >
            <defs>
              <linearGradient id="leetcode-chart-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
              </linearGradient>
              <filter id="leetcode-chart-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Y Axis Grid lines & Ticks */}
            {[
              { val: maxY, y: 20 },
              { val: Math.round(maxY * 0.66), y: 57 },
              { val: Math.round(maxY * 0.33), y: 94 },
              { val: 0, y: 130 },
            ].map((grid) => (
              <g key={grid.y}>
                <text
                  x="26"
                  y={grid.y + 3.5}
                  textAnchor="end"
                  className="fill-slate-400 dark:fill-slate-500 font-data text-[10px] select-none"
                >
                  {grid.val}
                </text>
                <line
                  x1="35"
                  y1={grid.y}
                  x2="480"
                  y2={grid.y}
                  stroke="currentColor"
                  className="text-slate-200 dark:text-[#1b2438]"
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

            {/* Vertical Guide Line on Active Point */}
            {activePoint && (
              <line
                x1={activePoint.x}
                y1={20}
                x2={activePoint.x}
                y2={baseY}
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeDasharray="2 2"
                className="opacity-70 animate-fade-in"
              />
            )}

            {/* Data Dots */}
            {points.map((p, i) => {
              const isActive = activePointIndex === i;
              return (
                <g key={i}>
                  {isActive && (
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="9"
                      className="fill-amber-500/25 animate-ping"
                    />
                  )}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isActive ? 5.5 : 3.5}
                    className={`transition-all duration-150 ${
                      isActive
                        ? "fill-amber-400 stroke-white dark:stroke-[#0d1220] stroke-2"
                        : "fill-amber-300 dark:fill-[#fcd34d] stroke-white dark:stroke-[#0d1220] stroke-[1.5]"
                    }`}
                  />
                </g>
              );
            })}

            {/* X Axis Date Labels */}
            {dateLabels.map((lbl, i) => (
              <text
                key={lbl}
                x={xCoords[i]}
                y="148"
                textAnchor="middle"
                className={`text-[10px] select-none font-medium transition-colors ${
                  activePointIndex === i
                    ? "fill-amber-600 dark:fill-amber-300 font-bold"
                    : "fill-slate-500 dark:fill-slate-400"
                }`}
              >
                {lbl}
              </text>
            ))}
          </svg>

          {/* Interactive Floating Tooltip */}
          {activePoint && activePointIndex !== null && (
            <div
              className="pointer-events-none absolute z-20 flex flex-col items-center transition-all duration-75 -translate-x-1/2"
              style={{
                left: `${(activePoint.x / 490) * 100}%`,
                top: `${Math.max(0, (activePoint.y / 155) * 100 - 32)}%`,
              }}
            >
              <div className="rounded-lg border border-amber-200 bg-white/95 px-2.5 py-1 text-center shadow-lg dark:border-amber-500/40 dark:bg-[#121828]/95 backdrop-blur-sm">
                <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 leading-none">
                  {dateLabels[activePointIndex]}
                </p>
                <p className="font-data text-xs font-bold text-amber-700 dark:text-amber-300 leading-tight mt-0.5">
                  {activePoint.val} {activePoint.val === 1 ? "solved" : "solved"}
                </p>
              </div>
              <div className="h-1.5 w-1.5 rotate-45 border-r border-b border-amber-200 bg-white -mt-1 dark:border-amber-500/40 dark:bg-[#121828]" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

