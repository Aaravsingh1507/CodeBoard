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
  ArrowUpRight,
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
    return <Bot size={22} className="stroke-[2]" />;
  }
  if (
    text.includes("youtube") ||
    text.includes("video") ||
    text.includes("stream") ||
    text.includes("income") ||
    text.includes("channel")
  ) {
    return <Play size={18} className="fill-current stroke-0 ml-0.5" />;
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
    <div className="relative rounded-[28px] border border-[#a855f7]/30 bg-gradient-to-b from-[#0c0f24] via-[#090b1c] to-[#060814] p-5 sm:p-6 shadow-[0_0_35px_rgba(147,51,234,0.18),0_10px_40px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)] flex flex-col justify-between overflow-hidden h-full min-h-[520px]">
      {/* Top specular highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-b from-purple-500/25 to-indigo-600/20 border border-purple-400/40 text-purple-200 flex items-center justify-center shadow-[0_0_18px_rgba(168,85,247,0.35)] shrink-0">
              <Target size={22} className="stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base sm:text-[17px] font-bold text-white tracking-tight leading-tight">Active goals</h3>
              <p className="text-xs text-[#7c8ba1] mt-0.5">Keep building, keep growing.</p>
            </div>
          </div>
          <Link
            href="/goals"
            className="flex items-center gap-1 text-xs text-[#7c8ba1] hover:text-white transition-colors shrink-0 font-medium"
          >
            All goals <ArrowUpRight size={13} />
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
                    className="rounded-2xl border border-white/10 bg-[#121633]/60 backdrop-blur-md p-4 shadow-sm relative overflow-hidden transition-all duration-200 hover:border-purple-500/30 hover:bg-[#161b3d]/70"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-purple-600/30 to-indigo-600/20 border border-purple-400/30 flex items-center justify-center text-purple-200 shrink-0 shadow-[0_0_12px_rgba(168,85,247,0.25)]">
                        {getGoalIcon(g.label, g.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium text-white leading-snug line-clamp-2">
                            {g.label}
                          </p>
                          <span className="text-base font-bold text-purple-400 shrink-0 ml-2 font-mono">
                            {g.current}/{g.target}
                          </span>
                        </div>

                        {/* Glowing Progress Bar */}
                        <div className="w-full h-2 rounded-full bg-[#161d38] overflow-hidden mt-3 p-[1px]">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-400 to-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.8)] transition-all duration-500"
                            style={{ width: `${Math.max(12, percent)}%` }}
                          />
                        </div>

                        {/* Due Date */}
                        <div className="mt-2.5 flex items-center gap-1.5 text-xs text-[#7c8ba1]">
                          <Calendar size={13} className="text-[#7c8ba1] shrink-0" />
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
      <div className="relative mt-auto -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 h-40 overflow-hidden pointer-events-none select-none">
        <img
          src="/images/prep/goals-target.png"
          alt=""
          className="w-full h-full object-cover object-left-bottom mix-blend-screen opacity-95 [mask-image:linear-gradient(to_bottom,transparent,black_20%)]"
        />
      </div>
    </div>
  );
}
