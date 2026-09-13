"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  LayoutGrid,
  FileText,
  Sparkles,
  Target,
  Users,
  Settings,
  Sun,
  Moon,
  Code2,
} from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/dashboard", label: "Overview", icon: LayoutGrid },
  { href: "/github", label: "GitHub", icon: GithubIcon },
  { href: "/leetcode", label: "LeetCode", icon: Code2 },
  { href: "/applications", label: "Applications", icon: LayoutGrid },
  { href: "/goals", label: "Goals", icon: Target },
  { href: "/circles", label: "Circles", icon: Users },
  { href: "/resume", label: "Resume", icon: FileText },
  { href: "/reviews", label: "AI Reviews", icon: Sparkles },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar({
  user,
  onNavigate,
}: {
  user: { name?: string | null; image?: string | null; githubUsername?: string | null };
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? (theme || resolvedTheme || "dark") : "dark";

  return (
    <aside className="relative flex h-full w-60 shrink-0 flex-col border-r border-border bg-surface dark:border-[#1a233c] dark:bg-[#080c17] select-none">
      {/* Subtle Purple Radial Glow at bottom left */}
      <div className="pointer-events-none absolute -bottom-14 -left-14 h-56 w-56 rounded-full bg-purple-600/10 dark:bg-purple-900/20 blur-3xl" />

      {/* Brand Header */}
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md shadow-indigo-500/30">
          <span className="font-mono text-xs font-bold text-white">&lt;/&gt;</span>
        </div>
        <span className="text-lg font-bold tracking-tight text-foreground dark:text-white">
          Code<span className="text-indigo-500 dark:text-indigo-400">Board</span>
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 px-3">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href ||
            (href === "/dashboard" && pathname === "/preview") ||
            (href !== "/dashboard" && pathname.startsWith(href));

          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-all duration-200",
                active
                  ? "nav-pill-active font-semibold"
                  : "text-muted hover:bg-slate-100 hover:text-foreground dark:hover:bg-white/5 dark:hover:text-white active:scale-[0.98]"
              )}
            >
              <Icon
                size={18}
                className={active ? "" : "text-muted transition-colors group-hover:text-foreground dark:group-hover:text-white"}
              />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile Footer */}
      <div className="relative z-10 border-t border-border/60 p-3.5">
        <div className="flex items-center justify-between gap-2 rounded-xl p-1">
          <Link
            href="/settings"
            onClick={onNavigate}
            className="flex items-center gap-2.5 min-w-0 flex-1 overflow-hidden rounded-lg p-1 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.image || "/aarav-avatar.png"}
              alt=""
              className="h-8 w-8 rounded-full border border-border/80 object-cover shrink-0"
            />
            <span className="truncate text-xs font-medium text-foreground dark:text-slate-200">
              {user.githubUsername ?? user.name ?? "Aaravsingh1507"}
            </span>
          </Link>

          {/* Theme Toggle button */}
          <button
            type="button"
            aria-label="Toggle theme"
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2 text-muted hover:text-foreground hover:border-purple-500/40 transition-colors shadow-xs"
          >
            {mounted && currentTheme === "light" ? <Moon size={13} /> : <Sun size={13} />}
          </button>
        </div>
      </div>
    </aside>
  );
}
