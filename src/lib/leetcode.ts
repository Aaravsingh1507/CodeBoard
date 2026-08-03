// LeetCode has no official public API. This uses the unofficial GraphQL
// endpoint that leetcode.com's own frontend calls. It's public data (no
// auth needed for a username's solved counts / recent submissions), but
// since it's unofficial it can change or rate-limit without notice — every
// caller of this module MUST catch errors and fall back to cached data.

const LEETCODE_GRAPHQL = "https://leetcode.com/graphql";

export interface LeetcodeStats {
  username: string;
  ranking: number | null;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  recentSubmissions: {
    title: string;
    difficulty: string;
    status: string;
    timestamp: string;
  }[];
  topicBreakdown: { tag: string; solved: number; level: "fundamental" | "intermediate" | "advanced" }[];
}

const PROFILE_QUERY = `
  query userProfile($username: String!) {
    matchedUser(username: $username) {
      username
      profile { ranking }
      submitStats {
        acSubmissionNum { difficulty count }
      }
      tagProblemCounts {
        fundamental { tagName problemsSolved }
        intermediate { tagName problemsSolved }
        advanced { tagName problemsSolved }
      }
    }
    recentSubmissionList(username: $username, limit: 15) {
      title
      titleSlug
      timestamp
      statusDisplay
    }
  }
`;

export class LeetcodeFetchError extends Error {}

export async function fetchLeetcodeStats(username: string): Promise<LeetcodeStats> {
  let res: Response;
  try {
    res = await fetch(LEETCODE_GRAPHQL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // LeetCode's endpoint expects a browser-like referer or it may 403.
        Referer: `https://leetcode.com/${username}/`,
      },
      body: JSON.stringify({ query: PROFILE_QUERY, variables: { username } }),
      cache: "no-store",
    });
  } catch {
    throw new LeetcodeFetchError("Could not reach LeetCode — network error.");
  }

  if (!res.ok) {
    throw new LeetcodeFetchError(`LeetCode responded with ${res.status}.`);
  }

  const json = await res.json();
  if (json.errors || !json.data?.matchedUser) {
    throw new LeetcodeFetchError("LeetCode username not found or API shape changed.");
  }

  const acStats = json.data.matchedUser.submitStats.acSubmissionNum as {
    difficulty: string;
    count: number;
  }[];
  const find = (d: string) => acStats.find((s) => s.difficulty === d)?.count ?? 0;

  const tagCounts = json.data.matchedUser.tagProblemCounts ?? {
    fundamental: [],
    intermediate: [],
    advanced: [],
  };
  const topicBreakdown: LeetcodeStats["topicBreakdown"] = [
    ...tagCounts.fundamental.map((t: any) => ({ tag: t.tagName, solved: t.problemsSolved, level: "fundamental" as const })),
    ...tagCounts.intermediate.map((t: any) => ({ tag: t.tagName, solved: t.problemsSolved, level: "intermediate" as const })),
    ...tagCounts.advanced.map((t: any) => ({ tag: t.tagName, solved: t.problemsSolved, level: "advanced" as const })),
  ]
    .filter((t) => t.solved > 0)
    .sort((a, b) => b.solved - a.solved);

  return {
    username: json.data.matchedUser.username,
    ranking: json.data.matchedUser.profile?.ranking ?? null,
    totalSolved: find("All"),
    easySolved: find("Easy"),
    mediumSolved: find("Medium"),
    hardSolved: find("Hard"),
    topicBreakdown,
    recentSubmissions: (json.data.recentSubmissionList ?? []).map((s: any) => ({
      title: s.title,
      difficulty: "", // recentSubmissionList doesn't include difficulty directly
      status: s.statusDisplay,
      timestamp: s.timestamp,
    })),
  };
}

export const LEETCODE_CACHE_HOURS = 4;
