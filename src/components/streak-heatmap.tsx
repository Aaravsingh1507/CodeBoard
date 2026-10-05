"use client";

import React, { useRef, useEffect, useState } from "react";

interface HeatmapDay {
  date: string;
  count: number;
}

function levelFor(count: number) {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

const LEVEL_CLASSES = [
  "bg-slate-100 border border-slate-200/90 dark:bg-[#1a233b] dark:border-slate-600/70",
  "bg-teal-200/90 border border-teal-300 dark:bg-[#0d4f5b] dark:border-[#146b7b]",
  "bg-teal-400 border border-teal-500/80 dark:bg-[#0b7484] dark:border-[#0f9bb0]",
  "bg-teal-500 border border-teal-600 shadow-[0_0_6px_rgba(20,184,166,0.35)] dark:bg-[#06b6d4] dark:border-[#22d3ee] dark:shadow-[0_0_8px_rgba(6,182,212,0.6)]",
  "bg-cyan-400 border border-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.5)] dark:bg-[#22d3ee] dark:border-cyan-100 dark:shadow-[0_0_12px_rgba(34,211,238,0.95)]",
];

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const DAY_LABELS = [
  { label: "Mon", show: true },
  { label: "", show: false },
  { label: "Wed", show: true },
  { label: "", show: false },
  { label: "Fri", show: true },
  { label: "", show: false },
  { label: "", show: false },
];

export function StreakHeatmap({ days }: { days: HeatmapDay[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Auto-scroll to current day (far right) on mount/update so latest streak is seen first
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [days]);

  if (!days || days.length === 0) return null;

  // Align into weeks (columns), Monday-first (Mon=0, Tue=1, ... Sun=6)
  const first = new Date(days[0].date + "T00:00:00Z");
  const leadingBlanks = (first.getUTCDay() + 6) % 7;
  const cells: (HeatmapDay | null)[] = [
    ...Array(leadingBlanks).fill(null),
    ...days,
  ];
  const weeks: (HeatmapDay | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  // Determine where each month starts along the week columns
  const monthLabels: { weekIndex: number; name: string }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    for (const day of week) {
      if (day) {
        const m = new Date(day.date + "T00:00:00Z").getUTCMonth();
        if (m !== lastMonth) {
          monthLabels.push({ weekIndex: wi, name: MONTH_NAMES[m] });
          lastMonth = m;
          break;
        }
      }
    }
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  return (
    <div className="relative select-none w-full min-w-0 max-w-full">
      {/* Grid with Left-side Day Labels & Scrollable Heatmap */}
      <div className="flex items-start gap-2 w-full min-w-0">
        {/* Day of Week Labels (Mon, Wed, Fri) aligned with cell rows */}
        <div className="flex flex-col gap-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400 w-6 shrink-0 pt-6">
          {DAY_LABELS.map((d, i) => (
            <div
              key={i}
              className="h-3 w-6 md:h-3.5 flex items-center leading-none"
            >
              {d.label}
            </div>
          ))}
        </div>

        {/* Scrollable Columns with Visible Sliding Bar */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`overflow-x-auto heatmap-scrollbar min-w-0 flex-1 pb-2 cursor-grab touch-pan-x overscroll-x-contain ${
            isMouseDown ? "cursor-grabbing" : ""
          }`}
          style={{ overscrollBehaviorX: "contain", touchAction: "pan-x" }}
        >
          {/* Synchronized Month labels */}
          <div className="flex gap-1.5 mb-2 h-4 relative">
            {weeks.map((_, wi) => {
              const label = monthLabels.find((m) => m.weekIndex === wi);
              return (
                <div key={wi} className="w-3 md:w-3.5 shrink-0 relative">
                  {label && (
                    <span className="absolute left-0 top-0 text-[11px] font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {label.name}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Heatmap Columns */}
          <div className="flex gap-1.5 animate-fade-in w-max">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1.5 shrink-0">
                {week.map((day, di) =>
                  day ? (
                    <div
                      key={di}
                      title={`${day.date}: ${day.count} activity event${day.count === 1 ? "" : "s"}`}
                      className={`h-3 w-3 md:h-3.5 md:w-3.5 rounded-[3px] transition-all duration-200 hover:scale-125 hover:z-10 ${LEVEL_CLASSES[levelFor(day.count)]}`}
                    />
                  ) : (
                    <div key={di} className="h-3 w-3 md:h-3.5 md:w-3.5" />
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend & Sliding Bar Hint */}
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-[11px] sm:text-xs">Less activity</span>
          <div className="flex items-center gap-1 sm:gap-1.5">
            {LEVEL_CLASSES.map((c, i) => (
              <div key={i} className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-[3px] shrink-0 ${c}`} />
            ))}
          </div>
          <span className="text-[11px] sm:text-xs">More activity</span>
        </div>
        <span className="text-[11px] text-teal-600 dark:text-teal-400/90 font-medium flex items-center gap-1 shrink-0 whitespace-nowrap">
          <span>↔</span> Slide to view full year
        </span>
      </div>
    </div>
  );
}
