import { useState } from 'react';
import { HOBBIES_DATA } from '../types';
import { motion, AnimatePresence } from 'motion/react';

const accents = ['#3CBAAE', '#F2C94C', '#EF7B3C', '#EC4E7C'];

export default function Hobbies() {
  const [activeHobby, setActiveHobby] = useState<string | null>(null);

  return (
    <section id="hobbies" aria-label="Hobbies and passions">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}
      >
        {HOBBIES_DATA.map((hobby, i) => {
          const isActive = activeHobby === hobby.id;
          const accent = accents[i % accents.length];

          return (
            <motion.button
              key={hobby.id}
              type="button"
              onClick={() => setActiveHobby(isActive ? null : hobby.id)}
              aria-expanded={isActive}
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
                alignItems: 'flex-start',
                gap: '14px',
                minHeight: '220px',
                padding: '28px',
                borderRadius: '8px',
                border: '2px solid rgba(20, 19, 16, 0.85)',
                background: isActive ? '#F2ECDE' : 'rgba(242, 236, 222, 0.06)',
                color: isActive ? '#141310' : '#F2ECDE',
                textAlign: 'left',
                cursor: 'pointer',
                boxShadow: isActive ? `8px 8px 0 ${accent}` : 'none',
                transition: 'background 200ms ease, color 200ms ease, box-shadow 200ms ease',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: accent,
                  fontSize: '26px',
                  lineHeight: 1,
                  boxShadow: '3px 3px 0 rgba(20, 19, 16, 0.85)',
                  transform: isActive ? 'rotate(-6deg)' : 'rotate(0deg)',
                  transition: 'transform 200ms ease',
                }}
              >
                {hobby.icon}
              </span>

              <div>
                <span
                  style={{
                    display: 'block',
                    marginBottom: '6px',
                    color: isActive ? 'rgba(20, 19, 16, 0.55)' : 'rgba(242, 236, 222, 0.5)',
                    fontSize: '9px',
                    fontWeight: 900,
                    fontFamily: '"General Sans", Inter, sans-serif',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                  }}
                >
                  {hobby.category}
                </span>
                <span
                  style={{
                    display: 'block',
                    fontFamily: '"Clash Display", "Anton", "Bebas Neue", Impact, sans-serif',
                    fontSize: '1.5rem',
                    fontWeight: 900,
                    lineHeight: 1.05,
                    textTransform: 'uppercase',
                  }}
                >
                  {hobby.title}
                </span>
              </div>

              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p
                      style={{
                        margin: '0',
                        color: 'rgba(20, 19, 16, 0.72)',
                        fontSize: '13px',
                        lineHeight: 1.6,
                        fontFamily: '"General Sans", Inter, sans-serif',
                      }}
                    >
                      {hobby.description}
                    </p>
                    <div
                      style={{
                        marginTop: '14px',
                        padding: '12px 14px',
                        borderLeft: `3px solid ${accent}`,
                        background: 'rgba(20, 19, 16, 0.05)',
                        borderRadius: '0 8px 8px 0',
                      }}
                    >
                      <span
                        style={{
                          display: 'block',
                          marginBottom: '4px',
                          color: 'rgba(20, 19, 16, 0.55)',
                          fontSize: '9px',
                          fontWeight: 900,
                          fontFamily: '"General Sans", Inter, sans-serif',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                        }}
                      >
                        Fun fact
                      </span>
                      <p
                        style={{
                          margin: '0',
                          color: '#141310',
                          fontSize: '13px',
                          fontWeight: 700,
                          lineHeight: 1.55,
                          fontFamily: '"General Sans", Inter, sans-serif',
                        }}
                      >
                        {hobby.funFact}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <span
                style={{
                  marginTop: 'auto',
                  color: isActive ? 'rgba(20, 19, 16, 0.5)' : accent,
                  fontSize: '10px',
                  fontWeight: 900,
                  fontFamily: '"General Sans", Inter, sans-serif',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {isActive ? 'Close ↑' : 'Tap for fun fact ↓'}
              </span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
