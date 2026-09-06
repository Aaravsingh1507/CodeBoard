"use client";

import { Calendar, Lightbulb, BarChart2, Flag, ChevronRight, Info } from "lucide-react";
import Link from "next/link";
import { useFetch } from "@/lib/use-fetch";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";

interface Readiness {
  score: number;
  breakdown: { label: string; score: number; max: number; detail: string }[];
  focusArea: string;
  nudges: string[];
}

function scoreLabel(score: number) {
  if (score >= 85) return "Strong shape";
  if (score >= 65) return "On track";
  if (score >= 40) return "Building momentum";
  return "Just getting started";
}

export function ReadinessWidget({ previewData }: { previewData?: Readiness } = {}) {
  const { data: fetchedData, loading, error, refetch } = useFetch<Readiness>("/api/readiness");
  const data = previewData ?? fetchedData;

  if (!previewData && loading) return <Skeleton className="h-52 w-full rounded-2xl" />;
  if (!previewData && error && !data) return <ErrorState message={error} onRetry={() => refetch()} />;
  if (!data) return null;

  const radius = 52;
  const stroke = 11;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (data.score / 100) * circumference;

  const defaultNudge =
    data.nudges.length > 0
      ? data.nudges[0]
      : "Your streak reset — your best was 1 days. Today's a good day to restart it.";

  const categories = [
    {
      label: "Consistency",
      score: data.breakdown[0]?.score ?? 0,
      max: data.breakdown[0]?.max ?? 25,
      icon: Calendar,
      iconColor: "text-purple-400",
      barColor: "bg-purple-500",
    },
    {
      label: "Problem-solving",
      score: data.breakdown[1]?.score ?? 0,
      max: data.breakdown[1]?.max ?? 25,
      icon: Lightbulb,
      iconColor: "text-amber-400",
      barColor: "bg-amber-500",
    },
    {
      label: "Job-search momentum",
      score: data.breakdown[2]?.score ?? 0,
      max: data.breakdown[2]?.max ?? 25,
      icon: BarChart2,
      iconColor: "text-blue-400",
      barColor: "bg-blue-500",
    },
    {
      label: "Goal follow-through",
      score: data.breakdown[3]?.score ?? 0,
      max: data.breakdown[3]?.max ?? 25,
      icon: Flag,
      iconColor: "text-emerald-400",
      barColor: "bg-emerald-400",
    },
  ];

  return (
    <Card className="rounded-[22px] border border-[#1e263d] bg-gradient-to-b from-[#111728]/95 to-[#0d1220]/95 p-0 shadow-2xl shadow-black/50 backdrop-blur-md">
      <CardContent className="p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Left section: Donut gauge with floating sparkles matching reference */}
          <div className="relative mx-auto flex flex-col items-center shrink-0 lg:mx-0">
            {/* Sparkling star accents */}
            <span className="absolute -left-2 top-2 text-xs text-purple-400/90 animate-pulse select-none">✦</span>
            <span className="absolute -right-1.5 top-1 text-sm text-pink-400/95 select-none">✦</span>

            <div className="relative flex h-32 w-32 items-center justify-center">
              <svg height={128} width={128} className="-rotate-90">
                <defs>
                  <linearGradient id="readinessGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="40%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#f43f5e" />
                  </linearGradient>
                </defs>
                <circle
                  stroke="#161c2d"
                  fill="transparent"
                  strokeWidth={stroke}
                  r={normalizedRadius}
                  cx={64}
                  cy={64}
                />
                <circle
                  stroke="url(#readinessGradient)"
                  fill="transparent"
                  strokeWidth={stroke}
                  strokeDasharray={`${circumference} ${circumference}`}
                  style={{
                    strokeDashoffset,
                    filter: "drop-shadow(0 0 8px rgba(244, 63, 94, 0.75))",
                  }}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                  r={normalizedRadius}
                  cx={64}
                  cy={64}
                />
              </svg>

              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="font-data text-3xl font-extrabold text-white leading-none">
                  {data.score}
                </span>
                <span className="text-[11px] font-medium text-slate-400 mt-1">/ 100</span>
              </div>
            </div>

            {/* Getting Started / Tier Pill */}
            <div className="mt-1.5 rounded-full border border-purple-500/30 bg-purple-950/70 px-3.5 py-0.5 text-[11px] font-medium text-purple-300 shadow-sm shadow-purple-900/40">
              {data.score < 40 ? "Getting Started" : scoreLabel(data.score)}
            </div>
          </div>

          {/* Middle section: Titles + 4 Metrics */}
          <div className="flex-1 min-w-0">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">
                Readiness score —{" "}
                <span className="text-purple-400 font-bold">{scoreLabel(data.score)}</span>
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                Focus area right now:{" "}
                <span className="font-semibold text-purple-400">{data.focusArea}</span>
              </p>
            </div>

            {/* 4 Categories */}
            <div className="mt-4 grid grid-cols-2 gap-3.5 sm:grid-cols-4">
              {categories.map((c) => {
                const Icon = c.icon;
                const pct = Math.min(100, Math.max(0, (c.score / c.max) * 100));

                return (
                  <div key={c.label} className="flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs mb-1.5 gap-1.5">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Icon size={13} className={`${c.iconColor} shrink-0`} />
                        <span className="whitespace-nowrap text-[11px] xl:text-xs font-medium text-slate-300">
                          {c.label}
                        </span>
                      </div>
                      <span className="font-data text-xs font-bold text-white shrink-0">
                        {c.score}/{c.max}
                      </span>
                    </div>

                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#182033]">
                      <div
                        className={`h-full rounded-full ${c.barColor} transition-all duration-700`}
                        style={{
                          width: `${Math.max(pct, 5)}%`,
                          minWidth: "10px",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Section: Small steps / Big progress Capsule Button */}
          <div className="flex shrink-0 items-center justify-end">
            <Link
              href="/goals"
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 transition-all hover:bg-white/10 hover:border-purple-500/30"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500/20 text-rose-400">
                🎯
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-white leading-tight">Small steps</span>
                <span className="text-[11px] text-slate-400 leading-tight">Big progress</span>
              </div>
              <ChevronRight size={14} className="text-slate-400 ml-1" />
            </Link>
          </div>
        </div>

        {/* Bottom Alert Row */}
        <div className="mt-5 flex items-center gap-2 pt-3 border-t border-border/40 text-xs text-slate-400">
          <Info size={14} className="text-amber-400 shrink-0" />
          <span>{defaultNudge}</span>
        </div>
      </CardContent>
    </Card>
  );
}
