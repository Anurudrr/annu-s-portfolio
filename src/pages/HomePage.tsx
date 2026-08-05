import React from 'react';
import { PageShell, Footer } from '../components/ui/PageShell';
import { Hero } from '../components/sections/Hero';
import { FeaturedWork } from '../components/sections/FeaturedWork';
import { AboutTeaser } from '../components/sections/AboutTeaser';
import { CurrentlyActivity } from '../components/sections/CurrentlyActivity';
import { FooterCTA } from '../components/sections/FooterCTA';
import { Testimonials } from '../components/sections/Testimonials';
import { Marquee } from '../components/ui/Marquee';
import { StatsBand } from '../components/sections/StatsBand';
import Chat from '../components/Chat';
import { SEO } from '../components/SEO';

const fallbackSocials = {
  github: 'https://github.com/Anurudrr',
  leetcode: 'https://leetcode.com/u/ANURUDH_SINGH_RAJAWAT/',
  linkedin: 'https://www.linkedin.com/in/anurudh-singh-251067307/',
  email: 'sanurudh938@gmail.com',
  phone: '+91 73893 82433',
};

export const HomePage: React.FC = () => {
  return (
    <PageShell>
      <SEO
        title="Home"
        description="Anurudh Singh Rajawat — Full-Stack Developer & UI/UX Designer. 3rd-year CSE student at Parul University building product-minded web, Android, and desktop apps."
        url="/"
        image="/og-home.png"
      />
      <main id="main-content" style={{ paddingBottom: '0' }}>
        <Hero />
        <FeaturedWork />
        <StatsBand />
        <Marquee />
        <AboutTeaser />
        <CurrentlyActivity />
        <Testimonials />
        <Chat />
        <FooterCTA email={fallbackSocials.email} phone={fallbackSocials.phone} />
      </main>
      <Footer />
    </PageShell>
  );
};
