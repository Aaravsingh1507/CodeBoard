"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Code2,
  FileText,
  Kanban,
  Sparkles,
  Target,
  Settings,
} from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

const NAV = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/github", label: "GitHub", icon: GithubIcon },
  { href: "/leetcode", label: "LeetCode", icon: Code2 },
  { href: "/applications", label: "Applications", icon: Kanban },
  { href: "/goals", label: "Goals", icon: Target },
  { href: "/resume", label: "Resume", icon: FileText },
  { href: "/reviews", label: "AI Reviews", icon: Sparkles },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar({
  user,
}: {
  user: { name?: string | null; avatarUrl?: string | null; githubUsername?: string | null };
}) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-border bg-surface">
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent font-data text-xs font-bold text-white">
          {"</>"}
        </div>
        <span className="text-sm font-semibold tracking-tight">DevTrack AI</span>
      </div>

      <nav className="flex-1 space-y-0.5 px-3">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-accent/10 text-accent font-medium"
                  : "text-muted hover:bg-surface-2 hover:text-foreground"
              )}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center justify-between border-t border-border px-4 py-4">
        <div className="flex items-center gap-2 overflow-hidden">
          {user.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.avatarUrl} alt="" className="h-7 w-7 rounded-full" />
          ) : (
            <div className="h-7 w-7 rounded-full bg-surface-2" />
          )}
          <span className="truncate text-xs text-muted">
            {user.githubUsername ?? user.name ?? "Developer"}
          </span>
        </div>
        <ThemeToggle />
      </div>
    </aside>
  );
}
