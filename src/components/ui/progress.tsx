import { cn } from "@/lib/utils";

export function Progress({ value, className }: { value: number; className?: string }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-surface-2", className)}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-400 shadow-[0_0_6px_rgba(139,92,246,0.5)] transition-all duration-500 ease-out animate-progress-grow"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

