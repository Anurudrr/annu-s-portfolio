import React from 'react';
import { motion } from 'motion/react';
import { accentColors } from '../../design/utils';
import { SectionShell } from '../ui/PageShell';

interface Milestone {
  year: string;
  title: string;
  description: string;
}

const milestones: Milestone[] = [
  {
    year: '2023',
    title: 'STARTED B.TECH CSE',
    description:
      'Parul Institute of Technology, Vadodara. Built programming fundamentals from zero coding background.',
  },
  {
    year: '2024',
    title: 'EVENTO — FULL-STACK EVENT PLATFORM',
    description:
      'Led UI/UX and frontend on a full-stack event management platform (React, TypeScript, Tailwind, Motion).',
  },
  {
    year: '2025',
    title: 'HOPIN — JAVA TRAVEL MANAGEMENT SYSTEM',
    description:
      'Built a Java-based travel management system, focused on system architecture and OOP design (Spring Boot, MySQL).',
  },
  {
    year: 'NOW',
    title: 'CAMPUS PLACEMENTS & FULL-STACK GROWTH',
    description:
      'Preparing for campus placements, building full-stack + Android projects, sharpening DSA on LeetCode.',
  },
];

export const JourneySection: React.FC = () => {
  const lineVariants = {
    hidden: { height: 0 },
    visible: (i: number) => ({
      height: '100%',
      transition: {
        duration: 0.8,
        delay: i * 0.15,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  const markerVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: i * 0.15 + 0.2,
        ease: [0.34, 1.56, 0.64, 1] as const,
      },
    }),
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.15 + 0.3,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <SectionShell
      id="journey"
      padding="xl"
      style={{ backgroundColor: '#141310', borderRadius: '24px', margin: '0 32px 56px' }}
    >
      <div style={{ marginBottom: '48px', padding: '0 16px' }}>
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
          Timeline
        </span>
        <h2
          style={{
            margin: 0,
            fontFamily: '"Clash Display", "Anton", "Bebas Neue", "Owners Wide", Impact, sans-serif',
            fontSize: 'clamp(2.8rem, 5vw, 4.8rem)',
            fontWeight: 900,
            lineHeight: 0.92,
            textTransform: 'uppercase',
            color: '#F2ECDE',
            letterSpacing: '0',
          }}
        >
          MY JOURNEY
        </h2>
        <p
          style={{
            marginTop: '12px',
            color: 'rgba(242, 236, 222, 0.55)',
            fontSize: '13px',
            lineHeight: 1.6,
            fontFamily: '"General Sans", Inter, sans-serif',
            maxWidth: '500px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          FROM CLASSROOM TO SHIPPED PRODUCTS
        </p>
      </div>

      <div style={{ position: 'relative', padding: '0 16px' }}>
        <motion.div
          style={{
            position: 'absolute',
            left: '14px',
            top: 0,
            bottom: 0,
            width: '2px',
            backgroundColor: 'rgba(242, 236, 222, 0.35)',
            zIndex: 0,
          }}
          variants={lineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          custom={0}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}
        >
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              variants={contentVariants}
              custom={index}
              style={{
                display: 'flex',
                gap: '28px',
                alignItems: 'flex-start',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <motion.div
                variants={markerVariants}
                custom={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                  minWidth: '60px',
                }}
              >
                <motion.span
                  whileHover={{
                    scale: 1.15,
                    transition: { duration: 0.2, ease: [0.34, 1.56, 0.64, 1] as const },
                  }}
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: accentColors[index % accentColors.length].value,
                    boxShadow: `0 0 0 4px ${accentColors[index % accentColors.length].value}33`,
                    flexShrink: 0,
                    cursor: 'default',
                  }}
                />
                <span
                  style={{
                    fontFamily:
                      '"Clash Display", "Anton", "Bebas Neue", "Owners Wide", Impact, sans-serif',
                    fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                    fontWeight: 900,
                    lineHeight: 1,
                    color: '#F2ECDE',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {milestone.year}
                </span>
              </motion.div>

              <motion.div variants={contentVariants} custom={index}>
                <h3
                  style={{
                    margin: '0 0 8px',
                    fontFamily:
                      '"Clash Display", "Anton", "Bebas Neue", "Owners Wide", Impact, sans-serif',
                    fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                    fontWeight: 900,
                    lineHeight: 1.1,
                    textTransform: 'uppercase',
                    color: '#F2ECDE',
                    letterSpacing: '0',
                  }}
                >
                  {milestone.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    color: 'rgba(242, 236, 222, 0.65)',
                    lineHeight: 1.7,
                    fontSize: '14px',
                    fontFamily: '"General Sans", Inter, sans-serif',
                    maxWidth: '700px',
                  }}
                >
                  {milestone.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  );
};
