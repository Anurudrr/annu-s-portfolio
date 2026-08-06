import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowUpRight,
  Clock,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from 'lucide-react';
import { MagneticButton } from '../components/MagneticButton';
import { designTokens } from '../tokens';

const { colors } = designTokens;

const label: React.CSSProperties = {
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  color: 'hsl(var(--muted-foreground))',
  margin: 0,
};

const SOCIALS = [
  { name: 'GitHub', href: 'https://github.com/Anurudrr', Icon: Github },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/anurudh-singh-251067307/', Icon: Linkedin },
  { name: 'Twitter', href: 'https://x.com/anurudrr', Icon: Twitter },
  { name: 'Instagram', href: 'https://instagram.com/anurudrr', Icon: Instagram },
];

const INFO = [
  { key: 'Email', value: 'sanurudh938@gmail.com', href: 'mailto:sanurudh938@gmail.com', Icon: Mail },
  { key: 'Phone', value: '+91 73893 82433', href: 'tel:+917389382433', Icon: Phone },
  { key: 'Location', value: 'Vadodara, India', href: undefined, Icon: MapPin },
];

const Time: React.FC = () => {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }).format(new Date())
      );
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);
  return <>{time} IST</>;
};

export const DesignContactPage: React.FC = () => {
  return (
    <main style={{ padding: '150px 5% 60px', maxWidth: '1600px', margin: '0 auto' }}>
      {/* ── Heading ── */}
      <header style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '40px', marginBottom: '90px' }}>
        <div style={{ gridColumn: '1 / span 4' }}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} style={label}>
            05 — Contact
          </motion.p>
        </div>
        <div style={{ gridColumn: '5 / span 8' }}>
          <motion.h1
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            style={{ fontSize: 'max(3.6em, 7vw)', fontWeight: 500, lineHeight: 0.95, letterSpacing: '-0.02em', margin: 0 }}
          >
            Let's start a
            <br />
            project <span style={{ color: colors.teal }}>together</span>.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              marginTop: '40px',
              padding: '10px 20px',
              border: '1px solid hsl(var(--border))',
              borderRadius: '999px',
              fontSize: '14px',
            }}
          >
            <span
              style={{
                width: '9px',
                height: '9px',
                borderRadius: '50%',
                backgroundColor: colors.green,
                animation: 'asPulse 1.6s ease-in-out infinite',
              }}
            />
            Available for freelance & internships
          </motion.div>
        </div>
      </header>

      {/* ── Giant email link ── */}
      <motion.a
        href="mailto:sanurudh938@gmail.com"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = colors.pink;
          e.currentTarget.querySelector('span')!.style.transform = 'scaleX(1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'hsl(var(--foreground))';
          e.currentTarget.querySelector('span')!.style.transform = 'scaleX(0)';
        }}
        style={{
          display: 'block',
          width: '100%',
          textDecoration: 'none',
          color: 'hsl(var(--foreground))',
          fontSize: 'clamp(24px, 4.2vw, 60px)',
          fontWeight: 500,
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          padding: '40px 0',
          borderTop: '1px solid hsl(var(--border))',
          borderBottom: '1px solid hsl(var(--border))',
          transition: 'color 0.3s ease',
          position: 'relative',
        }}
      >
        <Mail size={34} style={{ display: 'inline', marginRight: '18px', verticalAlign: 'middle' }} />
        sanurudh938@gmail.com
        <span
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            height: '3px',
            backgroundColor: colors.pink,
            transform: 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 0.4s cubic-bezier(0.76, 0, 0.24, 1)',
          }}
        />
      </motion.a>

      {/* ── Info grid ── */}
      <section style={{ margin: '90px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
          {INFO.map((row) => {
            const inner = (
              <>
                <p style={{ ...label, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <row.Icon size={15} style={{ color: colors.teal }} />
                  {row.key}
                </p>
                <p style={{ fontSize: '18px', margin: '14px 0 0' }}>{row.value}</p>
              </>
            );
            return (
              <div
                key={row.key}
                style={{
                  padding: '28px',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px',
                  transition: 'transform 0.35s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                {row.href ? (
                  <a href={row.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </div>
            );
          })}
        </div>

        {/* Local time + socials */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
            marginTop: '50px',
            paddingTop: '30px',
            borderTop: '1px solid hsl(var(--border))',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'hsl(var(--muted-foreground))' }}>
            <Clock size={16} />
            <span>
              Local time · <Time />
            </span>
          </div>
          <div style={{ display: 'flex', gap: '28px' }}>
            {SOCIALS.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'hsl(var(--foreground))',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 500,
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = colors.orange)}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'hsl(var(--foreground))')}
              >
                <Icon size={17} />
                {name}
                <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick message ── */}
      <section style={{ padding: '80px 0 100px', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '60px' }}>
        <div style={{ gridColumn: '1 / span 5' }}>
          <p style={label}>Or say hello directly</p>
          <p style={{ fontSize: '22px', lineHeight: 1.45, margin: '24px 0 0' }}>
            Tell me about your project, timeline and budget. I usually reply within a day.
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const subject = encodeURIComponent(fd.get('name') + ' — new project inquiry');
            const body = encodeURIComponent(`${fd.get('message')}\n\n— ${fd.get('name')} (${fd.get('email')})`);
            window.open(`mailto:sanurudh938@gmail.com?subject=${subject}&body=${body}`, '_self');
          }}
          style={{ gridColumn: '6 / span 7', display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {[
              { name: 'name', label: 'Your name', type: 'text', required: true },
              { name: 'email', label: 'Your email', type: 'email', required: true },
            ].map((f) => (
              <input
                key={f.name}
                name={f.name}
                type={f.type}
                required={f.required}
                placeholder={f.label}
                style={{
                  flex: '1 1 220px',
                  padding: '16px 18px',
                  fontSize: '15px',
                  borderRadius: '8px',
                  border: '1px solid hsl(var(--border))',
                  background: 'transparent',
                  color: 'hsl(var(--foreground))',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = colors.teal)}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'hsl(var(--border))')}
              />
            ))}
          </div>
          <textarea
            name="message"
            required
            placeholder="Tell me about your project…"
            rows={4}
            style={{
              padding: '16px 18px',
              fontSize: '15px',
              borderRadius: '8px',
              border: '1px solid hsl(var(--border))',
              background: 'transparent',
              color: 'hsl(var(--foreground))',
              outline: 'none',
              resize: 'vertical',
              fontFamily: 'inherit',
              transition: 'border-color 0.3s ease',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = colors.teal)}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'hsl(var(--border))')}
          />
          <div style={{ alignSelf: 'flex-start' }}>
            <MagneticButton variant="custom">
              <button
                type="submit"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '16px 36px',
                  borderRadius: '999px',
                  border: 'none',
                  backgroundColor: '#141310',
                  color: colors.paper,
                  fontSize: '15px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                Send message <ArrowUpRight size={17} />
              </button>
            </MagneticButton>
          </div>
        </form>
      </section>
    </main>
  );
};