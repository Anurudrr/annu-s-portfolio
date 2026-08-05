import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'custom';
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ children, onClick, className = '', variant = 'default' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.35, y: middleY * 0.35 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      data-magnetic
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      onClick={onClick}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...(variant === 'default' && {
            borderRadius: '9999px',
            backgroundColor: 'hsl(var(--primary))',
            color: 'hsl(var(--primary-foreground))',
            padding: '16px 32px',
          })
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
