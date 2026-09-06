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
  "bg-[#141c2e] border border-[#1d273e]/70",
  "bg-teal-950/80 border border-teal-800/50",
  "bg-teal-700/80 border border-teal-500/60",
  "bg-teal-500 border border-teal-400/70 shadow-[0_0_4px_rgba(20,184,166,0.4)]",
  "bg-[#2dd4bf] border border-teal-200 shadow-[0_0_10px_rgba(45,212,191,0.8)]",
];

export function StreakHeatmap({ days }: { days: HeatmapDay[] }) {
  if (days.length === 0) return null;

  // Align into weeks (columns), Sunday-first
  const first = new Date(days[0].date + "T00:00:00Z");
  const leadingBlanks = first.getUTCDay();
  const cells: (HeatmapDay | null)[] = [
    ...Array(leadingBlanks).fill(null),
    ...days,
  ];
  const weeks: (HeatmapDay | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  return (
    <div className="relative">
      {/* Scroll container */}
      <div className="overflow-x-auto scroll-touch pb-2">
        <div className="flex gap-1.5 animate-fade-in">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1.5">
              {week.map((day, di) =>
                day ? (
                  <div
                    key={di}
                    title={`${day.date}: ${day.count} activity event${day.count === 1 ? "" : "s"}`}
                    className={`h-3 w-3 rounded-[3px] transition-all duration-200 hover:scale-150 hover:ring-2 hover:ring-accent/40 ${LEVEL_CLASSES[levelFor(day.count)]}`}
                  />
                ) : (
                  <div key={di} className="h-3 w-3" />
                )
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center gap-2 text-xs text-muted">
        <span>Less</span>
        <div className="flex items-center gap-1.5">
          {LEVEL_CLASSES.map((c, i) => (
            <div key={i} className={`h-3 w-3 rounded-[3px] ${c}`} />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
