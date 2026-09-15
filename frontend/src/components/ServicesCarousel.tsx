'use client';

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { PayloadTripCategory, getImageUrl } from '@/lib/payload';

export default function ServicesCarousel({ categories }: { categories: PayloadTripCategory[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  if (!categories || categories.length === 0) return null;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-[35px] font-heading font-bold text-[#2C0054] uppercase tracking-tight mb-3">
            Descubre Tu Próxima Aventura
          </h2>
          <p className="text-smoke text-[15px] font-sans font-light leading-relaxed">
            Explora nuestras opciones de viaje y cotiza directamente con nuestros asesores certificados.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2.5 shrink-0"
        >
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
        </motion.div>
      </div>

      {/* Carousel Container */}
      <div className="relative -mx-5 sm:mx-0 px-5 sm:px-0">
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-8 overflow-y-hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="min-w-[85vw] sm:min-w-[320px] max-w-[320px] snap-start shrink-0 group"
            >
              <Link href={`/viajes?categoria=${cat.value}`} className="block relative h-[450px] rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer border border-[#2c0054]/10 bg-black">
                {/* Background Image */}
                <Image
                  src={getImageUrl(cat.image) || '/images/04_guardians_ofthe_galaxy_california_adventure.webp'}
                  alt={cat.title}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />
                
                {/* Content Container */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  {/* Title */}
                  <h3 className="text-xl font-heading font-bold text-white uppercase mb-3 leading-snug">
                    {cat.title}
                  </h3>
                  
                  {/* Separator and Bottom Action (Matches original design exactly) */}
                  <div className="pt-5 border-t border-white/20 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-white/80 tracking-widest uppercase">
                      Ver Detalles
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#F4B92A] text-[#2C0054] flex items-center justify-center shadow-md shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}