import Anthropic from "@anthropic-ai/sdk";

export interface WeeklyReviewInput {
  githubContributionsThisWeek: number;
  githubPRsThisWeek: number;
  leetcodeSubmissionsThisWeek: number;
  leetcodeTotalsAllTime: { easy: number; medium: number; hard: number };
  currentStreak: number;
  longestStreak: number;
  applicationsAdded: number;
  applicationsAdvanced: number;
  goalsProgress: { label: string; current: number; target: number }[];
}

export interface WeeklyReviewOutput {
  summary: string;
  observations: string[];
  suggestions: string[];
}

export async function generateWeeklyReview(input: WeeklyReviewInput): Promise<WeeklyReviewOutput> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not set — add it to your .env to enable AI reviews.");
  }
  const client = new Anthropic({ apiKey });

  const prompt = `You are a supportive but honest coding coach reviewing a developer's week.
Here is their structured activity data for the past 7 days:

${JSON.stringify(input, null, 2)}

Respond with ONLY valid JSON, no markdown fences, no preamble, matching exactly this shape:
{
  "summary": "a short (2-3 sentence) encouraging summary of the week",
  "observations": ["2-3 concrete, specific observations about what happened this week"],
  "suggestions": ["2-3 concrete, actionable suggestions for next week"]
}`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1000,
    messages: [{ role: "user", content: prompt }],
  });

  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("Claude did not return a text response.");
  }

  const cleaned = textBlock.text.replace(/```json|```/g, "").trim();
  try {
    const parsed = JSON.parse(cleaned);
    return {
      summary: parsed.summary ?? "",
      observations: Array.isArray(parsed.observations) ? parsed.observations : [],
      suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
    };
  } catch {
    throw new Error("Could not parse Claude's response as JSON.");
  }
}
