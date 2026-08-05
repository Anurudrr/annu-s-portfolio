import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Globe, ArrowDownLeft } from 'lucide-react';
import { MagneticButton } from '../components/MagneticButton';
import { WordReveal } from '../components/WordReveal';
import { ProjectThumbnailList } from '../components/ProjectThumbnailList';
import { ScrollMarquee } from '../components/ScrollMarquee';
import { Link } from 'react-router-dom';

// ─── Project data ────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    title: 'Posters',
    category: 'Print & Digital',
    slug: 'posters',
    imageUrl: '/art/graphics/doctor-strange.jpg',
  },
  {
    title: 'Graphic Design',
    category: 'Visual Identity',
    slug: 'graphic-design',
    imageUrl: '/art/graphics/rajput-couple.jpg',
  },
  {
    title: 'Painting',
    category: 'Traditional Art',
    slug: 'painting',
    imageUrl: '/art/paintings/kali-maa.jpg',
  },
  {
    title: 'Logos',
    category: 'Brand Identity',
    slug: 'logos',
    imageUrl: '/art/logos/nutriworld-leaf.jpg',
  },
];

// ─── Section label ────────────────────────────────────────────────────────────
const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p
    style={{
      fontSize: '11px',
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: 'hsl(var(--secondary-foreground))',
      margin: '0 0 60px',
    }}
  >
    {children}
  </p>
);

// ─── Social link with underline hover ────────────────────────────────────────
const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        color: '#F2ECDE',
        textDecoration: 'none',
        fontSize: '16px',
        position: 'relative',
        display: 'inline-block',
      }}
    >
      {children}
      <motion.span
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'absolute',
          bottom: -2,
          left: 0,
          right: 0,
          height: '1px',
          backgroundColor: '#F2ECDE',
          transformOrigin: 'left',
        }}
      />
    </a>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export const DesignHomePage: React.FC = () => {
  // Parallax for hero image on scroll
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImgY = useTransform(heroScroll, [0, 1], ['0%', '30%']);

  // Footer reveal logic
  const footerRef = useRef<HTMLElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);
  useEffect(() => {
    const measure = () => {
      if (footerRef.current) setFooterHeight(footerRef.current.offsetHeight);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <main style={{ backgroundColor: 'hsl(var(--background))', color: 'hsl(var(--foreground))' }}>
      {/* ── SCROLLABLE CONTENT (sits above the sticky footer) ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          backgroundColor: 'hsl(var(--background))',
          marginBottom: footerHeight,
        }}
      >
        {/* ══════════════════════════════════════════════
            SECTION 1 · HERO
            Exact solid gray bg + cutout portrait + marquee
        ══════════════════════════════════════════════ */}
        <section
          ref={heroRef}
          style={{
            position: 'relative',
            height: '100vh',
            backgroundColor: '#99A0A2', // The exact solid gray from the screenshot
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Top Navbar in Hero */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            padding: '30px 40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 10,
            color: '#fff',
            fontSize: '16px',
            fontWeight: 400
          }}>
            <div>© Code by Anurudh</div>
            <div style={{ display: 'flex', gap: '30px' }}>
              <Link to="/design/work" style={{ color: '#fff', textDecoration: 'none' }}>Work</Link>
              <Link to="/design/about" style={{ color: '#fff', textDecoration: 'none' }}>About</Link>
              <Link to="/design/contact" style={{ color: '#fff', textDecoration: 'none' }}>Contact</Link>
            </div>
          </div>

          {/* Huge scrolling Marquee */}
          <div style={{ 
            position: 'absolute', 
            bottom: '10vh', 
            left: 0, 
            width: '100%', 
            zIndex: 4,
            color: '#fff',
            fontSize: 'max(14vw, 120px)',
            fontWeight: 400
          }}>
            <ScrollMarquee baseVelocity={-1}>
              Anurudh Rajawat — 
            </ScrollMarquee>
          </div>

          {/* Portrait cutout (Center) */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              x: '-50%',
              width: '80vw',
              maxWidth: '900px',
              height: '95vh',
              zIndex: 2,
              y: heroImgY,
            }}
          >
            <img
              src="/design-hero.png"
              alt="Anurudh Singh Rajawat"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'bottom center',
              }}
            />
          </motion.div>

          {/* Middle Labels (Left Pill + Right Arrow Text) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              left: '5%',
              right: '5%',
              zIndex: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#fff',
            }}
          >
            {/* Left Pill */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#1C1D1F',
              borderRadius: '999px',
              padding: '10px',
              paddingLeft: '24px',
              gap: '24px'
            }}>
              <span style={{ fontSize: '16px', lineHeight: 1.2 }}>Located<br/>in India</span>
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Globe size={24} color="#fff" />
              </div>
            </div>

            {/* Right Text */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              <ArrowDownLeft size={32} color="#fff" />
              <span style={{ fontSize: '32px', lineHeight: 1.1, fontWeight: 400 }}>
                Freelance<br/>Designer & Developer
              </span>
            </div>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 2 · DESCRIPTION (Word Reveal)
        ══════════════════════════════════════════════ */}
        <section
          style={{
            padding: 'clamp(80px, 12vw, 160px) 5%',
            maxWidth: '1600px',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '40px',
              alignItems: 'start',
            }}
          >
            <div
              style={{
                gridColumn: '1 / span 9',
                fontSize: 'clamp(26px, 3.2vw, 42px)',
                fontWeight: 400,
                lineHeight: 1.3,
                letterSpacing: '-0.01em',
              }}
            >
              <WordReveal text="A 3rd-year CSE student at Parul University building product-minded web, Android, and desktop apps." />
            </div>

            <div
              style={{
                gridColumn: '10 / span 3',
                display: 'flex',
                flexDirection: 'column',
                gap: '40px',
                paddingTop: '8px',
              }}
            >
              <p style={{ fontSize: '15px', lineHeight: 1.65, margin: 0, color: 'hsl(var(--muted-foreground))' }}>
                I pair UI/UX taste with working systems across React, Node, Java, Kotlin, and Electron.
              </p>
              <div style={{ alignSelf: 'flex-start' }}>
                <MagneticButton variant="custom">
                  <div
                    style={{
                      padding: '14px 30px',
                      borderRadius: '99px',
                      border: '1px solid hsl(var(--border))',
                      fontSize: '14px',
                      color: 'hsl(var(--foreground))',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    About me
                  </div>
                </MagneticButton>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 3 · PROJECT THUMBNAIL LIST
        ══════════════════════════════════════════════ */}
        <section
          style={{
            padding: '0 5% clamp(80px, 10vw, 140px)',
            maxWidth: '1600px',
            margin: '0 auto',
          }}
        >
          <SectionLabel>Selected Work</SectionLabel>
          <ProjectThumbnailList projects={PROJECTS} />

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '80px' }}>
            <MagneticButton variant="custom">
              <div
                style={{
                  padding: '16px 40px',
                  borderRadius: '99px',
                  border: '1px solid hsl(var(--border))',
                  fontSize: '14px',
                  color: 'hsl(var(--foreground))',
                }}
              >
                More work
              </div>
            </MagneticButton>
          </div>
        </section>
      </div>

      {/* ══════════════════════════════════════════════
          SECTION 4 · CONTACT / FOOTER 
      ══════════════════════════════════════════════ */}
      <section
        ref={footerRef}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          zIndex: 0,
          backgroundColor: '#1C1D1F', // Exact near-black
          color: '#F2ECDE',
        }}
      >
        <div
          style={{
            maxWidth: '1600px',
            margin: '0 auto',
            padding: 'clamp(60px, 8vw, 100px) 5% clamp(30px, 4vw, 40px)',
            position: 'relative',
          }}
        >
          {/* Header Row (Profile Image + Text) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '60px' }}>
            <img 
              src="/design-hero.png" 
              alt="Profile" 
              style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <h2
              style={{
                fontSize: 'clamp(50px, 8vw, 120px)',
                fontWeight: 400,
                lineHeight: 0.92,
                letterSpacing: '-0.03em',
                margin: 0,
              }}
            >
              Let's work<br />together
            </h2>
          </div>

          {/* Full Width Line + Overlapping Circle */}
          <div style={{ position: 'relative', width: '100%', margin: '40px 0' }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
            
            {/* The overlapping circle on the right */}
            <div style={{ position: 'absolute', right: '10%', top: '50%', transform: 'translateY(-50%)' }}>
              <MagneticButton variant="custom">
                <div
                  style={{
                    width: 'clamp(140px, 14vw, 180px)',
                    height: 'clamp(140px, 14vw, 180px)',
                    borderRadius: '50%',
                    backgroundColor: '#5062F1', // Blue
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    fontWeight: 400,
                    color: '#fff',
                    zIndex: 2,
                  }}
                >
                  Get in touch
                </div>
              </MagneticButton>
            </div>
          </div>

          {/* Email + Phone Pills */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '80px', paddingTop: '20px', flexWrap: 'wrap' }}>
            {['sanurudh938@gmail.com', '+91 73893 82433'].map((contact) => (
              <MagneticButton key={contact} variant="custom">
                <div
                  style={{
                    padding: '18px 36px',
                    borderRadius: '999px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    fontSize: '16px',
                    color: '#F2ECDE',
                  }}
                >
                  {contact}
                </div>
              </MagneticButton>
            ))}
          </div>

          {/* Footer Bottom Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              fontSize: '14px',
              paddingTop: '20px'
            }}
          >
            {/* Left Info */}
            <div style={{ display: 'flex', gap: '60px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Version</span>
                <span>2022 © Edition</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Local time</span>
                <span>IST (GMT+5:30)</span>
              </div>
            </div>

            {/* Socials */}
            <div style={{ display: 'flex', gap: '30px' }}>
              {['Twitter', 'LinkedIn', 'GitHub', 'Instagram'].map((s) => (
                <FooterLink key={s} href="#">{s}</FooterLink>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
