"use client";

import { useState, useEffect } from "react";
import { Layers, Award, Briefcase, Cpu, Target } from "lucide-react";
import type { MatchCategory } from "@/app/api/matchscope/route";

export function CategoryBreakdown({ categories }: { categories: MatchCategory[] }) {
  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-white flex items-center gap-2">
          <Layers size={17} className="text-[#a78bfa]" />
          Category Breakdown
        </h3>
        <span className="text-xs text-slate-400">4 Dimensions of Match</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <CategoryCard key={i} category={cat} index={i} />
        ))}
      </div>
    </div>
  );
}

function CategoryCard({ category, index }: { category: MatchCategory; index: number }) {
  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedWidth(category.score);
    }, 150 + index * 100);
    return () => clearTimeout(timer);
  }, [category.score, index]);

  const icons = [
    <Award key="0" size={16} className="text-[#a78bfa]" />,
    <Briefcase key="1" size={16} className="text-indigo-400" />,
    <Cpu key="2" size={16} className="text-cyan-400" />,
    <Target key="3" size={16} className="text-emerald-400" />,
  ];

  let barColor = "bg-[#7c3aed]";
  if (category.score >= 85) barColor = "bg-emerald-400";
  else if (category.score >= 70) barColor = "bg-[#8b5cf6]";
  else if (category.score >= 50) barColor = "bg-amber-400";
  else barColor = "bg-rose-500";

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-[#1e2338] bg-[#13131f] p-4.5 shadow-xl transition-all duration-200 hover:border-[#2d334d]">
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0d0d14] border border-[#1e2338]">
              {icons[index % icons.length]}
            </div>
            <h4 className="text-xs font-semibold text-white tracking-tight">{category.name}</h4>
          </div>
          <span className="font-mono text-sm font-bold text-white">{category.score}%</span>
        </div>

        {/* Animated Progress Bar */}
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#0d0d14] border border-[#1e2338] mb-3">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-out ${barColor}`}
            style={{ width: `${animatedWidth}%` }}
          />
        </div>

        <p className="text-[11px] text-slate-400 leading-relaxed">
          {category.comment}
        </p>
      </div>
    </div>
  );
}