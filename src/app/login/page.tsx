import { redirect } from "next/navigation";
import { auth, signIn } from "@/lib/auth";
import { GithubIcon } from "@/components/icons";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-8 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-accent font-data text-sm font-bold text-white">
          {"</>"}
        </div>
        <h1 className="text-lg font-semibold">CodeBoard</h1>
        <p className="mt-2 text-sm text-muted">
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
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            <GithubIcon size={16} />
            Continue with GitHub
          </button>
        </form>

        <p className="mt-4 text-xs text-muted">
          We use your GitHub sign-in to pull your public stats — repos, stars, and contributions.
        </p>
      </div>
    </div>
  );
}
