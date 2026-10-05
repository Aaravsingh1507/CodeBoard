"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useFetch } from "@/lib/use-fetch";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { formatDate } from "@/lib/utils";

interface Review {
  weekStart: string;
  weekEnd: string;
  summaryText: string;
}

export function LatestReviewWidget({ previewData }: { previewData?: Review } = {}) {
  const { data, loading } = useFetch<Review[]>("/api/reviews");
  const latest = previewData ?? data?.[0];

  return (
    <div className="relative rounded-[28px] border border-purple-500/40 bg-gradient-to-b from-[#0e1233]/90 via-[#0a0d26]/95 to-[#07091a]/98 p-5 sm:p-6 shadow-[0_0_35px_rgba(168,85,247,0.22),0_12px_44px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.2)] flex flex-col justify-between overflow-hidden h-full">
      {/* Top specular highlight & ambient glow */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent pointer-events-none" />
      <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-56 h-28 bg-purple-600/20 blur-3xl rounded-full pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500/30 via-purple-600/25 to-purple-500/20 border border-purple-400/45 text-purple-200 flex items-center justify-center shadow-[0_0_16px_rgba(168,85,247,0.35)] shrink-0">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C12.3 6.8 15.2 9.7 20 10C15.2 10.3 12.3 13.2 12 18C11.7 13.2 8.8 10.3 4 10C8.8 9.7 11.7 6.8 12 2Z" />
                <circle cx="5" r="1.5" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight leading-tight">Latest AI review</h3>
              <p className="text-xs text-[#94a3b8] mt-0.5">
                {latest
                  ? `Week of ${formatDate(latest.weekStart)} – ${formatDate(latest.weekEnd)}`
                  : "Weekly summary"}
              </p>
            </div>
          </div>
          <Link
            href="/reviews"
            className="flex items-center gap-1 text-xs text-[#94a3b8] hover:text-white transition-colors shrink-0 font-medium"
          >
            History <ArrowUpRight size={13} />
          </Link>
        </div>

        {/* Review Box */}
        <div className="mt-4 flex-1">
          {loading && !previewData && (
            <Skeleton className="h-44 w-full rounded-2xl bg-white/5" />
          )}

          {!loading && !latest && (
            <EmptyState
              icon={<Sparkles size={20} />}
              title="No reviews yet"
              description="Generate your first weekly review from the Reviews page."
            />
          )}

          {latest && (
            <div className="rounded-2xl border border-white/10 bg-[#13173a]/75 backdrop-blur-md p-5 shadow-sm relative overflow-hidden transition-all duration-200 hover:border-purple-500/40 hover:bg-[#161c46]/85">
              {/* Glowing Quote Icon */}
              <div className="text-purple-400 text-3xl font-serif font-black leading-none mb-3 select-none drop-shadow-[0_0_10px_rgba(168,85,247,0.7)]">
                “
              </div>
              <p className="text-xs sm:text-[13px] text-slate-200 leading-relaxed font-normal">
                {latest.summaryText}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
