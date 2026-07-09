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
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none",
          size === "md" ? "h-9 px-4 text-sm" : "h-8 px-3 text-xs",
          variant === "primary" && "bg-accent text-white hover:opacity-90",
          variant === "secondary" &&
            "bg-surface-2 text-foreground border border-border hover:bg-border/60",
          variant === "ghost" && "text-muted hover:text-foreground hover:bg-surface-2",
          variant === "danger" && "bg-danger/10 text-danger border border-danger/30 hover:bg-danger/20",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
