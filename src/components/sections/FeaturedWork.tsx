import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../../data/projects';

export const FeaturedWork: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 160, damping: 22, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 160, damping: 22, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent) => {
    rawX.set(e.clientX);
    rawY.set(e.clientY);
  };

  const hoveredProject = projects.find((p) => p.id === hoveredId);

  return (
    <motion.section
      id="featured-work"
      ref={containerRef}
      className="featured-work-section home-band home-band--paper snellenberg-section"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
      onMouseMove={handleMouseMove}
    >
      {/* Section Header */}
      <motion.div
        className="snellenberg-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <span className="section-kicker section-kicker--dark section-indexed" data-index="01">
          Selected Work
        </span>
        <h2 className="editorial-heading editorial-heading--dark">
          Here's what that looks like in practice.
        </h2>
      </motion.div>

      {/* Projects List */}
      <div
        className={`snellenberg-list ${isHovering ? 'snellenberg-list--active' : ''}`}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.5,
              delay: index * 0.06,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
          >
            <Link
              to={`/dev/work/${project.slug}`}
              className={`snellenberg-row ${hoveredId === project.id ? 'snellenberg-row--hovered' : ''} ${isHovering && hoveredId !== project.id ? 'snellenberg-row--dimmed' : ''}`}
              onMouseEnter={() => {
                setHoveredId(project.id);
                setIsHovering(true);
              }}
              onMouseLeave={() => {
                setHoveredId(null);
                setIsHovering(false);
              }}
            >
              {/* Left: Number + Title */}
              <div className="snellenberg-row__left">
                <span className="snellenberg-row__num">{project.pNo}</span>
                <h3 className="snellenberg-row__title">{project.title}</h3>
              </div>

              {/* Right: Category + Year + Arrow */}
              <div className="snellenberg-row__right">
                <span className="snellenberg-row__category">{project.category}</span>
                <span className="snellenberg-row__year">{project.year}</span>
                <span className="snellenberg-row__arrow">
                  <ArrowUpRight size={20} strokeWidth={2} />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Floating Image (follows cursor) */}
      <AnimatePresence>
        {isHovering && hoveredProject && (
          <motion.div
            className="snellenberg-float"
            style={{ x, y }}
            initial={{ opacity: 0, scale: 0.82, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 2 }}
            exit={{ opacity: 0, scale: 0.82, rotate: -4 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={hoveredProject.image}
              alt={hoveredProject.title}
            />
            <div
              className="snellenberg-float__label"
              style={{ background: hoveredProject.accent }}
            >
              {hoveredProject.category}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};
