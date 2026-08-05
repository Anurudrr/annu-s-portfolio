import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export default function SystemsHUD() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setPercentage(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <div
      className="scroll-hud"
      aria-hidden="true"
      style={{
        position: 'fixed',
        right: 'clamp(8px, 1.2vw, 22px)',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 900,
        display: 'none',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      <span
        style={{
          writingMode: 'vertical-rl',
          color: 'rgba(242, 236, 222, 0.5)',
          fontSize: '8px',
          fontWeight: 900,
          fontFamily: '"General Sans", Inter, sans-serif',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
        }}
      >
        Scroll Depth
      </span>

      <div
        style={{
          width: '6px',
          height: 'clamp(140px, 22vh, 220px)',
          borderRadius: '999px',
          background: 'rgba(242, 236, 222, 0.12)',
          border: '1px solid rgba(242, 236, 222, 0.18)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(180deg, #3CBAAE, #9FD463)',
            transformOrigin: 'top',
            scaleY,
          }}
        />
      </div>

      <span
        style={{
          color: '#3CBAAE',
          fontSize: '10px',
          fontWeight: 900,
          fontFamily: '"General Sans", Inter, sans-serif',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {percentage}%
      </span>
    </div>
  );
}
