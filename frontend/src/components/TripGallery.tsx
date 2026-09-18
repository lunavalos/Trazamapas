'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Images, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getImageUrl } from '@/lib/payload';

interface TripGalleryProps {
  images: any[];
  tripTitle: string;
}

// Staggered Pinterest-style aspect ratios for natural masonry rhythm
const MASONRY_ASPECT_RATIOS = [
  'aspect-[3/4]',    // Portrait alto
  'aspect-[4/3]',    // Paisaje
  'aspect-[4/5]',    // Portrait medio
  'aspect-square',   // Cuadrado
  'aspect-[2/3]',    // Portrait estilizado
  'aspect-[16/10]',  // Paisaje amplio
  'aspect-[3/4]',    // Portrait alto
  'aspect-[4/5]',    // Portrait medio
  'aspect-square',   // Cuadrado
];

export default function TripGallery({ images, tripTitle }: TripGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const validImages = Array.isArray(images)
    ? images.filter((img) => {
        if (!img) return false;
        if (typeof img === 'string') return img.trim().length > 0;
        return Boolean(img.id || img.url || img.filename);
      })
    : [];

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === null || prev === 0 ? validImages.length - 1 : prev - 1));
  }, [lightboxIndex, validImages.length]);

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === null || prev === validImages.length - 1 ? 0 : prev + 1));
  }, [lightboxIndex, validImages.length]);

  const handleClose = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handleClose, handlePrev, handleNext]);

  // If no images exist, do not render anything (zero extra margin/padding)
  if (validImages.length === 0) {
    return null;
  }

  return (
    <>
      <section className="pt-8 sm:pt-10 pb-0 px-5 sm:px-8 relative bg-[#f7f5f8]">
        <div className="max-w-[1280px] mx-auto">
          <div className="bg-white border border-[#2c0054]/10 rounded-[28px] p-6 sm:p-10 lg:p-12 shadow-sm">
            
            {/* Gallery Header */}
            <div className="flex items-center justify-between gap-4 mb-8">
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#2C0054] uppercase tracking-tight">
                Galería del Viaje
              </h3>
              <span className="text-xs sm:text-sm font-medium text-smoke hidden sm:inline">
                {validImages.length} {validImages.length === 1 ? 'fotografía' : 'fotografías'}
              </span>
            </div>

            {/* Pinterest-style Masonry Columns Layout */}
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-3 xl:columns-4 gap-4 sm:gap-5 [column-fill:_balance]">
              {validImages.map((imgItem, idx) => {
                const itemUrl = getImageUrl(imgItem);
                const altText = (typeof imgItem === 'object' && imgItem?.alt) || `${tripTitle} - Foto ${idx + 1}`;
                const aspectClass = MASONRY_ASPECT_RATIOS[idx % MASONRY_ASPECT_RATIOS.length];

                return (
                  <div
                    key={idx}
                    onClick={() => setLightboxIndex(idx)}
                    className={`break-inside-avoid mb-4 sm:mb-5 relative ${aspectClass} rounded-[22px] overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-500 bg-[#2C0054]/5 cursor-pointer group border border-[#2c0054]/10`}
                  >
                    <Image
                      src={itemUrl}
                      alt={altText}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* Pinterest Hover Gradient & Action Icon */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2C0054]/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-5">
                      <div className="flex justify-end">
                        <span className="w-10 h-10 rounded-full bg-white/90 text-[#2C0054] backdrop-blur-md flex items-center justify-center shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <ZoomIn size={18} className="stroke-[2.5]" />
                        </span>
                      </div>
                      
                      <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white text-xs sm:text-sm font-medium drop-shadow-md line-clamp-2">
                          {altText}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Full-Screen Lightbox Modal */}
      {lightboxIndex !== null && validImages[lightboxIndex] && (
        <div 
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 select-none animate-fadeIn"
          onClick={handleClose}
        >
          {/* Top Bar Controls */}
          <div className="absolute top-4 left-5 right-5 sm:top-6 sm:left-8 sm:right-8 flex items-center justify-between text-white z-50">
            <div className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-white/15">
              <span>{lightboxIndex + 1}</span>
              <span className="mx-1 text-white/50">/</span>
              <span>{validImages.length}</span>
            </div>

            <button
              onClick={handleClose}
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/15 drop-shadow-md"
              aria-label="Cerrar vista previa"
            >
              <X size={22} />
            </button>
          </div>

          {/* Prev Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-[#F4B92A] hover:text-[#2C0054] text-white flex items-center justify-center transition-all cursor-pointer border border-white/15 z-50 drop-shadow-lg"
            aria-label="Foto anterior"
          >
            <ChevronLeft size={28} className="stroke-[2.5]" />
          </button>

          {/* Next Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-[#F4B92A] hover:text-[#2C0054] text-white flex items-center justify-center transition-all cursor-pointer border border-white/15 z-50 drop-shadow-lg"
            aria-label="Siguiente foto"
          >
            <ChevronRight size={28} className="stroke-[2.5]" />
          </button>

          {/* Active Image Container */}
          <div 
            className="relative max-w-5xl max-h-[82vh] w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-h-[78vh] flex items-center justify-center">
              <Image
                src={getImageUrl(validImages[lightboxIndex])}
                alt={(typeof validImages[lightboxIndex] === 'object' && validImages[lightboxIndex]?.alt) || tripTitle}
                fill
                unoptimized
                className="object-contain rounded-xl drop-shadow-2xl"
              />
            </div>

            {/* Caption */}
            <p className="mt-3 text-white/80 text-center text-xs sm:text-sm font-light max-w-xl truncate px-4">
              {(typeof validImages[lightboxIndex] === 'object' && validImages[lightboxIndex]?.alt) || `${tripTitle} - Foto ${lightboxIndex + 1}`}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
