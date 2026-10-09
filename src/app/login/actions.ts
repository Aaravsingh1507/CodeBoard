"use server";

import { signIn } from "@/lib/auth";
import { fetchLeetcodeStats } from "@/lib/leetcode";

export async function loginWithLeetcodeAction(
  username: string
): Promise<{ error?: string }> {
  const clean = username.trim();
  if (!clean) {
    return { error: "Please enter your LeetCode username." };
  }

  // Pre-validate that the username actually exists on LeetCode
  try {
    const stats = await fetchLeetcodeStats(clean);
    if (!stats || !stats.username) {
      return { error: `LeetCode user "${clean}" was not found.` };
    }
  } catch {
    return {
      error: `Could not find LeetCode user "${clean}". Please check your spelling.`,
    };
  }

  try {
    await signIn("leetcode", {
      username: clean,
      redirectTo: "/dashboard",
    });
    return {};
  } catch (error: any) {
    // Next.js redirect errors have digest starting with NEXT_REDIRECT. Must re-throw to complete redirect!
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    return { error: "Sign in failed. Please try again." };
  }
}
