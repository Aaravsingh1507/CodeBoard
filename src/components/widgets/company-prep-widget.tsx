"use client";

import { Briefcase, Info } from "lucide-react";
import { useFetch } from "@/lib/use-fetch";
import { Skeleton } from "@/components/ui/skeleton";
import { COMPANY_PREP, type CompanyPrepProfile } from "@/lib/company-prep";

interface Profile {
  name: string;
  focusAreas: string[];
  note: string;
}

const DEFAULT_COMPANIES: CompanyPrepProfile[] = [
  COMPANY_PREP.find((c) => c.name === "Google") ?? COMPANY_PREP[1],
  COMPANY_PREP.find((c) => c.name === "Microsoft") ?? COMPANY_PREP[2],
  COMPANY_PREP.find((c) => c.name === "Amazon") ?? COMPANY_PREP[0],
].filter(Boolean);

export function CompanyPrepWidget({ previewData }: { previewData?: Profile[] } = {}) {
  const { data, loading } = useFetch<Profile[]>("/api/company-prep");
  const displayProfiles = previewData ?? (data && data.length > 0 ? data : DEFAULT_COMPANIES);

  return (
    <div className="relative rounded-[28px] border border-purple-500/25 bg-gradient-to-b from-[#0e122b]/95 via-[#090d22]/95 to-[#060919]/98 p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_20px_rgba(147,51,234,0.12),inset_0_1px_1px_rgba(255,255,255,0.15)] flex flex-col justify-between overflow-hidden h-full min-h-[520px]">
      {/* Top specular highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-b from-indigo-500/30 to-purple-600/20 border border-indigo-400/40 text-indigo-300 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.35)] shrink-0">
            <Briefcase size={20} className="stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">Company prep focus</h3>
            <p className="text-xs text-slate-400">Key topics to strengthen.</p>
          </div>
        </div>

        {/* Companies Body */}
        <div className="mt-5 flex-1 space-y-4">
          {loading && !previewData && !data && (
            <div className="space-y-4">
              <Skeleton className="h-16 w-full rounded-xl bg-white/5" />
              <Skeleton className="h-16 w-full rounded-xl bg-white/5" />
            </div>
          )}

          {displayProfiles.slice(0, 3).map((p) => (
            <div key={p.name} className="space-y-1.5">
              <p className="text-sm font-bold text-white tracking-wide">{p.name}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.focusAreas.map((f) => (
                  <span
                    key={f}
                    className="inline-flex items-center rounded-full border border-purple-500/35 bg-[#21143d]/80 px-3 py-1 text-xs font-medium text-purple-200 shadow-[0_0_8px_rgba(168,85,247,0.15)] transition-colors hover:border-purple-400 hover:bg-[#2b1950]"
                  >
                    {f}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed pt-0.5">{p.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row: Disclaimer & Floating 3D Cubes */}
      <div className="relative mt-5 pt-3 flex items-end justify-between min-h-[60px]">
        <div className="flex items-start gap-1.5 text-[11px] text-slate-400 max-w-[210px] leading-tight z-10 relative">
          <Info size={14} className="text-slate-400 shrink-0 mt-0.5" />
          <span>General guidance from public prep community knowledge, not official or guaranteed.</span>
        </div>

        {/* Floating 3D Cubes */}
        <div className="absolute -right-3 -bottom-4 w-28 h-28 pointer-events-none select-none overflow-hidden">
          <img
            src="/images/prep/company-cubes.png"
            alt=""
            className="w-full h-full object-contain mix-blend-screen opacity-95"
          />
        </div>
      </div>
    </div>
  );
}
