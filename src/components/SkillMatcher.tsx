import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, CircuitBoard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

const TOOLS = [
  { name: 'React.js', keyword: 'react', weight: 25 },
  { name: 'Java', keyword: 'java', weight: 25 },
  { name: 'Spring Boot', keyword: 'spring', weight: 20 },
  { name: 'Tailwind CSS', keyword: 'tailwind', weight: 15 },
  { name: 'TypeScript', keyword: 'typescript', weight: 15 },
  { name: 'MySQL', keyword: 'mysql', weight: 15 },
  { name: 'Figma & Design', keyword: 'design', weight: 15 },
  { name: 'DSA & Systems', keyword: 'dsa', weight: 20 },
] as const;

const accents = ['#3CBAAE', '#F2C94C', '#EF7B3C', '#EC4E7C'];

export default function SkillMatcher() {
  const [selected, setSelected] = useState<string[]>(['React.js', 'Java']);

  const toggle = (name: string) => {
    setSelected((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));
  };

  const { affinity, matched } = useMemo(() => {
    const chosen = TOOLS.filter((t) => selected.includes(t.name));
    const maxSum = TOOLS.reduce((acc, t) => acc + t.weight, 0);
    const sum = chosen.reduce((acc, t) => acc + t.weight, 0);
    const score = Math.min(100, Math.floor((sum / maxSum) * 100) + 38);

    const haystack = (text: string) => text.toLowerCase();
    const matchedProjects = projects.filter((p) => {
      const blob = [p.title, p.description, p.category, ...p.technologies].map(haystack).join(' ');
      return chosen.some((t) => blob.includes(t.keyword));
    });

    return { affinity: selected.length === 0 ? 0 : score, matched: matchedProjects };
  }, [selected]);

  const verdict =
    affinity >= 90
      ? {
          title: 'Elite system fit',
          desc: 'Outstanding command of this exact stack — production-ready alignment.',
          color: '#9FD463',
        }
      : affinity >= 70
        ? {
            title: 'Strong applicant blend',
            desc: 'Highly robust compatibility with the selected requirements.',
            color: '#3CBAAE',
          }
        : affinity >= 45
          ? {
              title: 'Viable integration prospect',
              desc: 'Solid base with fast adaptation across related systems.',
              color: '#F2C94C',
            }
          : {
              title: 'Select requirements',
              desc: 'Toggle tools above to compute stack affinity and see matching proof of work.',
              color: '#EF7B3C',
            };

  return (
    <motion.section
      id="matcher"
      style={{
        backgroundColor: '#EDE5D6',
        borderRadius: '24px',
        margin: '0 32px 56px',
        maxWidth: '1280px',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 'clamp(3rem, 6vw, 6rem) 32px',
        width: '100%',
        boxSizing: 'border-box',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
    >
      <div style={{ marginBottom: '40px', padding: '0 16px' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            minHeight: '30px',
            padding: '8px 16px',
            border: '1px solid #141310',
            borderRadius: '999px',
            color: '#344E38',
            fontSize: '11px',
            fontWeight: 900,
            fontFamily: '"General Sans", Inter, sans-serif',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          <CircuitBoard size={13} strokeWidth={2} />
          Interactive
        </span>
        <h2
          style={{
            margin: 0,
            fontFamily: '"Clash Display", "Anton", "Bebas Neue", "Owners Wide", Impact, sans-serif',
            fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
            fontWeight: 900,
            lineHeight: 0.95,
            textTransform: 'uppercase',
            color: '#141310',
            letterSpacing: '0',
          }}
        >
          Stack affinity coupler
        </h2>
        <p
          style={{
            margin: '16px 0 0',
            maxWidth: '560px',
            color: 'rgba(20, 19, 16, 0.68)',
            fontSize: '14px',
            lineHeight: 1.7,
            fontFamily: '"General Sans", Inter, sans-serif',
          }}
        >
          Assemble the tech stack you care about — I&apos;ll compute the affinity score and surface
          the matching proof of work.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          padding: '0 16px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '24px',
            padding: 'clamp(1.5rem, 3vw, 2.2rem)',
            borderRadius: '8px',
            background: '#141310',
            color: '#F2ECDE',
            boxShadow: '0 20px 60px rgba(4, 4, 3, 0.2)',
          }}
        >
          <div>
            <span
              style={{
                color: 'rgba(242, 236, 222, 0.5)',
                fontSize: '10px',
                fontWeight: 900,
                fontFamily: '"General Sans", Inter, sans-serif',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              Computed stack affinity
            </span>
            <div
              style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '10px' }}
            >
              <motion.span
                key={affinity}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: '"Clash Display", "Anton", "Bebas Neue", Impact, sans-serif',
                  fontSize: 'clamp(4rem, 8vw, 6rem)',
                  fontWeight: 900,
                  lineHeight: 0.85,
                  color: verdict.color,
                }}
              >
                {affinity}%
              </motion.span>
              <span
                style={{
                  color: 'rgba(242, 236, 222, 0.4)',
                  fontSize: '10px',
                  fontWeight: 900,
                  fontFamily: '"General Sans", Inter, sans-serif',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                alignment
              </span>
            </div>

            <div
              style={{
                height: '10px',
                borderRadius: '999px',
                background: 'rgba(242, 236, 222, 0.1)',
                overflow: 'hidden',
                marginTop: '18px',
              }}
            >
              <motion.div
                animate={{ width: `${affinity}%` }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  height: '100%',
                  borderRadius: '999px',
                  background: `linear-gradient(90deg, #3CBAAE, ${verdict.color})`,
                }}
              />
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(242, 236, 222, 0.12)', paddingTop: '18px' }}>
            <span
              style={{
                display: 'block',
                color: verdict.color,
                fontFamily: '"Clash Display", "Anton", "Bebas Neue", Impact, sans-serif',
                fontSize: '1.2rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.02em',
              }}
            >
              {verdict.title}
            </span>
            <p
              style={{
                margin: '8px 0 0',
                color: 'rgba(242, 236, 222, 0.68)',
                fontSize: '13px',
                lineHeight: 1.6,
                fontFamily: '"General Sans", Inter, sans-serif',
              }}
            >
              {verdict.desc}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <span
              style={{
                display: 'block',
                marginBottom: '12px',
                color: 'rgba(20, 19, 16, 0.55)',
                fontSize: '10px',
                fontWeight: 900,
                fontFamily: '"General Sans", Inter, sans-serif',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              Toggle tech requirements
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {TOOLS.map((tool, i) => {
                const isActive = selected.includes(tool.name);
                return (
                  <motion.button
                    key={tool.name}
                    type="button"
                    onClick={() => toggle(tool.name)}
                    whileTap={{ scale: 0.94 }}
                    whileHover={{ y: -2 }}
                    style={{
                      minHeight: '38px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '0 16px',
                      borderRadius: '999px',
                      border: `2px solid ${isActive ? accents[i % accents.length] : 'rgba(20, 19, 16, 0.35)'}`,
                      background: isActive ? accents[i % accents.length] : 'transparent',
                      color: isActive ? '#141310' : 'rgba(20, 19, 16, 0.7)',
                      fontSize: '11px',
                      fontWeight: 900,
                      fontFamily: '"General Sans", Inter, sans-serif',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'background 160ms ease, border-color 160ms ease',
                    }}
                  >
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: isActive ? '#141310' : 'transparent',
                        border: isActive ? 'none' : '2px solid rgba(20, 19, 16, 0.4)',
                      }}
                    />
                    {tool.name}
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div>
            <span
              style={{
                display: 'block',
                marginBottom: '12px',
                color: 'rgba(20, 19, 16, 0.55)',
                fontSize: '10px',
                fontWeight: 900,
                fontFamily: '"General Sans", Inter, sans-serif',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              Proof of work aligned ({matched.length})
            </span>

            <AnimatePresence mode="popLayout">
              {matched.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {matched.map((project) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 14 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '16px',
                        padding: '16px 20px',
                        borderRadius: '8px',
                        background: '#F2ECDE',
                        border: '1px solid rgba(20, 19, 16, 0.14)',
                        boxShadow: '0 10px 30px rgba(4, 4, 3, 0.08)',
                      }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <span
                          style={{
                            display: 'block',
                            fontFamily:
                              '"Clash Display", "Anton", "Bebas Neue", Impact, sans-serif',
                            fontSize: '1.15rem',
                            fontWeight: 900,
                            lineHeight: 1.1,
                            textTransform: 'uppercase',
                            color: '#141310',
                          }}
                        >
                          {project.title}
                        </span>
                        <span
                          style={{
                            display: 'block',
                            marginTop: '4px',
                            color: 'rgba(20, 19, 16, 0.55)',
                            fontSize: '10px',
                            fontWeight: 900,
                            fontFamily: '"General Sans", Inter, sans-serif',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {project.category} · {project.year}
                        </span>
                      </div>
                      <Link
                        to={`/dev/work/${project.slug}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 14px',
                          borderRadius: '999px',
                          background: '#141310',
                          color: '#F2ECDE',
                          fontSize: '10px',
                          fontWeight: 900,
                          fontFamily: '"General Sans", Inter, sans-serif',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          textDecoration: 'none',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Case study
                        <ArrowUpRight size={13} strokeWidth={2.2} />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    padding: '32px 20px',
                    borderRadius: '8px',
                    border: '2px dashed rgba(20, 19, 16, 0.25)',
                    textAlign: 'center',
                    color: 'rgba(20, 19, 16, 0.5)',
                    fontSize: '12px',
                    fontWeight: 800,
                    fontFamily: '"General Sans", Inter, sans-serif',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  No tools enabled — set requirements to show proof of work.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
