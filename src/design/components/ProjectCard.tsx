import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  title: string;
  category: string;
  imageUrl: string;
  slug: string;
  hideMeta?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, category, imageUrl, slug, hideMeta }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLAnchorElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (containerRef.current) {
      const { left, top } = containerRef.current.getBoundingClientRect();
      setCursorPos({ x: e.clientX - left, y: e.clientY - top });
    }
  };

  return (
    <Link
      ref={containerRef}
      data-project-card
      to={`/design/work/${slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        display: 'block',
        position: 'relative',
        width: '100%',
        textDecoration: 'none',
        color: 'inherit',
        cursor: 'none', // Hide default cursor when hovering
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          width: '100%',
          aspectRatio: '16/9',
          overflow: 'hidden',
          backgroundColor: 'hsl(var(--muted))',
        }}
      >
        <motion.div style={{ width: '100%', height: '130%', y }}>
          <motion.img
            src={imageUrl}
            alt={title}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </motion.div>
      </div>

      {/* Meta info */}
      {!hideMeta && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 0',
            borderBottom: '1px solid hsl(var(--border))',
          }}
        >
          <h3 style={{ fontSize: '24px', fontWeight: 500, margin: 0 }}>{title}</h3>
          <p style={{ margin: 0, color: 'hsl(var(--secondary-foreground))' }}>{category}</p>
        </div>
      )}

      {/* Custom Cursor Blob */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ scale: 0, x: cursorPos.x, y: cursorPos.y, opacity: 0 }}
            animate={{ scale: 1, x: cursorPos.x, y: cursorPos.y, opacity: 1 }}
            exit={{ scale: 0, x: cursorPos.x, y: cursorPos.y, opacity: 0 }}
            transition={{
              scale: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
              opacity: { duration: 0.2 },
              x: { type: 'spring', damping: 25, stiffness: 200, mass: 0.5 },
              y: { type: 'spring', damping: 25, stiffness: 200, mass: 0.5 },
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '80px',
              height: '80px',
              backgroundColor: 'hsl(var(--primary))',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'hsl(var(--background))',
              fontSize: '14px',
              fontWeight: 500,
              pointerEvents: 'none',
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
            }}
          >
            View
          </motion.div>
        )}
      </AnimatePresence>
    </Link>
  );
};
