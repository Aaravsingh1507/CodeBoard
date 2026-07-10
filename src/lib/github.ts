// Real GitHub API integration. Uses the user's OAuth access token so it
// can read contribution data (which requires an authenticated GraphQL call)
// as well as public repo/profile data.

const GITHUB_GRAPHQL = "https://api.github.com/graphql";
const GITHUB_REST = "https://api.github.com";

export interface GithubStats {
  login: string;
  avatarUrl: string;
  publicRepos: number;
  followers: number;
  totalStars: number;
  totalContributionsLastYear: number;
  contributionCalendar: { date: string; count: number }[]; // last ~365 days
  topLanguages: { name: string; bytes: number }[];
  recentActivity: {
    type: "commit" | "pr" | "issue";
    title: string;
    url: string;
    repo: string;
    date: string;
  }[];
}

interface GraphQLError {
  message: string;
}

interface GithubRepo {
  stargazerCount: number;
  languages?: {
    edges: { size: number; node: { name: string } }[];
  };
}

interface ContributionDay {
  date: string;
  contributionCount: number;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface GithubEvent {
  type: string;
  repo: { name: string };
  created_at: string;
  payload: {
    action?: string;
    commits?: { sha: string; message: string }[];
    pull_request?: { title: string; html_url: string };
    issue?: { title: string; html_url: string };
  };
}

async function githubGraphQL(token: string, query: string, variables: Record<string, unknown>) {
  const res = await fetch(GITHUB_GRAPHQL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    // never cache — the caller decides its own cache window
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`GitHub GraphQL error: ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors.map((e: GraphQLError) => e.message).join("; "));
  return json.data;
}

async function githubRest(token: string, path: string) {
  const res = await fetch(`${GITHUB_REST}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`GitHub REST error: ${res.status} on ${path}`);
  return res.json();
}

const CONTRIBUTIONS_QUERY = `
  query($login: String!) {
    user(login: $login) {
      login
      avatarUrl
      followers { totalCount }
      repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
        totalCount
        nodes {
          stargazerCount
          languages(first: 5, orderBy: { field: SIZE, direction: DESC }) {
            edges { size node { name } }
          }
        }
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays { date contributionCount }
          }
        }
      }
    }
  }
`;

export async function fetchGithubStats(login: string, token: string): Promise<GithubStats> {
  const data = await githubGraphQL(token, CONTRIBUTIONS_QUERY, { login });
  const u = data.user;

  const langTotals = new Map<string, number>();
  let totalStars = 0;
  for (const repo of u.repositories.nodes as GithubRepo[]) {
    totalStars += repo.stargazerCount ?? 0;
    for (const edge of repo.languages?.edges ?? []) {
      const name = edge.node.name;
      langTotals.set(name, (langTotals.get(name) ?? 0) + edge.size);
    }
  }
  const topLanguages = [...langTotals.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, bytes]) => ({ name, bytes }));

  const calendar = u.contributionsCollection.contributionCalendar;
  const contributionCalendar = calendar.weeks.flatMap((w: ContributionWeek) =>
    w.contributionDays.map((d: ContributionDay) => ({ date: d.date, count: d.contributionCount }))
  );

  // Recent activity via REST (public events endpoint — simplest reliable source)
  const events = await githubRest(token, `/users/${login}/events/public?per_page=30`);
  const recentActivity = (events as GithubEvent[])
    .filter((e) => ["PushEvent", "PullRequestEvent", "IssuesEvent"].includes(e.type))
    .slice(0, 10)
    .map((e) => {
      if (e.type === "PushEvent") {
        const commit = e.payload.commits?.[e.payload.commits.length - 1];
        return {
          type: "commit" as const,
          title: commit?.message?.split("\n")[0] ?? "Pushed commits",
          url: `https://github.com/${e.repo.name}/commit/${commit?.sha ?? ""}`,
          repo: e.repo.name,
          date: e.created_at,
        };
      }
      if (e.type === "PullRequestEvent") {
        return {
          type: "pr" as const,
          title: `${e.payload.action}: ${e.payload.pull_request?.title}`,
          url: e.payload.pull_request?.html_url ?? "",
          repo: e.repo.name,
          date: e.created_at,
        };
      }
      return {
        type: "issue" as const,
        title: `${e.payload.action}: ${e.payload.issue?.title}`,
        url: e.payload.issue?.html_url ?? "",
        repo: e.repo.name,
        date: e.created_at,
      };
    });

  return {
    login: u.login,
    avatarUrl: u.avatarUrl,
    publicRepos: u.repositories.totalCount,
    followers: u.followers.totalCount,
    totalStars,
    totalContributionsLastYear: calendar.totalContributions,
    contributionCalendar,
    topLanguages,
    recentActivity,
  };
}

// How many hours cached GitHub stats stay fresh before a refetch is allowed.
export const GITHUB_CACHE_HOURS = 4;
