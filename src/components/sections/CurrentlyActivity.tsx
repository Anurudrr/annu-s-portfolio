import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Github } from 'lucide-react';
import { SectionShell } from '../ui/PageShell';
import { GridPanel } from '../ui/GridPanel';
import { Sticker } from '../ui/Sticker';
import { GitHubHeatmap } from '../GitHubHeatmap';
import { MetroActivityList } from '../MetroActivityList';

// Use LOCAL calendar date so lookup works correctly in every timezone
function toLocalDateStr(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

interface GitHubRepo {
  name: string;
  pushed_at: string;
  description: string | null;
  html_url: string;
}

export const CurrentlyActivity: React.FC = () => {
  const [heatmapData, setHeatmapData] = useState<Record<string, number>>({});
  const [heatmapError, setHeatmapError] = useState(false);
  const [latestSubmission, setLatestSubmission] = useState<{
    title: string;
    lang: string;
    timestamp: number;
  } | null>(null);
  const [latestGitHub, setLatestGitHub] = useState<{
    name: string;
    pushed_at: string;
    html_url: string;
  } | null>(null);
  const [loading, setLoading] = useState({ heatmap: true, submission: true, github: true });

  useEffect(() => {
    let aborted = false;

    fetch('/api/leetcode')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (aborted) return;
        if (json.submissionCalendar && typeof json.submissionCalendar === 'object') {
          setHeatmapData(json.submissionCalendar);
        }
        if (json.submissions && json.submissions.length > 0) {
          const latest = json.submissions[0];
          setLatestSubmission({
            title: latest.title,
            lang: latest.lang,
            timestamp: parseInt(latest.timestamp, 10),
          });
        }
        setLoading((prev) => ({ ...prev, heatmap: false, submission: false }));
      })
      .catch((err) => {
        if (aborted) return;
        console.error('Error fetching LeetCode data', err);
        setHeatmapError(true);
        setLoading((prev) => ({ ...prev, heatmap: false, submission: false }));
      });

    return () => {
      aborted = true;
    };
  }, []);

  useEffect(() => {
    fetch('/api/github')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (json.repos && json.repos.length > 0) {
          const latest = json.repos[0];
          setLatestGitHub({
            name: latest.name,
            pushed_at: latest.pushed_at,
            html_url: latest.html_url,
          });
        }
        setLoading((prev) => ({ ...prev, github: false }));
      })
      .catch((err) => {
        console.error('Error fetching GitHub repos', err);
        setLoading((prev) => ({ ...prev, github: false }));
      });
  }, []);

  // Build the grid anchored to the user's real submission history (first active
  // day → today). Falls back to the standard last-365-days window when no data.
  const today = new Date();

  // Seed function: deterministic fake counts for placeholder display
  const seededCount = (date: Date): number => {
    const d = Math.floor(date.getTime() / 86400000);
    let seed = (d * 2654435761) >>> 0;
    seed ^= seed >> 16;
    const r = (seed % 1000) / 1000;
    if (r < 0.52) return 0;
    if (r < 0.78) return 1;
    if (r < 0.9) return 3;
    if (r < 0.97) return 5;
    return 8;
  };

  const firstActive = useMemo(() => {
    const timestamps = Object.keys(heatmapData);
    if (!timestamps.length) return null;
    return new Date(Math.min(...timestamps.map((t) => parseInt(t, 10) * 1000)));
  }, [heatmapData]);

  const days: { date: Date; count: number }[] = useMemo(() => {
    const list: { date: Date; count: number }[] = [];
    // When no real data, always show last 365 days (never "last 2 days")
    const fallbackStart = new Date(today);
    fallbackStart.setDate(fallbackStart.getDate() - 364);
    const start = firstActive ?? fallbackStart;
    // Start on the most recent Sunday at/before `start` so rows align.
    const gridStart = new Date(start);
    gridStart.setDate(gridStart.getDate() - gridStart.getDay());

    let day = new Date(gridStart);
    while (day.getTime() <= today.getTime()) {
      list.push({ date: new Date(day), count: 0 });
      day.setDate(day.getDate() + 1);
    }
    return list;
  }, [firstActive, today]);

  Object.entries(heatmapData).forEach(([timestampStr, count]) => {
    const timestamp = parseInt(timestampStr, 10) * 1000;
    const date = new Date(timestamp);
    const dateString = toLocalDateStr(date);

    const dayMatch = days.find((d) => toLocalDateStr(d.date) === dateString);
    if (dayMatch) {
      dayMatch.count = count;
    }
  });

  // Compute heatmap stats
  const { totalSubmissions, activeDays, maxStreak } = useMemo(() => {
    let total = 0;
    let active = 0;
    let maxS = 0;
    let currS = 0;
    for (const d of days) {
      const c = heatmapError ? seededCount(d.date) : d.count;
      total += c;
      if (c > 0) {
        active++;
        currS++;
        maxS = Math.max(maxS, currS);
      } else {
        currS = 0;
      }
    }
    return { totalSubmissions: total, activeDays: active, maxStreak: maxS };
  }, [days, heatmapError]);

  // Compute month labels for the X-axis
  const monthLabels = useMemo(() => {
    const labels: { month: string; colIndex: number }[] = [];
    let lastMonth = -1;
    days.forEach((day, index) => {
      // Only check on Sundays (start of a column)
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

  // Classic LeetCode/GitHub green color palette
  const getHeatmapColor = (count: number): string => {
    if (count === 0) return '#2c2c2c'; // Empty (dark gray)
    if (count <= 2) return '#0e4429';  // Low
    if (count <= 5) return '#006d32';  // Medium
    if (count <= 8) return '#26a641';  // High
    return '#39d353';                  // Very High
  };

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    if (diffMins > 0) return `${diffMins}m ago`;
    return 'Just now';
  };

  const formatGitHubDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    return 'Today';
  };

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
    <SectionShell id="currently" padding="xl">
      <div style={{ marginBottom: '32px', padding: '0 16px' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            minHeight: '30px',
            padding: '8px 16px',
            border: '1px solid #F2ECDE',
            borderRadius: '999px',
            color: '#69A65B',
            fontSize: '11px',
            fontWeight: 900,
            fontFamily: '"General Sans", Inter, sans-serif',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
          className="section-indexed"
          data-index="03"
        >
          Activity
        </span>
        <h2
          style={{
            margin: 0,
            fontFamily: '"Clash Display", "Anton", "Bebas Neue", "Owners Wide", Impact, sans-serif',
            fontSize: 'clamp(3.5rem, 8vw, 7rem)',
            fontWeight: 900,
            lineHeight: 0.85,
            textTransform: 'uppercase',
            color: '#F2ECDE',
            letterSpacing: '0',
          }}
        >
          CURRENTLY
        </h2>
      </div>

      <GridPanel
        padding="xl"
        style={{
          marginBottom: '32px',
          backgroundColor: '#161514', // Dark background
          color: '#F2ECDE', // Light text
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
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
            <span style={{ fontSize: '24px', fontWeight: 600 }}>{totalSubmissions}</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px' }}>
              submissions in the past year
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

        {loading.heatmap ? (
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
          <div style={{ overflowX: 'auto', paddingBottom: '8px' }}>
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
                {days.map((day, i) => {
                  const displayCount = heatmapError ? seededCount(day.date) : day.count;
                  return (
                    <div
                      key={i}
                      title={`${day.date.toDateString()}: ${displayCount} submissions`}
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '2px',
                        backgroundColor: getHeatmapColor(displayCount),
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        cursor: 'default',
                        opacity: heatmapError ? 0.6 : 1,
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
                  );
                })}
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
                      left: `${lbl.colIndex * 15}px`, // 12px cell + 3px gap
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

            {/* Heatmap Legend */}
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
        )}
      </GridPanel>

      <GridPanel 
        padding="xl" 
        style={{ 
          marginBottom: '32px',
          backgroundColor: '#161514', // Dark background
          color: '#F2ECDE', // Light text
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* We will let GitHubHeatmap render its own dark theme header/stats */}
        <GitHubHeatmap />
      </GridPanel>

      <GridPanel padding="xl" style={{ marginBottom: '32px' }}>
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{
              margin: '0 0 8px',
              fontFamily:
                '"Clash Display", "Anton", "Bebas Neue", "Owners Wide", Impact, sans-serif',
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              fontWeight: 900,
              lineHeight: 1,
              textTransform: 'uppercase',
              color: '#141310',
              letterSpacing: '0',
            }}
          >
            RECENT ACTIVITY
          </h3>
          <p
            style={{
              margin: 0,
              color: 'rgba(20, 19, 16, 0.68)',
              fontSize: '12px',
              fontFamily: '"General Sans", Inter, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Last solved question · Last song on rotation
          </p>
        </div>
        <MetroActivityList />
      </GridPanel>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'center',
          padding: '0 16px',
        }}
      >
        <Sticker
          shape="rotated-rect"
          accentIndex={4}
          rotation={-6}
          size="md"
          className="sticker-z-2"
        >
          <CheckCircle2 size={16} strokeWidth={2.5} />
          <span
            style={{ whiteSpace: 'normal', maxWidth: '160px', lineHeight: 1.1, fontSize: '11px' }}
          >
            {loading.submission
              ? 'LOADING...'
              : latestSubmission
                ? latestSubmission.title.toUpperCase()
                : 'NO RECENT SUBMISSION'}
          </span>
          {!loading.submission && latestSubmission && (
            <span
              style={{
                fontSize: '8px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                opacity: 0.85,
                fontFamily: '"General Sans", Inter, sans-serif',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                marginTop: '4px',
              }}
            >
              {latestSubmission.lang.toUpperCase()} ·{' '}
              {formatDate(latestSubmission.timestamp * 1000)}
            </span>
          )}
        </Sticker>

        <Sticker
          shape="rotated-rect"
          accentIndex={2}
          rotation={4}
          size="md"
          className="sticker-z-1"
        >
          <Github size={16} strokeWidth={2.5} />
          <span
            style={{ whiteSpace: 'normal', maxWidth: '160px', lineHeight: 1.1, fontSize: '11px' }}
          >
            {loading.github
              ? 'LOADING...'
              : latestGitHub
                ? latestGitHub.name.toUpperCase()
                : 'NO RECENT ACTIVITY'}
          </span>
          {!loading.github && latestGitHub && (
            <span
              style={{
                fontSize: '8px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                opacity: 0.85,
                fontFamily: '"General Sans", Inter, sans-serif',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                marginTop: '4px',
              }}
            >
              PUSHED {formatGitHubDate(latestGitHub.pushed_at).toUpperCase()}
            </span>
          )}
        </Sticker>
      </div>
    </SectionShell>
  );
};
