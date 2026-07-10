import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function OnboardingPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) redirect("/login");
  if (user.onboarded) redirect("/dashboard");

  async function completeOnboarding(formData: FormData) {
    "use server";
    const s = await auth();
    if (!s?.user) redirect("/login");

    const leetcodeUsername = String(formData.get("leetcodeUsername") ?? "").trim();
    const targetRole = String(formData.get("targetRole") ?? "").trim();
    const targetCompanies = String(formData.get("targetCompanies") ?? "").trim();
    const jobSearchStatus = String(formData.get("jobSearchStatus") ?? "not_looking");

    await prisma.user.update({
      where: { id: s.user.id },
      data: {
        leetcodeUsername: leetcodeUsername || null,
        targetRole: targetRole || null,
        targetCompanies: targetCompanies || null,
        jobSearchStatus,
        onboarded: true,
      },
    });

    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-sm">
        <h1 className="text-lg font-semibold">Set up your dashboard</h1>
        <p className="mt-1 text-sm text-muted">
          Signed in as <span className="font-data text-foreground">@{user.githubUsername}</span>. A
          couple more details and you&apos;re in.
        </p>

        <form action={completeOnboarding} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted">
              LeetCode username <span className="text-muted/70">(optional)</span>
            </label>
            <Input name="leetcodeUsername" placeholder="e.g. aarav_codes" />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-muted">
              Target role <span className="text-muted/70">(optional)</span>
            </label>
            <Input name="targetRole" placeholder="e.g. SDE Intern, Frontend Engineer" />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-muted">
              Target companies <span className="text-muted/70">(optional)</span>
            </label>
            <Input name="targetCompanies" placeholder="e.g. Google, Razorpay, Flipkart" />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-muted">Job search status</label>
            <Select name="jobSearchStatus" defaultValue="passive">
              <option value="not_looking">Not looking</option>
              <option value="passive">Open to opportunities</option>
              <option value="active">Actively applying</option>
            </Select>
          </div>

          <Button type="submit" className="w-full">
            Continue to dashboard
          </Button>
        </form>
      </div>
    </div>
  );
}
