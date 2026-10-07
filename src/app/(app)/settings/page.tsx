import { redirect } from "next/navigation";
import { headers } from "next/headers";
import {
  Link2,
  User,
  LogOut,
} from "lucide-react";
import { auth, signIn, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ensurePublicSlug } from "@/lib/public-profile";
import { GithubIcon } from "@/components/icons";
import { ProfileDetailsForm } from "@/components/settings/profile-details-form";
import { ReconnectGithubButton } from "@/components/settings/reconnect-github-button";
import { PublicProfileToggle } from "@/components/settings/public-profile-toggle";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const user = await prisma.user.findUnique({ where: { id: (session.user as any).id } });
  if (!user) redirect("/login");

  const hdrs = await headers();
  const origin = `${hdrs.get("x-forwarded-proto") ?? "http"}://${hdrs.get("host") ?? "localhost:3000"}`;

  async function updateProfile(formData: FormData) {
    "use server";
    const s = await auth();
    if (!s?.user) return { success: false, error: "Not authenticated" };

    const placementDateRaw = String(formData.get("placementDate") ?? "").trim();

    try {
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
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || "Failed to update profile." };
    }
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

          {/* Right: Reconnect Action Button with Animation */}
          <ReconnectGithubButton action={reconnectGithub} />
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

          {/* Action Row with Animation */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-end gap-3 pt-1">
            <PublicProfileToggle
              isEnabled={Boolean(user.publicProfileEnabled)}
              publicUrl={publicUrl}
              action={togglePublicProfile}
            />
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

        {/* Real Profile Details Form with Animations */}
        <ProfileDetailsForm
          initialData={{
            leetcodeUsername: user.leetcodeUsername,
            targetRole: user.targetRole,
            targetCompanies: user.targetCompanies,
            jobSearchStatus: user.jobSearchStatus,
            placementDate: user.placementDate ? user.placementDate.toISOString().slice(0, 10) : null,
            digestEnabled: user.digestEnabled,
          }}
          standardRoles={standardRoles}
          action={updateProfile}
        />
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
