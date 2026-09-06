import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { auth, signIn } from "@/lib/auth";
import { GithubIcon } from "@/components/icons";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#080c17] px-4">
      {/* Subtle Ambient Nebula Glows */}
      <div className="pointer-events-none absolute right-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-purple-600/15 blur-[140px]" />
      <div className="pointer-events-none absolute left-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-indigo-600/15 blur-[140px]" />

      <div className="relative z-10 w-full max-w-sm rounded-[24px] border border-[#1e263d] bg-gradient-to-b from-[#111728]/95 to-[#0d1220]/95 p-8 text-center shadow-2xl shadow-black/60 backdrop-blur-md">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 font-mono text-sm font-bold text-white shadow-lg shadow-indigo-500/30">
          {"</>"}
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight text-white">
          Code<span className="text-[#818cf8]">Board</span>
        </h1>
        <p className="mt-2 text-xs text-slate-400 leading-relaxed">
          One score for how placement-ready you actually are — built from your real GitHub, LeetCode,
          and application activity.
        </p>

        <form
          className="mt-6"
          action={async () => {
            "use server";
            await signIn("github", { redirectTo: "/onboarding" });
          }}
        >
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:from-indigo-500 hover:to-violet-500 shadow-md shadow-indigo-500/25 active:scale-[0.99]"
          >
            <GithubIcon size={16} />
            Continue with GitHub
          </button>
        </form>

        <p className="mt-4 text-xs text-slate-500">
          We use your GitHub sign-in to pull your public stats — repos, stars, and contributions.
        </p>

        <div className="mt-5 border-t border-border/60 pt-4">
          <Link
            href="/preview"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white"
          >
            <span>Explore Live Dashboard Demo</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
