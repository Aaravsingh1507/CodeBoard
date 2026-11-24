import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-2xl border border-white/[0.08] bg-white/[0.05] dark:bg-white/[0.03] backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.08)]",
        className
      )}
    />
  );
}
