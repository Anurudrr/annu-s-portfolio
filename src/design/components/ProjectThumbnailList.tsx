import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

interface Project {
  title: string;
  category: string;
  slug: string;
  imageUrl: string;
}

interface ProjectThumbnailListProps {
  projects: Project[];
}

// The floating modal image that appears in the center of the viewport on hover
const Modal: React.FC<{
  project: Project | null;
  isVisible: boolean;
  mousePos: { x: number; y: number };
}> = ({ project, isVisible, mousePos }) => {
  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '380px',
        height: '260px',
        pointerEvents: 'none',
        zIndex: 50,
        x: mousePos.x - 190,
        y: mousePos.y - 130,
      }}
      transition={{
        x: { type: 'spring', damping: 28, stiffness: 180, mass: 0.4 },
        y: { type: 'spring', damping: 28, stiffness: 180, mass: 0.4 },
      }}
    >
      <AnimatePresence>
        {isVisible && project && (
          <motion.div
            key={project.slug}
            initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)', opacity: 0 }}
            animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', opacity: 1 }}
            exit={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            style={{
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <motion.img
              key={project.imageUrl}
              src={project.imageUrl}
              alt={project.title}
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Blue View Circle inside the modal */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80px',
                height: '80px',
                backgroundColor: 'hsl(var(--primary))', // The blue color
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'hsl(var(--background))',
                fontSize: '14px',
                fontWeight: 500,
                zIndex: 2,
              }}
            >
              View
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const ProjectThumbnailList: React.FC<ProjectThumbnailListProps> = ({ projects }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const hoveredProject = hoveredIndex !== null ? projects[hoveredIndex] : null;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{ position: 'relative', width: '100%' }}
    >
      <Modal
        project={hoveredProject}
        isVisible={hoveredIndex !== null}
        mousePos={mousePos}
      />

      <div style={{ borderTop: '1px solid hsl(var(--border))' }}>
        {projects.map((project, i) => {
          const isHovered = hoveredIndex === i;
          const isAnyHovered = hoveredIndex !== null;

          return (
            <Link
              key={project.slug}
              to="/design/work"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '40px 0',
                borderBottom: '1px solid hsl(var(--border))',
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'none',
                position: 'relative',
              }}
            >
              {/* Title */}
              <motion.h3
                animate={{
                  x: isHovered ? -10 : 0,
                  color: isAnyHovered 
                    ? (isHovered ? 'hsl(var(--secondary-foreground))' : 'hsl(var(--foreground))') 
                    : 'hsl(var(--foreground))',
                }}
                transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                style={{
                  position: 'relative',
                  zIndex: 1,
                  fontSize: 'clamp(40px, 5vw, 64px)',
                  fontWeight: 400,
                  margin: 0,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                }}
              >
                {project.title}
              </motion.h3>

              {/* Category */}
              <motion.div
                animate={{
                  x: isHovered ? 10 : 0,
                  color: isAnyHovered 
                    ? (isHovered ? 'hsl(var(--secondary-foreground))' : 'hsl(var(--foreground))') 
                    : 'hsl(var(--foreground))',
                }}
                transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                style={{
                  position: 'relative',
                  zIndex: 1,
                  fontSize: '16px',
                }}
              >
                {project.category}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
