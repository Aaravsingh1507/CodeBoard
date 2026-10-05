"use client";

import { useState, useEffect } from "react";
import { Code2 } from "lucide-react";

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

// Stylized Neon File Badge for Language Pill Card
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
      className="relative flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl border transition-transform duration-200 group-hover:scale-105"
      style={{
        borderColor: `${color}99`,
        backgroundColor: `${color}18`,
        boxShadow: `0 0 14px ${color}30, inset 0 0 8px ${color}20`,
      }}
    >
      {/* File silhouette SVG */}
      <svg
        className="absolute inset-0 h-full w-full p-1 opacity-40"
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
        className="relative z-10 font-data text-xs sm:text-sm font-bold tracking-tight"
        style={{
          color,
          textShadow: `0 0 8px ${color}`,
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
  className = "",
}: {
  data: LanguageItem[];
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
        className={`relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-b from-[#0c1322]/95 via-[#080d1a]/95 to-[#050813]/98 p-6 text-center backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.12)] ${className}`}
      >
        <h2 className="text-xl font-bold text-white tracking-tight">Top languages</h2>
        <p className="mt-1 text-xs text-slate-400">Languages used across your repositories</p>
        <div className="py-12 text-sm text-slate-400">No language data available yet.</div>
      </div>
    );
  }

  const total = data.reduce((s, d) => s + d.bytes, 0);

  // Compute angles for each slice (starting at -115 deg to match Image 1's orientation)
  let currentAngle = -115;
  const gapAngle = data.length > 1 ? 3 : 0;
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
      className={`relative overflow-hidden rounded-3xl sm:rounded-[28px] border border-cyan-500/25 bg-gradient-to-b from-[#0c1322]/95 via-[#080d1a]/95 to-[#050813]/98 p-5 sm:p-6 shadow-[0_12px_40px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-xl transition-all ${className}`}
    >
      {/* Top ambient color glow */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-48 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -top-24 right-1/4 h-48 w-80 rounded-full bg-purple-500/10 blur-3xl" />

      {/* Top specular edge reflection */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      {/* Card Header matching Image 1 */}
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Top languages
          </h2>
          <p className="mt-0.5 text-xs text-slate-300 font-serif italic tracking-wide">
            Languages used across your repositories
          </p>
        </div>

        {/* Hand-drawn scribble badge: "4 languages" */}
        <div className="flex flex-col items-center shrink-0">
          <span className="font-data text-xs sm:text-sm font-semibold text-cyan-300 tracking-wide">
            {data.length} {data.length === 1 ? "language" : "languages"}
          </span>
          {/* Playful cyan doodle scribble underline */}
          <svg
            width="80"
            height="8"
            viewBox="0 0 80 8"
            fill="none"
            className="text-cyan-400/80 -mt-0.5"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 5.5C18 2 45 1.5 78 4.5C62 6.8 32 6 10 6.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Card Body: Left 3D Donut Chart + Right Glowing Language Pills */}
      <div className="relative z-10 mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: 3D Glossy Donut Chart with Callout Doodles */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[260px] sm:min-h-[290px]">
          <div
            className={`w-full max-w-[340px] relative transition-all duration-700 ${
              mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <svg
              viewBox="0 0 320 280"
              className="w-full h-auto overflow-visible select-none"
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
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>

                {/* Neon glow filters */}
                <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Ambient Glow behind donut */}
              <circle
                cx="160"
                cy="140"
                r="95"
                fill="none"
                stroke="url(#slice-grad-0)"
                strokeWidth="10"
                opacity="0.25"
                filter="url(#neon-glow)"
              />

              {/* Donut Slices */}
              <g className="cursor-pointer">
                {slices.map((slice, i) => {
                  const isHovered = activeIndex === i;
                  const isDimmed = activeIndex !== null && activeIndex !== i;
                  const path = describeArc(160, 140, 62, 98, slice.startAngle, slice.endAngle);

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
                          : `drop-shadow(0 4px 10px rgba(0,0,0,0.5))`,
                        transformOrigin: "160px 140px",
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
                d={describeArc(160, 140, 66, 94, -100, 20)}
                fill="url(#gloss-overlay)"
                pointerEvents="none"
                opacity="0.3"
              />

              {/* Center Inset Hole Container */}
              <circle
                cx="160"
                cy="140"
                r="56"
                fill="#070c17"
                stroke="rgba(6, 182, 212, 0.3)"
                strokeWidth="1.5"
                className="shadow-inner"
              />

              {/* Center Content Overlay */}
              <g pointerEvents="none">
                {/* Glowing Code Brackets Icon */}
                <g transform="translate(148, 102)">
                  <path
                    d="M6 4L1 10L6 16M14 4L19 10L14 16"
                    stroke="#22d3ee"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="drop-shadow(0 0 6px #06b6d4)"
                  />
                </g>

                {/* "Total" Text */}
                <text
                  x="160"
                  y="136"
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="11"
                  fontWeight="600"
                  letterSpacing="0.08em"
                  className="uppercase font-sans"
                >
                  {activeItem ? activeItem.name : "Total"}
                </text>

                {/* Total KB Value */}
                <text
                  x="160"
                  y="156"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="15"
                  fontWeight="800"
                  letterSpacing="-0.02em"
                  className="font-data"
                  filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))"
                >
                  {activeItem ? formatBytes(activeItem.bytes) : formatBytes(total)}
                </text>
              </g>

              {/* Hand-Drawn Callout Doodles matching Image 1 */}
              {/* Callout 1 (Top-Left): TypeScript (or top language) */}
              {slices[0] && (
                <g
                  className="cursor-pointer transition-opacity duration-200"
                  style={{ opacity: activeIndex === null || activeIndex === 0 ? 1 : 0.4 }}
                  onMouseEnter={() => setActiveIndex(0)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <text
                    x="25"
                    y="45"
                    fill={slices[0].meta.color}
                    fontSize="14"
                    fontWeight="800"
                    className="font-data"
                    filter={`drop-shadow(0 0 6px ${slices[0].meta.color})`}
                  >
                    {slices[0].pct.toFixed(0)}%
                  </text>
                  <text
                    x="25"
                    y="60"
                    fill={slices[0].meta.color}
                    fontSize="12"
                    fontWeight="600"
                    fontStyle="italic"
                    className="font-sans"
                  >
                    {slices[0].name}
                  </text>
                  {/* Curved arrow to slice 0 */}
                  <path
                    d="M 52 64 C 68 68, 78 72, 88 88"
                    fill="none"
                    stroke={slices[0].meta.color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray="2 0"
                  />
                  <path
                    d="M 88 88 L 81 83 M 88 88 L 86 80"
                    stroke={slices[0].meta.color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </g>
              )}

              {/* Callout 2 (Bottom-Left): CSS (or 2nd language) */}
              {slices[1] && (
                <g
                  className="cursor-pointer transition-opacity duration-200"
                  style={{ opacity: activeIndex === null || activeIndex === 1 ? 1 : 0.4 }}
                  onMouseEnter={() => setActiveIndex(1)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <text
                    x="25"
                    y="225"
                    fill={slices[1].meta.color}
                    fontSize="14"
                    fontWeight="800"
                    className="font-data"
                    filter={`drop-shadow(0 0 6px ${slices[1].meta.color})`}
                  >
                    {slices[1].pct.toFixed(0)}%
                  </text>
                  <text
                    x="25"
                    y="240"
                    fill={slices[1].meta.color}
                    fontSize="12"
                    fontWeight="600"
                    fontStyle="italic"
                    className="font-sans"
                  >
                    {slices[1].name}
                  </text>
                  {/* Curved arrow to slice 1 */}
                  <path
                    d="M 46 220 C 65 215, 82 208, 96 198"
                    fill="none"
                    stroke={slices[1].meta.color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 96 198 L 88 200 M 96 198 L 94 206"
                    stroke={slices[1].meta.color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </g>
              )}

              {/* Callout 3 (Bottom-Right): JavaScript (or 3rd language) */}
              {slices[2] && (
                <g
                  className="cursor-pointer transition-opacity duration-200"
                  style={{ opacity: activeIndex === null || activeIndex === 2 ? 1 : 0.4 }}
                  onMouseEnter={() => setActiveIndex(2)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <text
                    x="226"
                    y="188"
                    fill={slices[2].meta.color}
                    fontSize="11"
                    fontWeight="800"
                    className="font-data"
                  >
                    {slices[2].pct.toFixed(0)}%
                  </text>
                  <text
                    x="248"
                    y="188"
                    fill={slices[2].meta.color}
                    fontSize="11"
                    fontWeight="600"
                    fontStyle="italic"
                    className="font-sans"
                  >
                    {slices[2].name}
                  </text>
                  {/* Curved arrow to slice 2 */}
                  <path
                    d="M 224 186 C 218 184, 214 180, 212 176"
                    fill="none"
                    stroke={slices[2].meta.color}
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 212 176 L 217 178 M 212 176 L 216 172"
                    stroke={slices[2].meta.color}
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </g>
              )}

              {/* Callout 4 (Farther Bottom-Right): HTML (or 4th language) */}
              {slices[3] && (
                <g
                  className="cursor-pointer transition-opacity duration-200"
                  style={{ opacity: activeIndex === null || activeIndex === 3 ? 1 : 0.4 }}
                  onMouseEnter={() => setActiveIndex(3)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <text
                    x="222"
                    y="222"
                    fill={slices[3].meta.color}
                    fontSize="11"
                    fontWeight="800"
                    className="font-data"
                  >
                    {slices[3].pct.toFixed(0)}%
                  </text>
                  <text
                    x="244"
                    y="222"
                    fill={slices[3].meta.color}
                    fontSize="11"
                    fontWeight="600"
                    fontStyle="italic"
                    className="font-sans"
                  >
                    {slices[3].name}
                  </text>
                  {/* Curved arrow to slice 3 */}
                  <path
                    d="M 218 224 C 212 222, 204 212, 198 198"
                    fill="none"
                    stroke={slices[3].meta.color}
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 198 198 L 204 200 M 198 198 L 202 205"
                    stroke={slices[3].meta.color}
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* Right Column: 4 Glowing Glassmorphic Language Pill Cards */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-2.5 sm:space-y-3">
          {slices.slice(0, 4).map((slice, i) => {
            const isHovered = activeIndex === i;
            const delayClass = `delay-${Math.min(i + 1, 6)}`;

            return (
              <div
                key={slice.name}
                className={`group relative flex flex-col justify-center rounded-2xl border p-2.5 sm:p-3 transition-all duration-300 cursor-pointer shadow-sm overflow-hidden ${
                  mounted ? `animate-slide-up ${delayClass}` : "opacity-0"
                } ${
                  isHovered
                    ? "bg-[#111a2f]/95 shadow-md scale-[1.02]"
                    : "bg-[#0d1424]/75 hover:bg-[#10182b]/90"
                }`}
                style={{
                  borderColor: isHovered ? slice.meta.color : `${slice.meta.color}45`,
                  boxShadow: isHovered
                    ? `0 6px 20px -2px ${slice.meta.glow}, inset 0 1px 1px rgba(255,255,255,0.15)`
                    : "none",
                }}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {/* Top ambient highlight on the pill */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Top Line: File Icon + Language Name + Size + Percentage */}
                <div className="flex items-center gap-3">
                  <NeonFileBadge name={slice.name} color={slice.meta.color} />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-semibold text-white text-sm sm:text-base truncate">
                        {slice.name}
                      </span>
                      <div className="flex items-baseline gap-2 shrink-0">
                        <span className="font-data text-xs text-slate-400">
                          {formatBytes(slice.bytes)}
                        </span>
                        <span
                          className="font-data text-sm sm:text-base font-extrabold"
                          style={{
                            color: slice.meta.color,
                            textShadow: `0 0 10px ${slice.meta.color}80`,
                          }}
                        >
                          {slice.pct.toFixed(0)}%
                        </span>
                      </div>
                    </div>

                    {/* Glowing Progress Bar Track */}
                    <div className="mt-2 h-2 sm:h-2.5 w-full rounded-full bg-[#0a0e1a] border border-white/5 p-[1.5px] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: mounted ? `${slice.pct}%` : "0%",
                          background: `linear-gradient(to right, ${slice.meta.gradient[0]}, ${slice.meta.gradient[1]})`,
                          boxShadow: `0 0 8px ${slice.meta.color}`,
                        }}
                      />
                    </div>
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
