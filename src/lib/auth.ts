import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

// Auth.js normalizes each provider's profile down to {id, name, email, image}
// before it ever reaches events — GitHub's `login` (username) and
// `avatar_url` don't survive that mapping. So instead of trusting the
// `profile` argument in events below, we hit GitHub's API directly with the
// access token we just received. This is the reliable source of truth.
async function persistGithubProfile(userId: string, accessToken: string) {
  try {
    const res = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github+json",
      },
      cache: "no-store",
    });
    if (!res.ok) return;
    const gh = await res.json();
    await prisma.user.update({
      where: { id: userId },
      data: {
        githubId: String(gh.id),
        githubUsername: gh.login,
        githubAccessToken: accessToken,
        avatarUrl: gh.avatar_url ?? undefined,
        name: gh.name ?? gh.login ?? undefined,
      },
    });
  } catch {
    // Non-fatal — if this fails, the GitHub/LeetCode pages show a clear
    // "reconnect GitHub" state rather than silently looking empty.
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      // Request repo + read:user scope so we can pull contribution/stat data
      authorization: { params: { scope: "read:user user:email repo" } },
    }),
  ],
  session: { strategy: "database" },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  events: {
    async linkAccount({ user, account }) {
      if (account.provider === "github" && account.access_token && user.id) {
        await persistGithubProfile(user.id, account.access_token);
      }
    },
    async signIn({ user, account }) {
      // Refresh on every sign-in too, in case the token was rotated.
      if (account?.provider === "github" && account.access_token && user.id) {
        await persistGithubProfile(user.id, account.access_token);
      }
    },
  },
  pages: {
    signIn: "/login",
  },
});
