import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MagneticButton } from './MagneticButton';
import { Link } from 'react-router-dom';

const navItems = [
  { label: 'Home', to: '/design' },
  { label: 'Work', to: '/design/work' },
  { label: 'About', to: '/design/about' },
  { label: 'Contact', to: '/design/contact' },
];

export const DesignNav: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  const menuSlide = {
    initial: { x: 'calc(100% + 100px)' },
    enter: { x: '0', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    exit: { x: 'calc(100% + 100px)', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  };

  const slide = {
    initial: { x: 80 },
    enter: (i: number) => ({
      x: 0,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
    }),
    exit: (i: number) => ({
      x: 80,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
    }),
  };

  const scale = {
    open: { scale: 1, transition: { duration: 0.3 } },
    closed: { scale: 0, transition: { duration: 0.4 } },
  };

  return (
    <>
      <div style={{ position: 'fixed', right: '40px', top: '40px', zIndex: 10001 }}>
        <MagneticButton variant="custom" onClick={() => setIsActive(!isActive)}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: 'hsl(var(--foreground))',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '20px',
            height: '14px',
            zIndex: 1,
          }}
        >
          <span
            style={{
              position: 'absolute',
              width: '100%',
              height: '2px',
              backgroundColor: 'hsl(var(--background))',
              transition: 'all 0.3s ease',
              top: isActive ? '6px' : '0',
              transform: isActive ? 'rotate(45deg)' : 'none',
            }}
          />
          <span
            style={{
              position: 'absolute',
              width: '100%',
              height: '2px',
              backgroundColor: 'hsl(var(--background))',
              transition: 'all 0.3s ease',
              top: isActive ? '6px' : '12px',
              transform: isActive ? 'rotate(-45deg)' : 'none',
            }}
          />
        </div>
          </div>
        </MagneticButton>
      </div>

      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div
            variants={menuSlide}
            initial="initial"
            animate="enter"
            exit="exit"
            style={{
              height: '100vh',
              backgroundColor: 'hsl(var(--foreground))',
              position: 'fixed',
              right: 0,
              top: 0,
              color: 'hsl(var(--background))',
              zIndex: 10000,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 100px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div
                style={{
                  color: 'hsl(var(--muted-foreground))',
                  borderBottom: '1px solid hsl(var(--muted-foreground))',
                  paddingBottom: '20px',
                  marginBottom: '20px',
                  textTransform: 'uppercase',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                }}
              >
                Navigation
              </div>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  custom={index}
                  variants={slide}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                >
                  <Link
                    to={item.to}
                    onClick={() => setIsActive(false)}
                    style={{
                      textDecoration: 'none',
                      color: 'hsl(var(--background))',
                      fontSize: '60px',
                      fontWeight: 400,
                      lineHeight: '1',
                      textTransform: 'lowercase',
                    }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
