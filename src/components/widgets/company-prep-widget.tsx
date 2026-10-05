"use client";

import Link from "next/link";
import { Briefcase, ArrowRight } from "lucide-react";
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

function CompanyLogo({ name }: { name: string }) {
  const n = name.toLowerCase();
  if (n.includes("google")) {
    return (
      <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-sm">
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.15z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.27 21.36 7.36 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.97 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.27 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
          />
        </svg>
      </div>
    );
  }
  if (n.includes("microsoft")) {
    return (
      <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-sm">
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
          <rect x="2" y="2" width="9" height="9" fill="#F25022" />
          <rect x="13" y="2" width="9" height="9" fill="#7FBA00" />
          <rect x="2" y="13" width="9" height="9" fill="#00A4EF" />
          <rect x="13" y="13" width="9" height="9" fill="#FFB900" />
        </svg>
      </div>
    );
  }
  if (n.includes("amazon")) {
    return (
      <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-sm text-[#FF9900] font-black text-sm">
        <span className="font-serif leading-none mt-0.5">a</span>
      </div>
    );
  }
  return (
    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500/25 to-indigo-600/25 border border-purple-400/35 flex items-center justify-center text-xs font-bold text-purple-200 shrink-0 shadow-sm">
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

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
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-500/30 via-indigo-600/25 to-purple-600/20 border border-purple-400/45 text-purple-200 flex items-center justify-center shadow-[0_0_16px_rgba(99,102,241,0.35)] shrink-0">
              <Briefcase size={22} className="stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight leading-tight">Company prep focus</h3>
              <p className="text-xs text-[#94a3b8] mt-0.5">Key topics to strengthen.</p>
            </div>
          </div>
          <Link
            href="/applications"
            className="flex items-center gap-1 text-xs text-[#94a3b8] hover:text-white transition-colors shrink-0 font-medium"
          >
            Track jobs <ArrowRight size={13} />
          </Link>
        </div>

        {/* Companies Body */}
        <div className="mt-4 flex-1 space-y-2.5">
          {loading && !previewData && !data && (
            <div className="space-y-2.5">
              <Skeleton className="h-20 w-full rounded-2xl bg-white/5" />
              <Skeleton className="h-20 w-full rounded-2xl bg-white/5" />
              <Skeleton className="h-20 w-full rounded-2xl bg-white/5" />
            </div>
          )}

          {displayProfiles.slice(0, 3).map((p) => (
            <div
              key={p.name}
              className="rounded-2xl border border-white/10 bg-[#13173a]/75 backdrop-blur-md p-3.5 shadow-sm transition-all duration-200 hover:border-purple-500/40 hover:bg-[#161c46]/85"
            >
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <CompanyLogo name={p.name} />
                  <span className="text-sm font-bold text-white tracking-tight truncate">
                    {p.name}
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-purple-300/80 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20 shrink-0">
                  Top focus
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {p.focusAreas.map((f) => {
                  const cleanLabel = f.replace(/\s*\([^)]*\)/g, "").trim();
                  return (
                    <span
                      key={f}
                      title={f}
                      className="inline-flex items-center rounded-lg border border-purple-500/25 bg-[#20153f]/75 px-2.5 py-1 text-[11px] font-medium text-purple-200 shadow-[0_0_8px_rgba(168,85,247,0.1)] transition-colors hover:border-purple-400 hover:bg-[#2b1950]"
                    >
                      {cleanLabel}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
