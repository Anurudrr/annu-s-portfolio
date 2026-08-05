import React from 'react';
import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';
import { SectionShell } from '../ui/PageShell';
import { GridCard } from '../ui/GridPanel';
import { InlineSticker } from '../ui/Sticker';

const testimonials = [
  {
    quote:
      'Anurudh has a rare instinct for turning messy requirements into clean, thoughtful interfaces. He ships work that feels designed, not just coded.',
    name: 'Project Partner',
    role: 'Full-Stack Build · 2025',
    accent: 0,
  },
  {
    quote:
      'His case studies read like a senior designer writing them. The move from UI/UX into React was fast, deliberate, and clearly backed by real practice.',
    name: 'Design Mentor',
    role: 'UI/UX Review · 2024',
    accent: 1,
  },
  {
    quote:
      'Dependable, curious, and consistent — the kind of engineer who documents decisions, asks the right questions, and follows through to the end.',
    name: 'Team Lead',
    role: 'Academic Project · 2025',
    accent: 2,
  },
];

export const Testimonials: React.FC = () => {
  return (
    <SectionShell
      id="testimonials"
      padding="xl"
      className="testimonials-section"
      style={{ paddingTop: '32px' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
        style={{ marginBottom: '40px', padding: '0 16px' }}
      >
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
          data-index="04"
        >
          Testimonials
        </span>
        <h2
          style={{
            margin: 0,
            fontFamily: '"Clash Display", "Anton", "Bebas Neue", "Owners Wide", Impact, sans-serif',
            fontSize: 'clamp(2.8rem, 6vw, 5rem)',
            fontWeight: 900,
            lineHeight: 0.9,
            textTransform: 'uppercase',
            color: '#F2ECDE',
            letterSpacing: '0',
          }}
        >
          KIND WORDS FROM PEOPLE I&apos;VE WORKED WITH
        </h2>
      </motion.div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
        }}
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: 0.5,
              delay: i * 0.1,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
          >
            <GridCard variant="elevated" padding="lg" style={{ height: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '20px',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: '#141310',
                    color: '#F2ECDE',
                  }}
                >
                  <Quote size={18} strokeWidth={2.2} />
                </span>
                <div style={{ display: 'flex', gap: '3px' }}>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      size={13}
                      strokeWidth={2}
                      fill="#EF7B3C"
                      stroke="#EF7B3C"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>

              <p
                style={{
                  margin: '0 0 24px',
                  color: '#141310',
                  fontSize: '15px',
                  lineHeight: 1.7,
                  fontFamily: '"General Sans", Inter, sans-serif',
                  fontWeight: 500,
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              <div
                style={{
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <div
                    style={{
                      color: '#141310',
                      fontSize: '13px',
                      fontWeight: 900,
                      fontFamily: '"General Sans", Inter, sans-serif',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      color: 'rgba(20, 19, 16, 0.62)',
                      fontSize: '11px',
                      fontWeight: 700,
                      fontFamily: '"General Sans", Inter, sans-serif',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      marginTop: '4px',
                    }}
                  >
                    {t.role}
                  </div>
                </div>
                <InlineSticker accentIndex={t.accent} size="sm">
                  ✦ REC
                </InlineSticker>
              </div>
            </GridCard>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
};
