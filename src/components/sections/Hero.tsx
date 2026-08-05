import React, { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionShell } from '../ui/PageShell';
import { Magnetic } from '../ui/Magnetic';

const navItems = [
  { label: 'Work', to: '/dev/work' },
  { label: 'Resume', to: '/dev/resume' },
  { label: 'Contact', to: '/dev/contact' },
];

const roles = ['Full-Stack Developer', 'UI/UX Designer', 'Java Architect', 'React Engineer'];

const badges = [
  {
    id: 'react-ui',
    className: 'ebison-badge--strategy',
    href: '/dev/work',
    content: (
      <>
        <span>React</span>
        <span>UI</span>
        <small>Interfaces with intent</small>
      </>
    ),
    ariaLabel: 'React UI badge — see work',
  },
  {
    id: 'node-apis',
    className: 'ebison-badge--commerce',
    href: '/dev/work',
    content: (
      <>
        <span>Node</span>
        <small>API</small>
        <span>Systems</span>
      </>
    ),
    ariaLabel: 'Node API systems badge — see work',
  },
  {
    id: 'java',
    className: 'ebison-badge--motion',
    href: '/dev/work',
    content: (
      <>
        <span>Java</span>
        <span>Logic</span>
        <span>Architecture</span>
      </>
    ),
    ariaLabel: 'Java logic architecture badge — see work',
  },
  {
    id: 'android',
    className: 'ebison-badge--experience',
    href: '/work',
    content: (
      <>
        <span>Android</span>
        <span>Kotlin</span>
        <span>Apps</span>
      </>
    ),
    ariaLabel: 'Android Kotlin apps badge — see work',
  },
  {
    id: 'design',
    className: 'ebison-badge--identity',
    href: '/work',
    content: (
      <>
        <span>UI/UX &</span>
        <span>Figma</span>
        <small>2024-2026</small>
      </>
    ),
    ariaLabel: 'UI UX and Figma badge — see work',
  },
];

export const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const onMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const ox = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
      const oy = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
      setParallax({ x: ox * 30, y: oy * 30 });
    };
    const onMouseLeave = () => setParallax({ x: 0, y: 0 });

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <SectionShell id="hero" padding="none" className="ebison-hero-section">
      <div ref={heroRef} className="ebison-hero-card">
        <div
          className="ebison-orbs"
          aria-hidden="true"
          style={{
            transform: `translate(${parallax.x}px, ${parallax.y}px) scale(1.06)`,
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <motion.span
            className="ebison-orb ebison-orb--teal"
            animate={{
              y: [0, -28, 0],
              x: [0, 22, 0],
              scale: [1, 1.12, 1],
            }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            className="ebison-orb ebison-orb--orange"
            animate={{
              y: [0, 26, 0],
              x: [0, -18, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            className="ebison-orb ebison-orb--green"
            animate={{
              y: [0, -18, 0],
              x: [0, 30, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <nav className="ebison-nav" aria-label="Primary navigation">
          <Link to="/" className="ebison-logo" aria-label="Anurudh home">
            <span className="ebison-logo-pill" aria-hidden="true" />
            <span className="ebison-logo-text">Anurudh</span>
          </Link>

          <ul className="ebison-nav-links">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="ebison-nav-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="ebison-nav-toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="ebison-nav-mobile"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
              style={{
                position: 'absolute',
                left: '11px',
                right: '11px',
                top: '50%',
                height: '2px',
                background: 'var(--ebison-cream)',
                borderRadius: '2px',
              }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
              style={{
                position: 'absolute',
                left: '11px',
                right: '11px',
                top: '50%',
                height: '2px',
                background: 'var(--ebison-cream)',
                borderRadius: '2px',
              }}
            />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.nav
                id="ebison-nav-mobile"
                className="ebison-nav-mobile"
                aria-label="Mobile navigation"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.2 }}
                  >
                    <Link
                      to={item.to}
                      className="ebison-nav-mobile__link"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>
        </nav>

        <div className="ebison-hero-copy">
          <h1>
            <span className="ebison-hero-role">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  className="ebison-hero-role__text"
                  initial={mounted ? { opacity: 0, y: 26, rotateX: 60 } : false}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -26, rotateX: -60 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <div className="ebison-intro">
            <p>
              3rd-year CSE student at Parul University building product-minded web, Android, and
              desktop apps.
            </p>
            <p>
              I pair UI/UX taste with working systems across React, Node, Java, Kotlin, and
              Electron.
            </p>
            <Magnetic strength={0.4}>
              <Link to="/dev/contact" className="ebison-cta-link">
                Get in touch
                <ArrowRight size={13} strokeWidth={2.1} aria-hidden="true" />
              </Link>
            </Magnetic>
          </div>
        </div>

        <div className="ebison-panel" aria-label="Anurudh skill collage">
          <div className="ebison-panel-grid" aria-hidden="true" />
          <div className="ebison-panel-curve" aria-hidden="true" />

          <picture>
            <source
              srcSet="/hover_avatar_nobg-320.webp 320w, /hover_avatar_nobg-640.webp 640w, /hover_avatar_nobg-976.webp 976w"
              sizes="(max-width: 560px) 300px, (max-width: 860px) 340px, 405px"
              type="image/webp"
            />
            <source srcSet="/hover_avatar_nobg.png" type="image/png" />
            <img
              className="ebison-portrait"
              src="/hover_avatar_nobg.png"
              alt="Anurudh Singh Rajawat"
              width="976"
              height="1078"
              decoding="async"
              fetchPriority="high"
            />
          </picture>

          <div className="ebison-badges">
            {badges.map((badge) => (
              <Link
                key={badge.id}
                to={badge.href}
                className={`ebison-badge ${badge.className} ebison-badge--link`}
                aria-label={badge.ariaLabel}
                title="See related projects"
              >
                {badge.content}
              </Link>
            ))}

            <div
              className="ebison-badge ebison-badge--testing"
              aria-label="Usability testing badge"
            >
              <svg viewBox="0 0 132 132" role="presentation" aria-hidden="true">
                <defs>
                  <path
                    id="ebison-testing-path"
                    d="M 66 66 m -51 0 a 51 51 0 1 1 102 0 a 51 51 0 1 1 -102 0"
                  />
                </defs>
                <text>
                  <textPath href="#ebison-testing-path" startOffset="50%" textAnchor="middle">
                    DSA - LeetCode - Debugging - Frontend -
                  </textPath>
                </text>
              </svg>
              <span className="ebison-testing-icon" aria-hidden="true">
                <span />
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="ebison-scroll-cue"
          onClick={scrollToWork}
          aria-label="Scroll down to see work"
        >
          <motion.span
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ display: 'inline-flex' }}
          >
            <ChevronDown size={18} strokeWidth={2.2} aria-hidden="true" />
          </motion.span>
          <span>Scroll</span>
        </button>
      </div>
    </SectionShell>
  );
};
