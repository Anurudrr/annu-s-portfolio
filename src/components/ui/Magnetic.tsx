import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export const Magnetic: React.FC<MagneticProps> = ({ children, strength = 0.35, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || !enabled) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY, display: 'inline-block' }}
      onMouseEnter={() => setEnabled(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setEnabled(false);
        reset();
      }}
    >
      {children}
    </motion.div>
  );
};
