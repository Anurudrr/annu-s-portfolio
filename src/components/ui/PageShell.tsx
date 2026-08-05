import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

interface PageShellProps {
  children: React.ReactNode;
  className?: string;
}

export const PageShell: React.FC<PageShellProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`page-shell ${className}`}
      style={{
        minHeight: '100vh',
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden',
        backgroundColor: '#8C8C8C',
        padding: '32px 16px',
      }}
    >
      <a
        href="#main-content"
        className="skip-link"
        style={{
          position: 'fixed',
          top: '16px',
          left: '16px',
          zIndex: 10000,
          transform: 'translateY(-160%)',
          background: '#141310',
          color: '#F2ECDE',
          padding: '0.75rem 1rem',
          fontSize: '0.875rem',
          fontWeight: 700,
          borderRadius: '6px',
          transition: 'transform 180ms ease',
        }}
      >
        Skip to main content
      </a>
      <div
        className="page-shell__inner"
        style={{
          maxWidth: '1320px',
          margin: '0 auto',
          backgroundColor: '#141310',
          borderRadius: '8px',
          overflow: 'hidden',
          minHeight: 'calc(100vh - 64px)',
          position: 'relative',
        }}
      >
        {children}
      </div>
    </div>
  );
};

interface NavProps {
  currentPage?: string;
}

export const Nav: React.FC<NavProps> = ({ currentPage = 'home' }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { label: 'Work', to: '/dev/work', featured: true },
    { label: 'About', to: '/dev/about', featured: true },
    { label: 'Blog', to: '/dev/blog' },
    { label: 'Status', to: '/dev/status' },
    { label: 'Contact', to: '/dev/contact' },
  ];

  const isActive = (to: string) =>
    to === `/dev/${currentPage}` || (currentPage === 'home' && to === '/dev');

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`site-nav ${menuOpen ? 'site-nav--open' : ''}`}
      style={{
        padding: '28px 32px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px',
        position: 'relative',
        zIndex: 50,
      }}
    >
      <Link
        to="/"
        className="brand-lockup"
        aria-label="Go to home"
        onClick={closeMenu}
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '4px',
          background: 'transparent',
          color: '#F2ECDE',
          fontSize: '11px',
          fontWeight: 700,
          lineHeight: 1.05,
          fontFamily: '"General Sans", Inter, sans-serif',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          padding: 0,
          marginRight: 'auto',
        }}
      >
        <span
          style={{
            width: '44px',
            height: '18px',
            borderRadius: '999px',
            background: '#F2ECDE',
            marginBottom: '2px',
          }}
        />
        <strong style={{ fontWeight: 700 }}>Anurudh</strong>
      </Link>

      <nav
        className="site-nav__links"
        aria-label="Primary navigation"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '40px',
          flexShrink: 0,
        }}
      >
        {navItems.map((item) => (
          <motion.div key={item.to} whileHover={{ color: '#3CBAAE' }}>
            <Link
              to={item.to}
              style={{
                minHeight: '36px',
                padding: item.featured ? '6px 16px' : '0 4px 4px',
                display: 'inline-flex',
                alignItems: 'center',
                background: item.featured
                  ? isActive(item.to)
                    ? 'var(--as-accent, #3cbaae)'
                    : 'rgba(242, 236, 222, 0.1)'
                  : 'transparent',
                color: item.featured
                  ? isActive(item.to)
                    ? '#141310'
                    : 'var(--as-accent, #3cbaae)'
                  : isActive(item.to)
                    ? '#3CBAAE'
                    : '#F2ECDE',
                fontSize: item.featured ? '14px' : '11px',
                fontWeight: 700,
                fontFamily: item.featured
                  ? '"Clash Display", "Anton", "Bebas Neue", "Owners Wide", Impact, sans-serif'
                  : '"General Sans", Inter, sans-serif',
                letterSpacing: item.featured ? '0.04em' : '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '999px',
                border: item.featured
                  ? isActive(item.to)
                    ? '1px solid var(--as-accent, #3cbaae)'
                    : '1px solid rgba(242, 236, 222, 0.35)'
                  : 'none',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {item.featured && (
                <span
                  style={{
                    marginRight: '7px',
                    fontSize: '13px',
                    lineHeight: 1,
                    opacity: isActive(item.to) ? 0.85 : 0.9,
                  }}
                  aria-hidden="true"
                >
                  ✦
                </span>
              )}
              {item.label}
              {!item.featured && (
                <motion.span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '1px',
                    background: '#3CBAAE',
                    transformOrigin: 'left center',
                  }}
                  initial={{ scaleX: 0 }}
                  whileHover={{
                    scaleX: 1,
                    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
                  }}
                  animate={isActive(item.to) ? { scaleX: 1 } : { scaleX: 0 }}
                />
              )}
            </Link>
          </motion.div>
        ))}

        <a
          href="/resume.html"
          target="_blank"
          rel="noopener noreferrer"
          className="site-nav__resume"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            minHeight: '36px',
            padding: '0 18px',
            background: '#F2ECDE',
            color: '#141310',
            borderRadius: '999px',
            fontSize: '11px',
            fontWeight: 700,
            fontFamily: '"General Sans", Inter, sans-serif',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'background 180ms ease, color 180ms ease, transform 180ms ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#3CBAAE';
            e.currentTarget.style.color = '#141310';
            e.currentTarget.style.transform = 'rotate(-3deg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#F2ECDE';
            e.currentTarget.style.color = '#141310';
            e.currentTarget.style.transform = 'rotate(0deg)';
          }}
        >
          <FileText size={13} strokeWidth={2.2} aria-hidden="true" />
          Resume
        </a>
      </nav>

      <button
        type="button"
        className="site-nav__toggle"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="site-nav-mobile"
        onClick={() => setMenuOpen((open) => !open)}
        style={{
          display: 'none',
          position: 'relative',
          width: '44px',
          height: '44px',
          flex: '0 0 auto',
          border: '1px solid rgba(242, 236, 222, 0.3)',
          borderRadius: '12px',
          background: 'transparent',
          cursor: 'pointer',
          zIndex: 60,
        }}
      >
        <motion.span
          animate={menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
          style={{
            position: 'absolute',
            left: '10px',
            right: '10px',
            top: '50%',
            height: '2px',
            background: '#F2ECDE',
            borderRadius: '2px',
          }}
        />
        <motion.span
          animate={menuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
          style={{
            position: 'absolute',
            left: '10px',
            right: '10px',
            top: '50%',
            height: '2px',
            background: '#F2ECDE',
            borderRadius: '2px',
          }}
        />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="site-nav-mobile"
            className="site-nav__mobile"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              top: 'calc(100% - 8px)',
              left: '16px',
              right: '16px',
              display: 'none',
              flexDirection: 'column',
              padding: '12px',
              background: '#141310',
              border: '1px solid rgba(242, 236, 222, 0.16)',
              borderRadius: '16px',
              boxShadow: '0 24px 60px rgba(20, 19, 16, 0.5)',
              zIndex: 55,
            }}
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.2 }}
              >
                <Link
                  to={item.to}
                  onClick={closeMenu}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    color: item.featured
                      ? isActive(item.to)
                        ? '#141310'
                        : 'var(--as-accent, #3cbaae)'
                      : isActive(item.to)
                        ? '#3CBAAE'
                        : '#F2ECDE',
                    fontSize: item.featured ? '16px' : '13px',
                    fontWeight: 700,
                    fontFamily: item.featured
                      ? '"Clash Display", "Anton", "Bebas Neue", "Owners Wide", Impact, sans-serif'
                      : '"General Sans", Inter, sans-serif',
                    letterSpacing: item.featured ? '0.04em' : '0.1em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    background: item.featured
                      ? isActive(item.to)
                        ? 'var(--as-accent, #3cbaae)'
                        : 'rgba(242, 236, 222, 0.1)'
                      : isActive(item.to)
                        ? 'rgba(60, 186, 174, 0.08)'
                        : 'transparent',
                  }}
                >
                  <span>
                    {item.featured && (
                      <span
                        style={{
                          marginRight: '7px',
                          fontSize: '14px',
                          opacity: isActive(item.to) ? 0.85 : 0.9,
                        }}
                        aria-hidden="true"
                      >
                        ✦
                      </span>
                    )}
                    {item.label}
                  </span>
                  <span style={{ opacity: 0.4, fontSize: '11px' }}>↗</span>
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * navItems.length, duration: 0.2 }}
              style={{
                marginTop: '6px',
                paddingTop: '6px',
                borderTop: '1px solid rgba(242, 236, 222, 0.1)',
              }}
            >
              <a
                href="/resume.html"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  borderRadius: '10px',
                  background: 'rgba(60, 186, 174, 0.12)',
                  color: '#3CBAAE',
                  fontSize: '13px',
                  fontWeight: 700,
                  fontFamily: '"General Sans", Inter, sans-serif',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                Resume
                <FileText size={14} strokeWidth={2.2} aria-hidden="true" />
              </a>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

interface FooterProps {
  className?: string;
}

const ACCENTS = [
  { id: 'teal', colors: ['#3CBAAE', '#69A65B'] },
  { id: 'solar', colors: ['#EF7B3C', '#F2C94C'] },
  { id: 'mint', colors: ['#69A65B', '#3CBAAE'] },
  { id: 'rose', colors: ['#EC4E7C', '#F2C94C'] },
  { id: 'violet', colors: ['#9D7BB5', '#3CBAAE'] },
];

function applyAccent(id: string) {
  document.documentElement.setAttribute('data-accent', id);
  try {
    localStorage.setItem('as.accent', id);
  } catch {
    // storage unavailable (private mode)
  }
}

const ThemeSwitcher: React.FC = () => {
  const [current, setCurrent] = useState(() => {
    try {
      return window.localStorage.getItem('as.accent') || 'teal';
    } catch {
      return 'teal';
    }
  });

  useEffect(() => {
    applyAccent(current);
  }, [current]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginTop: '16px',
      }}
    >
      <span
        style={{
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          opacity: 0.6,
          fontFamily: '"General Sans", Inter, sans-serif',
        }}
      >
        Accent
      </span>
      {ACCENTS.map((a) => (
        <button
          key={a.id}
          type="button"
          aria-label={`Set accent theme ${a.id}`}
          title={a.id}
          onClick={() => setCurrent(a.id)}
          style={{
            width: '18px',
            height: '18px',
            borderRadius: '999px',
            padding: 0,
            border: `2px solid ${current === a.id ? '#F2ECDE' : 'rgba(242, 236, 222, 0.25)'}`,
            background: `linear-gradient(135deg, ${a.colors[0]}, ${a.colors[1]})`,
            cursor: 'pointer',
          }}
        />
      ))}
    </div>
  );
};

const FooterStatus: React.FC = () => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const time = now.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <p
      style={{
        marginTop: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '11px',
        fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
        letterSpacing: '0.04em',
      }}
    >
      <span
        style={{
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: 'var(--as-accent-2, #69A65B)',
          boxShadow: '0 0 8px var(--as-accent-2, #69A65B)',
        }}
      />
      {navigator.onLine ? 'SITE ONLINE' : 'OFFLINE'} · {time} IST
    </p>
  );
};

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const socials = [
    {
      label: 'GitHub',
      href: 'https://github.com/Anurudrr',
      color: '#3CBAAE',
      textColor: '#141310',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/anurudh-singh-251067307/',
      color: '#69A65B',
      textColor: '#141310',
    },
    {
      label: 'LeetCode',
      href: 'https://leetcode.com/u/ANURUDH_SINGH_RAJAWAT/',
      color: '#F2C94C',
      textColor: '#141310',
    },
    {
      label: 'Email',
      href: 'mailto:sanurudh938@gmail.com',
      color: '#EF7B3C',
      textColor: '#F2ECDE',
    },
  ];

  return (
    <footer
      className={`site-footer ${className}`}
      style={{
        backgroundColor: '#141310',
        color: '#F2ECDE',
        padding: '48px 32px 32px',
        marginTop: 'auto',
        overflow: 'hidden',
      }}
    >
      <div className="footer-wordmark" aria-hidden="true">
        <div className="footer-wordmark__track">
          {Array.from({ length: 2 }).map((_, row) =>
            Array.from({ length: 6 }).map((__, col) => (
              <span key={`${row}-${col}`} className="footer-wordmark__item">
                ANURUDH
                <span className="footer-wordmark__dot">✦</span>
              </span>
            ))
          )}
        </div>
      </div>
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: '32px',
          alignItems: 'start',
          position: 'relative',
        }}
      >
        <div style={{ textAlign: 'left' }}>
          <div
            className="brand-lockup"
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '4px',
              color: '#F2ECDE',
              fontSize: '11px',
              fontWeight: 700,
              lineHeight: 1.05,
              fontFamily: '"General Sans", Inter, sans-serif',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            <span
              style={{
                width: '44px',
                height: '18px',
                borderRadius: '999px',
                background: '#F2ECDE',
                marginBottom: '2px',
              }}
            />
            <strong>Anurudh</strong>
          </div>
          <p
            style={{
              marginTop: '8px',
              fontSize: '13px',
              lineHeight: 1.6,
              opacity: 0.7,
              fontFamily: '"General Sans", Inter, sans-serif',
            }}
          >
            Full-Stack Developer & UI/UX Designer
            <br />
            3rd Year B.Tech CSE, Parul University
          </p>
        </div>

        <nav style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { label: 'Work', to: '/dev/work' },
              { label: 'About', to: '/dev/about' },
              { label: 'Blog', to: '/dev/blog' },
              { label: 'Status', to: '/dev/status' },
              { label: 'Contact', to: '/dev/contact' },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                style={{
                  color: '#F2ECDE',
                  fontSize: '13px',
                  fontWeight: 600,
                  fontFamily: '"General Sans", Inter, sans-serif',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#3CBAAE';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#F2ECDE';
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <div style={{ textAlign: 'right' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              alignItems: 'flex-end',
            }}
          >
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 18px',
                  backgroundColor: social.color,
                  color: social.textColor,
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: 700,
                  fontFamily: '"Clash Display", "Anton", "Bebas Neue", Impact, sans-serif',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transform: 'rotate(-4deg)',
                  transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'rotate(0deg) scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'rotate(-4deg)';
                }}
              >
                {social.label}
              </a>
            ))}
          </div>
          <p
            style={{
              marginTop: '28px',
              fontSize: '11px',
              opacity: 0.5,
              fontFamily: '"General Sans", Inter, sans-serif',
            }}
          >
            (c) 2023 - Present Anurudh Singh Rajawat
          </p>
          <FooterStatus />
          <ThemeSwitcher />
        </div>
      </div>
    </footer>
  );
};

interface SectionShellProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  style?: React.CSSProperties;
}

const sectionPadding = {
  none: '0',
  sm: '32px 32px',
  md: '56px 32px',
  lg: '80px 32px',
  xl: '112px 32px',
};

export const SectionShell: React.FC<SectionShellProps> = ({
  children,
  className = '',
  id,
  padding = 'lg',
  style = {},
}) => {
  return (
    <section
      id={id}
      className={`section-shell ${className}`}
      style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: sectionPadding[padding],
        width: '100%',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {children}
    </section>
  );
};

interface CTAButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  style?: React.CSSProperties;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  children,
  href,
  onClick,
  variant = 'primary',
  icon,
  iconPosition = 'right',
  className = '',
  style = {},
}) => {
  const [hovered, setHovered] = useState(false);
  const buttonRef = useRef<any>(null);

  const handleMagneticMove = (e: React.MouseEvent) => {
    const el = buttonRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${dx * 0.08}px, ${dy * 0.1}px)`;
  };

  const handleMagneticLeave = () => {
    const el = buttonRef.current;
    if (el) el.style.transform = '';
    setHovered(false);
  };

  const variants = {
    primary: {
      base: {
        background: '#F2ECDE',
        color: '#141310',
        border: 'none',
        borderBottom: 'none',
      },
      hover: {
        background: '#3CBAAE',
        color: '#F2ECDE',
        border: 'none',
        borderBottom: 'none',
      },
    },
    secondary: {
      base: {
        background: 'transparent',
        color: '#F2ECDE',
        border: '1px solid #F2ECDE',
        borderBottom: 'none',
      },
      hover: {
        background: '#F2ECDE',
        color: '#141310',
        border: '1px solid #F2ECDE',
        borderBottom: 'none',
      },
    },
    ghost: {
      base: {
        background: 'transparent',
        color: '#F2ECDE',
        border: 'none',
        borderBottom: '1px solid currentColor',
        borderRadius: 0,
        paddingBottom: '4px',
      },
      hover: {
        background: 'transparent',
        color: '#3CBAAE',
        border: 'none',
        borderBottom: '1px solid #3CBAAE',
        borderRadius: 0,
        paddingBottom: '4px',
      },
    },
  };

  const v = variants[variant];
  const isHovered = hovered;

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: isHovered ? '14px' : '10px',
    justifyContent: 'center',
    minHeight: '56px',
    padding: variant === 'ghost' ? '0 4px 4px' : '0 28px',
    background: isHovered ? v.hover.background : v.base.background,
    color: isHovered ? v.hover.color : v.base.color,
    border: variant === 'ghost' ? 'none' : isHovered ? v.hover.border : v.base.border,
    borderBottom:
      variant === 'ghost' ? (isHovered ? '1px solid #3CBAAE' : '1px solid currentColor') : 'none',
    borderRadius: variant === 'ghost' ? 0 : '999px',
    paddingBottom: variant === 'ghost' ? '4px' : undefined,
    fontSize: '14px',
    fontWeight: 900,
    fontFamily: '"General Sans", Inter, sans-serif',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
    cursor: 'pointer',
    willChange: 'transform',
    ...style,
  };

  const Component = href ? 'a' : 'button';
  const props = href ? { href } : { onClick, type: 'button' as const };

  return (
    <Component
      {...props}
      ref={buttonRef}
      className={className}
      style={baseStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMagneticMove}
      onMouseLeave={handleMagneticLeave}
    >
      {icon && iconPosition === 'left' && <span>{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span>{icon}</span>}
    </Component>
  );
};
