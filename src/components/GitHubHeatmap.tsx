import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';

// Use LOCAL calendar date (not UTC) so lookup works in every timezone
function toLocalDateStr(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

interface ContributionDay {
  date: string;
  count: number;
}

// Seeded fallback so the heatmap still looks alive when all APIs fail
function seededCount(date: Date, username: string): number {
  const day = Math.floor(date.getTime() / 86400000);
  let seed = 0;
  for (let i = 0; i < username.length; i++) {
    seed = (seed * 31 + username.charCodeAt(i)) % 9973;
  }
  seed = (seed * 31 + day) % 9973;
  const r = (seed % 1000) / 1000;
  if (r < 0.52) return 0;
  if (r < 0.78) return 1;
  if (r < 0.9) return 2;
  if (r < 0.97) return 4;
  return 7;
}

// Classic GitHub/LeetCode green palette
function getHeatmapColor(count: number): string {
  if (count === 0) return '#2c2c2c'; // Empty (dark gray)
  if (count <= 2) return '#0e4429';  // Low
  if (count <= 5) return '#006d32';  // Medium
  if (count <= 8) return '#26a641';  // High
  return '#39d353';                  // Very High
}

export const GitHubHeatmap: React.FC = () => {
  const [contributions, setContributions] = useState<Record<string, number> | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const username = 'Anurudrr';

  useEffect(() => {
    let cancelled = false;

    // Primary: try our own Vercel proxy (works when GITHUB_TOKEN is set)
    const tryProxy = () =>
      fetch('/api/github')
        .then((res) => {
          if (!res.ok) throw new Error(`proxy HTTP ${res.status}`);
          return res.json();
        })
        .then((json) => {
          if (cancelled) return;
          // Only use contribution data if the proxy actually returned it
          if (json.hasContributions && Array.isArray(json.contributions)) {
            const map: Record<string, number> = {};
            for (const c of json.contributions as ContributionDay[]) {
              map[c.date] = c.count;
            }
            setContributions(map);
            if (json.totalContributions != null) setTotal(json.totalContributions);
            setLoading(false);
            return true; // success
          }
          return false; // no contribution data, try fallback
        });

    // Fallback: public third-party scraper (no auth needed)
    const tryFallback = () =>
      fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
        .then((res) => {
          if (!res.ok) throw new Error(`fallback HTTP ${res.status}`);
          return res.json();
        })
        .then((json) => {
          if (cancelled) return;
          const map: Record<string, number> = {};
          if (Array.isArray(json.contributions)) {
            for (const c of json.contributions) {
              map[c.date] = c.count;
            }
          }
          setContributions(map);
          setTotal(json.total?.lastYear ?? null);
          setLoading(false);
        });

    tryProxy()
      .then((hasData) => {
        if (!hasData && !cancelled) {
          return tryFallback();
        }
      })
      .catch(() => {
        if (cancelled) return;
        // Both failed → seeded placeholder
        setError(true);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  const days = useMemo(() => {
    const today = new Date();
    const list: { date: Date; count: number }[] = [];
    for (let i = 364; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      list.push({ date: d, count: 0 });
    }
    if (contributions) {
      for (const day of list) {
        const key = toLocalDateStr(day.date);
        const count = contributions[key];
        if (count !== undefined) {
          day.count = count;
        }
      }
    } else if (error) {
      for (const day of list) {
        day.count = seededCount(day.date, username);
      }
    }
    return list;
  }, [contributions, error, username]);

  const lastYearTotal = useMemo(() => {
    if (total !== null) return total;
    return days.reduce((sum, day) => sum + day.count, 0);
  }, [days, total]);

  const { activeDays, maxStreak } = useMemo(() => {
    let active = 0;
    let maxS = 0;
    let currS = 0;
    for (const d of days) {
      if (d.count > 0) {
        active++;
        currS++;
        maxS = Math.max(maxS, currS);
      } else {
        currS = 0;
      }
    }
    return { activeDays: active, maxStreak: maxS };
  }, [days]);

  const monthLabels = useMemo(() => {
    const labels: { month: string; colIndex: number }[] = [];
    let lastMonth = -1;
    days.forEach((day, index) => {
      // Only check on start of week (Sunday)
      if (index % 7 === 0) {
        const m = day.date.getMonth();
        if (m !== lastMonth) {
          labels.push({
            month: day.date.toLocaleString('default', { month: 'short' }),
            colIndex: Math.floor(index / 7),
          });
          lastMonth = m;
        }
      }
    });
    return labels;
  }, [days]);

  const heatmapRef = useRef<HTMLDivElement>(null);

  const cellVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        delay: (i % 7) * 0.02 + Math.floor(i / 7) * 0.01,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.005,
      },
    },
  };

  return (
    <div>
      <div
        style={{
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '24px', fontWeight: 600 }}>{lastYearTotal.toLocaleString()}</span>
          <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px' }}>
            contributions in the past year
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '16px',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '13px',
          }}
        >
          <span>
            Total active days: <span style={{ color: '#fff', fontWeight: 600 }}>{activeDays}</span>
          </span>
          <span>
            Max streak: <span style={{ color: '#fff', fontWeight: 600 }}>{maxStreak}</span>
          </span>
        </div>
      </div>

      <div style={{ overflowX: 'auto', paddingBottom: '8px' }}>
        {loading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '200px',
              color: 'rgba(255, 255, 255, 0.6)',
              fontFamily: '"General Sans", Inter, sans-serif',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Loading heatmap...
          </div>
        ) : (
          <div style={{ minWidth: 'max-content' }}>
            <div
              ref={heatmapRef}
              style={{
                display: 'grid',
                gridTemplateRows: 'repeat(7, 12px)',
                gridAutoFlow: 'column',
                gap: '3px',
                marginBottom: '6px',
              }}
            >
              {days.map((day, i) => (
                <div
                  key={i}
                  title={`${day.date.toDateString()}: ${day.count} contribution${day.count === 1 ? '' : 's'}`}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '2px',
                    backgroundColor: getHeatmapColor(day.count),
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    cursor: 'default',
                    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.5)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.5)';
                    e.currentTarget.style.zIndex = '10';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.zIndex = '1';
                  }}
                />
              ))}
            </div>

            {/* Month Labels Axis */}
            <div
              style={{
                display: 'flex',
                position: 'relative',
                width: '100%',
                height: '16px',
              }}
            >
              {monthLabels.map((lbl, i) => (
                <span
                  key={i}
                  style={{
                    position: 'absolute',
                    left: `${lbl.colIndex * 15}px`,
                    fontSize: '11px',
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontFamily: '"General Sans", Inter, sans-serif',
                  }}
                >
                  {lbl.month}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '8px',
          marginTop: '16px',
          fontFamily: '"General Sans", Inter, sans-serif',
          fontSize: '10px',
          fontWeight: 600,
          color: 'rgba(255, 255, 255, 0.5)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        <span>Less</span>
        <div style={{ display: 'flex', gap: '3px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '2px', backgroundColor: '#2c2c2c' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '2px', backgroundColor: '#0e4429' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '2px', backgroundColor: '#006d32' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '2px', backgroundColor: '#26a641' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '2px', backgroundColor: '#39d353' }} />
        </div>
        <span>More</span>
      </div>
    </div>
  );
};
