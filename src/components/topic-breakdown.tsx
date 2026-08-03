"use client";

const LEVEL_COLOR: Record<string, string> = {
  fundamental: "var(--accent-2)",
  intermediate: "var(--warn)",
  advanced: "var(--danger)",
};

export function TopicBreakdown({
  topics,
}: {
  topics: { tag: string; solved: number; level: string }[];
}) {
  if (topics.length === 0) {
    return (
      <p className="text-sm text-muted">
        No topic data yet — solve a few problems and this fills in automatically.
      </p>
    );
  }

  const max = Math.max(...topics.map((t) => t.solved));
  const top = topics.slice(0, 12);

  return (
    <div>
      <div className="mb-3 flex items-center gap-4 text-xs text-muted">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ background: LEVEL_COLOR.fundamental }} /> Fundamental
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ background: LEVEL_COLOR.intermediate }} /> Intermediate
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ background: LEVEL_COLOR.advanced }} /> Advanced
        </span>
      </div>
      <div className="space-y-2">
        {top.map((t) => (
          <div key={t.tag} className="flex items-center gap-3">
            <span className="w-32 shrink-0 truncate text-xs text-foreground">{t.tag}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(t.solved / max) * 100}%`,
                  background: LEVEL_COLOR[t.level] ?? "var(--accent)",
                }}
              />
            </div>
            <span className="font-data w-6 shrink-0 text-right text-xs text-muted">{t.solved}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
