"use client";

import { useState, useEffect } from "react";

export function ScoreRing({
  score,
  label,
  summary,
}: {
  score: number;
  label: string;
  summary: string;
}) {
  const radius = 66;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const progress = Math.min(100, Math.max(0, score));
    const targetOffset = circumference - (progress / 100) * circumference;
    const timer = setTimeout(() => {
      setOffset(targetOffset);
    }, 120);
    return () => clearTimeout(timer);
  }, [score, circumference]);

  let ringColor = "#8b5cf6";
  if (score >= 85) ringColor = "#10b981";
  else if (score >= 70) ringColor = "#7c3aed";
  else if (score >= 50) ringColor = "#f59e0b";
  else ringColor = "#ef4444";

  return (
    <div className="rounded-2xl border border-[#1e2338] bg-gradient-to-b from-[#13131f] to-[#0d0d14] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-[#7c3aed]/12 blur-[100px]" />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-7 md:gap-9">
        {/* SVG Circular Animated Progress */}
        <div className="relative flex shrink-0 items-center justify-center">
          <svg className="h-44 w-44 -rotate-90 transform" viewBox="0 0 170 170">
            <circle
              cx="85"
              cy="85"
              r={radius}
              stroke="#181c30"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            <circle
              cx="85"
              cy="85"
              r={radius}
              stroke={ringColor}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              fill="transparent"
              style={{
                transition: "stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1)",
                filter: `drop-shadow(0 0 10px ${ringColor}90)`,
              }}
            />
          </svg>

          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-mono">
              {score}
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-0.5">
              Match Score
            </span>
          </div>
        </div>

        {/* Assessment & 2-Line Summary */}
        <div className="flex-1 space-y-3 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
              Alignment Status
            </span>
            <FitBadge label={label} score={score} />
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {label === "Excellent Fit" && "Outstanding Fit — Strong Candidate Profile"}
            {label === "Strong Fit" && "High Alignment — Competitive for Technical Interview"}
            {label === "Good Fit" && "Solid Base Alignment — Key Gaps to Address"}
            {label === "Moderate Fit" && "Moderate Alignment — Targeted Resume Edits Needed"}
            {label === "Poor Fit" && "Low Role Alignment — Substantial Gap in Requirements"}
          </h3>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            {summary}
          </p>
        </div>
      </div>
    </div>
  );
}

function FitBadge({ label, score }: { label: string; score: number }) {
  let style = "bg-purple-500/15 text-purple-300 border-purple-500/30";
  if (label === "Excellent Fit" || score >= 90) {
    style = "bg-emerald-500/15 text-emerald-300 border-emerald-500/40";
  } else if (label === "Strong Fit" || score >= 75) {
    style = "bg-[#7c3aed]/20 text-[#c4b5fd] border-[#7c3aed]/40";
  } else if (label === "Good Fit" || score >= 60) {
    style = "bg-blue-500/15 text-blue-300 border-blue-500/40";
  } else if (label === "Moderate Fit" || score >= 45) {
    style = "bg-amber-500/15 text-amber-300 border-amber-500/40";
  } else {
    style = "bg-rose-500/15 text-rose-300 border-rose-500/40";
  }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-0.5 text-xs font-semibold ${style}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}