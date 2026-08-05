import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { accentColors, BadgeShape, getRandomRotation } from '../../design/utils';
import {
  Eye,
  Sparkles,
  Globe,
  Zap,
  PenTool,
  Code2,
  Smartphone,
  Laptop,
  Terminal,
  Trophy,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  'FRONTEND DEV': <Code2 size={14} strokeWidth={2.5} />,
  'UI/UX DESIGN': <PenTool size={14} strokeWidth={2.5} />,
  'ANDROID DEV': <Smartphone size={14} strokeWidth={2.5} />,
  'FULL-STACK': <Laptop size={14} strokeWidth={2.5} />,
  'DESKTOP APPS': <Laptop size={14} strokeWidth={2.5} />,
  'PROBLEM SOLVING': <Trophy size={14} strokeWidth={2.5} />,
  'DESIGN STRATEGY': <PenTool size={14} strokeWidth={2.5} />,
  'E-COMM': <Globe size={14} strokeWidth={2.5} />,
  MOTION: <Zap size={14} strokeWidth={2.5} />,
  BRANDING: <Sparkles size={14} strokeWidth={2.5} />,
  USABILITY: <Eye size={14} strokeWidth={2.5} />,
  REACT: <Code2 size={12} strokeWidth={2.5} />,
  'UI/UX': <PenTool size={12} strokeWidth={2.5} />,
  TYPESCRIPT: <Code2 size={12} strokeWidth={2.5} />,
  JAVA: <Terminal size={12} strokeWidth={2.5} />,
  'SYSTEM DESIGN': <PenTool size={12} strokeWidth={2.5} />,
  'SPRING BOOT': <Terminal size={12} strokeWidth={2.5} />,
  KOTLIN: <Smartphone size={12} strokeWidth={2.5} />,
  BACKEND: <Terminal size={12} strokeWidth={2.5} />,
  FIGMA: <PenTool size={12} strokeWidth={2.5} />,
  'ADOBE XD': <PenTool size={12} strokeWidth={2.5} />,
  CANVA: <Sparkles size={12} strokeWidth={2.5} />,
  ELECTRON: <Laptop size={12} strokeWidth={2.5} />,
  MYSQL: <Terminal size={12} strokeWidth={2.5} />,
  'REST APIs': <Globe size={12} strokeWidth={2.5} />,
  DSA: <Trophy size={12} strokeWidth={2.5} />,
  HTML: <Code2 size={12} strokeWidth={2.5} />,
  CSS: <Code2 size={12} strokeWidth={2.5} />,
  JAVASCRIPT: <Code2 size={12} strokeWidth={2.5} />,
  TAILWIND: <Code2 size={12} strokeWidth={2.5} />,
  GIT: <Terminal size={12} strokeWidth={2.5} />,
};

const shapeStyles: Record<BadgeShape, React.CSSProperties> = {
  circle: {
    borderRadius: '50%',
    aspectRatio: '1 / 1',
    minWidth: '128px',
    minHeight: '128px',
    maxWidth: '128px',
    maxHeight: '128px',
    padding: '16px',
  },
  'rotated-rect': {
    borderRadius: '6px',
    minWidth: '150px',
    maxWidth: '200px',
    minHeight: '52px',
    padding: '10px 16px',
  },
  'notched-seal': {
    borderRadius: '6px',
    minWidth: '160px',
    maxWidth: '220px',
    minHeight: '56px',
    padding: '10px 16px',
    clipPath: 'polygon(0 18%, 18% 0, 100% 0, 100% 82%, 82% 100%, 0 100%)',
  },
  'scalloped-stamp': {
    borderRadius: '50%',
    aspectRatio: '1 / 1',
    minWidth: '120px',
    minHeight: '120px',
    maxWidth: '120px',
    maxHeight: '120px',
    padding: '16px',
    background: 'radial-gradient(circle at 50% 50%, transparent 38%, currentColor 38%)',
  },
};

const sizeStyles = {
  sm: {
    minWidth: '90px',
    minHeight: '90px',
    maxWidth: '90px',
    maxHeight: '90px',
    fontSize: '10px',
    padding: '8px 10px',
  },
  md: {
    minWidth: '120px',
    minHeight: '120px',
    maxWidth: '120px',
    maxHeight: '120px',
    fontSize: '12px',
    padding: '12px 16px',
  },
  lg: {
    minWidth: '150px',
    minHeight: '150px',
    maxWidth: '150px',
    maxHeight: '150px',
    fontSize: '14px',
    padding: '16px 20px',
  },
};

interface StickerProps {
  children: React.ReactNode;
  shape?: BadgeShape;
  accentIndex?: number;
  rotation?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  subtext?: string;
  onClick?: () => void;
  drift?: boolean;
  style?: React.CSSProperties;
}

export const Sticker: React.FC<StickerProps> = ({
  children,
  shape = 'rotated-rect',
  accentIndex = 0,
  rotation,
  className = '',
  size = 'md',
  subtext,
  onClick,
  drift = true,
}) => {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLSpanElement>(null);
  const accent = accentColors[accentIndex % accentColors.length];
  const baseRotation = rotation ?? getRandomRotation(accentIndex);

  useEffect(() => {
    if (!drift || !ref.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = ref.current!.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / 30;
      const deltaY = (e.clientY - centerY) / 30;
      setParallax({ x: deltaX, y: deltaY });
    };

    const handleMouseLeave = () => {
      setParallax({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [drift]);

  const icon = iconMap[children as string] || null;

  const hoverRotation = baseRotation + (baseRotation >= 0 ? 3 : -3);
  const hoverScale = 1.05;

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        border: '2px solid #141310',
        color: accent.textColor,
        backgroundColor: accent.value,
        fontFamily: '"Clash Display", "Anton", "Bebas Neue", Impact, sans-serif',
        fontWeight: 700,
        lineHeight: 1.05,
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: '0.02em',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        willChange: 'transform, box-shadow',
        ...shapeStyles[shape],
        ...sizeStyles[size],
      }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick?.();
      }}
      animate={{ x: parallax.x, y: parallax.y, rotate: baseRotation }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      whileHover={{
        scale: hoverScale,
        rotate: hoverRotation,
        boxShadow: '8px 8px 0 rgba(20, 19, 16, 0.9)',
        transition: { duration: 0.2, ease: [0.34, 1.56, 0.64, 1] as const },
      }}
      whileTap={{ scale: 0.98 }}
    >
      {icon && <span style={{ marginBottom: '2px', display: 'block' }}>{icon}</span>}
      <span style={{ whiteSpace: 'nowrap' }}>{children}</span>
      {subtext && (
        <span
          style={{
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            opacity: 0.85,
            fontFamily: '"General Sans", Inter, sans-serif',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          {subtext}
        </span>
      )}
    </motion.span>
  );
};

interface StickerCloudProps {
  stickers: {
    label: string;
    shape?: BadgeShape;
    accentIndex?: number;
    rotation?: number;
    size?: 'sm' | 'md' | 'lg';
    subtext?: string;
    position?: { top?: string; left?: string; right?: string; bottom?: string };
  }[];
  className?: string;
  containerStyle?: React.CSSProperties;
  drift?: boolean;
}

export const StickerCloud: React.FC<StickerCloudProps> = ({
  stickers,
  className = '',
  containerStyle = {},
  drift = true,
}) => {
  return (
    <div
      className={`sticker-cloud ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 4,
        pointerEvents: 'none',
        ...containerStyle,
      }}
      aria-hidden="true"
    >
      {stickers.map((sticker, index) => (
        <Sticker
          key={`${sticker.label}-${index}`}
          shape={sticker.shape}
          accentIndex={sticker.accentIndex ?? index}
          rotation={sticker.rotation}
          size={sticker.size}
          subtext={sticker.subtext}
          drift={drift}
          style={sticker.position as React.CSSProperties}
        >
          {sticker.label}
        </Sticker>
      ))}
    </div>
  );
};

interface InlineStickerProps {
  children: React.ReactNode;
  accentIndex?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  subtext?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const InlineSticker: React.FC<InlineStickerProps> = ({
  children,
  accentIndex = 0,
  className = '',
  size = 'sm',
  subtext,
  onClick,
  style = {},
}) => {
  const accent = accentColors[accentIndex % accentColors.length];
  const rotate = getRandomRotation(accentIndex);
  const icon = iconMap[children as string] || null;
  const hoverRotate = rotate + (rotate >= 0 ? 3 : -3);

  const sizeConfig = {
    sm: { minWidth: '90px', minHeight: '40px', fontSize: '10px', padding: '6px 10px' },
    md: { minWidth: '120px', minHeight: '48px', fontSize: '11px', padding: '8px 14px' },
    lg: { minWidth: '150px', minHeight: '56px', fontSize: '12px', padding: '10px 18px' },
  }[size];

  return (
    <motion.span
      className={className}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        border: '2px solid #141310',
        color: accent.textColor,
        backgroundColor: accent.value,
        fontFamily: '"Clash Display", "Anton", "Bebas Neue", Impact, sans-serif',
        fontWeight: 700,
        lineHeight: 1.05,
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: '0.02em',
        cursor: onClick ? 'pointer' : 'default',
        borderRadius: '6px',
        transformOrigin: 'center center',
        willChange: 'transform, box-shadow',
        ...sizeConfig,
        ...style,
      }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick?.();
      }}
      animate={{ rotate }}
      whileHover={{
        scale: 1.05,
        rotate: hoverRotate,
        boxShadow: '6px 6px 0 rgba(20, 19, 16, 0.9)',
        transition: { duration: 0.2, ease: [0.34, 1.56, 0.64, 1] as const },
      }}
      whileTap={{ scale: 0.97 }}
    >
      {icon && <span style={{ marginBottom: '2px', display: 'block' }}>{icon}</span>}
      <span style={{ whiteSpace: 'nowrap' }}>{children}</span>
      {subtext && (
        <span
          style={{
            fontSize: '8px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            opacity: 0.85,
            fontFamily: '"General Sans", Inter, sans-serif',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          {subtext}
        </span>
      )}
    </motion.span>
  );
};
