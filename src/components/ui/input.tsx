import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes } from "react";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-9.5 w-full rounded-xl border border-border/80 bg-surface-2/70 px-3.5 text-sm text-foreground placeholder:text-muted/60 transition-all focus:border-accent/80 focus:bg-surface-2 focus:outline-none focus:ring-1 focus:ring-accent/30",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full rounded-xl border border-border/80 bg-surface-2/70 px-3.5 py-2 text-sm text-foreground placeholder:text-muted/60 transition-all focus:border-accent/80 focus:bg-surface-2 focus:outline-none focus:ring-1 focus:ring-accent/30",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export const Select = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "h-9.5 w-full rounded-xl border border-border/80 bg-surface-2/70 px-3 text-sm text-foreground transition-all focus:border-accent/80 focus:bg-surface-2 focus:outline-none focus:ring-1 focus:ring-accent/30",
      className
    )}
    {...props}
  />
));
Select.displayName = "Select";
