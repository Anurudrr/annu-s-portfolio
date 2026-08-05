// Vercel serverless function: /api/github
// Proxies GitHub REST API to avoid CORS and unauthenticated rate-limit issues.
// Set GITHUB_TOKEN env var on Vercel for 5,000 req/hr (required for contributions GraphQL).
// Without a token: returns repos only, contributions fallback to third-party scraper.

const GH_REST = 'https://api.github.com';
const GH_GQL = 'https://api.github.com/graphql';

const USERNAME = 'Anurudrr';

// GraphQL query for contribution calendar (requires auth)
const CONTRIBUTIONS_QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

export default async function handler(req: any, res: any) {
  const token = process.env.GITHUB_TOKEN;

  const restHeaders: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'as-dev-portfolio',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (token) {
    restHeaders['Authorization'] = `Bearer ${token}`;
  }

  try {
    // Always fetch repos
    const reposPromise = fetch(
      `${GH_REST}/users/${USERNAME}/repos?sort=pushed&per_page=10&type=owner`,
      { headers: restHeaders }
    );

    // Fetch contributions via GraphQL only if we have a token
    const contributionsPromise = token
      ? fetch(GH_GQL, {
          method: 'POST',
          headers: {
            ...restHeaders,
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: CONTRIBUTIONS_QUERY, variables: { login: USERNAME } }),
        })
      : null;

    const [reposRes, contribRes] = await Promise.all([reposPromise, contributionsPromise]);

    // Handle repos
    let repos: any[] = [];
    if (reposRes.ok) {
      const rawRepos = await reposRes.json();
      repos = (rawRepos as any[])
        .filter((r) => !r.fork && !r.private)
        .slice(0, 5)
        .map((r) => ({
          name: r.name,
          description: r.description,
          pushed_at: r.pushed_at,
          html_url: r.html_url,
          stargazers_count: r.stargazers_count,
          language: r.language,
        }));
    } else if (reposRes.status === 403) {
      res.status(429).json({ error: 'GitHub rate limit exceeded. Add GITHUB_TOKEN env var.' });
      return;
    }

    // Handle contributions
    let contributions: { date: string; count: number }[] = [];
    let totalContributions: number | null = null;

    if (contribRes && contribRes.ok) {
      const contribJson = await contribRes.json();
      const calendar =
        contribJson?.data?.user?.contributionsCollection?.contributionCalendar;
      if (calendar) {
        totalContributions = calendar.totalContributions ?? null;
        for (const week of calendar.weeks ?? []) {
          for (const day of week.contributionDays ?? []) {
            contributions.push({ date: day.date, count: day.contributionCount });
          }
        }
      }
    }

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    res.status(200).json({
      repos,
      contributions,
      totalContributions,
      // Let the client know whether we have real contribution data
      hasContributions: contributions.length > 0,
    });
  } catch (err: any) {
    console.error('[api/github] error:', err?.message ?? err);
    res.status(500).json({ error: 'Failed to fetch GitHub data', repos: [], contributions: [] });
  }
}
