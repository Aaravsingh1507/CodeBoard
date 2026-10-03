"use client";

import { useState } from "react";
import { Cpu, CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import type { MatchKeyword } from "@/app/api/matchscope/route";

export function KeywordChips({ keywords }: { keywords: MatchKeyword[] }) {
  const [filter, setFilter] = useState<"all" | "match" | "partial" | "miss">("all");

  const matchCount = keywords.filter((k) => k.status === "match").length;
  const partialCount = keywords.filter((k) => k.status === "partial").length;
  const missCount = keywords.filter((k) => k.status === "miss").length;

  const filtered = keywords.filter((k) => {
    if (filter === "all") return true;
    return k.status === filter;
  });

  return (
    <div className="rounded-2xl border border-[#1e2338] bg-[#13131f] p-6 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1f243b]">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Cpu size={17} className="text-[#a78bfa]" />
            Keyword Analysis
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Extracted {keywords.length} core competencies & tech requirements from Job Description
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-1 bg-[#0d0d14] p-1 rounded-xl border border-[#1e2338] text-xs">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              filter === "all"
                ? "bg-[#7c3aed] text-white font-medium"
                : "text-slate-400 hover:text-white"
            }`}
          >
            All ({keywords.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("match")}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              filter === "match"
                ? "bg-emerald-600 text-white font-medium"
                : "text-slate-400 hover:text-emerald-400"
            }`}
          >
            Match ({matchCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter("partial")}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              filter === "partial"
                ? "bg-amber-600 text-white font-medium"
                : "text-slate-400 hover:text-amber-400"
            }`}
          >
            Partial ({partialCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter("miss")}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              filter === "miss"
                ? "bg-rose-600 text-white font-medium"
                : "text-slate-400 hover:text-rose-400"
            }`}
          >
            Miss ({missCount})
          </button>
        </div>
      </div>

      {/* Chips Container */}
      <div className="flex flex-wrap gap-2 pt-1">
        {filtered.map((kw, idx) => (
          <Chip key={idx} keyword={kw} />
        ))}
        {filtered.length === 0 && (
          <p className="text-xs text-slate-500 py-3">No keywords in this category.</p>
        )}
      </div>

      {/* Classification Legend */}
      <div className="pt-3 border-t border-[#1f243b] flex flex-wrap items-center gap-5 text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 size={13} className="text-emerald-400" />
          <span>Match: Explicitly validated in resume</span>
        </span>
        <span className="flex items-center gap-1.5">
          <AlertCircle size={13} className="text-amber-400" />
          <span>Partial: Implied or adjacent (e.g., PostgreSQL vs SQL)</span>
        </span>
        <span className="flex items-center gap-1.5">
          <XCircle size={13} className="text-rose-400" />
          <span>Miss: Missing from resume text</span>
        </span>
      </div>
    </div>
  );
}

function Chip({ keyword }: { keyword: MatchKeyword }) {
  if (keyword.status === "match") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-950/30 px-3 py-1.5 text-xs font-medium text-emerald-300 transition-all hover:border-emerald-500/60 shadow-xs">
        <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
        <span>{keyword.word}</span>
      </span>
    );
  }

  if (keyword.status === "partial") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-950/30 px-3 py-1.5 text-xs font-medium text-amber-300 transition-all hover:border-amber-500/60 shadow-xs">
        <AlertCircle size={13} className="text-amber-400 shrink-0" />
        <span>{keyword.word}</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-950/30 px-3 py-1.5 text-xs font-medium text-rose-300 transition-all hover:border-rose-500/60 shadow-xs">
      <XCircle size={13} className="text-rose-400 shrink-0" />
      <span>{keyword.word}</span>
    </span>
  );
}