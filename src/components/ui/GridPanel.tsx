import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface GridPanelProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  dark?: boolean;
  asymmetric?: 'left' | 'right';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  parallax?: boolean;
}

const paddingStyles = {
  none: '0',
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '48px',
};

export const GridPanel: React.FC<GridPanelProps> = ({
  children,
  className = '',
  style = {},
  dark = false,
  asymmetric,
  padding = 'md',
  parallax = true,
}) => {
  const bgColor = dark ? '#141310' : '#EDE5D6';
  const gridColor = dark ? 'rgba(242, 236, 222, 0.12)' : 'rgba(20, 19, 16, 0.08)';

  let borderRadius = '24px';
  if (asymmetric === 'right') {
    borderRadius = '0 32px 32px 0';
  } else if (asymmetric === 'left') {
    borderRadius = '32px 0 0 32px';
  }

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const yTransform = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  const baseStyle: React.CSSProperties = {
    position: 'relative',
    backgroundColor: bgColor,
    backgroundImage: `
      linear-gradient(${gridColor} 1px, transparent 1px),
      linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
    `,
    backgroundSize: '24px 24px',
    borderRadius,
    padding: paddingStyles[padding],
    overflow: 'hidden',
    ...style,
  };

  return (
    <motion.div ref={ref} className={`grid-panel ${className}`} style={baseStyle}>
      {parallax && (
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(${gridColor} 1px, transparent 1px),
              linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px',
            borderRadius,
            pointerEvents: 'none',
            y: yTransform,
          }}
        />
      )}
      {children}
    </motion.div>
  );
};

interface GridCardProps extends GridPanelProps {
  variant?: 'default' | 'elevated' | 'outlined';
  onClick?: () => void;
  hoverLift?: boolean;
}

export const GridCard: React.FC<GridCardProps> = ({
  children,
  className = '',
  style = {},
  dark = false,
  asymmetric,
  padding = 'md',
  variant = 'default',
  onClick,
  hoverLift = true,
}) => {
  const bgColor = dark ? '#141310' : '#EDE5D6';
  const gridColor = dark ? 'rgba(242, 236, 222, 0.12)' : 'rgba(20, 19, 16, 0.08)';

  let borderRadius = '24px';
  if (asymmetric === 'right') {
    borderRadius = '0 32px 32px 0';
  } else if (asymmetric === 'left') {
    borderRadius = '32px 0 0 32px';
  }

  const variantStyles: Record<string, React.CSSProperties> = {
    default: {
      boxShadow: '0 20px 60px rgba(20, 19, 16, 0.12)',
      border: '1px solid rgba(20, 19, 16, 0.15)',
    },
    elevated: {
      boxShadow: '0 22px 70px rgba(20, 19, 16, 0.18)',
      border: 'none',
    },
    outlined: {
      boxShadow: 'none',
      border: '1px solid rgba(20, 19, 16, 0.25)',
    },
  };

  const baseStyle: React.CSSProperties = {
    position: 'relative',
    backgroundColor: bgColor,
    backgroundImage: `
      linear-gradient(${gridColor} 1px, transparent 1px),
      linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
    `,
    backgroundSize: '24px 24px',
    borderRadius,
    padding: paddingStyles[padding],
    overflow: 'hidden',
    cursor: onClick ? 'pointer' : 'default',
    willChange: 'transform, box-shadow',
    ...variantStyles[variant],
    ...style,
  };

  const hoverBoxShadow =
    variant === 'elevated'
      ? '0 30px 90px rgba(20, 19, 16, 0.25)'
      : variant === 'default'
        ? '0 28px 80px rgba(20, 19, 16, 0.2)'
        : '0 12px 40px rgba(20, 19, 16, 0.15)';

  return (
    <motion.div
      className={`grid-card ${className}`}
      style={baseStyle}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick?.();
      }}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      whileHover={
        hoverLift && onClick
          ? {
              y: -6,
              boxShadow: hoverBoxShadow,
              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
            }
          : undefined
      }
      whileTap={hoverLift && onClick ? { y: -2, transition: { duration: 0.1 } } : undefined}
      animate={{ y: 0, boxShadow: variantStyles[variant].boxShadow }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
    >
      {children}
    </motion.div>
  );
};
