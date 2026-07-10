"use client";

import { use } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

// Promise that resolves after first paint — avoids useEffect + setState
const afterHydration = typeof window !== "undefined"
  ? Promise.resolve(true)
  : new Promise<boolean>(() => {});

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = use(afterHydration);

  if (!mounted) {
    return <div className="h-9 w-9 rounded-lg border border-border" aria-hidden />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-muted transition-colors hover:text-foreground"
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
