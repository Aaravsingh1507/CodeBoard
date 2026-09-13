"use client";

import { useState, useCallback, useEffect } from "react";
import { Menu } from "lucide-react";
import { Sidebar } from "./sidebar";

export function AppShell({
  user,
  children,
}: {
  user: { name?: string | null; image?: string | null; githubUsername?: string | null };
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

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

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar user={user} />
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden" aria-modal="true" role="dialog">
          <div
            className={`absolute inset-0 bg-black/60 backdrop-blur-[3px] ${
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

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Mobile Header Bar (hidden on desktop) */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-border/60 bg-background/90 px-4 backdrop-blur-md md:hidden">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="rounded-lg p-2 text-muted hover:bg-surface-2 hover:text-foreground active:scale-95 transition-all"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
                <span className="font-mono text-xs font-bold text-white">&lt;/&gt;</span>
              </div>
              <span className="text-sm font-bold tracking-tight text-foreground dark:text-white">
                Code<span className="text-indigo-500 dark:text-indigo-400">Board</span>
              </span>
            </div>
          </div>
        </header>

        {/* Main Content Area with Subtle Ambient Glow */}
        <main
          className="relative flex-1 overflow-y-auto scroll-touch bg-background dark:bg-[#080c17]"
          style={{ WebkitOverflowScrolling: "touch", willChange: "scroll-position" }}
        >
          {/* Subtle Ambient Nebula Glows */}
          <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-purple-500/5 dark:bg-purple-600/12 blur-[140px]" />
          <div className="pointer-events-none absolute left-1/4 top-40 h-[400px] w-[400px] rounded-full bg-indigo-500/5 dark:bg-indigo-600/10 blur-[130px]" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 py-5 sm:px-6 md:px-8 md:py-7 animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
