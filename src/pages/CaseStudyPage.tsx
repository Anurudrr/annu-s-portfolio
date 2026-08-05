import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import { PageShell, Nav, Footer, SectionShell, CTAButton } from '../components/ui/PageShell';
import { GridPanel } from '../components/ui/GridPanel';
import { InlineSticker } from '../components/ui/Sticker';
import { CaseStudyTOC } from '../components/ui/CaseStudyTOC';
import { SEO } from '../components/SEO';
import { projects, caseStudyStickers, getProjectBySlug } from '../data/projects';

export default function CaseStudyPage() {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug || '') || projects[0];

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

  return (
    <PageShell>
      <SEO
        title={`${project.title} — Case Study`}
        description={project.description}
        url={`/work/${project.slug}`}
        image={project.image}
        type="caseStudy"
        author="Anurudh Singh Rajawat"
        section={project.category}
        tags={project.technologies}
        projectData={{
          name: project.title,
          description: project.description,
          technologies: project.technologies,
          githubUrl: project.githubUrl,
          demoUrl: project.demoUrl,
          dateCreated: project.year,
          author: 'Anurudh Singh Rajawat',
        }}
      />
      <Nav currentPage="work" />
      <main id="main-content">
        <CaseStudyTOC />
        <SectionShell id="case-study-hero" padding="xl" style={{ paddingBottom: '0' }}>
          <div
            ref={heroRef}
            style={{
              transform: `translate(${parallax.x * 0.3}px, ${parallax.y * 0.3}px)`,
              transition: 'transform 0.3s ease-out',
            }}
          >
            <div style={{ marginBottom: '32px', padding: '0 16px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  minHeight: '30px',
                  padding: '8px 16px',
                  border: '1px solid #F2ECDE',
                  borderRadius: '999px',
                  color: '#3CBAAE',
                  fontSize: '11px',
                  fontWeight: 900,
                  fontFamily: '"General Sans", Inter, sans-serif',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}
              >
                Case Study
              </span>
              <h1
                style={{
                  margin: 0,
                  fontFamily:
                    '"Clash Display", "Anton", "Bebas Neue", "Owners Wide", Impact, sans-serif',
                  fontSize: 'clamp(3.5rem, 8vw, 7rem)',
                  fontWeight: 900,
                  lineHeight: 0.85,
                  textTransform: 'uppercase',
                  color: '#F2ECDE',
                  letterSpacing: '0',
                }}
              >
                {project.title}
              </h1>
            </div>

            <div
              style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                background: '#D9C7BD',
                aspectRatio: '16 / 9',
                marginBottom: '40px',
              }}
            >
              <img
                src={project.image}
                alt={`${project.title} project cover`}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 1,
                }}
              />
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '24px',
                alignItems: 'center',
                padding: '0 16px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '16px',
                  color: 'rgba(242, 236, 222, 0.78)',
                  fontSize: '13px',
                  fontWeight: 600,
                  fontFamily: '"General Sans", Inter, sans-serif',
                }}
              >
                <span>{project.role}</span>
                <span style={{ opacity: 0.4 }}>·</span>
                <span>{project.year}</span>
                <span style={{ opacity: 0.4 }}>·</span>
                <span>{project.category}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {project.tools.slice(0, 6).map((tool: string, i: number) => (
                  <InlineSticker key={tool} accentIndex={i % 5} size="sm">
                    {tool.toUpperCase()}
                  </InlineSticker>
                ))}
              </div>
            </div>
          </div>
        </SectionShell>

        <SectionShell id="problem" padding="xl" style={{ paddingTop: '56px' }}>
          <GridPanel asymmetric="right" padding="xl" dark style={{ minHeight: '340px' }}>
            <div style={{ maxWidth: '640px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  minHeight: '30px',
                  padding: '8px 16px',
                  border: '1px solid #69A65B',
                  borderRadius: '999px',
                  color: '#69A65B',
                  fontSize: '11px',
                  fontWeight: 900,
                  fontFamily: '"General Sans", Inter, sans-serif',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}
              >
                Problem
              </span>
              <h2
                style={{
                  margin: '0 0 16px',
                  fontFamily:
                    '"Clash Display", "Anton", "Bebas Neue", "Owners Wide", Impact, sans-serif',
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                  fontWeight: 900,
                  lineHeight: 0.95,
                  textTransform: 'uppercase',
                  color: '#F2ECDE',
                  letterSpacing: '0',
                }}
              >
                The Challenge
              </h2>
              <p
                style={{
                  color: 'rgba(242, 236, 222, 0.78)',
                  lineHeight: 1.75,
                  fontSize: '15px',
                  fontFamily: '"General Sans", Inter, sans-serif',
                }}
              >
                {project.problem}
              </p>
            </div>
          </GridPanel>
        </SectionShell>

        <SectionShell
          id="process"
          padding="xl"
          style={{ backgroundColor: '#EDE5D6', borderRadius: '24px', margin: '0 32px 56px' }}
        >
          <div style={{ marginBottom: '32px', padding: '0 16px' }}>
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
              Process
            </span>
            <h2
              style={{
                margin: 0,
                fontFamily:
                  '"Clash Display", "Anton", "Bebas Neue", "Owners Wide", Impact, sans-serif',
                fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                fontWeight: 900,
                lineHeight: 0.95,
                textTransform: 'uppercase',
                color: '#141310',
                letterSpacing: '0',
              }}
            >
              Approach & Execution
            </h2>
          </div>
          <p
            style={{
              color: 'rgba(20, 19, 16, 0.68)',
              lineHeight: 1.75,
              fontSize: '15px',
              fontFamily: '"General Sans", Inter, sans-serif',
              maxWidth: '800px',
              padding: '0 16px',
            }}
          >
            {project.process}
          </p>

          <div
            style={{
              marginTop: '40px',
              borderRadius: '16px',
              overflow: 'hidden',
              padding: '0 16px',
            }}
          >
            <img
              src="/projects/process-flow.svg"
              alt="Process flow: Discover, Define, Build, Deliver"
              loading="lazy"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </SectionShell>

        <SectionShell id="solution" padding="xl" style={{ paddingTop: '56px' }}>
          <GridPanel asymmetric="left" padding="xl" style={{ minHeight: '340px' }}>
            <div style={{ maxWidth: '640px', marginLeft: 'auto' }}>
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
                Solution
              </span>
              <h2
                style={{
                  margin: '0 0 16px',
                  fontFamily:
                    '"Clash Display", "Anton", "Bebas Neue", "Owners Wide", Impact, sans-serif',
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                  fontWeight: 900,
                  lineHeight: 0.95,
                  textTransform: 'uppercase',
                  color: '#141310',
                  letterSpacing: '0',
                }}
              >
                The Result
              </h2>
              <p
                style={{
                  color: 'rgba(20, 19, 16, 0.68)',
                  lineHeight: 1.75,
                  fontSize: '15px',
                  fontFamily: '"General Sans", Inter, sans-serif',
                }}
              >
                {project.solution}
              </p>

              <div
                style={{
                  marginTop: '32px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid rgba(20, 19, 16, 0.12)',
                }}
              >
                <img
                  src={project.image}
                  alt={`${project.title} interface preview`}
                  loading="lazy"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </div>
          </GridPanel>
        </SectionShell>

        <SectionShell
          id="outcome"
          padding="xl"
          style={{ backgroundColor: '#EDE5D6', borderRadius: '24px', margin: '0 32px 56px' }}
        >
          <div style={{ marginBottom: '32px', padding: '0 16px' }}>
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
              Outcome
            </span>
            <h2
              style={{
                margin: 0,
                fontFamily:
                  '"Clash Display", "Anton", "Bebas Neue", "Owners Wide", Impact, sans-serif',
                fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                fontWeight: 900,
                lineHeight: 0.95,
                textTransform: 'uppercase',
                color: '#141310',
                letterSpacing: '0',
              }}
            >
              Impact & Metrics
            </h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '24px',
              marginBottom: '48px',
              padding: '0 16px',
            }}
          >
            {project.metrics.map((metric: any, i: number) => (
              <div
                key={i}
                style={{
                  textAlign: 'center',
                  padding: '28px 20px',
                  background: '#F2ECDE',
                  borderRadius: '16px',
                }}
              >
                <div
                  style={{
                    fontFamily:
                      '"Clash Display", "Anton", "Bebas Neue", "Owners Wide", Impact, sans-serif',
                    fontSize: 'clamp(2.8rem, 5vw, 4.2rem)',
                    fontWeight: 900,
                    lineHeight: 1,
                    color: '#141310',
                    marginBottom: '8px',
                  }}
                >
                  {metric.value}
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'rgba(20, 19, 16, 0.55)',
                    fontFamily: '"General Sans", Inter, sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              marginBottom: '32px',
              padding: '0 16px',
            }}
          >
            {caseStudyStickers[project.id]?.map((sticker, i) => (
              <InlineSticker key={`${project.id}-${i}`} accentIndex={sticker.accentIndex} size="sm">
                {sticker.label}
              </InlineSticker>
            ))}
          </div>

          {project.lessons.length > 0 && (
            <div style={{ margin: '0 16px 48px' }}>
              <span
                style={{
                  display: 'inline-block',
                  marginBottom: '20px',
                  color: '#344E38',
                  fontSize: '11px',
                  fontWeight: 900,
                  fontFamily: '"General Sans", Inter, sans-serif',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                What I learned on this build
              </span>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '16px',
                }}
              >
                {project.lessons.map((lesson, i) => (
                  <div
                    key={i}
                    style={{
                      background: '#F2ECDE',
                      borderRadius: '16px',
                      padding: '20px 22px',
                      display: 'flex',
                      gap: '14px',
                      alignItems: 'flex-start',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '26px',
                        height: '26px',
                        borderRadius: '999px',
                        background: '#141310',
                        color: '#F2ECDE',
                        fontSize: '11px',
                        fontWeight: 900,
                        fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace',
                        flexShrink: 0,
                        marginTop: '2px',
                      }}
                    >
                      {i + 1}
                    </span>
                    <p
                      style={{
                        margin: 0,
                        color: 'rgba(20, 19, 16, 0.72)',
                        fontSize: '13.5px',
                        lineHeight: 1.6,
                        fontFamily: '"General Sans", Inter, sans-serif',
                      }}
                    >
                      {lesson}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', padding: '0 16px' }}>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
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
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#3CBAAE';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#141310';
                }}
              >
                Live Demo
                <ArrowUpRight size={16} strokeWidth={1.9} />
              </a>
            )}
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
                Source Code
                <Github size={16} strokeWidth={1.9} />
              </a>
            )}
          </div>
        </SectionShell>

        <SectionShell
          id="next-project"
          padding="xl"
          style={{ backgroundColor: '#141310', borderRadius: '24px', margin: '0 32px' }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '24px',
              padding: '0 16px',
            }}
          >
            <div>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  minHeight: '30px',
                  padding: '8px 16px',
                  border: '1px solid #69A65B',
                  borderRadius: '999px',
                  color: '#69A65B',
                  fontSize: '11px',
                  fontWeight: 900,
                  fontFamily: '"General Sans", Inter, sans-serif',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}
              >
                Next Project
              </span>
              <h2
                style={{
                  margin: 0,
                  fontFamily:
                    '"Clash Display", "Anton", "Bebas Neue", "Owners Wide", Impact, sans-serif',
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                  fontWeight: 900,
                  lineHeight: 0.95,
                  textTransform: 'uppercase',
                  color: '#F2ECDE',
                  letterSpacing: '0',
                }}
              >
                {project.nextProject.title}
              </h2>
            </div>
            <CTAButton
              variant="ghost"
              icon={<ArrowRight size={15} strokeWidth={2.2} />}
              iconPosition="right"
              onClick={() => navigate(`/dev/work/${project.nextProject.slug}`)}
              style={{ whiteSpace: 'nowrap' }}
            >
              View Case Study
            </CTAButton>
          </div>
        </SectionShell>
      </main>
      <Footer />
    </PageShell>
  );
}
