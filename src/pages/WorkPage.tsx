import React from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageShell, Nav, Footer, SectionShell } from '../components/ui/PageShell';
import { GridCard } from '../components/ui/GridPanel';
import { InlineSticker } from '../components/ui/Sticker';
import { SEO } from '../components/SEO';
import { projects, projectStickers } from '../data/projects';

export const WorkPage: React.FC = () => {
  return (
    <PageShell>
      <SEO
        title="Work"
        description="Selected case studies — full-stack products, Java architecture, and system design projects. Explore the problem, process, and outcomes behind each build."
        url="/work"
        image="/og-work.png"
      />
      <Nav currentPage="work" />
      <main id="main-content">
        <SectionShell id="work" padding="xl">
          <div style={{ marginBottom: '56px', padding: '0 16px' }}>
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
              className="section-indexed"
              data-index="01"
            >
              Selected Work
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
              Case studies shaped around clarity, flow, and strong visual ownership.
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {projects.filter((project) => project.category === "Full-Stack Product").map((project, index) => (
              <GridCard
                key={project.id}
                variant="elevated"
                asymmetric={index % 2 === 0 ? 'right' : 'left'}
                padding="xl"
                hoverLift={true}
                className="project-card-grid"
              >
                <div className="project-card-media">
                  <img
                    src={project.image}
                    alt={`${project.title} project preview`}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'saturate(1) contrast(1.02)',
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

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    paddingTop: '8px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '10px',
                      marginBottom: '20px',
                    }}
                  >
                    <span
                      style={{
                        color: 'rgba(20, 19, 16, 0.55)',
                        fontSize: '11px',
                        fontWeight: 900,
                        fontFamily: '"General Sans", Inter, sans-serif',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        padding: '4px 12px',
                        border: '1px solid rgba(20, 19, 16, 0.15)',
                        borderRadius: '999px',
                      }}
                    >
                      {project.pNo}
                    </span>
                    <span
                      style={{
                        color: 'rgba(20, 19, 16, 0.55)',
                        fontSize: '11px',
                        fontWeight: 900,
                        fontFamily: '"General Sans", Inter, sans-serif',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        padding: '4px 12px',
                        border: '1px solid rgba(20, 19, 16, 0.15)',
                        borderRadius: '999px',
                      }}
                    >
                      {project.year}
                    </span>
                    <span
                      style={{
                        color: 'rgba(20, 19, 16, 0.55)',
                        fontSize: '11px',
                        fontWeight: 900,
                        fontFamily: '"General Sans", Inter, sans-serif',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        padding: '4px 12px',
                        border: '1px solid rgba(20, 19, 16, 0.15)',
                        borderRadius: '999px',
                      }}
                    >
                      {project.category}
                    </span>
                  </div>

                  <h3
                    style={{
                      margin: '0 0 20px',
                      fontFamily:
                        '"Clash Display", "Anton", "Bebas Neue", "Owners Wide", Impact, sans-serif',
                      fontSize: 'clamp(2.8rem, 5vw, 4.8rem)',
                      fontWeight: 900,
                      lineHeight: 0.92,
                      textTransform: 'uppercase',
                      color: '#141310',
                      letterSpacing: '0',
                    }}
                  >
                    {project.title}
                  </h3>

                  <p
                    style={{
                      margin: '0 0 28px',
                      color: 'rgba(20, 19, 16, 0.68)',
                      lineHeight: 1.75,
                      fontSize: '15px',
                      fontFamily: '"General Sans", Inter, sans-serif',
                      maxWidth: '520px',
                    }}
                  >
                    {project.description}
                  </p>

                  <div
                    style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '28px' }}
                  >
                    {projectStickers[project.id]?.map((sticker, i) => (
                      <InlineSticker
                        key={`${project.id}-${i}`}
                        accentIndex={sticker.accentIndex}
                        size="sm"
                      >
                        {sticker.label}
                      </InlineSticker>
                    ))}
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                    <Link
                      to={`/dev/work/${project.slug}`}
                      style={{
                        minHeight: '56px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
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
                        transition: 'background 0.2s ease, color 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#3CBAAE';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#141310';
                      }}
                    >
                      View Case Study
                      <ArrowUpRight size={16} strokeWidth={1.9} />
                    </Link>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          minHeight: '56px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '10px',
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
                          transition: 'background 0.2s ease, color 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#141310';
                          e.currentTarget.style.color = '#F2ECDE';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = '#141310';
                        }}
                      >
                        Source
                        <Github size={16} strokeWidth={1.9} />
                      </a>
                    )}
                  </div>
                </div>
              </GridCard>
            ))}
          </div>
        </SectionShell>
      </main>
      <Footer />
    </PageShell>
  );
};
