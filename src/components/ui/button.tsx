import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
          size === "md" ? "h-9 px-4 text-sm" : "h-8 px-3 text-xs",
          variant === "primary" &&
            "bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-md shadow-purple-900/25 border border-purple-500/30",
          variant === "secondary" &&
            "bg-surface-2/80 text-foreground border border-border/80 hover:bg-surface-2 hover:border-border",
          variant === "ghost" && "text-muted hover:text-foreground hover:bg-surface-2/60",
          variant === "danger" && "bg-danger/10 text-danger border border-danger/30 hover:bg-danger/20",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
