import React from 'react';
import { motion } from 'motion/react';
import { PageShell, Nav, Footer, SectionShell } from '../components/ui/PageShell';
import { InlineSticker } from '../components/ui/Sticker';
import { JourneySection } from '../components/sections/JourneySection';
import Hobbies from '../components/Hobbies';
import SkillMatcher from '../components/SkillMatcher';
import Timeline from '../components/Timeline';
import Skills from '../components/Skills';
import PolaroidGallery from '../components/PolaroidGallery';
import AlgoPlayground from '../components/AlgoPlayground';
import { ACHIEVEMENTS_DATA } from '../types';
import { SEO } from '../components/SEO';

const achievementAccents = ['#3CBAAE', '#F2C94C', '#EF7B3C', '#69A65B', '#EC4E7C'];

const skills = [
  { label: 'HTML', accentIndex: 0 },
  { label: 'CSS', accentIndex: 1 },
  { label: 'JAVASCRIPT', accentIndex: 0 },
  { label: 'TYPESCRIPT', accentIndex: 0 },
  { label: 'REACT', accentIndex: 0 },
  { label: 'JAVA', accentIndex: 2 },
  { label: 'KOTLIN', accentIndex: 2 },
  { label: 'FIGMA', accentIndex: 1 },
  { label: 'ADOBE XD', accentIndex: 3 },
  { label: 'CANVA', accentIndex: 4 },
  { label: 'ELECTRON', accentIndex: 3 },
  { label: 'SPRING BOOT', accentIndex: 2 },
  { label: 'TAILWIND', accentIndex: 0 },
  { label: 'MOTION', accentIndex: 4 },
  { label: 'GIT', accentIndex: 2 },
  { label: 'MYSQL', accentIndex: 2 },
  { label: 'REST APIs', accentIndex: 0 },
  { label: 'DSA', accentIndex: 4 },
];

export const AboutPage: React.FC = () => {
  return (
    <PageShell>
      <SEO
        title="About"
        description="Learn about Anurudh Singh Rajawat — 3rd-year CSE student, Full-Stack Developer & UI/UX Designer. From design practice to working systems across React, Node, Java, Kotlin, and Electron."
        url="/about"
        image="/og-image.png"
      />
      <Nav currentPage="about" />
      <main id="main-content">
        <SectionShell id="about-hero" padding="xl" style={{ paddingBottom: '0' }}>
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
              data-index="01"
            >
              About
            </span>
            <h1
              style={{
                margin: 0,
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
              HI, I&apos;M ANURUDH
            </h1>
            <p
              style={{
                marginTop: '16px',
                color: 'rgba(242, 236, 222, 0.78)',
                fontSize: '14px',
                lineHeight: 1.6,
                fontFamily: '"General Sans", Inter, sans-serif',
                maxWidth: '400px',
              }}
            >
              Also known as Annu — Full-Stack Developer & UI/UX Designer
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '56px',
              alignItems: 'start',
              padding: '0 16px',
            }}
          >
            <div>
              <img
                src="/avatar-anurudh.jpg"
                alt="Anurudh Singh Rajawat"
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '16px',
                  filter: 'grayscale(1) contrast(1.18)',
                  opacity: 0.92,
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <p
                style={{
                  color: 'rgba(242, 236, 222, 0.78)',
                  lineHeight: 1.75,
                  fontSize: '15px',
                  fontFamily: '"General Sans", Inter, sans-serif',
                }}
              >
                3rd-year Computer Science & Engineering student at Parul Institute of Technology,
                Vadodara (2023–2027). Started with zero coding background in 2023, spent 2024 on
                UI/UX design (Figma, Canva, Adobe XD), crossed into frontend & React in 2025, now
                operates at the intersection of full-stack systems and high-fidelity design.
              </p>
              <p
                style={{
                  color: 'rgba(242, 236, 222, 0.78)',
                  lineHeight: 1.75,
                  fontSize: '15px',
                  fontFamily: '"General Sans", Inter, sans-serif',
                }}
              >
                I care about UI/UX as much as clean code — from React apps and Electron desktop
                tools to Android apps with Kotlin/Compose, and Java backend systems. Open to
                internships, remote contracts, frontend roles, and full-stack partnerships.
              </p>
              <a
                href="/resume.html"
                target="_blank"
                rel="noreferrer"
                style={{
                  alignSelf: 'flex-start',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  minHeight: '52px',
                  padding: '0 28px',
                  background: '#3CBAAE',
                  color: '#141310',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: 900,
                  fontFamily: '"General Sans", Inter, sans-serif',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'rotate(-2deg) scale(1.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
                }}
              >
                Download Resume
              </a>
            </div>
          </div>
        </SectionShell>

        <motion.section
          id="proficiency"
          style={{
            backgroundColor: '#1C1B18',
            borderRadius: '24px',
            margin: '0 32px 56px',
            maxWidth: '1280px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '112px 32px',
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
                minHeight: '30px',
                padding: '8px 16px',
                border: '1px solid #69A65B',
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
              data-index="02"
            >
              Proficiency
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
                color: '#F2ECDE',
                letterSpacing: '0',
              }}
            >
              Core Stack Depth
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '28px 48px',
              padding: '0 16px',
            }}
          >
            {[
              { label: 'React.js', value: 85 },
              { label: 'Tailwind CSS', value: 90 },
              { label: 'TypeScript', value: 78 },
              { label: 'Java / OOP', value: 75 },
              { label: 'Figma / UI-UX', value: 88 },
              { label: 'Node.js / Express', value: 55 },
            ].map((skill, i) => (
              <div key={skill.label}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: '10px',
                  }}
                >
                  <span
                    style={{
                      color: '#F2ECDE',
                      fontSize: '13px',
                      fontWeight: 800,
                      fontFamily: '"General Sans", Inter, sans-serif',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {skill.label}
                  </span>
                  <span
                    style={{
                      color: '#3CBAAE',
                      fontSize: '13px',
                      fontWeight: 900,
                      fontFamily: '"General Sans", Inter, sans-serif',
                    }}
                  >
                    {skill.value}%
                  </span>
                </div>
                <div
                  style={{
                    height: '8px',
                    borderRadius: '999px',
                    background: '#2A2925',
                    overflow: 'hidden',
                  }}
                >
                  <motion.div
                    style={{
                      height: '100%',
                      borderRadius: '999px',
                      background:
                        i % 2 === 0
                          ? 'linear-gradient(90deg, #3CBAAE, #9FD463)'
                          : 'linear-gradient(90deg, #EF7B3C, #F2C94C)',
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.value}%` }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <JourneySection />

        <div
          style={{
            margin: '0 32px 56px',
            maxWidth: '1280px',
            marginLeft: 'auto',
            marginRight: 'auto',
            borderRadius: '24px',
            overflow: 'hidden',
            width: '100%',
          }}
        >
          <Timeline />
        </div>

        <motion.section
          id="skills"
          style={{
            backgroundColor: '#EDE5D6',
            borderRadius: '24px',
            margin: '0 32px 56px',
            maxWidth: '1280px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '112px 32px',
            width: '100%',
            boxSizing: 'border-box',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <motion.div
            style={{ marginBottom: '32px', padding: '0 16px' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
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
              Skills
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
              Skills Constellation
            </h2>
          </motion.div>
          <motion.div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              justifyContent: 'flex-start',
              padding: '0 16px',
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: { transition: { staggerChildren: 0.05 } },
            }}
          >
            {skills.map((skill) => (
              <motion.span
                key={skill.label}
                variants={{
                  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] as const },
                  },
                }}
              >
                <InlineSticker accentIndex={skill.accentIndex} size="sm">
                  {skill.label}
                </InlineSticker>
              </motion.span>
            ))}
          </motion.div>
        </motion.section>

        <div
          style={{
            margin: '0 32px 56px',
            maxWidth: '1280px',
            marginLeft: 'auto',
            marginRight: 'auto',
            borderRadius: '24px',
            overflow: 'hidden',
            width: '100%',
          }}
        >
          <Skills />
        </div>

        <SkillMatcher />

        <motion.section
          id="achievements"
          style={{
            backgroundColor: '#1C1B18',
            borderRadius: '24px',
            margin: '0 32px 56px',
            maxWidth: '1280px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '112px 32px',
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
                minHeight: '30px',
                padding: '8px 16px',
                border: '1px solid #69A65B',
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
              data-index="04"
            >
              Credentials
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
                color: '#F2ECDE',
                letterSpacing: '0',
              }}
            >
              Certifications & Proof of Work
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              padding: '0 16px',
            }}
          >
            {ACHIEVEMENTS_DATA.map((achievement, i) => {
              const accent = achievementAccents[i % achievementAccents.length];
              return (
                <motion.article
                  key={achievement.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.08,
                    ease: [0.16, 1, 0.3, 1] as const,
                  }}
                  whileHover={{ y: -4 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    minHeight: '260px',
                    padding: '28px',
                    borderRadius: '16px',
                    border: '1px solid rgba(242, 236, 222, 0.1)',
                    background: '#141310',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: `${accent}1A`,
                        fontSize: '24px',
                        lineHeight: 1,
                        flexShrink: 0,
                      }}
                    >
                      {achievement.icon}
                    </span>
                    {achievement.tag && (
                      <span
                        style={{
                          padding: '6px 12px',
                          borderRadius: '999px',
                          background: accent,
                          color: '#141310',
                          fontSize: '9px',
                          fontWeight: 900,
                          fontFamily: '"General Sans", Inter, sans-serif',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {achievement.tag}
                      </span>
                    )}
                  </div>

                  <h3
                    style={{
                      margin: '4px 0 0',
                      fontFamily:
                        '"Clash Display", "Anton", "Bebas Neue", "Owners Wide", Impact, sans-serif',
                      fontSize: '1.35rem',
                      fontWeight: 900,
                      lineHeight: 1.1,
                      textTransform: 'uppercase',
                      color: '#F2ECDE',
                      letterSpacing: '0',
                    }}
                  >
                    {achievement.title}
                  </h3>

                  {achievement.issuer && (
                    <span
                      style={{
                        color: accent,
                        fontSize: '10px',
                        fontWeight: 900,
                        fontFamily: '"General Sans", Inter, sans-serif',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {achievement.issuer}
                    </span>
                  )}

                  <p
                    style={{
                      margin: 0,
                      color: 'rgba(242, 236, 222, 0.65)',
                      fontSize: '13px',
                      lineHeight: 1.65,
                      fontFamily: '"General Sans", Inter, sans-serif',
                    }}
                  >
                    {achievement.description}
                  </p>

                  {achievement.link && (
                    <a
                      href={achievement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginTop: 'auto',
                        color: accent,
                        fontSize: '11px',
                        fontWeight: 900,
                        fontFamily: '"General Sans", Inter, sans-serif',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        borderBottom: '1px solid currentColor',
                        alignSelf: 'flex-start',
                      }}
                    >
                      Verify credential
                    </a>
                  )}
                </motion.article>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          id="interests"
          style={{
            backgroundColor: '#141310',
            borderRadius: '24px',
            margin: '0 32px',
            maxWidth: '1280px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '112px 32px',
            width: '100%',
            boxSizing: 'border-box',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <motion.div
            style={{ marginBottom: '32px', padding: '0 16px' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                minHeight: '30px',
                padding: '8px 16px',
                border: '1px solid #69A65B',
                borderRadius: '999px',
                color: '#69A65B',
                fontSize: '11px',
                fontWeight: 900,
                fontFamily: '"General Sans", Inter, sans-serif',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              Personal
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
                color: '#F2ECDE',
                letterSpacing: '0',
              }}
            >
              Beyond Code
            </h2>
          </motion.div>
          <motion.p
            style={{
              color: 'rgba(242, 236, 222, 0.6)',
              lineHeight: 1.75,
              fontSize: '14px',
              fontFamily: '"General Sans", Inter, sans-serif',
              maxWidth: '600px',
              padding: '0 16px',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
          >
            When not building products: competitive gaming (Valorant, CS2), gym tracking &
            progressive overload, papercraft & model building, and scrolling Reels for design
            inspiration. Also enjoy mechanical keyboards, coffee rituals, and late-night debugging
            sessions with lo-fi beats.
          </motion.p>

          <div style={{ marginTop: '48px', padding: '0 16px' }}>
            <Hobbies />
          </div>

          <div style={{ marginTop: '96px', padding: '0 16px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                minHeight: '30px',
                padding: '8px 16px',
                border: '1px solid #69A65B',
                borderRadius: '999px',
                color: '#69A65B',
                fontSize: '11px',
                fontWeight: 900,
                fontFamily: '"General Sans", Inter, sans-serif',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              Playground
            </span>
            <h3
              style={{
                margin: '0 0 8px',
                fontFamily:
                  '"Clash Display", "Anton", "Bebas Neue", "Owners Wide", Impact, sans-serif',
                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                fontWeight: 900,
                lineHeight: 1,
                textTransform: 'uppercase',
                color: '#F2ECDE',
                letterSpacing: '0',
              }}
            >
              BINARY SEARCH, VISUALLY
            </h3>
            <p
              style={{
                margin: '0 0 24px',
                color: 'rgba(242, 236, 222, 0.55)',
                fontSize: '12px',
                fontFamily: '"General Sans", Inter, sans-serif',
                maxWidth: '560px',
                lineHeight: 1.6,
              }}
            >
              A live, step-through binary search on a sorted array — the algorithm behind every
              interview answer. Pick a target, then step, play, or reset.
            </p>
            <div
              style={{
                background: '#F2ECDE',
                borderRadius: '24px',
                padding: '28px',
              }}
            >
              <AlgoPlayground />
            </div>
          </div>

          <div style={{ marginTop: '96px', padding: '0 16px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                minHeight: '30px',
                padding: '8px 16px',
                border: '1px solid #69A65B',
                borderRadius: '999px',
                color: '#69A65B',
                fontSize: '11px',
                fontWeight: 900,
                fontFamily: '"General Sans", Inter, sans-serif',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              Visual Archive
            </span>
            <h3
              style={{
                margin: '0 0 8px',
                fontFamily:
                  '"Clash Display", "Anton", "Bebas Neue", "Owners Wide", Impact, sans-serif',
                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                fontWeight: 900,
                lineHeight: 1,
                textTransform: 'uppercase',
                color: '#F2ECDE',
                letterSpacing: '0',
              }}
            >
              MEMORIES BOARD
            </h3>
            <p
              style={{
                margin: '0 0 24px',
                color: 'rgba(242, 236, 222, 0.55)',
                fontSize: '12px',
                fontFamily: '"General Sans", Inter, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Drop photos in — every frame gets its own treatment
            </p>
            <PolaroidGallery />
          </div>
        </motion.section>
      </main>
      <Footer />
    </PageShell>
  );
};
