import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

// Cursor states
type CursorState = 'default' | 'text' | 'magnetic' | 'hidden';

export const DesignCursor: React.FC = () => {
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [isVisible, setIsVisible] = useState(false);

  // Raw mouse position (dot follows immediately)
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Spring-damped position (ring follows with lag)
  const springConfig = { damping: 28, stiffness: 200, mass: 0.5 };
  const ringX = useSpring(dotX, springConfig);
  const ringY = useSpring(dotY, springConfig);

  const stateRef = useRef<CursorState>('default');
  stateRef.current = cursorState;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Detect hover targets
    const handlePointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const closestMagnetic = target.closest('[data-magnetic]');
      const closestProjectCard = target.closest('[data-project-card]');

      if (closestProjectCard) {
        // ProjectCard handles its own cursor blob; hide global cursor
        setCursorState('hidden');
      } else if (closestMagnetic) {
        setCursorState('magnetic');
      } else {
        // Check for text/interactive elements
        const tag = target.tagName.toLowerCase();
        const isTextEl =
          tag === 'p' ||
          tag === 'h1' ||
          tag === 'h2' ||
          tag === 'h3' ||
          tag === 'h4' ||
          tag === 'h5' ||
          tag === 'h6' ||
          tag === 'span' ||
          tag === 'li' ||
          tag === 'blockquote' ||
          target.closest('p') !== null;
        const isInteractive =
          tag === 'a' ||
          tag === 'button' ||
          target.closest('a') !== null ||
          target.closest('button') !== null;
        const hasTextCursor = window.getComputedStyle(target).cursor === 'text';

        if (hasTextCursor || (isTextEl && !isInteractive)) {
          setCursorState('text');
        } else {
          setCursorState('default');
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('pointerover', handlePointerOver);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('pointerover', handlePointerOver);
    };
  }, [dotX, dotY, isVisible]);

  const isHidden = !isVisible || cursorState === 'hidden';

  // Ring size & style based on state
  const ringSize =
    cursorState === 'text'
      ? 50
      : cursorState === 'magnetic'
      ? 64
      : 36;

  const ringBg =
    cursorState === 'magnetic'
      ? 'hsla(var(--primary), 0.15)'
      : 'transparent';

  const ringBorder =
    cursorState === 'magnetic'
      ? '1.5px solid hsl(var(--primary))'
      : cursorState === 'text'
      ? '1.5px solid hsla(var(--foreground), 0.5)'
      : '1.5px solid hsla(var(--foreground), 0.4)';

  const dotSize = cursorState === 'text' ? 3 : 5;

  return (
    <>
      {/* Outer ring – spring-follows cursor */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          borderRadius: '50%',
          border: ringBorder,
          backgroundColor: ringBg,
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: isHidden ? 0 : 1,
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          opacity: isHidden ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Inner dot – snaps instantly to cursor */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          width: dotSize,
          height: dotSize,
          marginLeft: -dotSize / 2,
          marginTop: -dotSize / 2,
          borderRadius: '50%',
          backgroundColor: 'hsl(var(--foreground))',
          pointerEvents: 'none',
          zIndex: 100000,
          opacity: isHidden ? 0 : 1,
        }}
        animate={{
          width: dotSize,
          height: dotSize,
          marginLeft: -dotSize / 2,
          marginTop: -dotSize / 2,
          opacity: isHidden ? 0 : 1,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
    </>
  );
};
