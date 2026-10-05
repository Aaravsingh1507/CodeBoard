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
    <div className="relative rounded-[28px] border border-[#a855f7]/30 bg-gradient-to-b from-[#0c0f24] via-[#090b1c] to-[#060814] p-5 sm:p-6 shadow-[0_0_35px_rgba(147,51,234,0.18),0_10px_40px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)] flex flex-col justify-between overflow-hidden h-[450px]">
      {/* Top specular highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-b from-indigo-500/25 to-purple-600/20 border border-indigo-400/40 text-indigo-300 flex items-center justify-center shadow-[0_0_18px_rgba(99,102,241,0.35)] shrink-0">
            <Briefcase size={22} className="stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight leading-tight">Company prep focus</h3>
            <p className="text-xs text-[#7c8ba1] mt-0.5">Key topics to strengthen.</p>
          </div>
        </div>

        {/* Companies Body */}
        <div className="mt-3.5 flex-1 space-y-3">
          {loading && !previewData && !data && (
            <div className="space-y-3">
              <Skeleton className="h-16 w-full rounded-xl bg-white/5" />
              <Skeleton className="h-16 w-full rounded-xl bg-white/5" />
            </div>
          )}

          {displayProfiles.slice(0, 3).map((p, idx) => {
            const isAmazon = p.name.toLowerCase().includes("amazon") || idx === 2;
            return (
              <div key={p.name} className="space-y-1">
                <p className="text-sm font-bold text-white tracking-wide">{p.name}</p>
                <div className={`flex flex-wrap gap-1.5 ${isAmazon ? "max-w-[70%]" : ""}`}>
                  {p.focusAreas.map((f) => (
                    <span
                      key={f}
                      className="inline-flex items-center rounded-full border border-purple-500/40 bg-gradient-to-r from-[#2a174e]/90 to-[#1c1842]/90 px-2.5 py-0.5 text-[11px] font-medium text-purple-200 shadow-[0_0_10px_rgba(168,85,247,0.2)] transition-all hover:border-purple-400 hover:brightness-110"
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <p className={`text-[11px] text-[#7c8ba1] leading-relaxed ${isAmazon ? "max-w-[72%]" : ""}`}>
                  {p.note}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Row: Disclaimer & Floating 3D Cubes */}
      <div className="relative mt-2 pt-2 flex items-end justify-between min-h-[50px]">
        <div className="flex items-start gap-1.5 text-[10.5px] text-[#7c8ba1] max-w-[200px] leading-tight z-10 relative">
          <Info size={13} className="text-[#7c8ba1] shrink-0 mt-0.5" />
          <span>General guidance from public prep community knowledge, not official or guaranteed.</span>
        </div>

        {/* Floating 3D Cubes with screen blend mode for seamless edge-free glow */}
        <div className="absolute right-0 bottom-0 w-24 h-36 pointer-events-none select-none overflow-hidden flex items-end justify-end">
          <img
            src="/images/prep/company-cubes.png"
            alt=""
            className="w-full h-full object-contain object-bottom-right mix-blend-screen opacity-95"
          />
        </div>
      </div>
    </div>
  );
}
