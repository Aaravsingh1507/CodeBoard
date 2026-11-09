import Groq from "groq-sdk";

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
  targetRole?: string;
  targetCompanies?: string;
  jobSearchStatus?: string;
}

export interface WeeklyReviewOutput {
  summary: string;
  observations: string[];
  suggestions: string[];
}

function cleanAndParseJSON(text: string): WeeklyReviewOutput {
  const stripped = text.replace(/```json/gi, "").replace(/```/g, "").trim();
  const firstBrace = stripped.indexOf("{");
  const lastBrace = stripped.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error("No JSON object found in response");
  }

  const jsonStr = stripped.slice(firstBrace, lastBrace + 1);
  const parsed = JSON.parse(jsonStr);

  const summary = typeof parsed.summary === "string" && parsed.summary.trim() ? parsed.summary.trim() : "";
  const observations = Array.isArray(parsed.observations)
    ? parsed.observations.filter((o: unknown): o is string => typeof o === "string" && o.trim().length > 0)
    : [];
  const suggestions = Array.isArray(parsed.suggestions)
    ? parsed.suggestions.filter((s: unknown): s is string => typeof s === "string" && s.trim().length > 0)
    : [];

  if (!summary && observations.length === 0 && suggestions.length === 0) {
    throw new Error("Parsed JSON did not contain review fields");
  }

  return { summary, observations, suggestions };
}

/**
 * Intelligent deterministic fallback review in case Groq API is temporarily
 * rate-limited, unreachable, or experiencing service disruption.
 */
export function generateFallbackWeeklyReview(input: WeeklyReviewInput): WeeklyReviewOutput {
  const totalActivity = input.githubContributionsThisWeek + input.leetcodeSubmissionsThisWeek;
  const roleText = input.targetRole ? ` towards your goal of ${input.targetRole}` : "";

  let summary = "";
  if (totalActivity === 0) {
    summary = `You took a lighter pace this week with your coding activity${roleText}. Rest and recovery are a natural part of the journey — use this upcoming week to rebuild your daily rhythm with small, consistent sessions.`;
  } else if (totalActivity < 10) {
    summary = `Solid steady effort this week with ${input.githubContributionsThisWeek} GitHub contribution${input.githubContributionsThisWeek === 1 ? "" : "s"} and ${input.leetcodeSubmissionsThisWeek} LeetCode submission${input.leetcodeSubmissionsThisWeek === 1 ? "" : "s"}${roleText}. You maintained active momentum across your core tracking metrics.`;
  } else {
    summary = `Outstanding high-output week! You logged ${input.githubContributionsThisWeek} GitHub contribution${input.githubContributionsThisWeek === 1 ? "" : "s"} and ${input.leetcodeSubmissionsThisWeek} LeetCode submission${input.leetcodeSubmissionsThisWeek === 1 ? "" : "s"}, keeping your momentum strong${roleText}.`;
  }

  const observations: string[] = [];
  if (input.currentStreak > 0) {
    observations.push(
      `You hold an active streak of ${input.currentStreak} day${input.currentStreak === 1 ? "" : "s"} (personal best: ${input.longestStreak} days).`
    );
  } else {
    observations.push(`Your current streak reset this week. Your longest historical streak is ${input.longestStreak} days.`);
  }

  if (input.githubContributionsThisWeek > 0 || input.githubPRsThisWeek > 0) {
    observations.push(
      `Recorded ${input.githubContributionsThisWeek} commit/issue action${input.githubContributionsThisWeek === 1 ? "" : "s"} and ${input.githubPRsThisWeek} pull request${input.githubPRsThisWeek === 1 ? "" : "s"} on GitHub this week.`
    );
  } else {
    observations.push("No GitHub commits or pull requests were logged in the past 7 days.");
  }

  if (input.leetcodeSubmissionsThisWeek > 0) {
    const totalSolved = input.leetcodeTotalsAllTime.easy + input.leetcodeTotalsAllTime.medium + input.leetcodeTotalsAllTime.hard;
    observations.push(
      `Submitted ${input.leetcodeSubmissionsThisWeek} solution${input.leetcodeSubmissionsThisWeek === 1 ? "" : "s"} to LeetCode this week (all-time solved: ${totalSolved} — ${input.leetcodeTotalsAllTime.medium} Mediums, ${input.leetcodeTotalsAllTime.hard} Hards).`
    );
  } else {
    observations.push("No LeetCode problem submissions were recorded during this 7-day period.");
  }

  if (input.applicationsAdded > 0 || input.applicationsAdvanced > 0) {
    observations.push(
      `Job pipeline: Added ${input.applicationsAdded} new application${input.applicationsAdded === 1 ? "" : "s"} and advanced ${input.applicationsAdvanced} stage${input.applicationsAdvanced === 1 ? "" : "s"}.`
    );
  }

  const suggestions: string[] = [];
  if (input.leetcodeSubmissionsThisWeek < 5) {
    suggestions.push(
      input.targetRole
        ? `Target 1 Medium DSA problem per day focused on patterns commonly tested for ${input.targetRole} roles (e.g. Two Pointers, Trees, Dynamic Programming).`
        : "Dedicate 30 minutes to solve at least 3-4 Medium difficulty LeetCode problems this week to sharpen problem-solving speed."
    );
  } else {
    suggestions.push("Maintain your problem-solving rhythm by reviewing earlier problems and attempting at least 1 Hard problem this week.");
  }

  if (input.githubContributionsThisWeek < 7) {
    suggestions.push("Commit incremental daily code changes or open a new feature branch to establish daily GitHub activity.");
  } else {
    suggestions.push("Package your recent work into well-documented pull requests with clear commit messages and tests.");
  }

  if (input.applicationsAdded === 0 && input.jobSearchStatus !== "not_looking") {
    suggestions.push(
      input.targetCompanies
        ? `Research openings and reach out to engineers or recruiters at your target companies: ${input.targetCompanies}.`
        : "Identify 3-5 target roles and submit tailored applications to keep your interview pipeline active."
    );
  }

  return {
    summary,
    observations: observations.slice(0, 3),
    suggestions: suggestions.slice(0, 3),
  };
}

export async function generateWeeklyReview(input: WeeklyReviewInput): Promise<WeeklyReviewOutput> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    // If no API key configured, seamlessly fall back to deterministic review rather than crashing
    return generateFallbackWeeklyReview(input);
  }

  const client = new Groq({ apiKey });

  const roleContext = input.targetRole
    ? `User Target Role: ${input.targetRole}\nTarget Companies: ${input.targetCompanies ?? "Not specified"}\nJob Search Status: ${input.jobSearchStatus ?? "Active"}\n`
    : "";

  const prompt = `You are a supportive, insightful, and practical senior engineering coach reviewing a developer's weekly activity.
${roleContext}
Here is their structured activity data for the past 7 days:
${JSON.stringify(input, null, 2)}

Provide a tailored, encouraging, yet candid review.
Guidelines:
1. "summary": 2-3 sentences providing an authentic assessment of their weekly momentum and effort.
2. "observations": Exactly 2 to 3 concise, specific bullet points highlighting what they achieved (citing real numbers: commits, PRs, LeetCode, streaks, applications).
3. "suggestions": Exactly 2 to 3 actionable, high-impact recommendations for the upcoming week (tailored to their role/goals if provided, balancing DSA, project development, and career growth).

Respond with ONLY valid JSON adhering strictly to this schema:
{
  "summary": "...",
  "observations": ["...", "..."],
  "suggestions": ["...", "..."]
}`;

  const candidateModels = [
    process.env.GROQ_MODEL ?? "openai/gpt-oss-120b",
    "openai/gpt-oss-20b",
    "llama-3.3-70b-versatile",
  ];

  for (const model of candidateModels) {
    try {
      const response = await client.chat.completions.create({
        model,
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1000,
        temperature: 0.6,
        response_format: { type: "json_object" },
      });

      const text = response.choices[0]?.message?.content ?? "";
      if (text) {
        const parsed = cleanAndParseJSON(text);
        if (parsed.summary && parsed.observations.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn(`[weekly-review] Model ${model} generation failed, trying next option:`, err);
    }
  }

  // Graceful fallback if all API models fail
  return generateFallbackWeeklyReview(input);
}
