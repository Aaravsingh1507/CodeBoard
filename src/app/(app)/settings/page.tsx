import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth, signIn, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ensurePublicSlug } from "@/lib/public-profile";
import { Card } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CopyLink } from "@/components/copy-link";

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

  return (
    <div className="max-w-xl">
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Settings</h1>
        <p className="mt-1 text-sm text-muted">Your profile and connections.</p>
      </div>

      <Card className="mb-5 p-5">
        <h2 className="mb-4 text-sm font-semibold">GitHub</h2>
        <div className="mb-4 flex items-center gap-3">
          {user.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt="" className="h-10 w-10 rounded-full" />
          )}
          <div>
            <p className="text-sm text-foreground">@{user.githubUsername}</p>
            <p className="text-xs text-muted">Connected via OAuth</p>
          </div>
        </div>
        <form action={reconnectGithub}>
          <Button type="submit" variant="secondary" size="sm">
            Reconnect GitHub
          </Button>
        </form>
      </Card>

      <Card className="mb-5 p-5">
        <h2 className="mb-1 text-sm font-semibold">Public profile</h2>
        <p className="mb-4 text-xs text-muted">
          A shareable, read-only link with your readiness score and stats — safe to put in a resume
          or LinkedIn. Applications, resume files, and target companies are never shown publicly.
        </p>
        {user.publicProfileEnabled && publicUrl ? (
          <div className="space-y-3">
            <CopyLink url={publicUrl} />
            <form action={togglePublicProfile}>
              <input type="hidden" name="enable" value="false" />
              <Button type="submit" variant="secondary" size="sm">
                Disable public profile
              </Button>
            </form>
          </div>
        ) : (
          <form action={togglePublicProfile}>
            <input type="hidden" name="enable" value="true" />
            <Button type="submit" variant="secondary" size="sm">
              Enable public profile
            </Button>
          </form>
        )}
      </Card>

      <Card className="p-5">
        <h2 className="mb-4 text-sm font-semibold">Profile</h2>
        <form action={updateProfile} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted">LeetCode username</label>
            <Input name="leetcodeUsername" defaultValue={user.leetcodeUsername ?? ""} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted">Target role</label>
            <Input name="targetRole" defaultValue={user.targetRole ?? ""} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted">Target companies</label>
            <Input name="targetCompanies" defaultValue={user.targetCompanies ?? ""} placeholder="e.g. Amazon, Flipkart, Razorpay" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted">Job search status</label>
            <Select name="jobSearchStatus" defaultValue={user.jobSearchStatus ?? "not_looking"}>
              <option value="not_looking">Not looking</option>
              <option value="passive">Open to opportunities</option>
              <option value="active">Actively applying</option>
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted">
              Placement date <span className="text-muted/70">(used to pace your goals)</span>
            </label>
            <Input
              name="placementDate"
              type="date"
              defaultValue={user.placementDate ? user.placementDate.toISOString().slice(0, 10) : ""}
            />
          </div>
          <label className="flex items-center gap-2 text-xs text-muted">
            <input type="checkbox" name="digestEnabled" defaultChecked={user.digestEnabled} className="h-3.5 w-3.5" />
            Send me a weekly email digest of my readiness score and nudges
          </label>
          <Button type="submit">Save changes</Button>
        </form>
      </Card>

      <form action={doSignOut} className="mt-5">
        <Button type="submit" variant="ghost" size="sm">
          Sign out
        </Button>
      </form>
    </div>
  );
}
