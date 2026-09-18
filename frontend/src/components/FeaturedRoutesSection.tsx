'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";
import { Clock, MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { PayloadTrip, getImageUrl } from '@/lib/payload';

export default function FeaturedRoutesSection({ trips }: { trips: PayloadTrip[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollLeft = () => { if (scrollRef.current) scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' }); };
  const scrollRight = () => { if (scrollRef.current) scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' }); };
  if (!trips || trips.length === 0) return null;

  return (
    <section className="py-[80px] px-5 sm:px-6 relative bg-[#f7f5f8]">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-[35px] font-heading font-bold text-[#2C0054] uppercase tracking-tight">
              Rutas & Destinos Inolvidables
            </h2>
            <p className="text-smoke text-[15px] font-sans font-light max-w-xl mt-2.5 leading-relaxed">
              Explora los itinerarios más solicitados por nuestros viajeros. Cada ruta cuenta con asesoría personalizada y diseño a tu medida.
            </p>
          </div>

                    <div className="flex justify-end items-center gap-4 shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
            <Link
              href="/viajes"
              className="hidden sm:inline-flex items-center gap-2 text-[#2C0054] font-bold text-sm hover:underline group mr-4"
            >
              <span>Ver todos los viajes</span>
              <ArrowRight size={18} className="text-[#F4B92A] group-hover/btn:translate-x-1 transition-transform" />
            </Link>
            
            <div className="flex items-center gap-2.5">
              <button 
                onClick={scrollLeft}
                className="w-10 h-10 rounded-full border border-[#2c0054]/15 flex items-center justify-center text-[#2C0054] hover:bg-[#f7f5f8] transition-colors bg-white cursor-pointer"
                aria-label="Anterior"
              >
                <ChevronLeft size={18} strokeWidth={2} />
              </button>
              <button 
                onClick={scrollRight}
                className="w-10 h-10 rounded-full border border-[#2c0054]/15 flex items-center justify-center text-[#2C0054] hover:bg-[#f7f5f8] transition-colors bg-white cursor-pointer"
                aria-label="Siguiente"
              >
                <ChevronRight size={18} strokeWidth={2} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Responsive Container: Horizontal Carousel on Mobile/Tablet (< lg), 4-Card Grid on Desktop (>= lg) */}
        <div 
          ref={scrollRef} className="flex overflow-x-auto gap-5 snap-x snap-mandatory scrollbar-none [&::-webkit-scrollbar]:hidden py-2 px-1 overflow-y-hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {trips.map((trip, index) => (
            <motion.div
              key={trip.id || index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.9, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="shrink-0 w-[285px] sm:w-[330px] snap-start flex"
            >
              <div className="bg-white border border-[#2c0054]/15 rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between w-full group">
                
                {/* Image Header with Badge Overlay */}
                <Link href={`/viajes/${trip.slug}`} className="relative h-[210px] w-full overflow-hidden shrink-0 block cursor-pointer">
                  <Image 
                    src={getImageUrl(trip.featuredImage)} 
                    alt={trip.title} 
                    fill 
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  
                  {/* Top Right Location Pill */}
                  <div className="absolute top-3.5 right-3.5 z-10 max-w-[calc(100%-28px)]">
                    <span className="px-3 py-1.5 rounded-full text-[11px] font-bold bg-[#2C0054] text-white inline-flex items-center gap-1.5 shadow-md max-w-full">
                      <MapPin size={12} className="text-[#F4B92A] shrink-0" />
                      <span className="truncate">{trip.location}</span>
                    </span>
                  </div>
                </Link>

                {/* Card Body Content */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                  
                  <div>
                    {/* Title */}
                    <h3 className="text-[19px] sm:text-[20px] font-heading font-bold text-[#2C0054] leading-snug mb-3.5 line-clamp-2 group-hover:text-[#F4B92A] transition-colors">
                      <Link href={`/viajes/${trip.slug}`} className="hover:text-[#F4B92A] transition-colors">
                        {trip.title}
                      </Link>
                    </h3>

                    {/* Description Paragraph (15px) */}
                    <p className="text-[#333] text-[15px] font-sans font-light leading-relaxed mb-6 line-clamp-3">
                      {trip.shortDesc}
                    </p>
                  </div>

                  {/* Card Bottom CTA Button without top border line */}
                  <div className="pt-1">
                    <Link
                      href={`/viajes/${trip.slug}`}
                      className="w-full py-3.5 px-4 bg-[#f3eff7] border border-[#2c0054]/15 rounded-[14px] text-[#2C0054] font-bold text-sm hover:bg-[#2C0054] hover:text-[#F4B92A] transition-all flex items-center justify-center gap-2.5 group/btn shadow-xs"
                    >
                      <span>Ver Detalles</span>
                      <ArrowRight size={18} className="text-[#F4B92A] group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/viajes"
            className="inline-flex items-center gap-2 text-[#2C0054] font-bold text-sm hover:underline"
          >
            <span>Ver todos los viajes</span>
            <ArrowRight size={16} className="text-[#F4B92A]" />
          </Link>
        </div>

      </div>
    </section>
  );
}