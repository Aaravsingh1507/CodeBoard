import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";

export const metadata = {
  title: "Aarav Singh — Portfolio & CodeBoard",
  description:
    "AI/ML Enthusiast | Python & Web Developer | B.Tech CSE (AI) at NIET Greater Noida. Creator of CodeBoard — the placement-readiness dashboard.",
};

export default async function RootPage() {
  const session = await auth();

  // If already logged in, go straight to dashboard
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#050507] text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Ambient background glows */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139,92,246,0.18) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(239,68,68,0.12) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center max-w-2xl">
        {/* Name */}
        <h1
          className="text-5xl sm:text-7xl font-black tracking-tight leading-none"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Aarav{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #a78bfa 0%, #f472b6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Singh
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-lg sm:text-xl text-white/60 font-medium max-w-md leading-relaxed">
          B.Tech CSE (AI) · NIET Greater Noida
          <br />
          AI/ML Enthusiast &amp; Python Developer
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href="/portfolio"
            className="group px-8 py-4 rounded-2xl font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
              boxShadow: "0 0 32px rgba(139,92,246,0.4)",
            }}
          >
            View Portfolio
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>

          <Link
            href="/login"
            className="px-8 py-4 rounded-2xl font-semibold text-base border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Launch CodeBoard
            <span className="text-white/40">↗</span>
          </Link>
        </div>

        {/* Subtle badge */}
        <p className="text-xs text-white/25 font-mono">
          codeboard-rho.vercel.app
        </p>
      </div>
    </main>
  );
}
