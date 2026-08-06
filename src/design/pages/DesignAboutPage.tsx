import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Code2,
  MapPin,
  Palette,
  PenTool,
  Sparkles,
} from 'lucide-react';
import { MagneticButton } from '../components/MagneticButton';
import { WordReveal } from '../components/WordReveal';
import { designTokens } from '../tokens';

const { colors } = designTokens;

const label: React.CSSProperties = {
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  color: 'hsl(var(--muted-foreground))',
  margin: 0,
};

const FACTS = [
  { key: 'Based in', value: 'Vadodara, India' },
  { key: 'Education', value: 'B.Tech CSE — Parul University, \u201827' },
  { key: 'Focus', value: 'Design, Art & Full-Stack Code' },
  { key: 'Currently', value: 'Freelance + Placements' },
];

const SERVICES = [
  {
    n: '01',
    title: 'Design',
    accent: colors.teal,
    desc: 'High-end websites, brand identities, posters and UI systems — from first sketch to polished visual language.',
  },
  {
    n: '02',
    title: 'Development',
    accent: colors.pink,
    desc: 'Production-grade web apps in React 19, TypeScript, Node.js and PostgreSQL — responsive, fast, maintainable.',
  },
  {
    n: '03',
    title: 'Traditional Art',
    accent: colors.yellow,
    desc: 'Acrylic canvases and digital illustration — the geometric, black & gold sensibility that feeds every project.',
  },
];

const JOURNEY = [
  {
    year: '2023',
    title: 'Beginning at Parul',
    desc: 'Started B.Tech CSE — programming basics, core CS concepts, first taste of DSA.',
  },
  {
    year: '2024',
    title: 'Discovering Design',
    desc: 'Canva, Figma, UI/UX principles. The geometric, brutalist, 90s-cartoon aesthetic that still defines every project.',
  },
  {
    year: '2025',
    title: 'From Designer to Developer',
    desc: 'Design work turned into code — modular React codebases, the pivot from designer to design-forward developer.',
  },
  {
    year: '2026',
    title: 'Building Products & DSA',
    desc: 'EVENTO, HopIn, Stickr, Rhythm Flux, AS.DEV v2. DSA in Java, React 19, and active placements.',
  },
];

export const DesignAboutPage: React.FC = () => {
  return (
    <main style={{ padding: '150px 5% 60px', maxWidth: '1600px', margin: '0 auto' }}>
      {/* ── 01 · Intro ── */}
      <header style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '40px', marginBottom: '100px' }}>
        <div style={{ gridColumn: '1 / span 4' }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={label}
          >
            01 — About
          </motion.p>
        </div>
        <div style={{ gridColumn: '5 / span 8' }}>
          <motion.h1
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            style={{ fontSize: 'max(4em, 7.5vw)', fontWeight: 500, lineHeight: 0.95, letterSpacing: '-0.02em', margin: 0 }}
          >
            Art & code,
            <br />
            one <span style={{ color: colors.orange }}>discipline</span>.
          </motion.h1>
        </div>
      </header>

      {/* ── Statement ── */}
      <section style={{ paddingBottom: '120px', maxWidth: '1200px' }}>
        <WordReveal
          text="I'm Anurudh Singh Rajawat — a designer, artist and developer from India. I take projects from first idea to shipped product: strategy, visual identity, interface design and the code underneath."
          className="design-word-reveal"
        />
      </section>

      {/* ── Portrait + Bio ── */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '60px', paddingBottom: '140px', alignItems: 'start' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{ gridColumn: '1 / span 6', position: 'relative' }}
        >
          <div
            style={{
              position: 'absolute',
              inset: '-14px 14px 14px -14px',
              border: `2px solid ${colors.yellow}`,
              borderRadius: '8px',
            }}
          />
          <img
            src="/avatar-anurudh.jpg"
            alt="Anurudh Singh Rajawat"
            style={{ width: '100%', height: 'auto', borderRadius: '8px', position: 'relative' }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 18px',
              borderRadius: '999px',
              backgroundColor: '#141310',
              color: colors.paper,
              fontSize: '13px',
            }}
          >
            <Sparkles size={15} color={colors.green} />
            Designer — Developer — Artist
          </div>
        </motion.div>

        <div style={{ gridColumn: '7 / span 6', paddingTop: '10px' }}>
          <p style={label}>02 — The person</p>
          <p style={{ fontSize: '20px', lineHeight: 1.55, margin: '24px 0 30px' }}>
            Started with a blank canvas and zero coding background in 2023. Spent 2024
            learning what makes interfaces feel good, crossed into frontend & React in
            2025, and now ship full-stack systems — React apps, Electron desktop tools,
            Android apps with Kotlin/Compose, Java backends.
          </p>
          <p style={{ fontSize: '16px', lineHeight: 1.6, margin: '0 0 40px', color: 'hsl(var(--muted-foreground))' }}>
            I care about UI/UX as much as clean code. The black/gold brutalist
            aesthetic from my design year still drives every product decision.
          </p>

          <div style={{ borderTop: '1px solid hsl(var(--border))' }}>
            {FACTS.map((f) => (
              <div
                key={f.key}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '20px',
                  padding: '18px 0',
                  borderBottom: '1px solid hsl(var(--border))',
                }}
              >
                <span style={label}>{f.key}</span>
                <span style={{ fontSize: '15px', textAlign: 'right' }}>{f.value}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginTop: '40px' }}>
            <MapPin size={18} color={colors.teal} />
            <span style={{ fontSize: '14px', color: 'hsl(var(--muted-foreground))' }}>
              Based in India · Working worldwide
            </span>
          </div>
        </div>
      </section>

      {/* ── 03 · What I do ── */}
      <section style={{ paddingBottom: '140px' }}>
        <p style={{ ...label, marginBottom: '60px' }}>03 — What I do</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.76, 0, 0.24, 1] }}
              style={{
                padding: '40px 30px',
                border: `1px solid hsl(var(--border))`,
                borderRadius: '12px',
                transition: 'transform 0.35s ease, box-shadow 0.35s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = `8px 8px 0 ${s.accent}33`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
                <span style={{ fontSize: '13px', color: s.accent, fontWeight: 600 }}>{s.n}</span>
                {s.title === 'Design' ? <PenTool size={20} color={s.accent} /> : s.title === 'Development' ? <Code2 size={20} color={s.accent} /> : <Palette size={20} color={s.accent} />}
              </div>
              <h3 style={{ fontSize: '26px', fontWeight: 500, margin: '0 0 14px' }}>{s.title}</h3>
              <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, color: 'hsl(var(--muted-foreground))' }}>
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 04 · Journey ── */}
      <section style={{ paddingBottom: '160px' }}>
        <p style={{ ...label, marginBottom: '60px' }}>04 — The journey</p>
        <div style={{ borderTop: '1px solid hsl(var(--border))' }}>
          {JOURNEY.map((j, i) => (
            <motion.div
              key={j.year}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.76, 0, 0.24, 1] }}
              style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr 2fr',
                gap: '40px',
                padding: '28px 0',
                borderBottom: '1px solid hsl(var(--border))',
                alignItems: 'baseline',
              }}
            >
              <span style={{ fontSize: '15px', fontWeight: 500, color: colors.orange }}>{j.year}</span>
              <h3 style={{ fontSize: '22px', fontWeight: 500, margin: 0 }}>{j.title}</h3>
              <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, color: 'hsl(var(--muted-foreground))' }}>
                {j.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          borderTop: '1px solid hsl(var(--border))',
          padding: '80px 0 100px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '40px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ fontSize: 'clamp(28px, 3.5vw, 52px)', fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.01em' }}>
          Like what you see?
          <br />
          Let's build something.
        </div>
        <Link to="/design/contact" style={{ textDecoration: 'none' }}>
          <MagneticButton variant="custom">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '18px 38px',
                borderRadius: '999px',
                backgroundColor: '#141310',
                color: colors.paper,
                fontSize: '15px',
              }}
            >
              Start a project <ArrowUpRight size={18} />
            </div>
          </MagneticButton>
        </Link>
      </section>
    </main>
  );
};
