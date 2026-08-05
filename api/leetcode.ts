// Vercel serverless function: /api/leetcode
// Uses the faisalshohag mirror as primary (fastest/most reliable).
// ALWAYS returns HTTP 200.

const USERNAME = 'ANURUDH_SINGH_RAJAWAT';

function fetchWithTimeout(url: string, ms = 9000): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  return fetch(url, { signal: ctrl.signal }).finally(() => clearTimeout(timer));
}

function parseCalendar(calendar: any): Record<string, number> {
  if (!calendar) return {};
  if (typeof calendar === 'object' && !Array.isArray(calendar)) return calendar;
  if (typeof calendar === 'string') {
    try { return JSON.parse(calendar); } catch { return {}; }
  }
  return {};
}

export default async function handler(_req: any, res: any) {
  let submissionCalendar: Record<string, number> = {};
  let submissions: any[] = [];

  // Source 1: faisalshohag vercel mirror (fast, reliable)
  try {
    const r = await fetchWithTimeout(`https://leetcode-api-faisalshohag.vercel.app/${USERNAME}`);
    if (r.ok) {
      const json = await r.json() as any;
      const cal = parseCalendar(json.submissionCalendar);
      if (Object.keys(cal).length > 0) {
        submissionCalendar = cal;
        // Get recent submissions from recentSubmissions field
        const recent = Array.isArray(json.recentSubmissions) ? json.recentSubmissions : [];
        submissions = recent.slice(0, 5).map((s: any) => ({
          title: s.title,
          titleSlug: s.titleSlug,
          timestamp: String(s.timestamp),
          lang: s.lang,
        }));
      }
    }
  } catch { /* timeout or network error, try next */ }

  // Source 2: alfa-leetcode-api (if source 1 failed)
  if (Object.keys(submissionCalendar).length === 0) {
    try {
      const r = await fetchWithTimeout(`https://alfa-leetcode-api.onrender.com/${USERNAME}`);
      if (r.ok) {
        const json = await r.json() as any;
        const cal = parseCalendar(json.submissionCalendar);
        if (Object.keys(cal).length > 0) {
          submissionCalendar = cal;
        }
      }
    } catch { /* timeout */ }
  }

  // Source 3: leetcode-stats-api (last resort)
  if (Object.keys(submissionCalendar).length === 0) {
    try {
      const r = await fetchWithTimeout(`https://leetcode-stats-api.herokuapp.com/${USERNAME}`);
      if (r.ok) {
        const json = await r.json() as any;
        if (json.status === 'success') {
          submissionCalendar = parseCalendar(json.submissionCalendar);
        }
      }
    } catch { /* timeout */ }
  }

  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
  res.status(200).json({
    submissions,
    submissionCalendar,
    totalActiveDays: Object.values(submissionCalendar).filter((v) => v > 0).length,
  });
}
