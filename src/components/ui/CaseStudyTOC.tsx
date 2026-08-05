import React, { useEffect, useState } from 'react';

const sections = [
  { id: 'case-study-hero', label: 'Overview' },
  { id: 'problem', label: 'Problem' },
  { id: 'process', label: 'Process' },
  { id: 'solution', label: 'Solution' },
  { id: 'outcome', label: 'Outcome' },
];

export const CaseStudyTOC: React.FC = () => {
  const [active, setActive] = useState('case-study-hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="case-toc" aria-label="Case study sections">
      <span className="case-toc__label">On this page</span>
      <div className="case-toc__list">
        {sections.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => scrollTo(s.id)}
            className={`case-toc__item ${active === s.id ? 'case-toc__item--active' : ''}`}
            aria-current={active === s.id ? 'true' : undefined}
          >
            <span className="case-toc__dot" aria-hidden="true" />
            {s.label}
          </button>
        ))}
      </div>
    </nav>
  );
};
