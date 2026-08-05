import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface WorkItem {
  title: string;
  category: 'Painting' | 'Graphic Design' | 'Posters' | 'Logo Design';
  imageUrl: string;
  subImages?: string[]; // for brand collections
  medium?: string;
  year: string;
  description?: string;
}

const DESIGN_WORK: WorkItem[] = [
  // ─── PAINTINGS ─────────────────────────────────────────────────────────────
  {
    title: 'Tribal Warrior',
    category: 'Painting',
    imageUrl: '/art/paintings/tribal-warrior.jpg',
    medium: 'Acrylic on Canvas',
    year: '2025',
    description: 'An evocative portrait of a tribal warrior adorned with traditional ceremonial headgear.'
  },
  {
    title: 'The Professor (Money Heist)',
    category: 'Painting',
    imageUrl: '/art/paintings/money-heist.jpg',
    medium: 'Acrylic on Canvas',
    year: '2025',
    description: 'Pop-culture inspired painting capturing the dual persona of the Professor and the iconic Dali mask.'
  },
  {
    title: 'Pirates & Rum',
    category: 'Painting',
    imageUrl: '/art/paintings/pirate-skull.jpg',
    medium: 'Acrylic on Canvas',
    year: '2024',
    description: 'A detailed still-life composition of a pirate skull, exotic plumage, and rum bottle.'
  },
  {
    title: 'Kali Maa',
    category: 'Painting',
    imageUrl: '/art/paintings/kali-maa.jpg',
    medium: 'Acrylic on Canvas',
    year: '2025',
    description: 'Powerful depiction of the Hindu Goddess Kali, representing raw energy, time, and change.'
  },
  {
    title: 'Radha Krishna',
    category: 'Painting',
    imageUrl: '/art/paintings/radha-krishna.jpg',
    medium: 'Acrylic on Canvas',
    year: '2025',
    description: 'A serene rendering of Radha and Krishna sharing a quiet, divine moment with a flute.'
  },
  {
    title: 'Violet Trio',
    category: 'Painting',
    imageUrl: '/art/paintings/violet-trio.jpg',
    medium: 'Poster Color on Paper',
    year: '2024',
    description: 'Three surreal faces in monochromatic purple shades expressing tranquility and slumber.'
  },
  {
    title: 'Traditional Warrior',
    category: 'Painting',
    imageUrl: '/art/paintings/warrior-portrait.jpg',
    medium: 'Acrylic on Canvas',
    year: '2025',
    description: 'A rugged portrait showcasing a fierce traditional warrior clutching his weapon.'
  },

  // ─── GRAPHIC DESIGN ────────────────────────────────────────────────────────
  {
    title: 'Goddess Durga',
    category: 'Graphic Design',
    imageUrl: '/art/graphics/goddess-durga-digital.jpg',
    medium: 'Digital Vector Illustration',
    year: '2025',
    description: 'Stylized digital illustration of Goddess Durga surrounded by skulls and bright red hibiscus flowers.'
  },
  {
    title: 'Luna Goddess',
    category: 'Graphic Design',
    imageUrl: '/art/graphics/moon-goddess.jpg',
    medium: 'Digital Vector Art',
    year: '2025',
    description: 'Modern vector portrait of a female goddess with a glowing crescent moon and halo details.'
  },
  {
    title: 'Royal Rajput Couple',
    category: 'Graphic Design',
    imageUrl: '/art/graphics/rajput-couple.jpg',
    medium: 'Digital Painting',
    year: '2025',
    description: 'Ornate illustration of a traditional Rajput couple adorned in rich golden bridal wear.'
  },
  {
    title: 'Rajasthani Musician',
    category: 'Graphic Design',
    imageUrl: '/art/graphics/rajasthani-musician.jpg',
    medium: 'Vector Art',
    year: '2024',
    description: 'Vibrant cultural illustration of a Rajasthani folk musician in a red turban holding his instrument.'
  },
  {
    title: 'Entwined Connection',
    category: 'Graphic Design',
    imageUrl: '/art/graphics/entwined-hands.jpg',
    medium: 'Conceptual Digital Illustration',
    year: '2025',
    description: 'Surreal vector illustration of two hands meeting, one woven with golden lightning, the other with green vines.'
  },

  // ─── POSTERS ───────────────────────────────────────────────────────────────
  {
    title: 'Doctor Strange Portal',
    category: 'Posters',
    imageUrl: '/art/graphics/doctor-strange.jpg',
    medium: 'Digital Comic Poster',
    year: '2025',
    description: 'Dynamic character art of Doctor Strange summoning mystical portals in the form of butterflies.'
  },
  {
    title: 'Gangubai Kathiawadi',
    category: 'Posters',
    imageUrl: '/art/graphics/gangubai.jpg',
    medium: 'Movie Tribute Poster',
    year: '2025',
    description: 'Digital tribute portrait of the iconic cinematic character in white saree with traditional nose-ring.'
  },
  {
    title: 'The Melody Remains',
    category: 'Posters',
    imageUrl: '/art/graphics/piano-ghost.jpg',
    medium: 'Storytelling Poster Art',
    year: '2024',
    description: 'Poetic digital painting featuring a man playing the piano back-to-back with a glowing blue violin ghost.'
  },
  {
    title: 'The Archer Karna',
    category: 'Posters',
    imageUrl: '/art/graphics/karna-archer.jpg',
    medium: 'Character Art Poster',
    year: '2025',
    description: 'Epic digital illustration of the mythological warrior Karna aiming his bow against a golden sun backdrop.'
  },

  // ─── LOGO DESIGNS ──────────────────────────────────────────────────────────
  {
    title: 'Nutriworld Brand Identity',
    category: 'Logo Design',
    imageUrl: '/art/logos/nutriworld-leaf.jpg',
    medium: 'Brand Guideline & Logo Set',
    year: '2026',
    description: 'Comprehensive brand identity for an organic food provider. Click to view all 10 logo variations.',
    subImages: [
      '/art/logos/nutriworld-leaf.jpg',
      '/art/logos/nutriworld-playful.jpg',
      '/art/logos/nutriworld-splash.jpg',
      '/art/logos/nutriworld-elegant.jpg',
      '/art/logos/nutriworld-organic.jpg',
      '/art/logos/nutriworld-vintage.jpg',
      '/art/logos/nutriworld-retro.jpg',
      '/art/logos/nutriworld-arch.jpg',
      '/art/logos/nutriworld-cafe.jpg',
      '/art/logos/nutriworld-capsule.jpg'
    ]
  },
  {
    title: 'Snack Farm Identity',
    category: 'Logo Design',
    imageUrl: '/art/logos/snackfarm-neon.jpg',
    medium: 'Brand Illustration & Logo Set',
    year: '2026',
    description: 'Vibrant and playful logo variations for a snack delivery service. Click to view all 10 variations.',
    subImages: [
      '/art/logos/snackfarm-neon.jpg',
      '/art/logos/snackfarm-banner.jpg',
      '/art/logos/snackfarm-cookie.jpg',
      '/art/logos/snackfarm-chef.jpg',
      '/art/logos/snackfarm-script.jpg',
      '/art/logos/snackfarm-truck.jpg',
      '/art/logos/snackfarm-donut.jpg',
      '/art/logos/snackfarm-jars.jpg',
      '/art/logos/snackfarm-cake.jpg',
      '/art/logos/snackfarm-utensils.jpg'
    ]
  },
  {
    title: 'Oye Makhana Design',
    category: 'Logo Design',
    imageUrl: '/art/logos/oyemakhana-bowl.jpg',
    medium: 'Packaging & Brand Logo Set',
    year: '2026',
    description: 'Modern organic packaging concepts and earthy logo variations. Click to view all 10 variations.',
    subImages: [
      '/art/logos/oyemakhana-bowl.jpg',
      '/art/logos/oyemakhana-stamp.jpg',
      '/art/logos/oyemakhana-retro.jpg',
      '/art/logos/oyemakhana-utensil.jpg',
      '/art/logos/oyemakhana-jar.jpg',
      '/art/logos/oyemakhana-playful.jpg',
      '/art/logos/oyemakhana-vintage.jpg',
      '/art/logos/oyemakhana-crunch.jpg',
      '/art/logos/oyemakhana-circle.jpg',
      '/art/logos/oyemakhana-healthy.jpg'
    ]
  }
];

export const DesignWorkPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'All' | 'Paintings' | 'Graphic Design' | 'Posters' | 'Logos'>('All');
  const [selectedItem, setSelectedItem] = useState<WorkItem | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Filter items based on active tab
  const filteredWork = DESIGN_WORK.filter((item) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Paintings') return item.category === 'Painting';
    if (activeTab === 'Graphic Design') return item.category === 'Graphic Design';
    if (activeTab === 'Posters') return item.category === 'Posters';
    if (activeTab === 'Logos') return item.category === 'Logo Design';
    return true;
  });

  const openLightbox = (item: WorkItem) => {
    setSelectedItem(item);
    setActiveSlideIndex(0);
  };

  const closeLightbox = () => {
    setSelectedItem(null);
  };

  const getSlides = (): string[] => {
    if (!selectedItem) return [];
    return selectedItem.subImages || [selectedItem.imageUrl];
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    const slides = getSlides();
    setActiveSlideIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    const slides = getSlides();
    setActiveSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <main style={{ padding: '150px 5%', maxWidth: '1600px', margin: '0 auto', minHeight: '100vh' }}>
      {/* ── Title ── */}
      <motion.h1
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        style={{ fontSize: 'max(4.5em, 7.5vw)', fontWeight: 500, marginBottom: '60px', lineHeight: 1 }}
      >
        Design Work
      </motion.h1>

      {/* ── Tabs/Filters ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{
          display: 'flex',
          gap: '24px',
          flexWrap: 'wrap',
          marginBottom: '80px',
          borderBottom: '1px solid hsl(var(--border))',
          paddingBottom: '20px',
        }}
      >
        {(['All', 'Posters', 'Graphic Design', 'Paintings', 'Logos'] as const).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'none',
                border: 'none',
                color: isActive ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))',
                fontSize: '16px',
                fontWeight: isActive ? 500 : 400,
                cursor: 'pointer',
                padding: '8px 12px',
                position: 'relative',
                transition: 'color 0.3s ease',
              }}
            >
              {tab}
              {isActive && (
                <motion.div
                  layoutId="activeTabUnderline"
                  style={{
                    position: 'absolute',
                    bottom: -21,
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: 'hsl(var(--foreground))',
                  }}
                />
              )}
            </button>
          );
        })}
      </motion.div>

      {/* ── Grid ── */}
      <motion.div
        layout
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))',
          gap: '50px',
        }}
      >
        <AnimatePresence mode="popLayout">
          {filteredWork.map((item, index) => {
            const isHovered = hoveredIndex === index;
            const hasMultiple = item.subImages && item.subImages.length > 1;

            return (
              <motion.div
                layout
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => openLightbox(item)}
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}
              >
                {/* Image Wrap */}
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '4/3',
                    overflow: 'hidden',
                    backgroundColor: 'hsl(var(--muted))',
                    borderRadius: '12px',
                    position: 'relative',
                  }}
                >
                  <motion.img
                    src={item.imageUrl}
                    alt={item.title}
                    animate={{ scale: isHovered ? 1.04 : 1 }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />

                  {/* Dark overlay with hover view pill */}
                  <motion.div
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        padding: '12px 24px',
                        backgroundColor: 'hsl(var(--background))',
                        color: 'hsl(var(--foreground))',
                        borderRadius: '999px',
                        fontSize: '14px',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                      }}
                    >
                      <ZoomIn size={16} />
                      {hasMultiple ? `View Set (${item.subImages?.length})` : 'Quick View'}
                    </div>
                  </motion.div>

                  {/* Multiple Images Indicator Badge */}
                  {hasMultiple && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        padding: '6px 14px',
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        backdropFilter: 'blur(8px)',
                        color: '#fff',
                        borderRadius: '999px',
                        fontSize: '12px',
                        fontWeight: 500,
                      }}
                    >
                      Collection
                    </div>
                  )}
                </div>

                {/* Meta info */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '22px', fontWeight: 500, margin: '0 0 4px 0' }}>{item.title}</h3>
                    <p style={{ margin: 0, color: 'hsl(var(--muted-foreground))', fontSize: '14px' }}>
                      {item.medium || item.category}
                    </p>
                  </div>
                  <div style={{ fontSize: '14px', color: 'hsl(var(--muted-foreground))', fontWeight: 500 }}>
                    {item.year}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* ── Lightbox Modal ── */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              backgroundColor: 'rgba(0,0,0,0.92)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '40px 5%',
            }}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              style={{
                position: 'absolute',
                top: '30px',
                right: '40px',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '50%',
                padding: '12px',
                cursor: 'pointer',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)')}
            >
              <X size={24} />
            </button>

            {/* Main Lightbox Content Area */}
            <div
              style={{
                width: '100%',
                maxWidth: '1200px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                alignItems: 'center',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image container with navigation arrows */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '60vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Left Arrow */}
                {getSlides().length > 1 && (
                  <button
                    onClick={handlePrevSlide}
                    style={{
                      position: 'absolute',
                      left: '-20px',
                      background: 'rgba(255,255,255,0.1)',
                      border: 'none',
                      borderRadius: '50%',
                      padding: '16px',
                      cursor: 'pointer',
                      color: '#fff',
                      zIndex: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ChevronLeft size={24} />
                  </button>
                )}

                {/* Current Slide Image */}
                <motion.img
                  key={activeSlideIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  src={getSlides()[activeSlideIndex]}
                  alt={selectedItem.title}
                  style={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    borderRadius: '8px',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                  }}
                />

                {/* Right Arrow */}
                {getSlides().length > 1 && (
                  <button
                    onClick={handleNextSlide}
                    style={{
                      position: 'absolute',
                      right: '-20px',
                      background: 'rgba(255,255,255,0.1)',
                      border: 'none',
                      borderRadius: '50%',
                      padding: '16px',
                      cursor: 'pointer',
                      color: '#fff',
                      zIndex: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ChevronRight size={24} />
                  </button>
                )}
              </div>

              {/* Slider Dots */}
              {getSlides().length > 1 && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  {getSlides().map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlideIndex(idx)}
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: idx === activeSlideIndex ? '#fff' : 'rgba(255,255,255,0.3)',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'background-color 0.2s',
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Description */}
              <div style={{ color: '#fff', textAlign: 'center', maxWidth: '800px', padding: '0 20px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: 500, margin: '0 0 10px 0' }}>
                  {selectedItem.title}
                  {getSlides().length > 1 && ` (${activeSlideIndex + 1}/${getSlides().length})`}
                </h2>
                <p style={{ color: '#aaa', fontSize: '15px', margin: '0 0 16px 0' }}>
                  {selectedItem.medium} • {selectedItem.year}
                </p>
                {selectedItem.description && (
                  <p style={{ color: '#eee', fontSize: '16px', lineHeight: 1.6, margin: 0 }}>
                    {selectedItem.description}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};
