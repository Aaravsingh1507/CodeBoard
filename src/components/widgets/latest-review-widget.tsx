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
    <div className="relative rounded-[28px] border border-purple-500/25 bg-gradient-to-b from-[#0e122b]/95 via-[#090d22]/95 to-[#060919]/98 p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_20px_rgba(147,51,234,0.12),inset_0_1px_1px_rgba(255,255,255,0.15)] flex flex-col justify-between overflow-hidden h-full min-h-[520px]">
      {/* Top specular highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-b from-purple-500/30 to-indigo-600/20 border border-purple-400/40 text-purple-300 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.35)] shrink-0">
              <Sparkles size={20} className="stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">Latest AI review</h3>
              <p className="text-xs text-slate-400">
                {latest
                  ? `Week of ${formatDate(latest.weekStart)} – ${formatDate(latest.weekEnd)}`
                  : "Weekly summary"}
              </p>
            </div>
          </div>
          <Link
            href="/reviews"
            className="flex items-center gap-1 text-xs text-slate-300 hover:text-white transition-colors shrink-0 font-medium"
          >
            History <ArrowUpRight size={13} />
          </Link>
        </div>

        {/* Review Box */}
        <div className="mt-5 flex-1">
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
            <div className="rounded-2xl border border-white/10 bg-[#121633]/60 backdrop-blur-md p-5 shadow-sm relative overflow-hidden transition-all duration-200 hover:border-purple-500/30">
              {/* Glowing Quote Icon */}
              <div className="text-purple-400 text-3xl font-serif font-black leading-none mb-3 select-none drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
                “
              </div>
              <p className="text-sm text-slate-200 leading-relaxed font-normal">
                {latest.summaryText}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom 3D Graphic */}
      <div className="relative mt-auto -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 h-48 overflow-hidden pointer-events-none select-none">
        <img
          src="/images/prep/review-wave.png"
          alt=""
          className="w-full h-full object-cover object-bottom mix-blend-screen opacity-95 [mask-image:linear-gradient(to_bottom,transparent,black_20%)]"
        />
      </div>
    </div>
  );
}
