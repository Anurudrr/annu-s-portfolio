import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionShell } from '../ui/PageShell';
import { GridPanel } from '../ui/GridPanel';

export const AboutTeaser: React.FC = () => {
  return (
    <SectionShell
      id="about-teaser"
      padding="none"
      className="about-teaser-section home-band home-band--dark"
    >
      <div className="about-teaser-grid">
        <div className="about-teaser-copy">
          <span className="section-kicker section-kicker--light section-indexed" data-index="02">
            About
          </span>
          <h2 className="editorial-heading editorial-heading--light">
            From design practice to working systems.
          </h2>
          <p>
            I am a 3rd-year Computer Science and Engineering student at Parul Institute of
            Technology, Vadodara (2023-2027). I started with zero coding background in 2023, spent
            2024 sharpening UI/UX design, then moved into frontend and React in 2025.
          </p>
          <p>
            Now I work across React apps, Electron desktop tools, Android apps with Kotlin, and Java
            backend systems. The goal is simple: interfaces that look considered and systems that
            actually hold up.
          </p>
          <Link to="/dev/about" className="text-link text-link--light">
            Read more
            <ArrowRight size={15} strokeWidth={2.2} />
          </Link>
        </div>

        <GridPanel
          padding="none"
          dark
          className="about-portrait-panel"
          style={{ borderRadius: '8px' }}
        >
          <picture>
            <source
              srcSet="/hover_avatar-320.webp 320w, /hover_avatar-640.webp 640w, /hover_avatar-976.webp 976w"
              sizes="(max-width: 860px) 100vw, 50vw"
              type="image/webp"
            />
            <img
              src="/hover_avatar.png"
              alt="Anurudh Singh Rajawat"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </GridPanel>
      </div>
    </SectionShell>
  );
};
