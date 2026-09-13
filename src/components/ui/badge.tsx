import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

const tones = {
  neutral: "bg-surface-2 text-slate-700 border-border dark:text-slate-300 dark:border-border/80",
  accent: "bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-500/15 dark:text-purple-300 dark:border-purple-500/30",
  success: "bg-teal-50 border-teal-200 text-teal-700 dark:bg-teal-500/15 dark:text-teal-300 dark:border-teal-500/30",
  warn: "bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30",
  danger: "bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300 dark:border-rose-500/30",
};

export function Badge({
  className,
  tone = "neutral",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: keyof typeof tones }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg border px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}
