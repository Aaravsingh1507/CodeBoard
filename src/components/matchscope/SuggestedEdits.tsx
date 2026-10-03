"use client";

import { useState } from "react";
import { Sparkles, Copy, Check } from "lucide-react";
import type { MatchSuggestion } from "@/app/api/matchscope/route";

export function SuggestedEdits({ suggestions }: { suggestions: MatchSuggestion[] }) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  function copyEdit(text: string, idx: number) {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1800);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Sparkles size={17} className="text-[#a78bfa]" />
            Suggested Resume Edits
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Actionable edits ranked by priority, referencing your actual resume content
          </p>
        </div>
        <span className="text-xs font-mono text-[#a78bfa] bg-[#7c3aed]/10 px-2.5 py-1 rounded-lg border border-[#7c3aed]/25">
          {suggestions.length} Targeted Edits
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suggestions.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-between rounded-2xl border border-[#1e2338] bg-[#13131f] p-5 shadow-xl transition-all duration-200 hover:border-[#2d334d]"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <PriorityBadge priority={item.priority} />
                <button
                  type="button"
                  onClick={() => copyEdit(`${item.title}\n${item.description}`, index)}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer px-2 py-1 rounded border border-[#1e2338] hover:border-[#7c3aed]/40 bg-[#0d0d14]"
                  title="Copy edit text"
                >
                  {copiedIndex === index ? (
                    <>
                      <Check size={12} className="text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <h4 className="text-sm font-semibold text-white leading-snug">
                {item.title}
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed">
                {item.description}
              </p>

              {item.context && (
                <div className="rounded-xl border border-[#1e2338] bg-[#0d0d14] p-3 text-[11px]">
                  <span className="text-slate-500 font-medium block mb-1">Target Resume Section / Bullet:</span>
                  <p className="font-mono text-slate-400 italic">
                    &ldquo;{item.context}&rdquo;
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PriorityBadge({ priority }: { priority: MatchSuggestion["priority"] }) {
  if (priority === "high") {
    return (
      <span className="inline-flex items-center gap-1 rounded-md border border-rose-500/30 bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-400">
        <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
        High Priority
      </span>
    );
  }

  if (priority === "medium") {
    return (
      <span className="inline-flex items-center gap-1 rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-400">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
        Medium Priority
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-400">
      <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
      Low Priority
    </span>
  );
}