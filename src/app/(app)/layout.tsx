import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AppShell } from "@/components/app-shell";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, avatarUrl: true, githubUsername: true, onboarded: true },
  });

  if (!user) redirect("/login");
  if (!user.onboarded) redirect("/onboarding");

  return <AppShell user={user}>{children}</AppShell>;
}
