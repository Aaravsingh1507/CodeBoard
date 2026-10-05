"use client";

import { useState, useEffect } from "react";

export interface LanguageItem {
  name: string;
  bytes: number;
  color?: string;
}

export function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  if (bytes >= 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${bytes} B`;
}

// Visual palette tailored to modern languages matching Image 1
const DEFAULT_PALETTE: Record<string, { color: string; gradient: [string, string]; glow: string; text: string }> = {
  TypeScript: {
    color: "#a855f7",
    gradient: ["#7c3aed", "#c084fc"],
    glow: "rgba(168, 85, 247, 0.4)",
    text: "text-purple-400",
  },
  CSS: {
    color: "#06b6d4",
    gradient: ["#0891b2", "#22d3ee"],
    glow: "rgba(6, 182, 212, 0.4)",
    text: "text-cyan-400",
  },
  JavaScript: {
    color: "#f59e0b",
    gradient: ["#d97706", "#fbbf24"],
    glow: "rgba(245, 158, 11, 0.4)",
    text: "text-amber-400",
  },
  HTML: {
    color: "#f43f5e",
    gradient: ["#e11d48", "#fb7185"],
    glow: "rgba(244, 63, 94, 0.4)",
    text: "text-rose-400",
  },
  Python: {
    color: "#3b82f6",
    gradient: ["#2563eb", "#60a5fa"],
    glow: "rgba(59, 130, 246, 0.4)",
    text: "text-blue-400",
  },
  default: {
    color: "#8b5cf6",
    gradient: ["#6366f1", "#a78bfa"],
    glow: "rgba(139, 92, 246, 0.4)",
    text: "text-indigo-400",
  },
};

function getLanguageMeta(name: string, index: number) {
  if (DEFAULT_PALETTE[name]) return DEFAULT_PALETTE[name];
  const keys = Object.keys(DEFAULT_PALETTE).filter((k) => k !== "default");
  const fallback = DEFAULT_PALETTE[keys[index % keys.length]] || DEFAULT_PALETTE.default;
  return fallback;
}

// Compact Neon File Badge for Language Pill Card
function NeonFileBadge({ name, color }: { name: string; color: string }) {
  let symbol = "</>";
  const lower = name.toLowerCase();
  if (lower.includes("typescript")) symbol = "TS";
  else if (lower.includes("css")) symbol = "{}";
  else if (lower.includes("javascript")) symbol = "JS";
  else if (lower.includes("html")) symbol = "</>";
  else if (lower.includes("python")) symbol = "PY";
  else if (lower.includes("rust")) symbol = "RS";
  else if (lower.includes("go")) symbol = "GO";
  else if (name.length <= 3) symbol = name.toUpperCase();
  else symbol = name.slice(0, 2).toUpperCase();

  return (
    <div
      className="relative flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg border transition-transform duration-200 group-hover:scale-105"
      style={{
        borderColor: `${color}99`,
        backgroundColor: `${color}18`,
        boxShadow: `0 0 10px ${color}25, inset 0 0 6px ${color}15`,
      }}
    >
      {/* File silhouette SVG */}
      <svg
        className="absolute inset-0 h-full w-full p-1 opacity-35"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 5C6 3.89543 6.89543 3 8 3H19L26 10V27C26 28.1046 25.1046 29 24 29H8C6.89543 29 6 28.1046 6 27V5Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19 3V10H26"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className="relative z-10 font-data text-[11px] sm:text-xs font-bold tracking-tight"
        style={{
          color,
          textShadow: `0 0 6px ${color}`,
        }}
      >
        {symbol}
      </span>
    </div>
  );
}

// Convert Polar to Cartesian coordinates
function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

// Construct SVG Arc Slice for 3D Donut
function describeArc(
  cx: number,
  cy: number,
  rIn: number,
  rOut: number,
  startAngle: number,
  endAngle: number
) {
  const startOut = polarToCartesian(cx, cy, rOut, startAngle);
  const endOut = polarToCartesian(cx, cy, rOut, endAngle);
  const startIn = polarToCartesian(cx, cy, rIn, endAngle);
  const endIn = polarToCartesian(cx, cy, rIn, startAngle);
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  return [
    `M ${startOut.x} ${startOut.y}`,
    `A ${rOut} ${rOut} 0 ${largeArcFlag} 1 ${endOut.x} ${endOut.y}`,
    `L ${startIn.x} ${startIn.y}`,
    `A ${rIn} ${rIn} 0 ${largeArcFlag} 0 ${endIn.x} ${endIn.y}`,
    "Z",
  ].join(" ");
}

export function TopLanguagesCard({
  data,
  repoCount = 0,
  className = "",
}: {
  data: LanguageItem[];
  repoCount?: number;
  className?: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  if (!data || data.length === 0) {
    return (
      <div
        className={`relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-b from-[#0c1322]/95 via-[#080d1a]/95 to-[#050813]/98 p-5 text-center backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)] flex flex-col justify-between h-full ${className}`}
      >
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">Top languages</h2>
          <p className="mt-0.5 text-xs text-slate-400 italic">Languages used across your repositories</p>
        </div>
        <div className="py-16 text-sm text-slate-400">No language data available yet.</div>
      </div>
    );
  }

  const total = data.reduce((s, d) => s + d.bytes, 0);

  // Compute angles for each slice (starting at -115 deg to match Image 1's orientation)
  let currentAngle = -115;
  const gapAngle = data.length > 1 ? 2.5 : 0;
  const totalGap = gapAngle * data.length;
  const availableDegrees = 360 - totalGap;

  const slices = data.map((d, i) => {
    const pct = total > 0 ? (d.bytes / total) * 100 : 0;
    const sliceSpan = (pct / 100) * availableDegrees;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceSpan;
    const midAngle = startAngle + sliceSpan / 2;
    currentAngle = endAngle + gapAngle;

    const meta = getLanguageMeta(d.name, i);
    return {
      ...d,
      pct,
      startAngle,
      endAngle,
      midAngle,
      meta,
    };
  });

  const activeItem = activeIndex !== null && slices[activeIndex] ? slices[activeIndex] : null;

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-[#0c1322]/95 via-[#080d1a]/95 to-[#050813]/98 p-4 sm:p-5 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-xl transition-all flex flex-col justify-between h-full ${className}`}
    >
      {/* Top ambient color glow */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-48 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -top-24 right-1/4 h-48 w-80 rounded-full bg-purple-500/10 blur-3xl" />

      {/* Top specular edge reflection */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      {/* Card Header (Clean with scribble/badge removed) */}
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
            Top languages
          </h2>
          <p className="text-xs text-slate-300 font-serif italic tracking-wide">
            Languages used across your repositories
          </p>
        </div>
      </div>

      {/* Card Body: Left Large Donut Circle + Right Compact Language Pills */}
      <div className="relative z-10 mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center flex-1">
        {/* Left Column: Large 3D Donut Circle (Restored to Large Diameter) */}
        <div className="sm:col-span-6 flex items-center justify-center relative h-52 sm:h-60 w-full min-w-0">
          <div
            className={`w-full max-w-[240px] h-full flex items-center justify-center relative transition-all duration-700 ${
              mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <svg
              viewBox="0 0 240 240"
              className="w-full h-full max-h-[230px] overflow-visible select-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* SVG Gradients for each slice */}
                {slices.map((slice, i) => (
                  <linearGradient
                    key={`grad-${i}`}
                    id={`slice-grad-${i}`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor={slice.meta.gradient[1]} />
                    <stop offset="100%" stopColor={slice.meta.gradient[0]} />
                  </linearGradient>
                ))}

                {/* Glossy top reflection gradient */}
                <linearGradient id="gloss-overlay" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>

                {/* Neon glow filter */}
                <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Ambient Glow behind donut */}
              <circle
                cx="120"
                cy="120"
                r="86"
                fill="none"
                stroke="url(#slice-grad-0)"
                strokeWidth="12"
                opacity="0.22"
                filter="url(#neon-glow)"
              />

              {/* Donut Slices - Large & Prominent */}
              <g className="cursor-pointer">
                {slices.map((slice, i) => {
                  const isHovered = activeIndex === i;
                  const isDimmed = activeIndex !== null && activeIndex !== i;
                  // Large radius: rIn=68, rOut=104 (fits large 208px diameter circle!)
                  const path = describeArc(120, 120, 68, 104, slice.startAngle, slice.endAngle);

                  return (
                    <path
                      key={slice.name}
                      d={path}
                      fill={`url(#slice-grad-${i})`}
                      stroke="rgba(255, 255, 255, 0.22)"
                      strokeWidth="1"
                      className="transition-all duration-300"
                      style={{
                        opacity: isDimmed ? 0.35 : 1,
                        filter: isHovered
                          ? `drop-shadow(0 0 14px ${slice.meta.color}) brightness(1.2)`
                          : `drop-shadow(0 3px 8px rgba(0,0,0,0.5))`,
                        transformOrigin: "120px 120px",
                        transform: isHovered ? "scale(1.04)" : "scale(1)",
                      }}
                      onMouseEnter={() => setActiveIndex(i)}
                      onMouseLeave={() => setActiveIndex(null)}
                    />
                  );
                })}
              </g>

              {/* Glossy Specular 3D Highlight Arc on Top Half */}
              <path
                d={describeArc(120, 120, 72, 100, -100, 20)}
                fill="url(#gloss-overlay)"
                pointerEvents="none"
                opacity="0.32"
              />

              {/* Center Inset Hole Container */}
              <circle
                cx="120"
                cy="120"
                r="62"
                fill="#070c17"
                stroke="rgba(6, 182, 212, 0.3)"
                strokeWidth="1.5"
                className="shadow-inner"
              />

              {/* Center Content Overlay */}
              <g pointerEvents="none">
                {activeItem ? (
                  <>
                    {/* Glowing Code Brackets Icon in Language Theme Color */}
                    <g transform="translate(109, 80)">
                      <path
                        d="M6 4L1 10L6 16M14 4L19 10L14 16"
                        stroke={activeItem.meta.color}
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter={`drop-shadow(0 0 6px ${activeItem.meta.color})`}
                      />
                    </g>
                    {/* Hovered Language Name */}
                    <text
                      x="120"
                      y="114"
                      textAnchor="middle"
                      fill="#cbd5e1"
                      fontSize="11"
                      fontWeight="600"
                      letterSpacing="0.04em"
                      className="font-sans truncate"
                    >
                      {activeItem.name}
                    </text>
                    {/* Active Percentage */}
                    <text
                      x="120"
                      y="136"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="18"
                      fontWeight="800"
                      letterSpacing="-0.02em"
                      className="font-data"
                      filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))"
                    >
                      {activeItem.pct.toFixed(0)}%
                    </text>
                    {/* Byte size */}
                    <text
                      x="120"
                      y="152"
                      textAnchor="middle"
                      fill="#94a3b8"
                      fontSize="10"
                      className="font-data"
                    >
                      {formatBytes(activeItem.bytes)}
                    </text>
                  </>
                ) : (
                  <>
                    {/* Default: Number of Repositories Analyzed */}
                    <g transform="translate(110, 78)">
                      <path
                        d="M2 5C2 3.89543 2.89543 3 4 3H8.5L10.5 5.5H16C17.1046 5.5 18 6.39543 18 7.5V14C18 15.1046 17.1046 16 16 16H4C2.89543 16 2 15.1046 2 14V5Z"
                        stroke="#22d3ee"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="#081e28"
                        fillOpacity="0.6"
                        filter="drop-shadow(0 0 6px #06b6d4)"
                      />
                    </g>
                    {/* Number of Repositories */}
                    <text
                      x="120"
                      y="126"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="24"
                      fontWeight="800"
                      letterSpacing="-0.02em"
                      className="font-data"
                      filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))"
                    >
                      {repoCount}
                    </text>
                    {/* Repositories Label */}
                    <text
                      x="120"
                      y="144"
                      textAnchor="middle"
                      fill="#94a3b8"
                      fontSize="11"
                      fontWeight="600"
                      letterSpacing="0.04em"
                      className="font-sans"
                    >
                      {repoCount === 1 ? "Repository" : "Repositories"}
                    </text>
                  </>
                )}
              </g>
            </svg>
          </div>
        </div>

        {/* Right Column: Smaller, Compact Language Pills (No text truncation) */}
        <div className="sm:col-span-6 flex flex-col justify-center space-y-2 sm:space-y-2.5">
          {slices.slice(0, 4).map((slice, i) => {
            const isHovered = activeIndex === i;
            const delayClass = `delay-${Math.min(i + 1, 6)}`;

            return (
              <div
                key={slice.name}
                className={`group relative flex items-center gap-2.5 rounded-xl border p-2 sm:p-2.5 transition-all duration-200 cursor-pointer shadow-xs overflow-hidden ${
                  mounted ? `animate-slide-up ${delayClass}` : "opacity-0"
                } ${
                  isHovered
                    ? "bg-[#111a2f]/95 shadow-sm scale-[1.01]"
                    : "bg-[#0d1424]/75 hover:bg-[#10182b]/90"
                }`}
                style={{
                  borderColor: isHovered ? slice.meta.color : `${slice.meta.color}40`,
                  boxShadow: isHovered
                    ? `0 4px 14px -2px ${slice.meta.glow}, inset 0 1px 1px rgba(255,255,255,0.12)`
                    : "none",
                }}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {/* File Icon Badge */}
                <NeonFileBadge name={slice.name} color={slice.meta.color} />

                {/* Right Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="font-semibold text-white text-xs sm:text-sm truncate">
                      {slice.name}
                    </span>
                    <div className="flex items-baseline gap-1.5 shrink-0">
                      <span className="font-data text-[10px] sm:text-[11px] text-slate-400">
                        {formatBytes(slice.bytes)}
                      </span>
                      <span
                        className="font-data text-xs sm:text-sm font-extrabold"
                        style={{
                          color: slice.meta.color,
                          textShadow: `0 0 8px ${slice.meta.color}80`,
                        }}
                      >
                        {slice.pct.toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  {/* Compact Progress Bar Track */}
                  <div className="mt-1.5 h-1.5 w-full rounded-full bg-[#0a0e1a] border border-white/5 p-[1px] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: mounted ? `${slice.pct}%` : "0%",
                        background: `linear-gradient(to right, ${slice.meta.gradient[0]}, ${slice.meta.gradient[1]})`,
                        boxShadow: `0 0 6px ${slice.meta.color}`,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
