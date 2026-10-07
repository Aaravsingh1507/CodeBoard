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
  following: number;
  totalStars: number;
  totalForks: number;
  totalWatchers: number;
  totalPRs: number;
  totalIssues: number;
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
  // Traffic data (14-day window, requires push access to repos)
  totalClones: number;
  totalViews: number;
  topReferrers: { referrer: string; count: number; uniques: number }[];
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
  if (json.errors) throw new Error(json.errors.map((e: any) => e.message).join("; "));
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

/** Like githubRest but returns null on 403/404 instead of throwing. */
async function githubRestSafe(token: string, path: string) {
  const res = await fetch(`${GITHUB_REST}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    },
    cache: "no-store",
  });
  if (res.status === 403 || res.status === 404) return null;
  if (!res.ok) return null;
  return res.json();
}

const CONTRIBUTIONS_QUERY = `
  query($login: String!) {
    user(login: $login) {
      login
      avatarUrl
      followers { totalCount }
      following { totalCount }
      pullRequests { totalCount }
      issues { totalCount }
      repositories(first: 100, ownerAffiliations: OWNER, isFork: false, orderBy: { field: STARGAZERS, direction: DESC }) {
        totalCount
        nodes {
          name
          owner { login }
          stargazerCount
          forkCount
          watchers { totalCount }
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
  let totalForks = 0;
  let totalWatchers = 0;
  const repoNames: string[] = [];

  for (const repo of u.repositories.nodes as any[]) {
    totalStars += repo.stargazerCount ?? 0;
    totalForks += repo.forkCount ?? 0;
    totalWatchers += repo.watchers?.totalCount ?? 0;
    repoNames.push(`${repo.owner.login}/${repo.name}`);
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
  const contributionCalendar = calendar.weeks.flatMap((w: any) =>
    w.contributionDays.map((d: any) => ({ date: d.date, count: d.contributionCount }))
  );

  // 1. Fetch recently active repos for the user to retrieve real-time commits
  const recentReposData =
    (await githubRestSafe(token, `/user/repos?sort=pushed&per_page=6`)) ??
    (await githubRestSafe(token, `/users/${login}/repos?sort=pushed&per_page=6`)) ??
    [];

  const activeRepoNames: string[] = [];
  if (Array.isArray(recentReposData)) {
    for (const r of recentReposData) {
      if (r && r.full_name) activeRepoNames.push(r.full_name);
    }
  }
  for (const rName of repoNames) {
    if (!activeRepoNames.includes(rName)) {
      activeRepoNames.push(rName);
    }
  }

  // 2. Query real commits directly from top active repositories (bypasses any lagging/public-only event stream)
  const topActiveRepos = activeRepoNames.slice(0, 5);
  const commitPromises = topActiveRepos.map(async (r) => {
    const list = await githubRestSafe(
      token,
      `/repos/${r}/commits?author=${encodeURIComponent(login)}&per_page=10`
    );
    if (!Array.isArray(list)) return [];
    return list.map((c: any) => ({
      type: "commit" as const,
      title: c.commit?.message?.split("\n")[0] ?? "Commit",
      url: c.html_url ?? `https://github.com/${r}/commit/${c.sha}`,
      repo: r,
      date: c.commit?.author?.date ?? c.commit?.committer?.date ?? new Date().toISOString(),
      sha: c.sha,
    }));
  });

  const repoCommits = (await Promise.all(commitPromises)).flat();

  // 3. Fetch user events for PRs and issues (try authenticated stream first, fallback to public)
  const events =
    (await githubRestSafe(token, `/users/${login}/events?per_page=30`)) ??
    (await githubRestSafe(token, `/users/${login}/events/public?per_page=30`)) ??
    [];

  const eventItems: {
    type: "commit" | "pr" | "issue";
    title: string;
    url: string;
    repo: string;
    date: string;
  }[] = [];

  if (Array.isArray(events)) {
    for (const e of events) {
      if (e.type === "PullRequestEvent") {
        eventItems.push({
          type: "pr",
          title: `${e.payload.action}: ${e.payload.pull_request?.title ?? "Pull Request"}`,
          url: e.payload.pull_request?.html_url ?? `https://github.com/${e.repo.name}`,
          repo: e.repo.name,
          date: e.created_at,
        });
      } else if (e.type === "IssuesEvent") {
        eventItems.push({
          type: "issue",
          title: `${e.payload.action}: ${e.payload.issue?.title ?? "Issue"}`,
          url: e.payload.issue?.html_url ?? `https://github.com/${e.repo.name}`,
          repo: e.repo.name,
          date: e.created_at,
        });
      } else if (e.type === "PushEvent") {
        const commits = e.payload.commits ?? [];
        for (const commit of commits) {
          eventItems.push({
            type: "commit",
            title: commit.message?.split("\n")[0] ?? "Pushed commit",
            url: `https://github.com/${e.repo.name}/commit/${commit.sha ?? ""}`,
            repo: e.repo.name,
            date: e.created_at,
          });
        }
      }
    }
  }

  // Combine commits and events, sort newest first, and deduplicate
  const seenUrls = new Set<string>();
  const combinedActivity: GithubStats["recentActivity"] = [];

  const allActivity = [...repoCommits, ...eventItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  for (const item of allActivity) {
    const key = item.url || `${item.repo}-${item.date}-${item.title}`;
    if (!seenUrls.has(key)) {
      seenUrls.add(key);
      combinedActivity.push({
        type: item.type,
        title: item.title,
        url: item.url,
        repo: item.repo,
        date: item.date,
      });
    }
  }

  const recentActivity = combinedActivity.slice(0, 15);

  // 4. Ensure today's commits are reflected in contributionCalendar even if GraphQL calendar hasn't re-indexed yet
  const now = new Date();
  const todayUTC = now.toISOString().slice(0, 10);
  const todayLocal = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  const todayCommits = repoCommits.filter((c) => {
    const cDate = new Date(c.date);
    const cDateUTC = cDate.toISOString().slice(0, 10);
    const cDateLocal = `${cDate.getFullYear()}-${String(cDate.getMonth() + 1).padStart(2, "0")}-${String(cDate.getDate()).padStart(2, "0")}`;
    return cDateUTC === todayUTC || cDateLocal === todayLocal || (now.getTime() - cDate.getTime() < 24 * 60 * 60 * 1000);
  });

  const todayCommitCount = todayCommits.length;

  if (todayCommitCount > 0) {
    let todayCalItem = contributionCalendar.find((d: { date: string; count: number }) => d.date === todayUTC);
    if (!todayCalItem && todayLocal !== todayUTC) {
      todayCalItem = contributionCalendar.find((d: { date: string; count: number }) => d.date === todayLocal);
    }
    if (todayCalItem) {
      if (todayCalItem.count < todayCommitCount) {
        calendar.totalContributions += (todayCommitCount - todayCalItem.count);
        todayCalItem.count = todayCommitCount;
      }
    } else {
      contributionCalendar.push({ date: todayUTC, count: todayCommitCount });
      calendar.totalContributions += todayCommitCount;
    }
  }

  // Traffic data — only available for repos with push access.
  // Fetch for top 10 repos (by stars) in parallel, skip 403s gracefully.
  const trafficRepos = repoNames.slice(0, 10);
  const [cloneResults, viewResults, referrerResults] = await Promise.all([
    Promise.all(trafficRepos.map((r) => githubRestSafe(token, `/repos/${r}/traffic/clones`))),
    Promise.all(trafficRepos.map((r) => githubRestSafe(token, `/repos/${r}/traffic/views`))),
    Promise.all(trafficRepos.map((r) => githubRestSafe(token, `/repos/${r}/traffic/popular/referrers`))),
  ]);

  let totalClones = 0;
  let totalViews = 0;
  const referrerMap = new Map<string, { count: number; uniques: number }>();

  for (const c of cloneResults) {
    if (c) totalClones += c.count ?? 0;
  }
  for (const v of viewResults) {
    if (v) totalViews += v.count ?? 0;
  }
  for (const refs of referrerResults) {
    if (Array.isArray(refs)) {
      for (const r of refs) {
        const existing = referrerMap.get(r.referrer) ?? { count: 0, uniques: 0 };
        existing.count += r.count ?? 0;
        existing.uniques += r.uniques ?? 0;
        referrerMap.set(r.referrer, existing);
      }
    }
  }
  const topReferrers = [...referrerMap.entries()]
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5)
    .map(([referrer, { count, uniques }]) => ({ referrer, count, uniques }));

  return {
    login: u.login,
    avatarUrl: u.avatarUrl,
    publicRepos: u.repositories.totalCount,
    followers: u.followers.totalCount,
    following: u.following.totalCount,
    totalStars,
    totalForks,
    totalWatchers,
    totalPRs: u.pullRequests.totalCount,
    totalIssues: u.issues.totalCount,
    totalContributionsLastYear: calendar.totalContributions,
    contributionCalendar,
    topLanguages,
    recentActivity,
    totalClones,
    totalViews,
    topReferrers,
  };
}

// How many minutes cached GitHub stats stay fresh before a refetch is allowed.
export const GITHUB_CACHE_MINUTES = 5;
export const GITHUB_CACHE_HOURS = 0.1;

