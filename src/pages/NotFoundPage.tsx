import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import { PageShell, Nav, Footer, SectionShell } from '../components/ui/PageShell';
import DogAndButterfly from '../components/DogAndButterfly';
import { SEO } from '../components/SEO';

export const NotFoundPage: React.FC = () => {
  return (
    <PageShell>
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist or has been moved."
        url="/404"
        noIndex={true}
        noFollow={true}
      />
      <Nav currentPage="" />
      <main id="main-content">
        <SectionShell
          id="not-found"
          padding="xl"
          style={{
            textAlign: 'center',
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ position: 'relative', maxWidth: '500px', width: '100%' }}>
            <DogAndButterfly />
            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  minHeight: '30px',
                  padding: '8px 16px',
                  border: '1px solid #141310',
                  borderRadius: '999px',
                  color: '#EF7B3C',
                  fontSize: '11px',
                  fontWeight: 900,
                  fontFamily: '"General Sans", Inter, sans-serif',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}
              >
                404
              </span>
              <h1
                style={{
                  margin: '0 0 16px',
                  fontFamily:
                    '"Clash Display", "Anton", "Bebas Neue", "Owners Wide", Impact, sans-serif',
                  fontSize: 'clamp(4rem, 10vw, 8rem)',
                  fontWeight: 900,
                  lineHeight: 0.9,
                  textTransform: 'uppercase',
                  color: '#141310',
                  letterSpacing: '0',
                }}
              >
                Page Not Found
              </h1>
              <p
                style={{
                  color: 'rgba(20, 19, 16, 0.68)',
                  lineHeight: 1.75,
                  fontSize: '16px',
                  fontFamily: '"General Sans", Inter, sans-serif',
                  maxWidth: '400px',
                  margin: '0 auto 32px',
                }}
              >
                The page you're looking for doesn't exist or has been moved. Let's get you back on
                track.
              </p>
              <div
                style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}
              >
                <Link
                  to="/"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    minHeight: '56px',
                    padding: '0 28px',
                    background: '#141310',
                    color: '#F2ECDE',
                    borderRadius: '999px',
                    fontSize: '13px',
                    fontWeight: 900,
                    fontFamily: '"General Sans", Inter, sans-serif',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                  }}
                >
                  <Home size={16} strokeWidth={1.9} />
                  Back to Home
                </Link>
                <a
                  href="/work"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    minHeight: '56px',
                    padding: '0 28px',
                    border: '1px solid #141310',
                    borderRadius: '999px',
                    fontSize: '13px',
                    fontWeight: 900,
                    fontFamily: '"General Sans", Inter, sans-serif',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: '#141310',
                    textDecoration: 'none',
                  }}
                >
                  <Search size={16} strokeWidth={1.9} />
                  Browse Work
                </a>
              </div>
            </div>
          </div>
        </SectionShell>
      </main>
      <Footer />
    </PageShell>
  );
};
