import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
          onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed',
            right: '24px',
            bottom: '24px',
            zIndex: 150,
            width: '52px',
            height: '52px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '16px',
            border: '2px solid #141310',
            background: '#3CBAAE',
            color: '#141310',
            boxShadow: '6px 6px 0 rgba(20, 19, 16, 0.9)',
            cursor: 'pointer',
          }}
          whileHover={{
            y: -4,
            rotate: -6,
            transition: { duration: 0.2, ease: [0.34, 1.56, 0.64, 1] as const },
          }}
          whileTap={{ scale: 0.94 }}
        >
          <ArrowUp size={20} strokeWidth={2.6} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
