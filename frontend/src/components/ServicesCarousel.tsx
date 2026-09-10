"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ArrowUpRight, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";

interface ServiceCardData {
  id: string;
  title: string;
  description: string;
  actionText: string;
  href: string;
  bgImage: string;
}

const servicesData: ServiceCardData[] = [
  {
    id: "disney-california",
    title: "Disneyland Resort (California)",
    description: "Disfruta del parque original inaugurado por Walt Disney. Incluye entradas a Disneyland Park, California Adventure, hospedaje cercano y estrategia personalizada.",
    actionText: "Explorar Disney",
    href: "/disney",
    bgImage: "/images/02_castilo_aurora_disneyland_park_california.webp",
  },
  {
    id: "disney-world",
    title: "Walt Disney World (Orlando)",
    description: "Vive la magia en los 4 parques principales (Magic Kingdom, EPCOT, Hollywood Studios y Animal Kingdom) y resorts mágicos dentro de la propiedad.",
    actionText: "Explorar Disney World",
    href: "/disney",
    bgImage: "/images/01_disney_en_el_mundo_trazamapas.webp",
  },
  {
    id: "universal-studios",
    title: "Universal Studios & Epic Universe",
    description: "Adéntrate en The Wizarding World of Harry Potter, Super Nintendo World y atracciones de máxima adrenalina para toda la familia.",
    actionText: "Ver Detalles",
    href: "/viajes?detalles=universal-studios",
    bgImage: "/images/05_disney_california_adventure.webp",
  },
  {
    id: "cancun-riviera",
    title: "Cancún & Riviera Maya Todo Incluido",
    description: "Relájate en las mejores playas del Caribe Mexicano con hospedaje, alimentos, bebidas ilimitadas y transportación aeropuerto-hotel.",
    actionText: "Ver Detalles",
    href: "/viajes?detalles=cancun-riviera",
    bgImage: "/images/03_ tianas_bayou_adenture_disneyland_park_california.webp",
  },
  {
    id: "xcaret-nickelodeon",
    title: "Parques Xcaret & Nickelodeon Hotels",
    description: "Aventuras ecoturísticas en ríos subterráneos, cenotes y parques de aventura, o hospedaje con convivencia de personajes Nickelodeon.",
    actionText: "Ver Detalles",
    href: "/viajes?detalles=xcaret-nickelodeon",
    bgImage: "/images/10_meet_baymax.webp",
  },
  {
    id: "los-cabos-vallarta",
    title: "Los Cabos & Puerto Vallarta",
    description: "Disfruta de espectaculares atardeceres en el Arco de Los Cabos o la tradición colonial de Puerto Vallarta en resorts de lujo.",
    actionText: "Ver Detalles",
    href: "/viajes?detalles=los-cabos-vallarta",
    bgImage: "/images/09_san_fransokyo.webp",
  },
];

export default function ServicesCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -314 : 314;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full">
      {/* Controls Bar with Scroll Reveal Animation */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
      >
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-[35px] font-heading font-bold text-brand-primary uppercase tracking-tight">
            Descubre Tu Próxima Aventura
          </h2>
          <p className="text-smoke text-[15px] font-sans font-light max-w-xl mt-2.5 leading-relaxed">
            Explora nuestras opciones de viaje y cotiza directamente con nuestros asesores certificados.
          </p>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll("left")}
            aria-label="Anterior"
            className="w-[48px] h-[48px] shrink-0 rounded-full bg-surface-white border border-mist-border text-brand-primary hover:bg-[#F4B92A] hover:border-[#F4B92A] transition-all flex items-center justify-center shadow-md group cursor-pointer"
          >
            <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll("right")}
            aria-label="Siguiente"
            className="w-[48px] h-[48px] shrink-0 rounded-full bg-surface-white border border-mist-border text-brand-primary hover:bg-[#F4B92A] hover:border-[#F4B92A] transition-all flex items-center justify-center shadow-md group cursor-pointer"
          >
            <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
          </motion.button>
        </div>
      </motion.div>

      {/* Carousel Cards Container with hidden scrollbars across all browsers */}
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden snap-x snap-mandatory py-4 px-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {servicesData.map((service, index) => {
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.9, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="shrink-0 snap-start"
            >
              <Link
                href={service.href}
                className="group relative w-[280px] sm:w-[320px] lg:w-[290px] h-[480px] rounded-[24px] overflow-hidden shadow-xl border border-white/10 hover:border-[#F4B92A] transition-all duration-500 hover:-translate-y-2 flex flex-col justify-end block"
              >
                {/* Background Image */}
                <Image 
                  src={service.bgImage} 
                  alt={service.title} 
                  fill 
                  sizes="(max-width: 768px) 350px, 370px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 z-0" 
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/35 z-0" />

                {/* Bottom Card Content Area */}
                <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-end">
                  {/* Title (Smaller and Uppercase) */}
                  <h3 className="text-base sm:text-lg font-heading font-bold text-white uppercase tracking-wider mb-2.5 group-hover:text-[#F4B92A] transition-colors">
                    {service.title}
                  </h3>

                  {/* Quote Description */}
                  <p className="text-white/85 text-[15px] font-sans font-light leading-relaxed mb-6 line-clamp-3">
                    {service.description}
                  </p>

                  {/* Bottom Row */}
                  <div className="pt-4 border-t border-white/20 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-white/70 group-hover:text-white transition-colors">
                        {service.actionText}
                      </span>
                    </div>

                    {/* Circular Button with ArrowUpRight (↗) */}
                    <div className="w-[44px] h-[44px] shrink-0 rounded-full bg-[#F4B92A] text-[#2C0054] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <ArrowUpRight size={22} strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
