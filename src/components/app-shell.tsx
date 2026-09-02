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
    }, 250); // matches the slide-out animation duration
  }, []);

  const handleNavigate = useCallback(() => {
    closeSidebar();
  }, [closeSidebar]);

  // Lock body scroll when mobile sidebar is open
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
    <div className="flex h-screen overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar user={user} />
      </div>

      {/* Mobile drawer with animations */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden" aria-modal="true" role="dialog">
          {/* Animated backdrop */}
          <div
            className={`absolute inset-0 bg-black/50 backdrop-blur-[2px] ${
              closing ? "animate-backdrop-out" : "animate-backdrop-in"
            }`}
            onClick={closeSidebar}
          />
          {/* Animated sidebar panel */}
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
        <header className="flex items-center gap-3 border-b border-border bg-surface px-4 py-3 md:hidden">
          <button
            onClick={() => setOpen(true)}
            className="rounded-lg p-2 text-muted hover:bg-surface-2 hover:text-foreground active:scale-95 transition-all duration-150"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
          <span className="text-sm font-semibold">CodeBoard</span>
        </header>
        <main className="flex-1 overflow-y-auto scroll-touch">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 md:px-10 md:py-8 animate-fade-in">{children}</div>
        </main>
      </div>
    </div>
  );
}
