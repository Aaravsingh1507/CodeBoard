export function DashboardHeroArtwork() {
  return (
    <div className="hidden items-center gap-7 lg:flex select-none">
      {/* Potted Plant */}
      <div className="relative flex flex-col items-center">
        {/* Plant Leaves */}
        <svg width="48" height="58" viewBox="0 0 48 58" fill="none" className="mb-[-3px]">
          {/* Back leaves */}
          <path
            d="M24 50 C 24 28, 12 10, 8 2 C 18 12, 22 28, 24 50 Z"
            fill="#22c55e"
          />
          <path
            d="M24 50 C 24 24, 34 8, 40 0 C 32 12, 27 28, 24 50 Z"
            fill="#16a34a"
          />
          {/* Front leaves */}
          <path
            d="M24 50 C 24 30, 18 16, 17 5 C 23 16, 25 32, 24 50 Z"
            fill="#4ade80"
          />
          <path
            d="M24 50 C 24 32, 30 18, 31 7 C 27 18, 25 34, 24 50 Z"
            fill="#15803d"
          />
        </svg>
        {/* Pot */}
        <div className="h-8 w-11 rounded-b-lg bg-[#1a2336] border border-border/80 shadow-inner flex items-center justify-center">
          <div className="h-1 w-7 rounded-full bg-border/40" />
        </div>
        {/* Shelf bar */}
        <div className="absolute -bottom-1 h-1 w-20 bg-border/70 rounded-full" />
      </div>

      {/* Code Editor Window */}
      <div className="relative flex h-28 w-48 flex-col rounded-xl border border-indigo-500/30 bg-[#121828] p-3 shadow-xl shadow-black/50">
        {/* Window controls */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <div className="h-1.5 w-1.5 rounded-full bg-red-400/80" />
          <div className="h-1.5 w-1.5 rounded-full bg-amber-400/80" />
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
        </div>
        {/* Code lines */}
        <div className="space-y-2">
          <div className="h-1.5 w-20 rounded-full bg-purple-400/80" />
          <div className="flex items-center gap-1.5 pl-2.5">
            <div className="h-1.5 w-12 rounded-full bg-cyan-400/90" />
            <div className="h-1.5 w-7 rounded-full bg-indigo-300/70" />
          </div>
          <div className="flex items-center gap-1.5 pl-5">
            <div className="h-1.5 w-16 rounded-full bg-emerald-400/80" />
          </div>
          <div className="flex items-center gap-1.5 pl-2.5">
            <div className="h-1.5 w-10 rounded-full bg-pink-400/80" />
            <div className="h-1.5 w-14 rounded-full bg-cyan-300/70" />
          </div>
          <div className="h-1.5 w-12 rounded-full bg-purple-400/80" />
        </div>

        {/* Code badge floating on top right of editor */}
        <div className="absolute -right-3 -top-2.5 flex h-10 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/40 border border-indigo-400/40">
          <span className="font-mono text-xs font-bold text-white">&lt;/&gt;</span>
        </div>
      </div>

      {/* Coffee Mug with Steam */}
      <div className="relative flex flex-col items-center">
        {/* Steam */}
        <svg width="24" height="20" viewBox="0 0 24 20" fill="none" className="mb-0.5 text-indigo-300/60">
          <path
            d="M7 18 C 5 13, 9 9, 7 2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M13 18 C 11 12, 15 8, 13 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        {/* Mug Body */}
        <div className="relative flex h-11 w-12 items-center justify-center rounded-b-lg rounded-t-sm border border-border/80 bg-[#162035] shadow-md">
          <span className="font-mono text-[11px] font-bold text-slate-300">&lt;/&gt;</span>
          {/* Mug handle */}
          <div className="absolute -right-3 top-2 h-6 w-3.5 rounded-r-md border-2 border-l-0 border-border/80 bg-transparent" />
        </div>
      </div>

      {/* Slogan: Record your progress in the same color */}
      <div className="flex flex-col text-left pl-2 tracking-wide leading-snug">
        <span className="text-sm font-semibold text-slate-200">Record</span>
        <span className="text-sm font-semibold text-slate-200">Your</span>
        <span className="text-base font-bold text-slate-200">Progress</span>
      </div>
    </div>
  );
}
