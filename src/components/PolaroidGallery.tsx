import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, Download, ChevronLeft, ChevronRight } from 'lucide-react';

const FRAME_STYLES = [
  'classic',
  'film',
  'stamp',
  'taped',
  'tv',
  'notebook',
  'brutalist',
  'scallop',
  'macos',
  'cyberpunk',
] as const;

type FrameStyle = (typeof FRAME_STYLES)[number];

interface PolaroidPhoto {
  id: string;
  url: string;
  caption: string;
  rotation: number;
  style: FrameStyle;
}

export default function PolaroidGallery() {
  const [photos, setPhotos] = useState<PolaroidPhoto[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nextStyleIndex = useRef(0);
  const [editingCaptionId, setEditingCaptionId] = useState<string | null>(null);
  const [viewingIndex, setViewingIndex] = useState<number | null>(null);

  const viewingPhoto = viewingIndex !== null && photos[viewingIndex] ? photos[viewingIndex] : null;

  const stepViewing = useCallback(
    (delta: number) => {
      setViewingIndex((i) => {
        if (i === null || photos.length === 0) return i;
        return (i + delta + photos.length) % photos.length;
      });
    },
    [photos.length]
  );

  useEffect(() => {
    if (viewingIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setViewingIndex(null);
      else if (e.key === 'ArrowRight') stepViewing(1);
      else if (e.key === 'ArrowLeft') stepViewing(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [viewingIndex, stepViewing]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      const rotation = Math.random() * 6 - 3;

      const style = FRAME_STYLES[nextStyleIndex.current % FRAME_STYLES.length];
      nextStyleIndex.current += 1;

      setPhotos((prev) => [
        ...prev,
        { id: Date.now().toString(), url, caption: '', rotation, style },
      ]);

      e.target.value = '';
    }
  };

  const removePhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const updateCaption = useCallback((id: string, caption: string) => {
    setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, caption } : p)));
  }, []);

  const downloadPhoto = async (photo: PolaroidPhoto) => {
    try {
      const response = await fetch(photo.url);
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `gallery-${photo.id}${photo.caption ? `-${photo.caption.slice(0, 20)}` : ''}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  const downloadAllPhotos = async () => {
    for (const photo of photos) {
      await downloadPhoto(photo);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  };

  const startEditingCaption = (id: string) => {
    setEditingCaptionId(id);
  };

  const stopEditingCaption = () => {
    setEditingCaptionId(null);
  };

  const handleCaptionKeyDown = (_id: string, e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      stopEditingCaption();
    } else if (e.key === 'Escape') {
      stopEditingCaption();
    }
  };

  return (
    <div className="w-full flex justify-center py-12 px-6 overflow-hidden">
      <div className="w-full max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-10">
          <div>
            <div className="font-mono text-[10px] tracking-widest text-[#F2ECDE]/45 uppercase mb-2">
              // interactive memories
            </div>
            <h2 className="font-bangers text-[clamp(2.5rem,5vw,4rem)] tracking-widest leading-none select-none text-[#F2ECDE]">
              PHOTO GALLERY<span className="text-[#3CBAAE]">.</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {photos.length > 0 && (
              <button
                onClick={downloadAllPhotos}
                className="flex items-center gap-2 bg-[#344E38] text-white border-2 border-[#F2ECDE]/40 px-4 py-2 font-mono text-[11px] font-bold tracking-widest uppercase transition-all shadow-[4px_4px_0_rgba(242,236,222,0.35)] hover:bg-[#141310] hover:text-[#F2C94C] cursor-pointer"
              >
                <Download size={16} strokeWidth={3} />
                <span className="hidden sm:inline">Download All</span>
              </button>
            )}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 bg-[#F2C94C] text-[#141310] border-2 border-[#141310] px-4 py-2 font-mono text-[11px] font-bold tracking-widest uppercase transition-all shadow-[4px_4px_0_rgba(242,236,222,0.35)] active:translate-y-0.5 active:shadow-[2px_2px_0_rgba(242,236,222,0.3)] hover:bg-[#EF7B3C] hover:text-[#F2ECDE] cursor-pointer z-20"
            >
              <Plus size={16} strokeWidth={3} />
              <span className="hidden sm:inline">Add Frame</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>

        {photos.length === 0 ? (
          <div className="border-[3px] border-dashed border-[#F2ECDE]/30 rounded-xl p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-[#F2ECDE]/10 rounded-full flex items-center justify-center mb-4">
              <Plus size={32} className="text-[#F2ECDE]/50" />
            </div>
            <p className="font-elite text-lg text-[#F2ECDE]/70 mb-2">The gallery is empty</p>
            <p className="font-mono text-xs text-[#F2ECDE]/40">
              Add your images to populate 2D frames.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-10 py-8 px-4">
            <AnimatePresence>
              {photos.map((photo) => (
                <PhotoFrame
                  key={photo.id}
                  photo={photo}
                  onRemove={(e) => removePhoto(photo.id, e)}
                  onUpdateCaption={updateCaption}
                  isEditing={editingCaptionId === photo.id}
                  onStartEdit={startEditingCaption}
                  onStopEdit={stopEditingCaption}
                  onKeyDown={handleCaptionKeyDown}
                  onDownload={downloadPhoto}
                  onOpen={() => setViewingIndex(photos.indexOf(photo))}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <AnimatePresence>
        {viewingPhoto && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#141310]/95 backdrop-blur-md p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewingIndex(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.92, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 16 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={viewingPhoto.url}
                alt={viewingPhoto.caption || 'Viewing photo'}
                className="max-h-[76vh] w-auto mx-auto block border-2 border-[#F2ECDE]/60 shadow-2xl select-none"
              />

              {viewingPhoto.caption && (
                <p className="text-center mt-4 font-elite text-lg text-[#F2ECDE]">
                  {viewingPhoto.caption}
                </p>
              )}
              <p className="text-center mt-2 font-mono text-[10px] tracking-widest text-[#F2ECDE]/40">
                {viewingIndex !== null ? viewingIndex + 1 : ''} / {photos.length} — styled as{' '}
                {viewingPhoto.style}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  stepViewing(-1);
                }}
                aria-label="Previous photo"
                className="absolute left-[-4px] sm:-left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#141310] border-2 border-[#F2ECDE]/50 text-[#F2ECDE] flex items-center justify-center hover:bg-[#3CBAAE] hover:border-[#3CBAAE] hover:text-[#141310] transition-colors cursor-pointer"
              >
                <ChevronLeft size={20} strokeWidth={3} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  stepViewing(1);
                }}
                aria-label="Next photo"
                className="absolute right-[-4px] sm:-right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#141310] border-2 border-[#F2ECDE]/50 text-[#F2ECDE] flex items-center justify-center hover:bg-[#3CBAAE] hover:text-[#141310] transition-colors cursor-pointer"
              >
                <ChevronRight size={20} strokeWidth={3} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  downloadPhoto(viewingPhoto);
                }}
                aria-label="Download photo"
                className="absolute -top-4 right-12 w-10 h-10 rounded-full bg-[#344E38] border-2 border-[#141310] text-white flex items-center justify-center hover:bg-[#141310] hover:text-[#F2C94C] transition-colors cursor-pointer shadow-md"
              >
                <Download size={16} strokeWidth={3} />
              </button>
              <button
                onClick={() => setViewingIndex(null)}
                aria-label="Close viewer"
                className="absolute -top-4 right-0 w-10 h-10 rounded-full bg-[#D63D21] border-2 border-[#F2ECDE] text-white flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-md"
              >
                <X size={16} strokeWidth={3} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Subcomponents for rendering different frames
const PhotoFrame = ({
  photo,
  onRemove,
  onUpdateCaption,
  isEditing,
  onStartEdit,
  onStopEdit,
  onKeyDown,
  onDownload,
  onOpen,
}: {
  photo: PolaroidPhoto;
  onRemove: (e: any) => void;
  onUpdateCaption: (id: string, s: string) => void;
  isEditing: boolean;
  onStartEdit: (id: string) => void;
  onStopEdit: () => void;
  onKeyDown: (id: string, e: React.KeyboardEvent) => void;
  onDownload: (photo: PolaroidPhoto) => void;
  onOpen: () => void;
}) => {
  const { id, url, caption, style, rotation } = photo;
  const widthClass = 'w-[260px] sm:w-[320px]';
  const repeatSeed = Array.from(id).reduce(
    (total, character) => total + character.charCodeAt(0),
    0
  );
  const cyberpunkRepeatDelay = 2 + (repeatSeed % 40) / 10;

  const CloseButton = () => (
    <button
      onClick={onRemove}
      className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-[#D63D21] text-white border-2 border-[#141310] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 z-50 cursor-pointer shadow-sm hover:shadow-md"
      aria-label="Remove photo"
    >
      <X size={16} strokeWidth={3} />
    </button>
  );

  const DownloadButton = () => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onDownload(photo);
      }}
      className="absolute -top-4 left-4 w-8 h-8 rounded-full bg-[#344E38] text-white border-2 border-[#141310] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 hover:bg-[#141310] hover:text-[#F2C94C] z-50 cursor-pointer shadow-sm hover:shadow-md"
      aria-label="Download photo"
    >
      <Download size={16} strokeWidth={3} />
    </button>
  );

  const CaptionInput = ({ className = 'text-[#141310]' }: { className?: string }) => (
    <input
      type="text"
      value={caption}
      onChange={(e) => onUpdateCaption(id, e.target.value)}
      onKeyDown={(e) => onKeyDown(id, e)}
      onBlur={onStopEdit}
      onClick={(e) => e.stopPropagation()}
      placeholder="Click to add caption..."
      className={`w-full text-center bg-transparent border-b-2 border-transparent hover:border-current focus:border-current focus:outline-none transition-colors py-1 cursor-text z-10 relative ${className}`}
      autoFocus={isEditing}
    />
  );

  const CaptionDisplay = ({ className = 'text-[#141310]' }: { className?: string }) => (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onStartEdit(id);
      }}
      className={`w-full text-center py-1 cursor-pointer transition-colors ${className}`}
    >
      {caption || <span className="text-[#141310]/30 italic">Click to add caption...</span>}
    </div>
  );

  // Common wrapper props
  const motionProps = {
    layoutId: id,
    initial: { opacity: 0, scale: 0.8, y: 50, rotate: rotation - 10 },
    animate: { opacity: 1, scale: 1, y: 0, rotate: rotation },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
    whileHover: { scale: 1.05, rotate: 0, zIndex: 10 },
    onClick: onOpen,
  };

  switch (style) {
    case 'classic':
      return (
        <motion.div
          {...motionProps}
          className={`relative bg-white p-4 pb-0 border-2 border-[#141310] shadow-[8px_8px_0_rgba(242,236,222,0.3)] flex flex-col ${widthClass} interactive-hover transition-shadow hover:shadow-[12px_12px_0_rgba(242,236,222,0.5)] group`}
        >
          <CloseButton />
          <DownloadButton />
          <div className="w-full h-[220px] sm:h-[260px] border-2 border-[#141310] overflow-hidden bg-[#141310]/5">
            <img
              src={url}
              alt="Gallery item"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-[70px] w-full flex items-center justify-center p-2">
            {isEditing ? (
              <CaptionInput className="font-elite text-lg" />
            ) : (
              <CaptionDisplay className="font-elite text-lg" />
            )}
          </div>
        </motion.div>
      );

    case 'film':
      return (
        <motion.div
          {...motionProps}
          className={`relative bg-[#141310] p-6 pb-4 border-4 border-[#F2ECDE]/50 shadow-[8px_8px_0_rgba(242,236,222,0.3)] flex flex-col ${widthClass} group overflow-hidden`}
        >
          <div className="absolute left-1.5 top-0 bottom-0 w-3 flex flex-col justify-around gap-2 py-2 overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="w-2.5 h-3.5 bg-white border border-[#141310] rounded-sm" />
            ))}
          </div>
          <div className="absolute right-1.5 top-0 bottom-0 w-3 flex flex-col justify-around gap-2 py-2 overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="w-2.5 h-3.5 bg-white border border-[#141310] rounded-sm" />
            ))}
          </div>
          <CloseButton />
          <DownloadButton />
          <div className="w-full h-[220px] sm:h-[260px] border-2 border-[#141310] overflow-hidden bg-white mb-3">
            <img
              src={url}
              alt={photo.caption || 'Polaroid style image'}
              loading="lazy"
              className="w-full h-full object-cover grayscale contrast-125"
            />
          </div>
          <div className="w-full px-2">
            {isEditing ? (
              <CaptionInput className="text-white hover:border-white/20 focus:border-white font-mono text-sm" />
            ) : (
              <CaptionDisplay className="text-white font-mono text-sm" />
            )}
          </div>
        </motion.div>
      );

    case 'stamp':
      return (
        <motion.div
          {...motionProps}
          className={`relative bg-[#F2ECDE] p-4 flex flex-col ${widthClass} group border-[4px] border-dashed border-[#141310] shadow-[8px_8px_0_rgba(242,201,76,0.5)]`}
        >
          <CloseButton />
          <DownloadButton />
          <div className="w-full h-[220px] sm:h-[260px] border-2 border-[#141310] overflow-hidden bg-white mb-2 relative">
            <img
              src={url}
              alt={photo.caption || 'Vintage stamp style image'}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <motion.div
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-[#D63D21] mix-blend-color"
            />
          </div>
          {isEditing ? (
            <CaptionInput className="font-bangers text-xl tracking-wide placeholder:text-black/30" />
          ) : (
            <CaptionDisplay className="font-bangers text-xl tracking-wide" />
          )}
        </motion.div>
      );

    case 'taped':
      return (
        <motion.div
          {...motionProps}
          className={`relative bg-[#fff] p-4 pb-0 flex flex-col ${widthClass} group shadow-2xl border border-black/5`}
        >
          <motion.div
            animate={{ rotate: [-2, -3, -2], y: [0, -1, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-8 bg-white/70 backdrop-blur-md border border-black/10 shadow-sm z-20 origin-center"
          />
          <CloseButton />
          <DownloadButton />
          <div className="w-full h-[220px] sm:h-[260px] overflow-hidden bg-gray-100 shadow-inner">
            <img
              src={url}
              alt={photo.caption || 'Retro TV screen style image'}
              loading="lazy"
              className="w-full h-full object-cover brightness-105 saturate-50 sepia-[.2]"
            />
          </div>
          <div className="h-[70px] w-full flex items-center justify-center p-2">
            {isEditing ? (
              <CaptionInput className="font-elite text-lg" />
            ) : (
              <CaptionDisplay className="font-elite text-lg" />
            )}
          </div>
        </motion.div>
      );

    case 'tv':
      return (
        <motion.div
          {...motionProps}
          className={`relative bg-[#8b9196] p-5 pb-4 border-4 border-[#141310] rounded-2xl shadow-[8px_8px_0_rgba(242,236,222,0.3)] flex flex-col ${widthClass} group`}
        >
          <CloseButton />
          <DownloadButton />
          <div className="absolute top-2 right-4 flex gap-1.5 z-10">
            <div className="w-2.5 h-2.5 rounded-full bg-[#D63D21] border border-[#141310] shadow-inner" />
            <motion.div
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2.5 h-2.5 rounded-full bg-[#3CBAAE] border border-[#141310] shadow-inner"
            />
          </div>
          <div className="w-full h-[200px] sm:h-[240px] border-4 border-[#141310] rounded-xl overflow-hidden bg-[#141310] relative mt-2">
            <img
              src={url}
              alt={photo.caption || 'Vintage stamp style image'}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <motion.div
              animate={{ y: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute top-0 left-0 right-0 h-[20px] bg-white/10 blur-sm pointer-events-none"
            />
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] mix-blend-overlay" />
          </div>
          <div className="pt-3">
            {isEditing ? (
              <CaptionInput className="text-[#141310] font-mono font-bold text-sm" />
            ) : (
              <CaptionDisplay className="text-[#141310] font-mono font-bold text-sm" />
            )}
          </div>
        </motion.div>
      );

    case 'notebook':
      return (
        <motion.div
          {...motionProps}
          className={`relative bg-[#fffdf8] p-4 pl-10 border-2 border-[#141310] shadow-[8px_8px_0_rgba(242,236,222,0.3)] flex flex-col ${widthClass} group overflow-hidden`}
        >
          <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-[#D63D21]/50" />
          <div className="absolute left-2 top-0 bottom-0 w-3 flex flex-col justify-evenly">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-3.5 h-3.5 rounded-full border-2 border-[#141310] bg-[#F2ECDE]"
              />
            ))}
          </div>
          <CloseButton />
          <DownloadButton />
          <motion.div
            whileHover={{ rotate: 0 }}
            initial={{ rotate: 1 }}
            className="w-full aspect-square border-2 border-[#141310] overflow-hidden bg-white mb-2 shadow-sm p-1 z-10 transition-transform"
          >
            <img
              src={url}
              alt={photo.caption || 'Retro photo style image'}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="h-[40px] w-full bg-[linear-gradient(transparent_1.4rem,#141310_1.4rem)] bg-[length:100%_1.5rem]">
            {isEditing ? (
              <CaptionInput className="text-[#344E38] font-elite text-xl leading-relaxed -mt-2 placeholder:text-[#344E38]/40" />
            ) : (
              <CaptionDisplay className="text-[#344E38] font-elite text-xl leading-relaxed -mt-2" />
            )}
          </div>
        </motion.div>
      );

    case 'brutalist':
      return (
        <motion.div
          {...motionProps}
          className={`relative bg-[#EC4E7C] p-5 border-4 border-[#141310] shadow-[12px_12px_0_rgba(242,236,222,0.3)] flex flex-col ${widthClass} group`}
        >
          <CloseButton />
          <DownloadButton />
          <motion.div
            animate={{ x: [-1, 2, -1, 0], y: [1, -2, 1, 0] }}
            transition={{ duration: 0.3, repeat: Infinity, repeatType: 'mirror' }}
            className="w-full aspect-square bg-[#F2C94C] border-4 border-[#141310] -translate-x-3 -translate-y-3 p-2 relative shrink-0"
          >
            <img
              src={url}
              alt={photo.caption || 'Retro photo with scalloped border'}
              loading="lazy"
              className="w-full h-full object-cover border-2 border-[#141310] saturate-150 contrast-125"
            />
          </motion.div>
          <div className="bg-white border-4 border-[#141310] px-2 py-1 rotate-2 mt-auto z-10">
            {isEditing ? (
              <CaptionInput className="font-bangers tracking-widest text-2xl text-black placeholder:text-black/30" />
            ) : (
              <CaptionDisplay className="font-bangers tracking-widest text-2xl text-black" />
            )}
          </div>
        </motion.div>
      );

    case 'scallop':
      return (
        <motion.div
          {...motionProps}
          className={`relative bg-[#EDE5D6] p-6 border-4 border-[#141310] rounded-[30px] shadow-[8px_8px_0_rgba(242,201,76,0.5)] flex flex-col ${widthClass} group`}
        >
          <CloseButton />
          <DownloadButton />
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-full aspect-square bg-white border-4 border-[#141310] rounded-full p-2 mb-3"
          >
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#141310]">
              <img
                src={url}
                alt={photo.caption || 'Retro Mac OS style image'}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
          </motion.div>
          <div className="bg-white px-4 py-1 rounded-full border-2 border-[#141310]">
            {isEditing ? (
              <CaptionInput className="text-[#141310] font-bold text-sm" />
            ) : (
              <CaptionDisplay className="text-[#141310] font-bold text-sm" />
            )}
          </div>
        </motion.div>
      );

    case 'macos':
      return (
        <motion.div
          {...motionProps}
          className={`relative bg-white border-2 border-[#141310] shadow-[8px_8px_0_rgba(242,236,222,0.3)] flex flex-col ${widthClass} group overflow-hidden`}
        >
          <div className="bg-[#000] text-white px-3 py-1.5 flex items-center gap-2 border-b-2 border-[#141310] pr-10">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#D63D21] border border-white" />
              <div className="w-3 h-3 rounded-full bg-[#F2C94C] border border-white" />
              <div className="w-3 h-3 rounded-full bg-[#69A65B] border border-white" />
            </div>
            <div className="font-mono text-[10px] w-full text-center pr-6">viewer.exe</div>
          </div>
          <CloseButton />
          <DownloadButton />
          <div className="p-3 bg-[#EDE5D6] flex-1 flex flex-col">
            <div className="bg-white border-2 border-[#141310] p-1 h-[200px] mb-2 shrink-0">
              <img
                src={url}
                alt="Polaroid gallery image"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-white border-2 border-[#141310] px-2 flex items-center flex-1">
              <span className="font-mono text-xs text-[#344E38] mr-2 shrink-0">{'>'}</span>
              {isEditing ? (
                <CaptionInput className="font-mono text-xs hover:border-transparent focus:border-transparent" />
              ) : (
                <CaptionDisplay className="font-mono text-xs" />
              )}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="w-1.5 h-3.5 bg-black inline-block ml-1"
              />
            </div>
          </div>
        </motion.div>
      );

    case 'cyberpunk':
      return (
        <motion.div
          {...motionProps}
          className={`relative bg-[#141310] p-4 pb-3 border-2 border-[#3CBAAE] shadow-[0_0_15px_rgba(60,186,174,0.45)] flex flex-col ${widthClass} group`}
        >
          <CloseButton />
          <DownloadButton />
          <motion.div
            animate={{ opacity: [1, 0.6, 1], scaleY: [1, 1.02, 1], y: [0, 2, -2, 0] }}
            transition={{ duration: 0.15, repeat: Infinity, repeatDelay: cyberpunkRepeatDelay }}
            className="border border-[#3CBAAE] p-1 relative overflow-hidden h-[220px] sm:h-[260px] mb-2"
          >
            <div className="absolute inset-0 bg-[#3CBAAE]/20 mix-blend-color z-10 pointer-events-none" />
            <img
              src={url}
              alt={photo.caption || 'Cyberpunk style image'}
              loading="lazy"
              className="w-full h-full object-cover saturate-200 hue-rotate-[45deg] contrast-150"
            />
          </motion.div>
          <div className="pt-2 flex items-center border-t border-[#3CBAAE]/30">
            <span className="text-[#3CBAAE] font-mono text-xs mr-2">SYS:</span>
            {isEditing ? (
              <CaptionInput className="text-[#3CBAAE] font-mono text-sm placeholder:text-[#3CBAAE]/30 hover:border-[#3CBAAE] focus:border-[#3CBAAE]" />
            ) : (
              <CaptionDisplay className="text-[#3CBAAE] font-mono text-sm" />
            )}
          </div>
        </motion.div>
      );

    default:
      return null;
  }
};
