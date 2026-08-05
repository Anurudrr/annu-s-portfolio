import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const greetings = ['Hello', 'Bonjour', 'Ciao', 'Olà', 'سلام', 'やあ', 'Hallå', 'Guten tag', 'Hallo'];

export const Preloader: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    if (index === greetings.length - 1) return;
    const timeout = setTimeout(
      () => {
        setIndex(index + 1);
      },
      index === 0 ? 500 : 250
    );
    return () => clearTimeout(timeout);
  }, [index]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
    },
  };

  const slideUp = {
    initial: { top: 0 },
    exit: { top: '-100vh', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } },
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        zIndex: 9999,
        backgroundColor: 'hsl(var(--foreground))',
        cursor: 'wait',
        pointerEvents: 'all',
      }}
    >
      {dimension.width > 0 && (
        <>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              color: 'hsl(var(--background))',
              fontSize: '42px',
              fontWeight: 500,
              zIndex: 1,
            }}
          >
            <span
              style={{
                display: 'block',
                width: '10px',
                height: '10px',
                backgroundColor: 'hsl(var(--background))',
                borderRadius: '50%',
                marginRight: '10px',
              }}
            ></span>
            {greetings[index]}
          </motion.p>
          <svg style={{ position: 'absolute', top: 0, width: '100%', height: 'calc(100% + 300px)' }}>
            <motion.path
              variants={curve}
              initial="initial"
              exit="exit"
              fill="hsl(var(--foreground))"
            ></motion.path>
          </svg>
        </>
      )}
    </motion.div>
  );
};
