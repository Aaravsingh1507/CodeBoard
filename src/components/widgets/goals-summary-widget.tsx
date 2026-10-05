"use client";

import Link from "next/link";
import {
  Target,
  Bot,
  Play,
  Code2,
  GitCommit,
  Briefcase,
  Calendar,
  Sparkles,
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
  if (text.includes("agent") || text.includes("ai") || text.includes("automate") || text.includes("bot")) {
    return <Bot size={18} className="stroke-[2.2]" />;
  }
  if (
    text.includes("youtube") ||
    text.includes("video") ||
    text.includes("stream") ||
    text.includes("income") ||
    text.includes("channel")
  ) {
    return <Play size={16} className="fill-current ml-0.5 stroke-[2]" />;
  }
  if (text.includes("leetcode") || text.includes("problem") || text.includes("dsa") || text.includes("code")) {
    return <Code2 size={18} className="stroke-[2.2]" />;
  }
  if (text.includes("github") || text.includes("streak") || text.includes("commit") || text.includes("git")) {
    return <GitCommit size={18} className="stroke-[2.2]" />;
  }
  if (text.includes("job") || text.includes("apply") || text.includes("application") || text.includes("interview")) {
    return <Briefcase size={18} className="stroke-[2.2]" />;
  }
  return <Target size={18} className="stroke-[2.2]" />;
}

export function GoalsSummaryWidget({ previewData }: { previewData?: Goal[] } = {}) {
  const { data: fetchedData, loading, error, refetch } = useFetch<Goal[]>("/api/goals");
  const data = previewData ?? fetchedData;
  const active = (data ?? []).filter((g) => g.status === "in_progress").slice(0, 2);

  return (
    <div className="relative rounded-[28px] border border-purple-500/25 bg-gradient-to-b from-[#0e122b]/95 via-[#090d22]/95 to-[#060919]/98 p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_20px_rgba(147,51,234,0.12),inset_0_1px_1px_rgba(255,255,255,0.15)] flex flex-col justify-between overflow-hidden h-full min-h-[520px]">
      {/* Top specular highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-b from-purple-500/30 to-indigo-600/20 border border-purple-400/40 text-purple-300 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.35)] shrink-0">
              <Target size={20} className="stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">Active goals</h3>
              <p className="text-xs text-slate-400">Keep building, keep growing.</p>
            </div>
          </div>
          <Link
            href="/goals"
            className="flex items-center gap-1 text-xs text-slate-300 hover:text-white transition-colors shrink-0 font-medium"
          >
            All goals <span className="text-sm">→</span>
          </Link>
        </div>

        {/* Goals Body */}
        <div className="mt-5 flex-1">
          {loading && !previewData && (
            <div className="space-y-3">
              <Skeleton className="h-24 w-full rounded-2xl bg-white/5" />
              <Skeleton className="h-24 w-full rounded-2xl bg-white/5" />
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

          {active.length > 0 && (
            <div className="space-y-3">
              {active.map((g) => {
                const percent = Math.min(100, Math.max(0, (g.current / g.target) * 100));
                return (
                  <div
                    key={g.id}
                    className="rounded-2xl border border-white/10 bg-[#121633]/60 backdrop-blur-md p-3.5 sm:p-4 shadow-sm relative overflow-hidden transition-all duration-200 hover:border-purple-500/30 hover:bg-[#161b3d]/70"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-purple-500/25 to-indigo-600/15 border border-purple-400/30 flex items-center justify-center text-purple-300 shrink-0 shadow-[0_0_10px_rgba(168,85,247,0.25)]">
                        {getGoalIcon(g.label, g.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium text-slate-100 leading-snug line-clamp-2">
                            {g.label}
                          </p>
                          <span className="text-sm font-semibold text-purple-400 shrink-0 ml-2 font-mono">
                            {g.current}/{g.target}
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-2 rounded-full bg-slate-800/90 overflow-hidden mt-3 p-[1px]">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-400 to-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.7)] transition-all duration-500"
                            style={{ width: `${percent}%` }}
                          />
                        </div>

                        {/* Due Date */}
                        <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-400">
                          <Calendar size={13} className="text-slate-400 shrink-0" />
                          <span>Due {formatDate(g.deadline)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Bottom 3D Graphic */}
      <div className="relative mt-auto -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 h-36 overflow-hidden pointer-events-none select-none">
        <img
          src="/images/prep/goals-target.png"
          alt=""
          className="w-full h-full object-cover object-left-bottom mix-blend-screen opacity-95 [mask-image:linear-gradient(to_bottom,transparent,black_20%)]"
        />
      </div>
    </div>
  );
}
