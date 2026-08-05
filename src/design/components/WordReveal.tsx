import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface WordRevealProps {
  text: string;
  className?: string;
  delayOffset?: number;
}

export const WordReveal: React.FC<WordRevealProps> = ({ text, className = '', delayOffset = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  const words = text.split(' ');

  const slideUp = {
    initial: { y: '100%' },
    open: (i: number) => ({
      y: '0%',
      transition: { duration: 0.5, delay: delayOffset + 0.01 * i, ease: [0.33, 1, 0.68, 1] },
    }),
    closed: { y: '100%' },
  };

  return (
    <div ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            overflow: 'hidden',
            display: 'inline-block',
            marginRight: '0.25em',
            paddingBottom: '0.1em', // prevents descenders getting cut off
          }}
        >
          <motion.span
            custom={i}
            variants={slideUp}
            initial="initial"
            animate={isInView ? 'open' : 'closed'}
            style={{ display: 'inline-block' }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
};
