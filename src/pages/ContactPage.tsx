import React from 'react';
import { Mail, Github, Linkedin, Sparkles, MapPin, Phone, FileText } from 'lucide-react';
import { PageShell, Nav, Footer, SectionShell, CTAButton } from '../components/ui/PageShell';
import { GridPanel } from '../components/ui/GridPanel';
import { SEO } from '../components/SEO';
import { ContactForm } from '../components/ContactForm';

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/Anurudrr',
    icon: Github,
    color: '#3CBAAE',
    textColor: '#141310',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/anurudh-singh-251067307/',
    icon: Linkedin,
    color: '#69A65B',
    textColor: '#141310',
  },
  {
    label: 'LeetCode',
    href: 'https://leetcode.com/u/ANURUDH_SINGH_RAJAWAT/',
    icon: Sparkles,
    color: '#F2C94C',
    textColor: '#141310',
  },
  {
    label: 'Email',
    href: 'mailto:sanurudh938@gmail.com',
    icon: Mail,
    color: '#EF7B3C',
    textColor: '#F2ECDE',
  },
];

const contactInfo = [
  {
    label: 'Email',
    value: 'sanurudh938@gmail.com',
    icon: Mail,
    href: 'mailto:sanurudh938@gmail.com',
  },
  { label: 'Phone', value: '+91 73893 82433', icon: Phone, href: 'tel:+917389382433' },
  { label: 'Location', value: 'Vadodara, Gujarat, India', icon: MapPin, href: null },
];

export const ContactPage: React.FC = () => {
  return (
    <PageShell>
      <SEO
        title="Contact"
        description="Get in touch with Anurudh Singh Rajawat — Full-Stack Developer & UI/UX Designer. Open to internships, remote contracts, frontend roles, and full-stack partnerships."
        url="/contact"
        image="/og-image.png"
      />
      <Nav currentPage="contact" />
      <main id="main-content">
        <SectionShell id="contact" padding="xl" style={{ paddingBottom: '0' }}>
          <div style={{ marginBottom: '32px', padding: '0 16px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                minHeight: '30px',
                padding: '8px 16px',
                border: '1px solid #F2ECDE',
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
              Contact
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
              LET&apos;S TALK
            </h1>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '56px',
              alignItems: 'start',
              padding: '0 16px',
            }}
          >
            <div>
              <p
                style={{
                  color: 'rgba(242, 236, 222, 0.78)',
                  lineHeight: 1.75,
                  fontSize: '15px',
                  fontFamily: '"General Sans", Inter, sans-serif',
                  marginBottom: '36px',
                }}
              >
                Have a product, internship, or design-heavy frontend role? I&apos;m open to
                opportunities where UI/UX craft meets engineering rigor. Let&apos;s build something
                that works beautifully.
              </p>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  marginBottom: '36px',
                }}
              >
                {contactInfo.map((item) => {
                  const isLink = !!item.href;
                  const Component = isLink ? 'a' : 'div';
                  const linkProps = isLink
                    ? {
                        href: item.href,
                        target: item.label !== 'Email' ? '_blank' : undefined,
                        rel: item.label !== 'Email' ? 'noopener noreferrer' : undefined,
                      }
                    : {};

                  return (
                    <Component
                      key={item.label}
                      {...linkProps}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        padding: '18px 24px',
                        background: 'rgba(242, 236, 222, 0.06)',
                        border: '1px solid rgba(242, 236, 222, 0.1)',
                        borderRadius: '12px',
                        color: '#F2ECDE',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: 600,
                        fontFamily: '"General Sans", Inter, sans-serif',
                        transition: 'background 0.2s ease, border-color 0.2s ease',
                        cursor: isLink ? 'pointer' : 'default',
                      }}
                      onMouseEnter={(e) => {
                        if (isLink) {
                          e.currentTarget.style.background = 'rgba(242, 236, 222, 0.12)';
                          e.currentTarget.style.borderColor = 'rgba(242, 236, 222, 0.2)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (isLink) {
                          e.currentTarget.style.background = 'rgba(242, 236, 222, 0.06)';
                          e.currentTarget.style.borderColor = 'rgba(242, 236, 222, 0.1)';
                        }
                      }}
                    >
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '44px',
                          height: '44px',
                          background: 'rgba(242, 236, 222, 0.1)',
                          borderRadius: '10px',
                          color: '#F2ECDE',
                        }}
                      >
                        <item.icon size={20} strokeWidth={2} />
                      </span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            opacity: 0.6,
                            fontFamily: '"General Sans", Inter, sans-serif',
                          }}
                        >
                          {item.label}
                        </span>
                        <span style={{ color: '#F2ECDE' }}>{item.value}</span>
                      </div>
                    </Component>
                  );
                })}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <a
                  href="/resume.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 18px',
                    backgroundColor: '#F2ECDE',
                    color: '#141310',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: 800,
                    fontFamily: '"Clash Display", "Anton", "Bebas Neue", Impact, sans-serif',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    transform: 'rotate(-2deg)',
                    transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'rotate(0deg) scale(1.05)';
                    e.currentTarget.style.backgroundColor = '#3CBAAE';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'rotate(-2deg)';
                    e.currentTarget.style.backgroundColor = '#F2ECDE';
                  }}
                >
                  <FileText size={14} strokeWidth={2} />
                  Download CV
                </a>
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 18px',
                      backgroundColor: social.color,
                      color: social.textColor,
                      borderRadius: '999px',
                      fontSize: '11px',
                      fontWeight: 800,
                      fontFamily: '"Clash Display", "Anton", "Bebas Neue", Impact, sans-serif',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      transform: 'rotate(-4deg)',
                      transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'rotate(0deg) scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'rotate(-4deg)';
                    }}
                  >
                    <social.icon size={14} strokeWidth={2} />
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

            <GridPanel
              asymmetric="right"
              padding="xl"
              dark
              style={{
                minHeight: '520px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <div style={{ maxWidth: '520px' }}>
                <h2
                  style={{
                    margin: '0 0 16px',
                    fontFamily:
                      '"Clash Display", "Anton", "Bebas Neue", "Owners Wide", Impact, sans-serif',
                    fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
                    fontWeight: 900,
                    lineHeight: 1.1,
                    textTransform: 'uppercase',
                    color: '#F2ECDE',
                    letterSpacing: '0',
                  }}
                >
                  Start a Conversation
                </h2>
                <p
                  style={{
                    margin: '0 0 24px',
                    color: 'rgba(242, 236, 222, 0.78)',
                    lineHeight: 1.75,
                    fontSize: '15px',
                    fontFamily: '"General Sans", Inter, sans-serif',
                  }}
                >
                  Drop me a line directly — I read every message and respond personally.
                </p>
                <ContactForm />
              </div>
            </GridPanel>
          </div>
        </SectionShell>

        <SectionShell
          id="contact-alt"
          padding="xl"
          style={{
            backgroundColor: '#EDE5D6',
            borderRadius: '24px',
            margin: '0 32px 56px',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              margin: '0 0 16px',
              fontFamily:
                '"Clash Display", "Anton", "Bebas Neue", "Owners Wide", Impact, sans-serif',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              textTransform: 'uppercase',
              color: '#141310',
              letterSpacing: '0',
            }}
          >
            Or Connect Elsewhere
          </h2>
          <p
            style={{
              margin: '0 0 32px',
              color: 'rgba(20, 19, 16, 0.68)',
              lineHeight: 1.65,
              fontSize: '15px',
              fontFamily: '"General Sans", Inter, sans-serif',
              maxWidth: '500px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            I&apos;m active on GitHub and LeetCode. Check out my code, contributions, and
            problem-solving journey.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
            <CTAButton
              variant="primary"
              icon={<Github size={18} strokeWidth={2} />}
              iconPosition="left"
              style={{ minWidth: '220px' }}
            >
              GitHub Profile
            </CTAButton>
            <CTAButton
              variant="secondary"
              icon={<Sparkles size={18} strokeWidth={2} />}
              iconPosition="left"
              style={{ minWidth: '220px' }}
            >
              LeetCode Profile
            </CTAButton>
          </div>
        </SectionShell>
      </main>
      <Footer />
    </PageShell>
  );
};
