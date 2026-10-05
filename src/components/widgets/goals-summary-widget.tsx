"use client";

import Link from "next/link";
import {
  Target,
  Bot,
  Code2,
  GitCommit,
  Briefcase,
  Calendar,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useFetch } from "@/lib/use-fetch";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { EmptyState } from "@/components/ui/empty-state";
import { formatDate } from "@/lib/utils";

interface Goal {
  id: string;
  label: string;
  current: number;
  target: number;
  deadline: string;
  status: string;
  type?: string;
}

function getGoalIcon(label: string, type?: string) {
  const text = `${label} ${type ?? ""}`.toLowerCase();
  // Check youtube / video first
  if (
    text.includes("youtube") ||
    text.includes("video") ||
    text.includes("stream") ||
    text.includes("channel")
  ) {
    return (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M21.58 7.19a2.7 2.7 0 0 0-1.9-1.9C18 4.8 12 4.8 12 4.8s-6 0-7.68.49a2.7 2.7 0 0 0-1.9 1.9C2 8.87 2 12 2 12s0 3.13.42 4.81a2.7 2.7 0 0 0 1.9 1.9C6 19.2 12 19.2 12 19.2s6 0 7.68-.49a2.7 2.7 0 0 0 1.9-1.9C22 15.13 22 12 22 12s0-3.13-.42-4.81zM10 15.5V8.5l6 3.5-6 3.5z" />
      </svg>
    );
  }
  if (text.includes("agent") || text.includes("ai") || text.includes("automate") || text.includes("bot")) {
    return <Bot size={22} className="stroke-[2]" />;
  }
  if (text.includes("leetcode") || text.includes("problem") || text.includes("dsa") || text.includes("code")) {
    return <Code2 size={22} className="stroke-[2]" />;
  }
  if (text.includes("github") || text.includes("streak") || text.includes("commit") || text.includes("git")) {
    return <GitCommit size={22} className="stroke-[2]" />;
  }
  if (text.includes("job") || text.includes("apply") || text.includes("application") || text.includes("interview")) {
    return <Briefcase size={22} className="stroke-[2]" />;
  }
  return <Target size={22} className="stroke-[2]" />;
}

export function GoalsSummaryWidget({ previewData }: { previewData?: Goal[] } = {}) {
  const { data: fetchedData, loading, error, refetch } = useFetch<Goal[]>("/api/goals");
  const data = previewData ?? fetchedData;
  const active = (data ?? []).filter((g) => g.status === "in_progress").slice(0, 2);

  return (
    <div className="relative rounded-[28px] border border-purple-500/40 bg-gradient-to-b from-[#0e1233]/90 via-[#0a0d26]/95 to-[#07091a]/98 p-5 sm:p-6 shadow-[0_0_35px_rgba(168,85,247,0.22),0_12px_44px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.2)] flex flex-col justify-between overflow-hidden min-h-[520px] h-full">
      {/* Top specular highlight & ambient glow */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent pointer-events-none" />
      <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-56 h-28 bg-purple-600/20 blur-3xl rounded-full pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-500/30 via-indigo-600/25 to-purple-600/20 border border-purple-400/45 text-purple-200 flex items-center justify-center shadow-[0_0_16px_rgba(168,85,247,0.35)] shrink-0">
              <Target size={22} className="stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight leading-tight">Active goals</h3>
              <p className="text-xs text-[#94a3b8] mt-0.5">Keep building, keep growing.</p>
            </div>
          </div>
          <Link
            href="/goals"
            className="flex items-center gap-1 text-xs text-[#94a3b8] hover:text-white transition-colors shrink-0 font-medium"
          >
            All goals <ArrowRight size={13} />
          </Link>
        </div>

        {/* Goals Body */}
        <div className="mt-4 space-y-3">
          {loading && !previewData && (
            <div className="space-y-3">
              <Skeleton className="h-20 w-full rounded-2xl bg-white/5" />
              <Skeleton className="h-20 w-full rounded-2xl bg-white/5" />
            </div>
          )}

          {error && <ErrorState message={error} onRetry={() => refetch()} />}

          {data && active.length === 0 && (
            <EmptyState
              icon={<Sparkles size={20} />}
              title="No active goals"
              description="Set a target to track your progress automatically."
            />
          )}

          {active.length > 0 &&
            active.map((g) => {
              const percent = g.target > 0 ? Math.min(100, Math.max(0, (g.current / g.target) * 100)) : 0;
              return (
                <div
                  key={g.id}
                  className="rounded-2xl border border-white/10 bg-[#13173a]/75 backdrop-blur-md p-4 shadow-sm relative overflow-hidden transition-all duration-200 hover:border-purple-500/40 hover:bg-[#161c46]/85"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-purple-600/30 to-indigo-600/20 border border-purple-400/35 flex items-center justify-center text-purple-200 shrink-0 shadow-[0_0_12px_rgba(168,85,247,0.25)]">
                      {getGoalIcon(g.label, g.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs sm:text-[13px] font-medium text-white leading-snug">
                          {g.label}
                        </p>
                        <span className="text-sm font-bold text-purple-400 shrink-0 ml-2 font-mono">
                          {g.current}/{g.target}
                        </span>
                      </div>

                      {/* Progress Bar: ONLY shown if there is progress (> 0). If 0 progress, nothing is shown! */}
                      {percent > 0 && (
                        <div className="w-full h-1.5 rounded-full bg-[#181d3d] overflow-hidden mt-3">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.85)] transition-all duration-500"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      )}

                      {/* Due Date */}
                      <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-[#94a3b8]">
                        <Calendar size={12} className="text-[#94a3b8] shrink-0" />
                        <span>Due {formatDate(g.deadline)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Bottom 3D Graphic */}
      <div className="relative mt-auto -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 h-44 overflow-hidden pointer-events-none select-none">
        <img
          src="/images/prep/goals-target.png"
          alt=""
          className="w-full h-full object-cover object-left-bottom mix-blend-screen opacity-95"
        />
      </div>
    </div>
  );
}
