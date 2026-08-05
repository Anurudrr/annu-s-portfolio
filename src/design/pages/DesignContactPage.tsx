import React from 'react';
import { motion } from 'motion/react';
import { MagneticButton } from '../components/MagneticButton';

export const DesignContactPage: React.FC = () => {
  return (
    <main
      style={{
        padding: '150px 5%',
        maxWidth: '1600px',
        margin: '0 auto',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        style={{ fontSize: 'max(5em, 8vw)', fontWeight: 500, marginBottom: '80px', lineHeight: 1 }}
      >
        Let's start a <br /> project together
      </motion.h1>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '40px',
          marginTop: 'auto',
          paddingBottom: '100px',
        }}
      >
        <MagneticButton onClick={() => window.open('mailto:sanurudh938@gmail.com', '_blank')}>
          sanurudh938@gmail.com
        </MagneticButton>

        <div style={{ display: 'flex', gap: '20px' }}>
          <a
            href="https://github.com/Anurudrr"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <MagneticButton>Github</MagneticButton>
          </a>
          <a
            href="https://www.linkedin.com/in/anurudh-singh-251067307/"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <MagneticButton>LinkedIn</MagneticButton>
          </a>
        </div>
      </div>
    </main>
  );
};
