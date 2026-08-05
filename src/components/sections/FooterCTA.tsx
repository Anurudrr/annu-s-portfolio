import React from 'react';
import { Mail, ArrowUpRight, Sparkles, FileText } from 'lucide-react';
import { SectionShell, CTAButton } from '../ui/PageShell';

interface FooterCTAProps {
  email: string;
  phone: string;
}

export const FooterCTA: React.FC<FooterCTAProps> = ({ email, phone }) => {
  return (
    <SectionShell
      id="footer-cta"
      padding="none"
      className="footer-cta-section home-band home-band--dark"
    >
      <div className="footer-cta-inner">
        <h2 className="editorial-heading editorial-heading--light">Let&apos;s build something</h2>

        <div className="footer-cta-actions">
          <CTAButton
            href={`mailto:${email}`}
            variant="primary"
            icon={<Mail size={18} strokeWidth={2} />}
            iconPosition="left"
            className="footer-cta-button"
          >
            Start a conversation
          </CTAButton>

          <CTAButton
            href="https://github.com/Anurudrr"
            variant="secondary"
            icon={<ArrowUpRight size={18} strokeWidth={2} />}
            iconPosition="right"
            className="footer-cta-button"
          >
            View GitHub
          </CTAButton>

          <CTAButton
            href="/resume.html"
            variant="ghost"
            icon={<FileText size={18} strokeWidth={2} />}
            iconPosition="left"
            className="footer-cta-button"
          >
            Download CV
          </CTAButton>
        </div>

        <div className="footer-cta-meta">
          <a href={`mailto:${email}`}>{email}</a>
          <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a>
          <span>
            <Sparkles size={16} strokeWidth={1.8} />
            Available for select work
          </span>
        </div>
      </div>
    </SectionShell>
  );
};
