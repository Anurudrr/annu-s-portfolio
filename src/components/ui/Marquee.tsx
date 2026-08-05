import React from 'react';

const items = [
  'TypeScript',
  'React.js',
  'Next.js',
  'Node.js',
  'Express',
  'PostgreSQL',
  'MongoDB',
  'Java',
  'Spring Boot',
  'Kotlin / Compose',
  'Python',
  'Tailwind CSS',
  'AngularJS',
  'Figma',
  'REST APIs',
  'DSA',
];

export const Marquee: React.FC = () => {
  const row = [...items, ...items];

  return (
    <div className="marquee" role="presentation" aria-hidden="true">
      <div className="marquee__track">
        {row.map((item, i) => (
          <span key={i} className="marquee__item">
            {item}
            <span className="marquee__dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};
