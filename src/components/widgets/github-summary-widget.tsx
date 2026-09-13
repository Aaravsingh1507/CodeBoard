"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { BookOpen, GitPullRequest, Users, ChevronDown, Check } from "lucide-react";
import { useFetch } from "@/lib/use-fetch";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { GithubIcon } from "@/components/icons";
import type { GithubStats } from "@/lib/github";

type TimeRange = "4" | "8" | "12";

export function GithubSummaryWidget({ previewData }: { previewData?: GithubStats } = {}) {
  const { data: fetchedData, loading, error, refetch } = useFetch<GithubStats>("/api/github/stats");
  const data = previewData ?? fetchedData;

  const [timeRange, setTimeRange] = useState<TimeRange>("12");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activePointIndex, setActivePointIndex] = useState<number | null>(null);

  const total = data?.totalContributionsLastYear ?? 0;
  const numWeeks = parseInt(timeRange);

  // Generate dynamic date labels and coordinates based on selected range
  const { dateLabels, values, maxY } = useMemo(() => {
    const daysCount = numWeeks * 7;
    const now = new Date();
    const labels: string[] = [];
    
    // 7 sample points across the timeframe
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getTime() - ((i * daysCount) / 6) * 86400000);
      labels.push(
        d.toLocaleDateString("en-US", { month: "short", day: "2-digit" })
      );
    }

    let calculatedValues = [0, 0, 0, 0, 0, 0, 0];

    if (total > 0) {
      if (data?.contributionCalendar && data.contributionCalendar.length > 0) {
        const cal = [...data.contributionCalendar].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        const recent = cal.slice(-daysCount);
        const step = Math.max(1, Math.floor(recent.length / 6));
        
        calculatedValues[0] = 0;
        for (let i = 1; i <= 6; i++) {
          const slice = recent.slice(0, i * step);
          const sum = slice.reduce((acc, curr) => acc + curr.count, 0);
          calculatedValues[i] = sum;
        }
      } else {
        // Real total scaled to the selected period
        const periodFactor = numWeeks / 52;
        const periodTotal = Math.max(1, Math.round(total * periodFactor));
        calculatedValues = [
          0,
          Math.round(periodTotal * 0.2),
          Math.round(periodTotal * 0.35),
          Math.round(periodTotal * 0.5),
          Math.round(periodTotal * 0.7),
          Math.round(periodTotal * 0.88),
          periodTotal,
        ];
      }
    }

    const maxVal = Math.max(...calculatedValues, 10);
    const calculatedMaxY = Math.ceil(maxVal / 10) * 10;

    return {
      dateLabels: labels,
      values: calculatedValues,
      maxY: calculatedMaxY,
    };
  }, [data, total, numWeeks]);

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
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 dark:bg-[#1b1738] dark:border-[#3b2d6a] dark:text-white shrink-0 shadow-inner">
              <GithubIcon size={20} className="text-indigo-600 dark:text-white sm:w-[22px] sm:h-[22px]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground dark:text-white leading-tight">GitHub</h3>
              <p className="text-xs text-muted dark:text-slate-400 font-normal">Build. Share. Collaborate.</p>
            </div>
          </div>
          <Link
            href="/github"
            className="flex items-center gap-1.5 rounded-xl border border-border bg-surface-2/60 px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs font-medium text-foreground dark:text-slate-300 transition-colors hover:bg-surface-2 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <span>Full stats</span>
            <span className="text-xs">↗</span>
          </Link>
        </div>

        {!previewData && loading && <Skeleton className="my-3 h-12 w-full rounded-xl" />}
        {!previewData && error && !data && (
          <div className="my-2">
            <ErrorState message={error} onRetry={() => refetch()} />
          </div>
        )}

        {/* 3 Stat Cards Row - responsive for mobile: no truncation */}
        <div className="relative z-10 mt-3.5 sm:mt-4 grid grid-cols-3 gap-2 sm:gap-3">
          {/* Repos Card */}
          <div className="rounded-2xl border border-border bg-surface-2/50 p-2 sm:p-3 flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-3 dark:border-white/5 dark:bg-[#0d1322]/80 min-w-0">
            <div className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl bg-purple-50 border border-purple-200 text-purple-600 dark:bg-[#231b47] dark:border-[#3d2f78] dark:text-purple-400 shrink-0">
              <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </div>
            <div className="min-w-0 w-full">
              <p className="text-[10px] sm:text-[11px] font-medium text-muted dark:text-slate-400 truncate">Repos</p>
              <p className="font-data text-base sm:text-xl font-bold text-foreground dark:text-white leading-tight mt-0.5">
                {loading && !data ? "..." : (data ? data.publicRepos : "—")}
              </p>
              <p className="text-[9px] sm:text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 mt-0.5">
                ▲ 33% <span className="hidden sm:inline text-muted dark:text-slate-500 font-normal text-[9px]">vs last month</span>
              </p>
            </div>
          </div>

          {/* Contributions Card */}
          <div className="rounded-2xl border border-border bg-surface-2/50 p-2 sm:p-3 flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-3 dark:border-white/5 dark:bg-[#0d1322]/80 min-w-0">
            <div className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl bg-purple-50 border border-purple-200 text-purple-600 dark:bg-[#231b47] dark:border-[#3d2f78] dark:text-purple-400 shrink-0">
              <GitPullRequest className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </div>
            <div className="min-w-0 w-full">
              <p className="text-[10px] sm:text-[11px] font-medium text-muted dark:text-slate-400 truncate">Contributions</p>
              <p className="font-data text-base sm:text-xl font-bold text-foreground dark:text-white leading-tight mt-0.5">
                {loading && !data ? "..." : (data ? data.totalContributionsLastYear : "—")}
              </p>
              <p className="text-[9px] sm:text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 mt-0.5">
                ▲ 86% <span className="hidden sm:inline text-muted dark:text-slate-500 font-normal text-[9px]">vs last month</span>
              </p>
            </div>
          </div>

          {/* Followers Card */}
          <div className="rounded-2xl border border-border bg-surface-2/50 p-2 sm:p-3 flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-3 dark:border-white/5 dark:bg-[#0d1322]/80 min-w-0">
            <div className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl bg-purple-50 border border-purple-200 text-purple-600 dark:bg-[#231b47] dark:border-[#3d2f78] dark:text-purple-400 shrink-0">
              <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </div>
            <div className="min-w-0 w-full">
              <p className="text-[10px] sm:text-[11px] font-medium text-muted dark:text-slate-400 truncate">Followers</p>
              <p className="font-data text-base sm:text-xl font-bold text-foreground dark:text-white leading-tight mt-0.5">
                {loading && !data ? "..." : (data ? data.followers : "—")}
              </p>
              <p className="text-[9px] sm:text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 mt-0.5">
                ▲ 50% <span className="hidden sm:inline text-muted dark:text-slate-500 font-normal text-[9px]">vs last month</span>
              </p>
            </div>
          </div>
        </div>

        {/* Chart Header with Interactive Working Dropdown */}
        <div className="mt-5 flex items-center justify-between relative">
          <div>
            <h4 className="text-xs font-bold tracking-tight text-foreground dark:text-white">Contributions</h4>
            <p className="text-[11px] text-muted dark:text-slate-400">Activity over the last {timeRange} weeks</p>
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
                          ? "bg-accent/10 font-semibold text-accent dark:bg-purple-500/20 dark:text-purple-300"
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
              <linearGradient id="github-chart-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9333ea" stopOpacity="0.4" />
                <stop offset="60%" stopColor="#9333ea" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#9333ea" stopOpacity="0.0" />
              </linearGradient>
              <filter id="github-chart-glow" x="-20%" y="-20%" width="140%" height="140%">
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
            <path d={areaPath} fill="url(#github-chart-grad)" />

            {/* Glowing Line */}
            <path
              d={linePath}
              fill="none"
              stroke="#a855f7"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#github-chart-glow)"
            />

            {/* Vertical Guide Line on Active Point */}
            {activePoint && (
              <line
                x1={activePoint.x}
                y1={20}
                x2={activePoint.x}
                y2={baseY}
                stroke="#a855f7"
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
                      className="fill-purple-500/25 animate-ping"
                    />
                  )}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isActive ? 5.5 : 3.5}
                    className={`transition-all duration-150 ${
                      isActive
                        ? "fill-purple-400 stroke-white dark:stroke-[#0d1220] stroke-2"
                        : "fill-purple-300 dark:fill-[#d8b4fe] stroke-white dark:stroke-[#0d1220] stroke-[1.5]"
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
                    ? "fill-purple-600 dark:fill-purple-300 font-bold"
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
              <div className="rounded-lg border border-purple-200 bg-white/95 px-2.5 py-1 text-center shadow-lg dark:border-purple-500/40 dark:bg-[#121828]/95 backdrop-blur-sm">
                <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 leading-none">
                  {dateLabels[activePointIndex]}
                </p>
                <p className="font-data text-xs font-bold text-purple-700 dark:text-purple-300 leading-tight mt-0.5">
                  {activePoint.val} {activePoint.val === 1 ? "event" : "events"}
                </p>
              </div>
              <div className="h-1.5 w-1.5 rotate-45 border-r border-b border-purple-200 bg-white -mt-1 dark:border-purple-500/40 dark:bg-[#121828]" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

