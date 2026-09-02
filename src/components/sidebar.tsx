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
  Users,
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

  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-border bg-surface">
      <div className="flex items-center gap-2 px-5 py-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="CodeBoard" className="h-7 w-7 rounded-md object-contain" />
        <span className="text-sm font-semibold tracking-tight">CodeBoard</span>
      </div>

      <nav className="flex-1 space-y-0.5 px-3">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                active
                  ? "bg-accent/10 text-accent font-medium"
                  : "text-muted hover:bg-surface-2 hover:text-foreground active:scale-[0.98]"
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
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt="" className="h-7 w-7 rounded-full" />
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
