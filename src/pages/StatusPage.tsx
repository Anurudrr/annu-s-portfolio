import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Activity, Clock, Server, Cpu, Github, Sparkles, Music } from 'lucide-react';
import { PageShell, Nav, Footer, SectionShell } from '../components/ui/PageShell';
import { SEO } from '../components/SEO';

interface StatusResponse {
  service: string;
  status: string;
  startedAt: string;
  elapsed: number;
  query: string;
  node: string;
  platform: string;
  integrations: { ai: boolean; spotify: boolean; email: boolean };
}

interface GitHubRepo {
  name: string;
  language: string | null;
  pushed_at: string;
  html_url: string;
}

interface SpotifyStatus {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumUrl?: string;
  trackUrl?: string;
}

function formatUptime(seconds: number): string {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (d > 0) return `${d}d ${h}h ${m}m`;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  return `${m}m ${s}s`;
}

function formatClock(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  } catch {
    return iso;
  }
}

export const StatusPage: React.FC = () => {
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [spotify, setSpotify] = useState<SpotifyStatus | null>(null);

  useEffect(() => {
    fetch('/api/status')
      .then((r) => r.json())
      .then(setStatus)
      .catch(() => setStatus(null));
  }, []);

  useEffect(() => {
    fetch('https://api.github.com/users/Anurudrr/repos?sort=pushed&per_page=4')
      .then((r) => r.json())
      .then((data: GitHubRepo[]) => setRepos(Array.isArray(data) ? data : []))
      .catch(() => setRepos([]));
  }, []);

  useEffect(() => {
    fetch('/api/spotify/currently-playing')
      .then((r) => (r.status === 204 ? null : r.json()))
      .then((data: SpotifyStatus | null) => setSpotify(data))
      .catch(() => setSpotify(null));
  }, []);

  const systems = [
    {
      label: 'Server Core',
      value: status ? 'OPERATIONAL' : 'CHECKING',
      icon: Server,
      accent: '#3CBAAE',
      lines: status
        ? [
            `uptime ${formatUptime(status.elapsed)}`,
            `node ${status.node} · ${status.platform}`,
            `started ${formatClock(status.startedAt)} UTC`,
          ]
        : ['dialing node…'],
    },
    {
      label: 'AI Assistant',
      value: status?.integrations.ai ? 'ONLINE' : 'STANDBY',
      icon: Cpu,
      accent: '#69A65B',
      lines: [
        status?.integrations.ai
          ? 'gemini-2.5-flash · prompt guard active'
          : 'no GEMINI_API_KEY — demo replies only',
      ],
    },
    {
      label: 'Outbound Email',
      value: status?.integrations.email ? 'ARMED' : 'STORAGE ONLY',
      icon: Activity,
      accent: '#EF7B3C',
      lines: [
        status?.integrations.email
          ? 'resend relay connected'
          : 'messages kept in db.json until RESEND keys are set',
      ],
    },
    {
      label: 'Spotify Bridge',
      value: status?.integrations.spotify ? 'CONNECTED' : 'IDLE',
      icon: Music,
      accent: '#F2C94C',
      lines: [
        spotify?.isPlaying
          ? `now playing · ${spotify.title} — ${spotify.artist}`
          : spotify !== null
            ? 'currently quiet — nothing on air'
            : 'no credentials configured',
      ],
    },
  ];

  return (
    <PageShell>
      <SEO
        title="Status"
        description="Live systems status for anurudh.dev — server uptime, AI assistant, email relay, and Spotify bridge health."
        url="/status"
        image="/og-image.png"
      />
      <Nav currentPage="status" />
      <main id="main-content">
        <SectionShell id="status-hero" padding="xl" style={{ paddingBottom: '0' }}>
          <div style={{ marginBottom: '32px', padding: '0 16px' }}>
            <span className="section-kicker section-kicker--light section-indexed" data-index="01">
              Systems
            </span>
            <h1
              style={{
                margin: '16px 0 0',
                fontFamily:
                  '"Clash Display", "Anton", "Bebas Neue", "Owners Wide", Impact, sans-serif',
                fontSize: 'clamp(3.5rem, 8vw, 7rem)',
                fontWeight: 900,
                lineHeight: 0.85,
                textTransform: 'uppercase',
                color: '#F2ECDE',
                letterSpacing: '0',
              }}
            >
              STATUS
            </h1>
            <p
              style={{
                marginTop: '20px',
                maxWidth: '480px',
                color: 'rgba(242, 236, 222, 0.65)',
                fontSize: '14px',
                lineHeight: 1.65,
                fontFamily: '"General Sans", Inter, sans-serif',
              }}
            >
              Live telemetry for anurudh.dev: server uptime, assistant availability, and the
              integrations powering this build.
            </p>
          </div>
        </SectionShell>

        <SectionShell id="status-grid" padding="xl" style={{ paddingTop: '40px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              padding: '0 16px',
            }}
          >
            {systems.map((sys, i) => {
              const Icon = sys.icon;
              return (
                <motion.article
                  key={sys.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const }}
                  style={{
                    padding: '28px',
                    borderRadius: '16px',
                    border: '1px solid rgba(242, 236, 222, 0.1)',
                    background: '#1C1B18',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        background: `${sys.accent}1A`,
                        color: sys.accent,
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={20} strokeWidth={2} />
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span
                        style={{
                          color: 'rgba(242, 236, 222, 0.5)',
                          fontSize: '10px',
                          fontWeight: 900,
                          fontFamily: '"General Sans", Inter, sans-serif',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {sys.label}
                      </span>
                      <span
                        style={{
                          color: sys.accent,
                          fontSize: '15px',
                          fontWeight: 900,
                          fontFamily: '"Clash Display", "Anton", Impact, sans-serif',
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {sys.value}
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      paddingTop: '12px',
                      borderTop: '1px solid rgba(242, 236, 222, 0.08)',
                    }}
                  >
                    {sys.lines.map((line, lineI) => (
                      <span
                        key={lineI}
                        style={{
                          fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
                          fontSize: '11px',
                          color: 'rgba(242, 236, 222, 0.5)',
                          lineHeight: 1.6,
                        }}
                      >
                        {line}
                      </span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </SectionShell>

        <SectionShell
          id="recent-pushes"
          padding="xl"
          style={{ backgroundColor: '#EDE5D6', borderRadius: '24px', margin: '0 32px 56px' }}
        >
          <div style={{ marginBottom: '28px', padding: '0 16px' }}>
            <span
              className="section-indexed"
              data-index="02"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                marginBottom: '16px',
                color: '#344E38',
                fontSize: '11px',
                fontWeight: 900,
                fontFamily: '"General Sans", Inter, sans-serif',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Recent pushes
            </span>
            <h2
              style={{
                margin: 0,
                fontFamily:
                  '"Clash Display", "Anton", "Bebas Neue", "Owners Wide", Impact, sans-serif',
                fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                fontWeight: 900,
                lineHeight: 0.95,
                textTransform: 'uppercase',
                color: '#141310',
                letterSpacing: '0',
              }}
            >
              GITHUB PULSE
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '0 16px' }}>
            {repos.length === 0 && (
              <p
                style={{
                  margin: 0,
                  color: 'rgba(20, 19, 16, 0.55)',
                  fontSize: '14px',
                  fontFamily: '"General Sans", Inter, sans-serif',
                }}
              >
                Fetching repositories…
              </p>
            )}
            {repos.map((repo) => (
              <a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '16px 20px',
                  background: '#F2ECDE',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  border: '1px solid rgba(20, 19, 16, 0.08)',
                  transition: 'transform 0.2s ease, background 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.background = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = '#F2ECDE';
                }}
              >
                <Github size={16} strokeWidth={1.9} style={{ color: '#141310', flexShrink: 0 }} />
                <span
                  style={{
                    flex: 1,
                    minWidth: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    color: '#141310',
                    fontSize: '13px',
                    fontWeight: 800,
                    fontFamily: '"General Sans", Inter, sans-serif',
                    letterSpacing: '0.02em',
                  }}
                >
                  {repo.name}
                </span>
                <span
                  style={{
                    color: 'rgba(20, 19, 16, 0.55)',
                    fontSize: '11px',
                    fontWeight: 700,
                    fontFamily: '"General Sans", Inter, sans-serif',
                  }}
                >
                  {repo.language || '—'}
                </span>
              </a>
            ))}
          </div>

          {spotify?.isPlaying && spotify.trackUrl && (
            <a
              href={spotify.trackUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                marginTop: '24px',
                marginInline: '16px',
                padding: '14px 18px',
                borderRadius: '12px',
                background: '#141310',
                color: '#F2ECDE',
                textDecoration: 'none',
              }}
            >
              <Music size={16} strokeWidth={1.9} style={{ color: '#69A65B' }} />
              <span
                style={{
                  fontSize: '12px',
                  fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
                }}
              >
                listening to {spotify.title} — {spotify.artist}
              </span>
              <Sparkles
                size={14}
                strokeWidth={2}
                style={{ marginLeft: 'auto', color: '#F2C94C' }}
              />
            </a>
          )}

          <div
            style={{
              marginTop: '28px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(20, 19, 16, 0.1)',
              marginInline: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: 'rgba(20, 19, 16, 0.5)',
              fontSize: '11px',
              fontWeight: 700,
              fontFamily: '"General Sans", Inter, sans-serif',
            }}
          >
            <Clock size={13} strokeWidth={1.9} />
            {status ? `last heartbeat ${formatClock(status.query)}` : 'no heartbeat'}
          </div>
        </SectionShell>
      </main>
      <Footer />
    </PageShell>
  );
};
