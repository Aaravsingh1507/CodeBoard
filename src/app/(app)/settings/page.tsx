import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) redirect("/login");

  async function updateProfile(formData: FormData) {
    "use server";
    const s = await auth();
    if (!s?.user) redirect("/login");

    await prisma.user.update({
      where: { id: s.user.id },
      data: {
        leetcodeUsername: String(formData.get("leetcodeUsername") ?? "").trim() || null,
        targetRole: String(formData.get("targetRole") ?? "").trim() || null,
        targetCompanies: String(formData.get("targetCompanies") ?? "").trim() || null,
        jobSearchStatus: String(formData.get("jobSearchStatus") ?? "not_looking"),
      },
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

  return (
    <div className="max-w-xl">
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Settings</h1>
        <p className="mt-1 text-sm text-muted">Your profile and connections.</p>
      </div>

      <Card className="mb-5 p-5">
        <h2 className="mb-4 text-sm font-semibold">GitHub</h2>
        <div className="mb-4 flex items-center gap-3">
          {user.avatarUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.avatarUrl} alt="" className="h-10 w-10 rounded-full" />
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
            <Input name="targetCompanies" defaultValue={user.targetCompanies ?? ""} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted">Job search status</label>
            <Select name="jobSearchStatus" defaultValue={user.jobSearchStatus ?? "not_looking"}>
              <option value="not_looking">Not looking</option>
              <option value="passive">Open to opportunities</option>
              <option value="active">Actively applying</option>
            </Select>
          </div>
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
