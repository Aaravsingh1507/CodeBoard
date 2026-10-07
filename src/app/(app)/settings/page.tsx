import { redirect } from "next/navigation";
import { headers } from "next/headers";
import {
  RotateCcw,
  ChevronRight,
  ChevronDown,
  Link2,
  Globe,
  User,
  Briefcase,
  Building2,
  BarChart2,
  Calendar,
  Save,
  LogOut,
  Check,
} from "lucide-react";
import { auth, signIn, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ensurePublicSlug } from "@/lib/public-profile";
import { CopyLink } from "@/components/copy-link";
import { GithubIcon } from "@/components/icons";

interface SettingsPageProps {
  searchParams: Promise<{ saved?: string }>;
}

export default async function SettingsPage({ searchParams }: SettingsPageProps) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const user = await prisma.user.findUnique({ where: { id: (session.user as any).id } });
  if (!user) redirect("/login");

  const resolvedParams = await searchParams;
  const isSaved = resolvedParams.saved === "1";

  const hdrs = await headers();
  const origin = `${hdrs.get("x-forwarded-proto") ?? "http"}://${hdrs.get("host") ?? "localhost:3000"}`;

  async function updateProfile(formData: FormData) {
    "use server";
    const s = await auth();
    if (!s?.user) redirect("/login");

    const placementDateRaw = String(formData.get("placementDate") ?? "").trim();

    await prisma.user.update({
      where: { id: (s.user as any).id },
      data: {
        leetcodeUsername: String(formData.get("leetcodeUsername") ?? "").trim() || null,
        targetRole: String(formData.get("targetRole") ?? "").trim() || null,
        targetCompanies: String(formData.get("targetCompanies") ?? "").trim() || null,
        jobSearchStatus: String(formData.get("jobSearchStatus") ?? "not_looking"),
        placementDate: placementDateRaw ? new Date(placementDateRaw) : null,
        digestEnabled: formData.get("digestEnabled") === "on",
      },
    });
    redirect("/settings?saved=1");
  }

  async function togglePublicProfile(formData: FormData) {
    "use server";
    const s = await auth();
    if (!s?.user) redirect("/login");
    const enable = formData.get("enable") === "true";

    if (enable) {
      await ensurePublicSlug((s.user as any).id);
    }
    await prisma.user.update({
      where: { id: (s.user as any).id },
      data: { publicProfileEnabled: enable },
    });
    redirect("/settings?saved=1");
  }

  async function reconnectGithub() {
    "use server";
    await signIn("github", { redirectTo: "/settings" });
  }

  async function doSignOut() {
    "use server";
    await signOut({ redirectTo: "/login" });
  }

  const publicUrl = user.publicProfileSlug ? `${origin}/u/${user.publicProfileSlug}` : null;
  const isGithubConnected = Boolean(user.githubUsername);

  // Default options for target role
  const standardRoles = [
    "Generative AI Engineer",
    "Full Stack Developer",
    "Backend Engineer",
    "Frontend Engineer",
    "Software Engineer",
    "Machine Learning Engineer",
    "DevOps Engineer",
    "Data Scientist",
    "Mobile Developer (Android / iOS)",
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-12">
      {/* Title Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Sett<span className="bg-gradient-to-r from-purple-300 via-indigo-300 to-violet-400 bg-clip-text text-transparent">ings</span>
        </h1>
        <p className="mt-1 text-sm text-slate-400 font-normal">Your profile and connections.</p>
      </div>

      {/* Success Notification Banner */}
      {isSaved && (
        <div className="flex items-center gap-2.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-xs sm:text-sm font-medium text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.15)] animate-fade-in">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
            <Check size={13} className="stroke-[2.5]" />
          </div>
          <span>Changes saved successfully.</span>
        </div>
      )}

      {/* 1. GitHub Card */}
      <div className="relative overflow-hidden rounded-[24px] border border-indigo-500/25 bg-[#090d1f]/90 p-5 sm:p-6 shadow-[0_0_35px_rgba(99,102,241,0.14),inset_0_1px_1px_rgba(255,255,255,0.06)] backdrop-blur-xl transition-all hover:border-indigo-500/40">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Left: Avatar + Title & Info */}
          <div className="flex items-center gap-4 min-w-0">
            {/* Glowing Octocat Circle */}
            <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-full border-2 border-indigo-400/50 bg-gradient-to-b from-[#181d3d] to-[#0c1026] shadow-[0_0_20px_rgba(99,102,241,0.45)]">
              <GithubIcon size={32} className="text-white" />
            </div>

            <div className="min-w-0 space-y-0.5">
              <div className="flex items-center gap-2.5">
                <h2 className="text-base sm:text-lg font-bold tracking-tight text-white leading-tight">GitHub</h2>
                {isGithubConnected ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.25)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                    Connected
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/80 px-2.5 py-0.5 text-[11px] font-medium text-slate-400">
                    Not connected
                  </span>
                )}
              </div>
              <p className="font-semibold text-sm sm:text-base text-white truncate">
                {user.githubUsername ? `@${user.githubUsername}` : "@unknown"}
              </p>
              <p className="text-xs text-slate-400">Connected via OAuth</p>
            </div>
          </div>

          {/* Right: Reconnect Action Button */}
          <form action={reconnectGithub} className="shrink-0">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl border border-indigo-400/25 bg-[#141933]/90 hover:bg-[#1b2246] hover:border-indigo-400/45 px-4 py-2 sm:px-4.5 sm:py-2.5 text-xs sm:text-sm font-medium text-slate-200 hover:text-white transition-all shadow-[0_0_15px_rgba(99,102,241,0.15)] cursor-pointer"
            >
              <RotateCcw size={14} className="text-slate-300" />
              <span>Reconnect GitHub</span>
              <ChevronRight size={14} className="text-slate-400" />
            </button>
          </form>
        </div>
      </div>

      {/* 2. Public Profile Card */}
      <div className="relative overflow-hidden rounded-[24px] border border-indigo-500/25 bg-[#090d1f]/90 p-5 sm:p-6 shadow-[0_0_35px_rgba(99,102,241,0.14),inset_0_1px_1px_rgba(255,255,255,0.06)] backdrop-blur-xl transition-all hover:border-indigo-500/40">
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-4">
            {/* Glowing Link Circle */}
            <div className="relative flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-full border-2 border-indigo-400/50 bg-gradient-to-b from-[#181d3d] to-[#0c1026] shadow-[0_0_20px_rgba(99,102,241,0.45)]">
              <Link2 size={22} className="text-indigo-300" />
            </div>

            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex items-center gap-2.5">
                <h2 className="text-base sm:text-lg font-bold tracking-tight text-white leading-tight">Public profile</h2>
                {user.publicProfileEnabled ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.25)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                    Public
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-800/80 px-2.5 py-0.5 text-[11px] font-medium text-slate-300">
                    Private
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed max-w-xl">
                A shareable, read-only link with your readiness score and stats — safe to put in a resume or LinkedIn.
                Applications, resume files, and target companies are never shown publicly.
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-end gap-3 pt-1">
            {user.publicProfileEnabled && publicUrl ? (
              <div className="flex w-full flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <CopyLink url={publicUrl} />
                </div>
                <form action={togglePublicProfile} className="shrink-0">
                  <input type="hidden" name="enable" value="false" />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-950/40 hover:bg-red-900/60 hover:border-red-500/50 px-4 py-2 text-xs font-semibold text-red-300 hover:text-white transition-all cursor-pointer"
                  >
                    <span>Disable public profile</span>
                  </button>
                </form>
              </div>
            ) : (
              <form action={togglePublicProfile}>
                <input type="hidden" name="enable" value="true" />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.45)] transition-all cursor-pointer"
                >
                  <Globe size={14} />
                  <span>Enable public profile</span>
                  <ChevronRight size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 3. Profile Details Card */}
      <div className="relative overflow-hidden rounded-[24px] border border-indigo-500/25 bg-[#090d1f]/90 p-6 sm:p-7 shadow-[0_0_35px_rgba(99,102,241,0.14),inset_0_1px_1px_rgba(255,255,255,0.06)] backdrop-blur-xl transition-all hover:border-indigo-500/40">
        {/* Header with Glowing User Avatar */}
        <div className="flex items-center gap-4 pb-2">
          <div className="relative flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-full border-2 border-indigo-400/50 bg-gradient-to-b from-[#181d3d] to-[#0c1026] shadow-[0_0_20px_rgba(99,102,241,0.45)]">
            <User size={22} className="text-indigo-300" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-tight">Profile Details</h2>
        </div>

        {/* Form Grid */}
        <form action={updateProfile} className="mt-5 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {/* Field 1: LeetCode username */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mb-1.5">
                <User size={13} className="text-slate-400" />
                <span>LeetCode username</span>
              </label>
              <div className="relative flex items-center">
                <User size={14} className="absolute left-3.5 text-slate-500 pointer-events-none" />
                <input
                  name="leetcodeUsername"
                  defaultValue={user.leetcodeUsername ?? ""}
                  placeholder="LeetCode username"
                  className="h-11 w-full rounded-xl border border-slate-700/70 bg-[#0b0e1e]/90 pl-10 pr-3.5 text-sm text-white placeholder:text-slate-600 transition-all focus:border-indigo-500/80 focus:bg-[#0e1226] focus:outline-none focus:ring-1 focus:ring-indigo-500/40 shadow-inner"
                />
              </div>
            </div>

            {/* Field 2: Target role */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mb-1.5">
                <Briefcase size={13} className="text-slate-400" />
                <span>Target role</span>
              </label>
              <div className="relative flex items-center">
                <select
                  name="targetRole"
                  defaultValue={user.targetRole ?? "Generative AI Engineer"}
                  className="h-11 w-full appearance-none rounded-xl border border-slate-700/70 bg-[#0b0e1e]/90 px-3.5 pr-10 text-sm text-white transition-all focus:border-indigo-500/80 focus:bg-[#0e1226] focus:outline-none focus:ring-1 focus:ring-indigo-500/40 shadow-inner cursor-pointer"
                >
                  {user.targetRole && !standardRoles.includes(user.targetRole) && (
                    <option value={user.targetRole} className="bg-[#0b0e1e] text-white">
                      {user.targetRole}
                    </option>
                  )}
                  {standardRoles.map((role) => (
                    <option key={role} value={role} className="bg-[#0b0e1e] text-white">
                      {role}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Field 3: Target companies */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mb-1.5">
                <Building2 size={13} className="text-slate-400" />
                <span>Target companies</span>
              </label>
              <div className="relative flex items-center">
                <input
                  name="targetCompanies"
                  defaultValue={user.targetCompanies ?? ""}
                  placeholder="Google, Microsoft, Amazon"
                  className="h-11 w-full rounded-xl border border-slate-700/70 bg-[#0b0e1e]/90 px-3.5 text-sm text-white placeholder:text-slate-600 transition-all focus:border-indigo-500/80 focus:bg-[#0e1226] focus:outline-none focus:ring-1 focus:ring-indigo-500/40 shadow-inner"
                />
              </div>
            </div>

            {/* Field 4: Job search status */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mb-1.5">
                <BarChart2 size={13} className="text-slate-400" />
                <span>Job search status</span>
              </label>
              <div className="relative flex items-center">
                <select
                  name="jobSearchStatus"
                  defaultValue={user.jobSearchStatus ?? "passive"}
                  className="h-11 w-full appearance-none rounded-xl border border-slate-700/70 bg-[#0b0e1e]/90 px-3.5 pr-10 text-sm text-white transition-all focus:border-indigo-500/80 focus:bg-[#0e1226] focus:outline-none focus:ring-1 focus:ring-indigo-500/40 shadow-inner cursor-pointer"
                >
                  <option value="passive" className="bg-[#0b0e1e] text-white">
                    Open to opportunities
                  </option>
                  <option value="active" className="bg-[#0b0e1e] text-white">
                    Actively applying
                  </option>
                  <option value="not_looking" className="bg-[#0b0e1e] text-white">
                    Not looking
                  </option>
                </select>
                <ChevronDown size={14} className="absolute right-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Field 5: Placement date (Full Width) */}
            <div className="sm:col-span-2">
              <label className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mb-1.5">
                <Calendar size={13} className="text-slate-400" />
                <span>Placement date (used to pace your goals)</span>
              </label>
              <div className="relative flex items-center">
                <User size={14} className="absolute left-3.5 text-slate-500 pointer-events-none" />
                <input
                  name="placementDate"
                  type="date"
                  defaultValue={user.placementDate ? user.placementDate.toISOString().slice(0, 10) : ""}
                  className="h-11 w-full rounded-xl border border-slate-700/70 bg-[#0b0e1e]/90 pl-10 pr-10 text-sm text-white placeholder:text-slate-600 transition-all focus:border-indigo-500/80 focus:bg-[#0e1226] focus:outline-none focus:ring-1 focus:ring-indigo-500/40 shadow-inner cursor-pointer [color-scheme:dark]"
                />
                <Calendar size={15} className="absolute right-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Field 6: Weekly Email Digest Checkbox (Full Width) */}
            <div className="sm:col-span-2 pt-1">
              <label className="flex items-start gap-3 cursor-pointer select-none group">
                <div className="relative flex items-center pt-0.5">
                  <input
                    type="checkbox"
                    name="digestEnabled"
                    defaultChecked={user.digestEnabled}
                    className="peer sr-only"
                  />
                  <div className="h-5 w-5 rounded-md border border-slate-600/80 bg-[#0b0e1e] transition-all peer-checked:border-indigo-400 peer-checked:bg-gradient-to-br peer-checked:from-indigo-600 peer-checked:to-purple-600 shadow-xs flex items-center justify-center">
                    <Check size={13} className="text-white opacity-0 peer-checked:opacity-100 transition-opacity stroke-[2.5]" />
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                    Send me a weekly email digest of my readiness score and nudges
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                    Get personalized tips, progress updates and opportunities straight to your inbox.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Save Changes Button (Bottom Right) */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-blue-500 hover:from-indigo-400 hover:to-blue-400 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-[0_0_22px_rgba(147,51,234,0.45)] transition-all cursor-pointer"
            >
              <Save size={15} />
              <span>Save changes</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </form>
      </div>

      {/* Sign Out Button (Bottom Left) */}
      <form action={doSignOut} className="pt-1">
        <button
          type="submit"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-400 hover:text-white transition-colors py-1 cursor-pointer"
        >
          <LogOut size={16} />
          <span>Sign out</span>
        </button>
      </form>
    </div>
  );
}
