"use client";

import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = [
  "#8b7bff", // violet (accent)
  "#2dd4bf", // teal (accent-2)
  "#f0b94f", // amber (warn)
  "#f0708a", // rose (danger)
  "#5b8def", // blue
  "#a78bfa", // lavender
  "#38bdf8", // sky
  "#34d399", // emerald
];

export function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  if (bytes >= 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${bytes} B`;
}

export function LanguageDonut({
  data,
}: {
  data: { name: string; bytes: number }[];
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger mount animation after first render
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  if (data.length === 0) return null;
  const total = data.reduce((s, d) => s + d.bytes, 0);

  // Active language details (or fallback to top #1 language)
  const activeItem = activeIndex !== null && data[activeIndex] ? data[activeIndex] : data[0];
  const activePercent = total > 0 ? ((activeItem.bytes / total) * 100).toFixed(1) : "0";

  return (
    <div className="flex h-full w-full flex-col justify-between gap-3">
      {/* Top stacked multi-color language proportion bar */}
      <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-surface-2 p-0.5">
        {data.map((d, i) => {
          const pct = total > 0 ? (d.bytes / total) * 100 : 0;
          const color = COLORS[i % COLORS.length];
          const isHovered = activeIndex === i;
          return (
            <div
              key={d.name}
              style={{
                width: `${pct}%`,
                backgroundColor: color,
              }}
              className={`h-full transition-all duration-200 cursor-pointer ${
                i === 0 ? "rounded-l-full" : ""
              } ${i === data.length - 1 ? "rounded-r-full" : ""} ${
                isHovered ? "brightness-125 scale-y-125" : "opacity-90 hover:opacity-100"
              }`}
              title={`${d.name}: ${pct.toFixed(1)}%`}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
              onTouchStart={() => setActiveIndex(i)}
              onTouchEnd={() => setActiveIndex(null)}
            />
          );
        })}
      </div>

      {/* Main content: Left large donut chart, Right language cards filling full height */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center flex-1 py-1">
        {/* Large Donut Chart on Left (6 cols for significantly larger diameter) */}
        <div
          className={`sm:col-span-6 relative flex items-center justify-center h-60 sm:h-72 w-full ${
            mounted ? "animate-donut-reveal" : "opacity-0"
          }`}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="bytes"
                nameKey="name"
                innerRadius="64%"
                outerRadius="92%"
                paddingAngle={3}
                stroke="none"
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                animationBegin={200}
                animationDuration={800}
                animationEasing="ease-out"
              >
                {data.map((_, i) => (
                  <Cell
                    key={i}
                    fill={COLORS[i % COLORS.length]}
                    className="cursor-pointer"
                    style={{
                      opacity: activeIndex === null || activeIndex === i ? 1 : 0.35,
                      transition: "opacity 0.2s ease, transform 0.2s ease",
                      filter: activeIndex === i ? "brightness(1.15)" : "none",
                    }}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Callout Overlay — generous space inside enlarged inner hole */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center px-2">
            <span
              key={activeItem.name}
              className="animate-fade-in max-w-[130px] sm:max-w-[150px] truncate text-[10px] sm:text-xs font-semibold text-muted uppercase tracking-wider"
            >
              {activeIndex !== null ? activeItem.name : "Top"}
            </span>
            <span
              key={`${activeItem.name}-val`}
              className="animate-fade-in font-data text-sm sm:text-base font-bold text-foreground leading-tight truncate max-w-[130px] sm:max-w-[150px]"
            >
              {activeIndex !== null ? `${activePercent}%` : activeItem.name}
            </span>
            <span className="font-data text-[10px] sm:text-xs text-muted">
              {formatBytes(activeItem.bytes)}
            </span>
          </div>
        </div>

        {/* Breakdown List on Right (6 cols) */}
        <div className="sm:col-span-6 flex flex-col justify-center gap-2 h-full w-full">
          {data.map((d, i) => {
            const pct = total > 0 ? (d.bytes / total) * 100 : 0;
            const color = COLORS[i % COLORS.length];
            const isHovered = activeIndex === i;
            const delayClass = `delay-${Math.min(i + 1, 8)}`;

            return (
              <div
                key={d.name}
                className={`group flex flex-col rounded-lg px-3 py-2 transition-all duration-200 cursor-pointer border ${
                  mounted ? `animate-slide-up ${delayClass}` : "opacity-0"
                } ${
                  isHovered
                    ? "bg-surface-2 border-border/80 shadow-xs scale-[1.02]"
                    : "bg-surface-2/40 border-transparent hover:bg-surface-2/80 hover:border-border/40"
                }`}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
                onTouchStart={() => setActiveIndex(i)}
                onTouchEnd={() => setActiveIndex(null)}
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full transition-transform duration-200 group-hover:scale-125"
                      style={{ background: color }}
                    />
                    <span className="font-medium text-foreground truncate">{d.name}</span>
                  </div>
                  <div className="flex items-center gap-2.5 shrink-0 font-data">
                    <span className="text-[11px] text-muted">{formatBytes(d.bytes)}</span>
                    <span className="font-semibold text-foreground">{pct.toFixed(0)}%</span>
                  </div>
                </div>
                {/* Mini progress bar under each language */}
                <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-surface">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      mounted ? "animate-progress-grow" : ""
                    }`}
                    style={{
                      width: `${pct}%`,
                      backgroundColor: color,
                      animationDelay: `${(i + 1) * 100 + 300}ms`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
