import React, { useState } from 'react';
import { Send, CheckCircle2, Loader2, Mail } from 'lucide-react';
import { api } from '../lib/api';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    setStatus('submitting');
    setErrorMessage('');
    try {
      await api.subscribeNewsletter(trimmed);
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Try again.');
    }
  };

  return (
    <div
      style={{
        background: '#141310',
        borderRadius: '24px',
        padding: 'clamp(2rem, 4vw, 3.5rem)',
        color: '#F2ECDE',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '52px',
          height: '52px',
          borderRadius: '16px',
          background: 'rgba(60, 186, 174, 0.14)',
          color: '#3CBAAE',
          marginBottom: '18px',
        }}
      >
        <Mail size={22} strokeWidth={2} />
      </div>

      <h2
        style={{
          margin: '0 0 10px',
          fontFamily: '"Clash Display", "Anton", "Bebas Neue", "Owners Wide", Impact, sans-serif',
          fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
          fontWeight: 900,
          lineHeight: 1.05,
          textTransform: 'uppercase',
          letterSpacing: '0',
        }}
      >
        Notes from the build bench
      </h2>
      <p
        style={{
          margin: '0 auto 28px',
          maxWidth: '460px',
          color: 'rgba(242, 236, 222, 0.7)',
          fontSize: '14px',
          lineHeight: 1.65,
          fontFamily: '"General Sans", Inter, sans-serif',
        }}
      >
        Occasional letters on UI/UX engineering, Java architecture, and what I&apos;m building. No
        spam — unsubscribe anytime.
      </p>

      {status === 'success' ? (
        <div
          role="status"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '16px 24px',
            border: '1px solid rgba(60, 186, 174, 0.4)',
            borderRadius: '999px',
            background: 'rgba(60, 186, 174, 0.1)',
            color: '#3CBAAE',
            fontSize: '13px',
            fontWeight: 800,
            fontFamily: '"General Sans", Inter, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          <CheckCircle2 size={18} strokeWidth={2.2} />
          You&apos;re on the list — welcome aboard.
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            gap: '10px',
            maxWidth: '480px',
            margin: '0 auto',
            flexWrap: 'wrap',
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-label="Email address for newsletter"
            disabled={status === 'submitting'}
            style={{
              flex: '1 1 220px',
              minHeight: '52px',
              padding: '0 20px',
              borderRadius: '999px',
              border: '1px solid rgba(242, 236, 222, 0.25)',
              background: 'rgba(242, 236, 222, 0.06)',
              color: '#F2ECDE',
              fontSize: '14px',
              fontFamily: '"General Sans", Inter, sans-serif',
              outline: 'none',
            }}
          />
          {/* Honeypot field — visually hidden, bots only */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '-9999px',
              width: '1px',
              height: '1px',
              opacity: 0,
            }}
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              minHeight: '52px',
              padding: '0 24px',
              borderRadius: '999px',
              border: 'none',
              background: '#F2ECDE',
              color: '#141310',
              fontSize: '12px',
              fontWeight: 900,
              fontFamily: '"General Sans", Inter, sans-serif',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: status === 'submitting' ? 'wait' : 'pointer',
              transition: 'background 180ms ease, transform 180ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#3CBAAE';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#F2ECDE';
            }}
          >
            {status === 'submitting' ? (
              <Loader2 size={16} className="newsletter-spin" aria-hidden="true" />
            ) : (
              <Send size={15} strokeWidth={2.2} aria-hidden="true" />
            )}
            Subscribe
          </button>
        </form>
      )}

      {status === 'error' && (
        <p
          role="alert"
          style={{
            margin: '14px 0 0',
            color: '#EF7B3C',
            fontSize: '12px',
            fontWeight: 700,
            fontFamily: '"General Sans", Inter, sans-serif',
          }}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};
