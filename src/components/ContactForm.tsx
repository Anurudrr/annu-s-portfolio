import React, { useState, FormEvent } from 'react';
import { Send, AlertCircle, CheckCircle } from 'lucide-react';

interface ContactFormProps {
  onSuccess?: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', website: '' });
      onSuccess?.();

      // Reset success state after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      console.error('Contact form error:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div
        style={{
          position: 'absolute',
          left: '-9999px',
          top: '-9999px',
          height: 0,
          overflow: 'hidden',
        }}
        aria-hidden="true"
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label
            htmlFor="name"
            style={{
              fontSize: '11px',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'rgba(242, 236, 222, 0.78)',
              fontFamily: '"General Sans", Inter, sans-serif',
            }}
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            disabled={status === 'submitting'}
            style={{
              padding: '14px 18px',
              background: 'rgba(242, 236, 222, 0.06)',
              border: errors.name ? '1px solid #EF7B3C' : '1px solid rgba(242, 236, 222, 0.1)',
              borderRadius: '10px',
              color: '#F2ECDE',
              fontSize: '14px',
              fontFamily: '"General Sans", Inter, sans-serif',
              outline: 'none',
              transition: 'border-color 0.2s ease, background 0.2s ease',
              width: '100%',
            }}
            placeholder="Your name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <span
              id="name-error"
              style={{
                fontSize: '12px',
                color: '#EF7B3C',
                fontFamily: '"General Sans", Inter, sans-serif',
              }}
            >
              <AlertCircle
                size={12}
                style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }}
              />
              {errors.name}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label
            htmlFor="email"
            style={{
              fontSize: '11px',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'rgba(242, 236, 222, 0.78)',
              fontFamily: '"General Sans", Inter, sans-serif',
            }}
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={status === 'submitting'}
            style={{
              padding: '14px 18px',
              background: 'rgba(242, 236, 222, 0.06)',
              border: errors.email ? '1px solid #EF7B3C' : '1px solid rgba(242, 236, 222, 0.1)',
              borderRadius: '10px',
              color: '#F2ECDE',
              fontSize: '14px',
              fontFamily: '"General Sans", Inter, sans-serif',
              outline: 'none',
              transition: 'border-color 0.2s ease, background 0.2s ease',
              width: '100%',
            }}
            placeholder="your@email.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <span
              id="email-error"
              style={{
                fontSize: '12px',
                color: '#EF7B3C',
                fontFamily: '"General Sans", Inter, sans-serif',
              }}
            >
              <AlertCircle
                size={12}
                style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }}
              />
              {errors.email}
            </span>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label
          htmlFor="subject"
          style={{
            fontSize: '11px',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'rgba(242, 236, 222, 0.78)',
            fontFamily: '"General Sans", Inter, sans-serif',
          }}
        >
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          disabled={status === 'submitting'}
          style={{
            padding: '14px 18px',
            background: 'rgba(242, 236, 222, 0.06)',
            border: errors.subject ? '1px solid #EF7B3C' : '1px solid rgba(242, 236, 222, 0.1)',
            borderRadius: '10px',
            color: '#F2ECDE',
            fontSize: '14px',
            fontFamily: '"General Sans", Inter, sans-serif',
            outline: 'none',
            transition: 'border-color 0.2s ease, background 0.2s ease',
            width: '100%',
          }}
          placeholder="What's this about?"
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
        />
        {errors.subject && (
          <span
            id="subject-error"
            style={{
              fontSize: '12px',
              color: '#EF7B3C',
              fontFamily: '"General Sans", Inter, sans-serif',
            }}
          >
            <AlertCircle
              size={12}
              style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }}
            />
            {errors.subject}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label
          htmlFor="message"
          style={{
            fontSize: '11px',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'rgba(242, 236, 222, 0.78)',
            fontFamily: '"General Sans", Inter, sans-serif',
          }}
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          disabled={status === 'submitting'}
          rows={5}
          style={{
            padding: '14px 18px',
            background: 'rgba(242, 236, 222, 0.06)',
            border: errors.message ? '1px solid #EF7B3C' : '1px solid rgba(242, 236, 222, 0.1)',
            borderRadius: '10px',
            color: '#F2ECDE',
            fontSize: '14px',
            fontFamily: '"General Sans", Inter, sans-serif',
            outline: 'none',
            transition: 'border-color 0.2s ease, background 0.2s ease',
            width: '100%',
            resize: 'vertical',
            minHeight: '120px',
          }}
          placeholder="Tell me about your project, role, or just say hi..."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <span
            id="message-error"
            style={{
              fontSize: '12px',
              color: '#EF7B3C',
              fontFamily: '"General Sans", Inter, sans-serif',
            }}
          >
            <AlertCircle
              size={12}
              style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }}
            />
            {errors.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          padding: '16px 32px',
          background: status === 'submitting' ? 'rgba(242, 236, 222, 0.3)' : '#F2ECDE',
          color: status === 'submitting' ? 'rgba(20, 19, 16, 0.5)' : '#141310',
          border: 'none',
          borderRadius: '999px',
          fontSize: '13px',
          fontWeight: 900,
          fontFamily: '"General Sans", Inter, sans-serif',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
          transition: 'background 0.2s ease, transform 0.2s ease',
          minHeight: '56px',
        }}
      >
        {status === 'submitting' ? (
          <>
            <span
              style={{
                display: 'inline-block',
                width: '18px',
                height: '18px',
                border: '2px solid currentColor',
                borderRightColor: 'transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                animationName: 'spin',
              }}
            />
            <span>Sending...</span>
          </>
        ) : status === 'success' ? (
          <>
            <CheckCircle size={18} strokeWidth={2} />
            <span>Sent Successfully!</span>
          </>
        ) : status === 'error' ? (
          <>
            <AlertCircle size={18} strokeWidth={2} />
            <span>Failed - Try Again</span>
          </>
        ) : (
          <>
            <span>Send Message</span>
            <Send size={16} strokeWidth={1.9} />
          </>
        )}
      </button>
    </form>
  );
};
