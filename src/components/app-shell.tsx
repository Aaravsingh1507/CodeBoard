"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Sun, Moon, LayoutGrid, Target } from "lucide-react";
import { useTheme } from "next-themes";
import { Sidebar } from "./sidebar";
import { GithubIcon, LeetcodeIcon } from "./icons";
import { cn } from "@/lib/utils";

export function AppShell({
  user,
  children,
}: {
  user: { name?: string | null; image?: string | null; githubUsername?: string | null };
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeSidebar = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 250);
  }, []);

  const handleNavigate = useCallback(() => {
    closeSidebar();
  }, [closeSidebar]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Mobile bottom navigation items
  const mobileNav = [
    {
      href: "/dashboard",
      label: "Overview",
      icon: LayoutGrid,
      isActive: pathname === "/dashboard" || pathname === "/preview",
    },
    {
      href: "/github",
      label: "GitHub",
      icon: GithubIcon,
      isActive: pathname.startsWith("/github"),
    },
    {
      href: "/leetcode",
      label: "LeetCode",
      icon: LeetcodeIcon,
      isActive: pathname.startsWith("/leetcode"),
    },
    {
      href: "/matchscope",
      label: "Prep",
      icon: Target,
      isActive: pathname.startsWith("/matchscope"),
    },
  ];

  return (
    <div className="flex h-[100dvh] min-h-[100dvh] w-full overflow-hidden bg-background text-foreground">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar user={user} />
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden" aria-modal="true" role="dialog">
          <div
            className={`absolute inset-0 bg-black/70 backdrop-blur-[3px] ${
              closing ? "animate-backdrop-out" : "animate-backdrop-in"
            }`}
            onClick={closeSidebar}
          />
          <div
            className={`relative z-50 h-full ${
              closing ? "animate-slide-out-left" : "animate-slide-in-left"
            }`}
          >
            <Sidebar user={user} onNavigate={handleNavigate} />
          </div>
        </div>
      )}

      <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Mobile Header Bar (hidden on desktop) - Sticky top */}
        <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b border-border/60 bg-background/95 px-4 backdrop-blur-md md:hidden supports-[backdrop-filter]:bg-background/80">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="rounded-lg p-2 text-muted hover:bg-surface-2 hover:text-foreground active:scale-95 transition-all cursor-pointer"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <Link href="/dashboard" className="flex items-center gap-2.5">
              <div className="relative flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-lg shadow-xs ring-1 ring-purple-500/20">
                <Image
                  src="/logo.png"
                  alt="CodeBoard Logo"
                  width={28}
                  height={28}
                  priority
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-sm font-bold tracking-tight text-foreground dark:text-white">
                Code<span className="text-indigo-500 dark:text-indigo-400">Board</span>
              </span>
            </Link>
          </div>

          {/* Quick Mobile Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 bg-surface-2/60 text-muted hover:bg-surface-2 hover:text-foreground active:scale-95 transition-all cursor-pointer"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun size={16} className="text-amber-400" />
              ) : (
                <Moon size={16} className="text-indigo-600" />
              )}
            </button>
          )}
        </header>

        {/* Main Content Area with Optimized Ambient Background */}
        <main
          className="relative flex-1 overflow-y-auto overflow-x-hidden scroll-touch bg-background dark:bg-[#080c17] w-full max-w-full pb-20 md:pb-0"
          style={{ WebkitOverflowScrolling: "touch", overscrollBehaviorY: "contain" }}
        >
          {/* High-Performance Radial Gradient Background Glows */}
          <div
            className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] max-w-full rounded-full opacity-60 dark:opacity-75"
            style={{
              background: "radial-gradient(circle, rgba(147, 51, 234, 0.12) 0%, rgba(147, 51, 234, 0) 70%)",
            }}
          />
          <div
            className="pointer-events-none absolute left-1/4 top-40 h-[400px] w-[400px] max-w-full rounded-full opacity-50 dark:opacity-60"
            style={{
              background: "radial-gradient(circle, rgba(79, 70, 229, 0.10) 0%, rgba(79, 70, 229, 0) 70%)",
            }}
          />

          <div className="relative z-10 mx-auto max-w-7xl w-full min-w-0 px-4 pt-4 pb-16 sm:px-6 md:px-8 md:py-7 animate-fade-in">
            {children}
          </div>
        </main>

        {/* Mobile Bottom Navigation Bar (hidden on desktop) */}
        <nav
          aria-label="Mobile Navigation"
          className="fixed bottom-0 left-0 right-0 z-30 flex h-16 items-center justify-around border-t border-border/70 bg-background/95 px-2 backdrop-blur-xl md:hidden supports-[backdrop-filter]:bg-background/85"
          style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        >
          {mobileNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center py-1 text-[11px] font-medium transition-all active:scale-95",
                item.isActive
                  ? "text-indigo-500 dark:text-indigo-400 font-semibold"
                  : "text-muted hover:text-foreground"
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-xl transition-all",
                  item.isActive && "bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-500 dark:text-indigo-400"
                )}
              >
                <item.icon size={18} />
              </div>
              <span className="mt-0.5 text-[10px] leading-tight tracking-tight">{item.label}</span>
            </Link>
          ))}

          {/* More / Menu Drawer Trigger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={cn(
              "flex flex-1 flex-col items-center justify-center py-1 text-[11px] font-medium transition-all active:scale-95 cursor-pointer",
              open
                ? "text-indigo-500 dark:text-indigo-400 font-semibold"
                : "text-muted hover:text-foreground"
            )}
            aria-label="Open menu"
          >
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-xl transition-all",
                open && "bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-500 dark:text-indigo-400"
              )}
            >
              <Menu size={18} />
            </div>
            <span className="mt-0.5 text-[10px] leading-tight tracking-tight">More</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
