import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, MessageSquare, ArrowUpRight } from 'lucide-react';
import { PageShell, Nav, Footer, SectionShell, CTAButton } from '../components/ui/PageShell';
import { InlineSticker } from '../components/ui/Sticker';
import { SEO } from '../components/SEO';

// Convert date string (e.g., "May 24, 2025") to ISO format for schema.org
const parseDateToISO = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toISOString().split('T')[0];
};

const posts: Record<string, any> = {
  'bridging-the-gap-ux-to-java': {
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
    content: `
      <p>Design and engineering are often treated as separate disciplines. Designers own the "what it looks like," engineers own the "how it works." But the best products I've built happen when those boundaries dissolve.</p>
      
      <h3>Spacing Systems Are API Contracts</h3>
      <p>When you define a spacing scale in Figma — 4, 8, 16, 24, 32, 48 — you're essentially designing an API. Every component consumes these tokens. If engineering implements them as CSS custom properties or a Tailwind config, the design system becomes a shared contract, not a handoff artifact.</p>
      
      <h3>Component Thinking Applied to Backend</h3>
      <p>React components are just functions that return UI. Java services are just classes that return business logic. The mental model transfers: single responsibility, composition over inheritance, predictable inputs and outputs. A well-designed React component tree mirrors a well-architected service layer.</p>
      
      <h3>Visual Hierarchy = Code Hierarchy</h3>
      <p>Primary actions get visual weight. Critical user flows get clear paths. In code, primary use cases get clean APIs. Edge cases get handled without cluttering the happy path. The same principles apply whether you're arranging buttons or designing REST endpoints.</p>
      
      <h3>Practical Example: Evento's Booking Flow</h3>
      <p>In Evento, the booking flow has three states: selecting a vendor, reviewing details, confirming payment. The UI shows a stepper with clear progression. The backend models this as a state machine: DRAFT → REVIEW → CONFIRMED → COMPLETED. The visual hierarchy and the code hierarchy are isomorphic.</p>
      
      <h3>Design Tokens as Configuration</h3>
      <p>Colors, spacing, typography, shadows — these aren't just design decisions. They're configuration values. When engineering consumes them directly (via Style Dictionary, Figma Tokens, or manual sync), changes propagate without translation loss.</p>
      
      <p>The takeaway: learn enough design to speak the language. Learn enough engineering to implement the vision. The gap isn't a wall — it's a shared vocabulary waiting to be built.</p>
    `,
  },
  'spring-security-without-tears': {
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
    content: `
      <p>Spring Security has a reputation for being complex. The default configuration works for traditional server-rendered apps, but modern SPAs with JWT authentication need a different approach. Here's the setup that works for me.</p>
      
      <h3>Stateless JWT Configuration</h3>
      <pre><code>@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}</code></pre>
      
      <h3>Custom Filter Chain for Token Validation</h3>
      <p>The JWT filter extracts the token from the Authorization header, validates the signature, checks expiration, and populates the SecurityContext. Keep it simple — one responsibility per filter.</p>
      
      <h3>CORS: The Silent Blocker</h3>
      <p>Frontend on localhost:3000, backend on localhost:8080. Without proper CORS, every request fails silently. Configure it globally:</p>
      <pre><code>@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOrigins(List.of("http://localhost:3000"));
    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    config.setAllowedHeaders(List.of("*"));
    config.setAllowCredentials(true);
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;
}</code></pre>
      
      <h3>Stateless Authentication Flow</h3>
      <ol>
        <li>User logs in → backend returns JWT + refresh token</li>
        <li>Frontend stores tokens (httpOnly cookie for refresh, memory for access)</li>
        <li>Each request includes Authorization: Bearer <access_token></li>
        <li>JWT filter validates → sets Authentication in SecurityContext</li>
        <li>Controller accesses principal via @AuthenticationPrincipal</li>
      </ol>
      
      <h3>Refresh Token Rotation</h3>
      <p>Short-lived access tokens (15min) + rotating refresh tokens. On refresh, invalidate old refresh token, issue new pair. Prevents replay attacks.</p>
      
      <p>The key insight: Spring Security isn't magic. It's a filter chain. Understand the chain, configure what you need, disable what you don't. No tears required.</p>
    `,
  },
  'design-systems-in-react': {
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
    content: `
      <p>A design system isn't a component library. It's a set of decisions encoded as reusable primitives. Here's how I structure one in React.</p>
      
      <h3>Layer 1: Design Tokens</h3>
      <p>Raw values — colors, spacing, typography, shadows, radii. Stored as JSON, transformed via Style Dictionary into CSS custom properties, TypeScript constants, Tailwind config, Figma variables.</p>
      
      <h3>Layer 2: Primitive Components</h3>
      <p>Box, Flex, Text, Heading — unstyled layout primitives that consume tokens. Built on top of a CSS-in-JS solution or Tailwind. These never ship to consumers directly.</p>
      
      <h3>Layer 3: Semantic Components</h3>
      <p>Button, Input, Card, Modal — composed from primitives, exposing semantic props (variant, size, intent). These are what product teams import.</p>
      
      <h3>Composition Over Configuration</h3>
      <pre><code>// Instead of 20 props on Button
<Button>
  <Button.Icon src={Icon} />
  <Button.Text>Save</Button.Text>
  <Button.Loading />
</Button>

// Compose behavior
<Button variant="primary" size="lg">
  Submit
</Button></code></pre>
      
      <h3>Theme Provider Pattern</h3>
      <p>Wrap the app in a ThemeProvider that injects tokens via CSS custom properties. Dark mode, brand themes, high contrast — all become a token swap, not a component rewrite.</p>
      
      <h3>Documentation as Code</h3>
      <p>Storybook for component playground. TypeDoc for API docs. Chromatic for visual regression. The design system repo is the single source of truth.</p>
      
      <p>Start small. Tokens first. Primitives second. Semantic components last. Each layer builds on the previous — no skipping.</p>
    `,
  },
  'kotlin-compose-android': {
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
    content: `
      <p>Jetpack Compose changed how I think about Android UI. Declarative, Kotlin-first, and surprisingly performant. Here's what the migration taught me.</p>
      
      <h3>State Hoisting Is Non-Negotiable</h3>
      <p>Compose recomposes when state changes. Hoist state to the lowest common ancestor. Stateless composables are reusable, testable, and predictable.</p>
      <pre><code>@Composable
fun CounterScreen() {
    var count by remember { mutableStateOf(0) }
    CounterDisplay(count = count)
    CounterControls(onIncrement = { count++ }, onDecrement = { count-- })
}</code></pre>
      
      <h3>Performance: Stability > Optimization</h3>
      <p>Don't prematurely optimize with <code>remember</code> or <code>derivedStateOf</code>. Make composables stable first: use immutable data classes, avoid lambda allocations in composition, prefer <code>remember</code> for expensive calculations.</p>
      
      <h3>Migration Strategy: Interop First</h3>
      <p>Don't rewrite everything. Use <code>ComposeView</code> in XML layouts, <code>AndroidView</code> for Compose in XML. Migrate screen by screen. The interop is seamless.</p>
      
      <h3>Navigation: Type-Safe Routes</h3>
      <p>Use <code>navigation-compose</code> with serialization. Define routes as data classes, navigate with type-safe arguments. No stringly-typed deep links.</p>
      
      <h3>Theme System: Material3 + Custom Tokens</h3>
      <p>Material3 theming is solid. Extend <code>ColorScheme</code> with brand colors. Define typography, shapes, and elevation in a single <code>AppTheme</code> composable. Dark mode works out of the box.</p>
      
      <h3>Testing: Compose Testing Rules</h3>
      <p>Use <code>ComposeTestRule</code> for unit testing composables. Test behavior, not implementation. Semantic queries (<code>onNodeWithText</code>, <code>onNodeWithContentDescription</code>) make tests resilient to UI changes.</p>
      
      <p>Compose isn't just a new UI toolkit — it's a new mental model. Declarative UI, unidirectional data flow, and Kotlin's expressiveness make Android development genuinely enjoyable.</p>
    `,
  },
};

const categoryColors: Record<string, number> = {
  'Engineering Notes': 0,
  'Backend Development': 2,
  'Frontend Engineering': 0,
  'Mobile Development': 2,
};

export default function BlogPostPage() {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = posts[slug || ''] || posts['bridging-the-gap-ux-to-java'];

  const allSlugs = Object.keys(posts);
  const { toc, contentHtml } = useMemo(() => {
    const headings: { id: string; title: string }[] = [];
    const html = post.content.replace(/<h3>(.*?)<\/h3>/g, (_match: string, raw: string) => {
      const title = raw.replace(/<[^>]+>/g, '').trim();
      const id = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
        .slice(0, 48);
      if (id) headings.push({ id, title });
      return `<h3 id="${id}">${raw}</h3>`;
    });
    return { toc: headings, contentHtml: html };
  }, [post]);

  const currentIndex = allSlugs.indexOf(post.slug);
  const nextPost = posts[allSlugs[currentIndex + 1]] as typeof post | undefined;
  const prevPost = posts[allSlugs[currentIndex - 1]] as typeof post | undefined;

  const scrollToHeading = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / 50;
      const deltaY = (e.clientY - centerY) / 50;
      setParallax({ x: deltaX, y: deltaY });
    };

    const handleMouseLeave = () => {
      setParallax({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const proseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prose = proseRef.current;
    if (!prose) return;
    const pres = prose.querySelectorAll('pre');
    pres.forEach((pre) => {
      if (pre.querySelector('.blog-copy-btn')) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'blog-copy-btn';
      btn.textContent = 'Copy';
      btn.setAttribute('aria-label', 'Copy code to clipboard');
      btn.addEventListener('click', async () => {
        const code = pre.querySelector('code')?.textContent ?? '';
        try {
          await navigator.clipboard.writeText(code.trim());
          btn.textContent = 'Copied!';
          btn.style.color = '#9FD463';
          setTimeout(() => {
            btn.textContent = 'Copy';
            btn.style.color = '';
          }, 1800);
        } catch {
          btn.textContent = 'Error';
        }
      });
      pre.appendChild(btn);
    });
  }, [contentHtml]);

  return (
    <PageShell>
      <SEO
        title={post.title}
        description={post.summary}
        url={`/blog/${post.slug}`}
        image={post.image}
        type="article"
        publishedTime={parseDateToISO(post.date)}
        author="Anurudh Singh Rajawat"
        section={post.category}
        tags={post.tags}
      />
      <Nav currentPage="blog" />
      <main id="main-content">
        <SectionShell id="blog-post-hero" padding="xl" style={{ paddingBottom: '0' }}>
          <div
            ref={heroRef}
            style={{
              transform: `translate(${parallax.x * 0.3}px, ${parallax.y * 0.3}px)`,
              transition: 'transform 0.3s ease-out',
            }}
          >
            <div style={{ marginBottom: '32px', padding: '0 16px' }}>
              <InlineSticker
                accentIndex={categoryColors[post.category] || 0}
                size="sm"
                style={{ marginBottom: '16px' }}
              >
                {post.category.toUpperCase()}
              </InlineSticker>
              <h1
                style={{
                  margin: 0,
                  fontFamily:
                    '"Clash Display", "Anton", "Bebas Neue", "Owners Wide", Impact, sans-serif',
                  fontSize: 'clamp(2.8rem, 6vw, 5.2rem)',
                  fontWeight: 900,
                  lineHeight: 0.9,
                  textTransform: 'uppercase',
                  color: '#F2ECDE',
                  letterSpacing: '0',
                }}
              >
                {post.title}
              </h1>
            </div>

            <div
              style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                background: '#D9C7BD',
                aspectRatio: '16 / 9',
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
                }}
              />
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                marginTop: '24px',
                alignItems: 'center',
                padding: '0 16px',
              }}
            >
              <span
                style={{
                  color: 'rgba(242, 236, 222, 0.78)',
                  fontSize: '13px',
                  fontWeight: 600,
                  fontFamily: '"General Sans", Inter, sans-serif',
                }}
              >
                {post.date}
              </span>
              <span style={{ color: 'rgba(242, 236, 222, 0.5)', fontSize: '13px' }}>·</span>
              <span
                style={{
                  color: 'rgba(242, 236, 222, 0.78)',
                  fontSize: '13px',
                  fontWeight: 600,
                  fontFamily: '"General Sans", Inter, sans-serif',
                }}
              >
                {post.readingTime}
              </span>
              <span style={{ color: 'rgba(242, 236, 222, 0.5)', fontSize: '13px' }}>·</span>
              <span
                style={{
                  color: 'rgba(242, 236, 222, 0.78)',
                  fontSize: '13px',
                  fontWeight: 600,
                  fontFamily: '"General Sans", Inter, sans-serif',
                }}
              >
                Anurudh Singh Rajawat
              </span>
            </div>
          </div>

          {toc.length > 0 && (
            <div
              style={{
                marginTop: '40px',
                padding: '24px',
                border: '1px solid rgba(242, 236, 222, 0.14)',
                borderRadius: '16px',
                background: 'rgba(242, 236, 222, 0.04)',
              }}
            >
              <span
                style={{
                  display: 'block',
                  marginBottom: '12px',
                  color: '#69A65B',
                  fontSize: '11px',
                  fontWeight: 900,
                  fontFamily: '"General Sans", Inter, sans-serif',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                On this page
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {toc.map((heading, i) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    onClick={scrollToHeading(heading.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 14px',
                      borderRadius: '999px',
                      border: '1px solid rgba(242, 236, 222, 0.18)',
                      color: 'rgba(242, 236, 222, 0.8)',
                      fontSize: '11px',
                      fontWeight: 800,
                      fontFamily: '"General Sans", Inter, sans-serif',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      transition: 'border-color 0.2s ease, color 0.2s ease, background 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#3CBAAE';
                      e.currentTarget.style.color = '#3CBAAE';
                      e.currentTarget.style.background = 'rgba(60, 186, 174, 0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(242, 236, 222, 0.18)';
                      e.currentTarget.style.color = 'rgba(242, 236, 222, 0.8)';
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '20px',
                        height: '20px',
                        borderRadius: '999px',
                        background: '#3CBAAE',
                        color: '#141310',
                        fontSize: '10px',
                        fontWeight: 900,
                      }}
                    >
                      {i + 1}
                    </span>
                    {heading.title}
                  </a>
                ))}
              </div>
            </div>
          )}
        </SectionShell>

        <SectionShell
          id="blog-post-content"
          padding="xl"
          style={{ maxWidth: '840px', margin: '0 auto 56px', padding: '80px 24px' }}
        >
          <div
            ref={proseRef}
            className="blog-prose"
            style={{
              color: 'rgba(20, 19, 16, 0.68)',
              lineHeight: 1.85,
              fontSize: '16px',
              fontFamily: '"General Sans", Inter, sans-serif',
            }}
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              marginTop: '40px',
              padding: '20px 24px',
              borderRadius: '16px',
              border: '1px solid #141310',
              alignItems: 'center',
            }}
          >
            <MessageSquare size={17} strokeWidth={2} />
            <span
              style={{
                fontSize: '13px',
                fontWeight: 700,
                fontFamily: '"General Sans", Inter, sans-serif',
                color: '#141310',
              }}
            >
              Got thoughts?
            </span>
            <a
              href="https://github.com/anurudrr/annu-s-portfolio/issues/new?title=Blog+feedback"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginLeft: 'auto',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '999px',
                background: '#141310',
                color: '#F2ECDE',
                fontSize: '11px',
                fontWeight: 900,
                fontFamily: '"General Sans", Inter, sans-serif',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'background 0.2s ease, color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#3CBAAE';
                e.currentTarget.style.color = '#141310';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#141310';
                e.currentTarget.style.color = '#F2ECDE';
              }}
            >
              Open a discussion
              <ArrowUpRight size={14} strokeWidth={2} />
            </a>
          </div>

          {(prevPost || nextPost) && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: prevPost && nextPost ? '1fr 1fr' : '1fr',
                gap: '16px',
                marginTop: '56px',
              }}
            >
              {prevPost && (
                <Link
                  to={`/dev/blog/${prevPost.slug}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    padding: '24px',
                    borderRadius: '16px',
                    border: '1px solid #141310',
                    textDecoration: 'none',
                    transition: 'background 0.2s ease, transform 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#141310';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#344E38',
                      fontSize: '10px',
                      fontWeight: 900,
                      fontFamily: '"General Sans", Inter, sans-serif',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                    }}
                  >
                    <ArrowLeft size={13} strokeWidth={2} />
                    Earlier
                  </span>
                  <span
                    style={{
                      fontFamily:
                        '"Clash Display", "Anton", "Bebas Neue", "Owners Wide", Impact, sans-serif',
                      fontSize: '1.15rem',
                      fontWeight: 900,
                      lineHeight: 1.15,
                      textTransform: 'uppercase',
                      color: '#141310',
                    }}
                  >
                    {prevPost.title}
                  </span>
                </Link>
              )}
              {nextPost && (
                <Link
                  to={`/dev/blog/${nextPost.slug}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    padding: '24px',
                    borderRadius: '16px',
                    background: '#141310',
                    textDecoration: 'none',
                    transition: 'background 0.2s ease, transform 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      gap: '8px',
                      color: '#3CBAAE',
                      fontSize: '10px',
                      fontWeight: 900,
                      fontFamily: '"General Sans", Inter, sans-serif',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Read next
                    <ArrowRight size={13} strokeWidth={2} />
                  </span>
                  <span
                    style={{
                      fontFamily:
                        '"Clash Display", "Anton", "Bebas Neue", "Owners Wide", Impact, sans-serif',
                      fontSize: '1.15rem',
                      fontWeight: 900,
                      lineHeight: 1.15,
                      textTransform: 'uppercase',
                      color: '#F2ECDE',
                    }}
                  >
                    {nextPost.title}
                  </span>
                </Link>
              )}
            </div>
          )}
        </SectionShell>

        <SectionShell
          id="blog-post-cta"
          padding="xl"
          style={{ backgroundColor: '#141310', borderRadius: '24px', margin: '0 32px' }}
        >
          <div style={{ textAlign: 'center' }}>
            <h2
              style={{
                margin: '0 0 16px',
                fontFamily:
                  '"Clash Display", "Anton", "Bebas Neue", "Owners Wide", Impact, sans-serif',
                fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
                fontWeight: 900,
                lineHeight: 1,
                textTransform: 'uppercase',
                color: '#F2ECDE',
                letterSpacing: '0',
              }}
            >
              Enjoyed this read?
            </h2>
            <p
              style={{
                margin: '0 0 24px',
                color: 'rgba(242, 236, 222, 0.6)',
                fontSize: '14px',
                lineHeight: 1.6,
                fontFamily: '"General Sans", Inter, sans-serif',
                maxWidth: '500px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              More writing on interface craft, engineering decisions, and the space between.
            </p>
            <CTAButton
              variant="ghost"
              icon={<ArrowRight size={15} strokeWidth={2.2} />}
              iconPosition="right"
              onClick={() => navigate('/dev/blog')}
            >
              Browse all posts
            </CTAButton>
          </div>
        </SectionShell>
      </main>
      <Footer />
    </PageShell>
  );
}
