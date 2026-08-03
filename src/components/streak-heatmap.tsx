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
  "bg-surface-2",
  "bg-accent-2/30",
  "bg-accent-2/55",
  "bg-accent-2/80",
  "bg-accent-2",
];

export function StreakHeatmap({ days }: { days: HeatmapDay[] }) {
  if (days.length === 0) return null;

  // Align into weeks (columns), Sunday-first, so it reads like a commit graph.
  const first = new Date(days[0].date + "T00:00:00Z");
  const leadingBlanks = first.getUTCDay(); // 0 = Sunday
  const cells: (HeatmapDay | null)[] = [
    ...Array(leadingBlanks).fill(null),
    ...days,
  ];
  const weeks: (HeatmapDay | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((day, di) =>
              day ? (
                <div
                  key={di}
                  title={`${day.date}: ${day.count} activity event${day.count === 1 ? "" : "s"}`}
                  className={`h-2.5 w-2.5 rounded-[3px] ${LEVEL_CLASSES[levelFor(day.count)]}`}
                />
              ) : (
                <div key={di} className="h-2.5 w-2.5" />
              )
            )}
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-1.5 text-xs text-muted">
        <span>Less</span>
        {LEVEL_CLASSES.map((c, i) => (
          <div key={i} className={`h-2.5 w-2.5 rounded-[3px] ${c}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
