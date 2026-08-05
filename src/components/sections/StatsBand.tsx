import React from 'react';
import { motion } from 'motion/react';
import { CountUp } from '../ui/CountUp';

const stats = [
  { value: 3, suffix: '', label: 'Years of craft', note: '2023 → present' },
  { value: 2, suffix: '', label: 'Products shipped', note: 'Evento · Hopin' },
  { value: 15, suffix: '+', label: 'Technologies', note: 'Web to backend' },
  { value: 4, suffix: '+', label: 'Build platforms', note: 'Web · Android · Desktop · API' },
];

export const StatsBand: React.FC = () => {
  return (
    <motion.section
      className="home-band home-band--paper"
      style={{ marginBottom: '56px' }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '2rem',
        }}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem',
              padding: '1.25rem 0',
              borderTop: '2px solid #141310',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <div
              style={{
                color: '#141310',
                fontFamily: '"Clash Display", "Anton", "Bebas Neue", Impact, sans-serif',
                fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                fontWeight: 900,
                lineHeight: 0.9,
                textTransform: 'uppercase',
              }}
            >
              <CountUp end={stat.value} suffix={stat.suffix} />
            </div>
            <span
              style={{
                color: '#141310',
                fontSize: '0.78rem',
                fontWeight: 900,
                fontFamily: '"General Sans", Inter, sans-serif',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              {stat.label}
            </span>
            <span
              style={{
                color: 'rgba(20, 19, 16, 0.55)',
                fontSize: '0.72rem',
                fontWeight: 700,
                fontFamily: '"General Sans", Inter, sans-serif',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {stat.note}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
