"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

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

  if (data.length === 0) return null;
  const total = data.reduce((s, d) => s + d.bytes, 0);

  // Active language details (or fallback to top #1 language)
  const activeItem = activeIndex !== null && data[activeIndex] ? data[activeIndex] : data[0];
  const activePercent = total > 0 ? ((activeItem.bytes / total) * 100).toFixed(1) : "0";

  return (
    <div className="flex h-full w-full flex-col justify-between gap-4">
      {/* Top stacked multi-color language proportion bar */}
      <div className="space-y-1">
        <div className="flex h-2 w-full overflow-hidden rounded-full bg-surface-2">
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
                className={`h-full transition-all duration-200 ${
                  i === 0 ? "rounded-l-full" : ""
                } ${i === data.length - 1 ? "rounded-r-full" : ""} ${
                  isHovered ? "brightness-125 scale-y-125" : "opacity-90 hover:opacity-100"
                }`}
                title={`${d.name}: ${pct.toFixed(1)}%`}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
              />
            );
          })}
        </div>
      </div>

      {/* Main content: Donut chart with center stats on left, rich breakdown on right */}
      <div className="flex flex-1 flex-col items-center justify-between gap-6 sm:flex-row">
        {/* Donut Chart Container */}
        <div className="relative flex h-48 w-48 shrink-0 items-center justify-center sm:h-52 sm:w-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="bytes"
                nameKey="name"
                innerRadius={56}
                outerRadius={78}
                paddingAngle={3}
                stroke="none"
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {data.map((_, i) => (
                  <Cell
                    key={i}
                    fill={COLORS[i % COLORS.length]}
                    className="cursor-pointer transition-opacity duration-200"
                    opacity={activeIndex === null || activeIndex === i ? 1 : 0.35}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [
                  `${((Number(value ?? 0) / total) * 100).toFixed(1)}% (${formatBytes(Number(value ?? 0))})`,
                  name,
                ]}
                contentStyle={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 12,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Callout Overlay */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="max-w-[90px] truncate text-[11px] font-medium text-muted">
              {activeIndex !== null ? activeItem.name : "Top"}
            </span>
            <span className="font-data text-sm font-bold text-foreground sm:text-base">
              {activeIndex !== null ? `${activePercent}%` : activeItem.name}
            </span>
            <span className="font-data text-[10px] text-muted">
              {formatBytes(activeItem.bytes)}
            </span>
          </div>
        </div>

        {/* Breakdown List */}
        <div className="flex w-full flex-1 flex-col justify-center gap-2">
          {data.map((d, i) => {
            const pct = total > 0 ? (d.bytes / total) * 100 : 0;
            const color = COLORS[i % COLORS.length];
            const isHovered = activeIndex === i;

            return (
              <div
                key={d.name}
                className={`group flex flex-col rounded-lg px-2.5 py-1.5 transition-colors cursor-pointer ${
                  isHovered ? "bg-surface-2" : "hover:bg-surface-2/60"
                }`}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full transition-transform group-hover:scale-125"
                      style={{ background: color }}
                    />
                    <span className="font-medium text-foreground truncate">{d.name}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 font-data">
                    <span className="text-[11px] text-muted">{formatBytes(d.bytes)}</span>
                    <span className="font-semibold text-foreground">{pct.toFixed(0)}%</span>
                  </div>
                </div>
                {/* Mini progress bar under each language */}
                <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-surface-2">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: color,
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

