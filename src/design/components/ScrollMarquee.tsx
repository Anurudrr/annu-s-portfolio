import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  wrap,
} from 'motion/react';

interface ScrollMarqueeProps {
  children: React.ReactNode;
  baseVelocity?: number;
}

export const ScrollMarquee: React.FC<ScrollMarqueeProps> = ({ children, baseVelocity = -2 }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      style={{
        overflow: 'hidden',
        letterSpacing: '-0.02em',
        lineHeight: 0.9,
        margin: 0,
        whiteSpace: 'nowrap',
        display: 'flex',
        flexWrap: 'nowrap',
      }}
    >
      <motion.div
        style={{
          x,
          display: 'flex',
          whiteSpace: 'nowrap',
          gap: '15px', // Adjust depending on font and size
        }}
      >
        <span style={{ display: 'block', paddingRight: '15px' }}>{children} </span>
        <span style={{ display: 'block', paddingRight: '15px' }}>{children} </span>
        <span style={{ display: 'block', paddingRight: '15px' }}>{children} </span>
        <span style={{ display: 'block', paddingRight: '15px' }}>{children} </span>
      </motion.div>
    </div>
  );
};
