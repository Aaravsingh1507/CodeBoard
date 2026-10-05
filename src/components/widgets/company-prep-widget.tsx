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
    <div className="relative rounded-[28px] border border-purple-500/40 bg-gradient-to-b from-[#0e1233]/90 via-[#0a0d26]/95 to-[#07091a]/98 p-5 sm:p-6 shadow-[0_0_35px_rgba(168,85,247,0.22),0_12px_44px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.2)] flex flex-col justify-between overflow-hidden h-full">
      {/* Top specular highlight & ambient glow */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent pointer-events-none" />
      <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-56 h-28 bg-purple-600/20 blur-3xl rounded-full pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-500/30 via-indigo-600/25 to-purple-600/20 border border-purple-400/45 text-purple-200 flex items-center justify-center shadow-[0_0_16px_rgba(99,102,241,0.35)] shrink-0">
            <Briefcase size={22} className="stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight leading-tight">Company prep focus</h3>
            <p className="text-xs text-[#94a3b8] mt-0.5">Key topics to strengthen.</p>
          </div>
        </div>

        {/* Companies Body */}
        <div className="mt-4 flex-1 space-y-3">
          {loading && !previewData && !data && (
            <div className="space-y-3">
              <Skeleton className="h-16 w-full rounded-xl bg-white/5" />
              <Skeleton className="h-16 w-full rounded-xl bg-white/5" />
            </div>
          )}

          {displayProfiles.slice(0, 3).map((p) => (
            <div key={p.name} className="space-y-1">
              <p className="text-sm font-bold text-white tracking-wide">{p.name}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.focusAreas.map((f) => (
                  <span
                    key={f}
                    className="inline-flex items-center rounded-full border border-purple-500/35 bg-[#20153f]/80 px-2.5 py-0.5 text-[11px] font-medium text-purple-200 shadow-[0_0_8px_rgba(168,85,247,0.15)] transition-colors hover:border-purple-400 hover:bg-[#2b1950]"
                  >
                    {f}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-[#94a3b8] leading-relaxed">
                {p.note}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer Footer */}
      <div className="mt-4 pt-3 flex items-start gap-1.5 text-[10.5px] text-[#7c8ba1] leading-tight">
        <Info size={13} className="text-[#7c8ba1] shrink-0 mt-0.5" />
        <span>General guidance from public prep community knowledge, not official or guaranteed.</span>
      </div>
    </div>
  );
}
