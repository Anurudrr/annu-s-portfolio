import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface CountUpProps {
  end: number;
  start?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  separator?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  end,
  start = 0,
  duration = 1500,
  className = '',
  style = {},
  suffix = '',
  prefix = '',
  decimals = 0,
  separator = ',',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(start);
  const frameRef = useRef<number>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    if (!isInView) return;

    startTimeRef.current = window.performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTimeRef.current!;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = start + (end - start) * easedProgress;

      setCount(currentValue);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isInView, end, start, duration]);

  const formatNumber = (num: number) => {
    const fixed = num.toFixed(decimals);
    const parts = fixed.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return parts.join('.');
  };

  return (
    <motion.span
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
    >
      {prefix}
      {formatNumber(count)}
      {suffix}
    </motion.span>
  );
};
