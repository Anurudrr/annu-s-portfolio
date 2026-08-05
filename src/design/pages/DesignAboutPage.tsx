import React from 'react';
import { motion } from 'motion/react';
import { WordReveal } from '../components/WordReveal';

import { PageShell, Nav, Footer, SectionShell } from '../../components/ui/PageShell';
import { SEO } from '../../components/SEO';

export const DesignAboutPage: React.FC = () => {
  return (
    <main style={{ padding: '150px 5%', maxWidth: '1600px', margin: '0 auto' }}>
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        style={{ fontSize: 'max(5em, 8vw)', fontWeight: 500, marginBottom: '80px', lineHeight: 1 }}
      >
        About
      </motion.h1>

      <div style={{ paddingBottom: '100px' }}>
        <WordReveal
          text="I help brands thrive in the digital age. I build high-end websites, combining strategy, design, and code."
          className="design-word-reveal"
        />
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        <div>
           <img
            src="/avatar-anurudh.jpg"
            alt="Anurudh Singh Rajawat"
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </div>
        <div>
          <p style={{ fontSize: '18px', lineHeight: 1.5, marginBottom: '20px' }}>
            I am Anurudh, a freelance designer and developer from India.
            With a strong background in software engineering, I specialize in creating engaging
            digital experiences.
          </p>
          <p style={{ fontSize: '18px', lineHeight: 1.5 }}>
            My approach combines creative design with robust technical implementation, ensuring
            that every project not only looks great but performs flawlessly.
          </p>
        </div>
      </div>
    </main>
  );
};
