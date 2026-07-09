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
}

const PROFILE_QUERY = `
  query userProfile($username: String!) {
    matchedUser(username: $username) {
      username
      profile { ranking }
      submitStats {
        acSubmissionNum { difficulty count }
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

  return {
    username: json.data.matchedUser.username,
    ranking: json.data.matchedUser.profile?.ranking ?? null,
    totalSolved: find("All"),
    easySolved: find("Easy"),
    mediumSolved: find("Medium"),
    hardSolved: find("Hard"),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recentSubmissions: (json.data.recentSubmissionList ?? []).map((s: any) => ({
      title: s.title,
      difficulty: "", // recentSubmissionList doesn't include difficulty directly
      status: s.statusDisplay,
      timestamp: s.timestamp,
    })),
  };
}

export const LEETCODE_CACHE_HOURS = 4;
