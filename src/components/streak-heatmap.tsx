"use client";

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
  "bg-[#131b2e] border border-[#1b253d]/80",
  "bg-[#0d4f5b] border border-[#146b7b]",
  "bg-[#0b7484] border border-[#0f9bb0]",
  "bg-[#06b6d4] border border-[#22d3ee] shadow-[0_0_8px_rgba(6,182,212,0.6)]",
  "bg-[#22d3ee] border border-cyan-100 shadow-[0_0_12px_rgba(34,211,238,0.95)]",
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
  if (days.length === 0) return null;

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

  return (
    <div className="relative select-none">
      {/* Month labels across top */}
      <div className="flex items-center justify-between pl-8 pr-1 pb-2 text-[11px] font-medium text-slate-400">
        {MONTH_NAMES.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>

      {/* Grid with Left-side Day Labels */}
      <div className="flex items-start gap-2">
        {/* Day of Week Labels (Mon, Wed, Fri) */}
        <div className="flex flex-col gap-1.5 text-[11px] font-medium text-slate-400 w-6 shrink-0 pt-0.5">
          {DAY_LABELS.map((d, i) => (
            <div
              key={i}
              className="h-3 w-6 md:h-3.5 flex items-center leading-none"
            >
              {d.label}
            </div>
          ))}
        </div>

        {/* Scrollable Columns */}
        <div className="overflow-x-auto scrollbar-none flex-1 pb-1">
          <div className="flex gap-1.5 animate-fade-in">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1.5">
                {week.map((day, di) =>
                  day ? (
                    <div
                      key={di}
                      title={`${day.date}: ${day.count} activity event${day.count === 1 ? "" : "s"}`}
                      className={`h-3 w-3 md:h-3.5 md:w-3.5 rounded-[4px] transition-all duration-200 hover:scale-125 hover:z-10 ${LEVEL_CLASSES[levelFor(day.count)]}`}
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

      {/* Legend */}
      <div className="mt-3.5 flex items-center gap-2 text-xs font-medium text-slate-400">
        <span>Less activity</span>
        <div className="flex items-center gap-1.5">
          {LEVEL_CLASSES.map((c, i) => (
            <div key={i} className={`h-3 w-3 md:h-3.5 md:w-3.5 rounded-[4px] ${c}`} />
          ))}
        </div>
        <span>More activity</span>
      </div>
    </div>
  );
}
