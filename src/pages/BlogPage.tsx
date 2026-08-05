import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Rss } from 'lucide-react';
import { PageShell, Nav, Footer, SectionShell } from '../components/ui/PageShell';
import { GridCard } from '../components/ui/GridPanel';
import { InlineSticker } from '../components/ui/Sticker';
import { NewsletterSignup } from '../components/NewsletterSignup';
import { SEO } from '../components/SEO';

const posts = [
  {
    id: '1',
    slug: 'bridging-the-gap-ux-to-java',
    title: 'Bridging UX Precision With Java Architecture',
    date: 'May 24, 2025',
    category: 'Engineering Notes',
    readingTime: '5 min read',
    summary:
      'How visual hierarchy, spacing systems, and component thinking can sharpen backend decisions.',
    tags: ['UI/UX', 'Java', 'Systems'],
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '2',
    slug: 'spring-security-without-tears',
    title: 'Spring Security Without Tears',
    date: 'Apr 02, 2026',
    category: 'Backend Development',
    readingTime: '8 min read',
    summary:
      'A practical walkthrough of custom filter chains, CORS boundaries, and stateless auth flow.',
    tags: ['Spring Boot', 'Security'],
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '3',
    slug: 'design-systems-in-react',
    title: 'Design Systems in React: From Tokens to Components',
    date: 'Jan 15, 2026',
    category: 'Frontend Engineering',
    readingTime: '6 min read',
    summary:
      'Building a scalable design system with design tokens, Theme UI, and component composition patterns.',
    tags: ['React', 'Design Systems', 'TypeScript'],
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '4',
    slug: 'kotlin-compose-android',
    title: 'Kotlin & Jetpack Compose: Modern Android Development',
    date: 'Nov 08, 2025',
    category: 'Mobile Development',
    readingTime: '7 min read',
    summary:
      'Migrating from XML layouts to Compose — lessons learned, performance tips, and architectural patterns.',
    tags: ['Kotlin', 'Jetpack Compose', 'Android'],
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop',
  },
];

const categoryColors: Record<string, number> = {
  'Engineering Notes': 0,
  'Backend Development': 2,
  'Frontend Engineering': 0,
  'Mobile Development': 2,
};

export const BlogPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const allCategories = useMemo(() => Array.from(new Set(posts.map((p) => p.category))), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (activeCategory && post.category !== activeCategory) return false;
      if (!q) return true;
      return (
        post.title.toLowerCase().includes(q) ||
        post.summary.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q)) ||
        post.category.toLowerCase().includes(q)
      );
    });
  }, [query, activeCategory]);

  return (
    <PageShell>
      <SEO
        title="Blog"
        description="Writing on UI/UX engineering, backend architecture, design systems, and mobile development. Connecting interface craft with engineering decisions."
        url="/blog"
        image="/og-image.png"
      />
      <Nav currentPage="blog" />
      <main id="main-content">
        <SectionShell id="blog" padding="xl">
          <div style={{ marginBottom: '48px', padding: '0 16px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                minHeight: '30px',
                padding: '8px 16px',
                border: '1px solid #141310',
                borderRadius: '999px',
                color: '#344E38',
                fontSize: '11px',
                fontWeight: 900,
                fontFamily: '"General Sans", Inter, sans-serif',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              Writing
            </span>
            <h2
              style={{
                margin: 0,
                fontFamily:
                  '"Clash Display", "Anton", "Bebas Neue", "Owners Wide", Impact, sans-serif',
                fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
                fontWeight: 900,
                lineHeight: 0.9,
                textTransform: 'uppercase',
                color: '#141310',
                letterSpacing: '0',
              }}
            >
              Connecting interface craft with engineering decisions.
            </h2>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '14px',
              padding: '0 16px',
              marginBottom: '40px',
            }}
          >
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                flex: '1 1 260px',
                minWidth: '240px',
                padding: '12px 18px',
                border: '1px solid rgba(20, 19, 16, 0.2)',
                borderRadius: '999px',
                background: '#fff',
              }}
            >
              <Search size={15} strokeWidth={2} style={{ color: 'rgba(20,19,16,0.4)' }} />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search posts, tags, topics..."
                aria-label="Search posts"
                style={{
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  flex: 1,
                  fontSize: '13px',
                  fontFamily: '"General Sans", Inter, sans-serif',
                  color: '#141310',
                }}
              />
            </label>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {allCategories.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(active ? null : cat)}
                    style={{
                      padding: '9px 16px',
                      borderRadius: '999px',
                      border: `1px solid ${active ? '#141310' : 'rgba(20,19,16,0.2)'}`,
                      background: active ? '#141310' : 'transparent',
                      color: active ? '#F2ECDE' : '#141310',
                      fontSize: '11px',
                      fontWeight: 800,
                      fontFamily: '"General Sans", Inter, sans-serif',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease, color 0.15s ease',
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <a
              href="/rss.xml"
              rel="noopener noreferrer"
              target="_blank"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 16px',
                borderRadius: '999px',
                border: '1px solid rgba(20,19,16,0.2)',
                color: '#344E38',
                fontSize: '11px',
                fontWeight: 800,
                fontFamily: '"General Sans", Inter, sans-serif',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'border-color 0.15s ease, color 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#EF7B3C';
                e.currentTarget.style.color = '#EF7B3C';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(20,19,16,0.2)';
                e.currentTarget.style.color = '#141310';
              }}
            >
              <Rss size={13} strokeWidth={2} />
              RSS
            </a>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '28px',
            }}
          >
            {filtered.map((post) => (
              <GridCard
                key={post.id}
                variant="elevated"
                padding="lg"
                hoverLift={true}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '480px',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: '#D9C7BD',
                    aspectRatio: '16 / 9',
                    marginBottom: '24px',
                  }}
                >
                  <img
                    src={post.image}
                    alt={`${post.title} cover`}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'grayscale(1) contrast(1.12)',
                      opacity: 0.88,
                      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.03)';
                      e.currentTarget.style.opacity = '1';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.opacity = '0.88';
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div
                    style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}
                  >
                    <InlineSticker accentIndex={categoryColors[post.category] || 0} size="sm">
                      {post.category.toUpperCase()}
                    </InlineSticker>
                    <span
                      style={{
                        color: 'rgba(20, 19, 16, 0.7)',
                        fontSize: '11px',
                        fontWeight: 900,
                        fontFamily: '"General Sans", Inter, sans-serif',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '4px 12px',
                        border: '1px solid rgba(20, 19, 16, 0.15)',
                        borderRadius: '999px',
                      }}
                    >
                      {post.readingTime}
                    </span>
                  </div>

                  <h3
                    style={{
                      margin: '0 0 12px',
                      fontFamily:
                        '"Clash Display", "Anton", "Bebas Neue", "Owners Wide", Impact, sans-serif',
                      fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                      fontWeight: 900,
                      lineHeight: 1.1,
                      textTransform: 'uppercase',
                      color: '#141310',
                      letterSpacing: '0',
                    }}
                  >
                    <Link
                      to={`/dev/blog/${post.slug}`}
                      style={{
                        color: 'inherit',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#1F8A7F';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#141310';
                      }}
                    >
                      {post.title}
                    </Link>
                  </h3>

                  <p
                    style={{
                      flex: 1,
                      margin: '0 0 16px',
                      color: 'rgba(20, 19, 16, 0.68)',
                      lineHeight: 1.65,
                      fontSize: '14px',
                      fontFamily: '"General Sans", Inter, sans-serif',
                    }}
                  >
                    {post.summary}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      color: 'rgba(20, 19, 16, 0.68)',
                      fontSize: '12px',
                      fontWeight: 600,
                      fontFamily: '"General Sans", Inter, sans-serif',
                    }}
                  >
                    <span>{post.date}</span>
                    <span style={{ opacity: 0.4 }}>·</span>
                    <span>{post.readingTime}</span>
                  </div>
                </div>
              </GridCard>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '56px 16px' }}>
              <p
                style={{
                  margin: 0,
                  color: 'rgba(20, 19, 16, 0.55)',
                  fontSize: '14px',
                  fontFamily: '"General Sans", Inter, sans-serif',
                }}
              >
                No posts match{' '}
                {activeCategory ? (
                  <strong>{activeCategory}</strong>
                ) : (
                  <strong>&quot;{query}&quot;</strong>
                )}{' '}
                — try a different search or category.
              </p>
            </div>
          )}

          <div id="newsletter" style={{ marginTop: '64px' }}>
            <NewsletterSignup />
          </div>
        </SectionShell>
      </main>
      <Footer />
    </PageShell>
  );
};
