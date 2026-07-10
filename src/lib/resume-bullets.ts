import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "@/lib/prisma";

interface CachedLanguage {
  name: string;
  bytes: number;
}

interface CachedActivity {
  title: string;
  repo: string;
  type: string;
  date: string;
}

export interface ResumeBulletInput {
  targetRole: string | null;
  githubTopLanguages: string[];
  githubRecentWork: { title: string; repo: string; type: string }[];
  leetcodeTotals: { easy: number; medium: number; hard: number };
  applicationsInProgress: number;
  goalsCompleted: { label: string }[];
}

/**
 * Pulls the last 30 days of real activity for a user — no manual data entry
 * — so the bullets are grounded in what actually happened, not vibes.
 */
export async function buildResumeBulletInput(userId: string): Promise<ResumeBulletInput> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  let githubTopLanguages: string[] = [];
  let githubRecentWork: ResumeBulletInput["githubRecentWork"] = [];
  if (user?.githubStatsCache) {
    const stats = JSON.parse(user.githubStatsCache);
    githubTopLanguages = (stats.topLanguages ?? []).slice(0, 4).map((l: CachedLanguage) => l.name);
    githubRecentWork = (stats.recentActivity ?? [])
      .filter((a: CachedActivity) => new Date(a.date) >= thirtyDaysAgo)
      .slice(0, 10)
      .map((a: CachedActivity) => ({ title: a.title, repo: a.repo, type: a.type }));
  }

  let leetcodeTotals = { easy: 0, medium: 0, hard: 0 };
  if (user?.leetcodeStatsCache) {
    const stats = JSON.parse(user.leetcodeStatsCache);
    leetcodeTotals = { easy: stats.easySolved ?? 0, medium: stats.mediumSolved ?? 0, hard: stats.hardSolved ?? 0 };
  }

  const applicationsInProgress = await prisma.application.count({
    where: { userId, status: { in: ["applied", "oa_screen", "interview", "offer"] } },
  });

  const goalsCompleted = await prisma.goal.findMany({
    where: { userId, status: "completed" },
    select: { label: true },
    take: 5,
  });

  return {
    targetRole: user?.targetRole ?? null,
    githubTopLanguages,
    githubRecentWork,
    leetcodeTotals,
    applicationsInProgress,
    goalsCompleted,
  };
}

export async function generateResumeBullets(input: ResumeBulletInput): Promise<string[]> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not set — add it to your .env to enable this feature.");
  }
  if (input.githubRecentWork.length === 0 && input.leetcodeTotals.easy + input.leetcodeTotals.medium + input.leetcodeTotals.hard === 0) {
    throw new Error("Not enough recent activity yet to generate meaningful bullets. Give it a week.");
  }

  const client = new Anthropic({ apiKey });
  const prompt = `You write resume bullet points for a software engineering student/new grad based on their REAL, verified activity data. Never invent metrics or achievements not supported by the data below.

Target role: ${input.targetRole ?? "Software Engineer"}

Data from the last 30 days:
${JSON.stringify(input, null, 2)}

Write 3-5 resume bullet points. Rules:
- Start each with a strong action verb (Built, Implemented, Solved, Shipped, Optimized...)
- Only state things directly supported by the data — no invented percentages or team sizes
- Keep each bullet under 25 words, in past tense, no first person
- If the data is thin in a category, skip it rather than padding

Respond with ONLY a JSON array of strings, no markdown fences, no preamble. Example:
["Built and shipped 3 features across a TypeScript/Next.js codebase, including...", "Solved 12 medium-difficulty LeetCode problems focused on graph algorithms"]`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 500,
    messages: [{ role: "user", content: prompt }],
  });

  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("Claude did not return a text response.");
  }
  const cleaned = textBlock.text.replace(/```json|```/g, "").trim();
  try {
    const parsed = JSON.parse(cleaned);
    if (!Array.isArray(parsed)) throw new Error("not an array");
    return parsed.filter((b) => typeof b === "string");
  } catch {
    throw new Error("Could not parse Claude's response.");
  }
}
