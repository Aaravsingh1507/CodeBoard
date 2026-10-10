import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { auth, signIn } from "@/lib/auth";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

import { LeetcodeLoginForm } from "@/components/auth/leetcode-login-form";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to CodeBoard with GitHub or LeetCode. Track your coding activity, LeetCode practice, and job applications in one place.",
  alternates: {
    canonical: "/",
  },
};

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#080c17] px-4 py-8">
      {/* Subtle Ambient Nebula Glows */}
      <div className="pointer-events-none absolute right-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-purple-600/15 blur-[140px]" />
      <div className="pointer-events-none absolute left-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-indigo-600/15 blur-[140px]" />

      <div className="relative z-10 w-full max-w-sm rounded-[24px] border border-[#1e263d] bg-gradient-to-b from-[#111728]/95 to-[#0d1220]/95 p-6 sm:p-8 text-center shadow-2xl shadow-black/60 backdrop-blur-md">
        <div className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center overflow-hidden rounded-2xl shadow-xl shadow-purple-900/40 border border-purple-500/30 ring-1 ring-purple-500/20">
          <Image
            src="/logo.png"
            alt="CodeBoard Logo"
            width={64}
            height={64}
            priority
            className="h-full w-full object-cover"
          />
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight text-white">
          Code<span className="text-[#818cf8]">Board</span>
        </h1>
        <p className="mt-2 text-xs text-slate-400 leading-relaxed">
          One unified dashboard for your placement prep — built from your real GitHub, LeetCode,
          and application activity.
        </p>

        {/* Option 1: GitHub */}
        <form
          className="mt-6"
          action={async () => {
            "use server";
            await signIn("github", { redirectTo: "/onboarding" });
          }}
        >
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white transition-all hover:from-indigo-500 hover:to-violet-500 shadow-md shadow-indigo-500/25 active:scale-[0.99] cursor-pointer"
          >
            <GithubIcon size={16} />
            Continue with GitHub
          </button>
        </form>

        {/* Divider */}
        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-800" />
          <span className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
            or with LeetCode
          </span>
          <div className="h-px flex-1 bg-slate-800" />
        </div>

        {/* Option 2: LeetCode Username */}
        <LeetcodeLoginForm />

        <p className="mt-4 text-[11px] text-slate-500 leading-relaxed">
          Sign in with GitHub or your LeetCode username to automatically pull your real activity and track your prep.
        </p>

        <div className="mt-6 border-t border-[#1e263d]/80 pt-4 text-center">
          <Link
            href="/preview"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-400 transition-colors hover:text-indigo-300"
          >
            <span>Explore live interactive demo</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      {/* Creator Attribution Footer for SEO & Knowledge Graph Linking */}
      <footer className="relative z-10 mt-8 text-center">
        <p className="text-xs text-slate-400">
          Created by{" "}
          <span className="font-semibold text-slate-200">Aarav Singh</span>
        </p>
        <div className="mt-2.5 flex items-center justify-center gap-3 text-xs text-slate-400">
          <a
            href="https://github.com/Aaravsingh1507"
            target="_blank"
            rel="noopener noreferrer author"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/60 px-2.5 py-1 text-slate-300 transition-all hover:border-slate-700 hover:text-white hover:bg-slate-800/80"
          >
            <GithubIcon size={13} />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/aarav-singh-821806388"
            target="_blank"
            rel="noopener noreferrer author"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/60 px-2.5 py-1 text-slate-300 transition-all hover:border-blue-500/40 hover:text-[#38bdf8] hover:bg-slate-800/80"
          >
            <LinkedinIcon size={13} />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://aarav-portfolio-1f2b9.web.app/"
            target="_blank"
            rel="noopener noreferrer author"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/60 px-2.5 py-1 text-slate-300 transition-all hover:border-purple-500/40 hover:text-purple-300 hover:bg-slate-800/80"
          >
            <span>Portfolio</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
