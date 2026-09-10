"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, MapPin, ArrowRight, Compass } from "lucide-react";

interface TravelRoute {
  id: string;
  title: string;
  tag: string;
  duration: string;
  stops: string[];
  description: string;
  image: string;
  href: string;
}

const featuredRoutes: TravelRoute[] = [
  {
    id: "europa-clasica",
    title: "Ruta Europa Clásica",
    tag: "Circuito Guiado Internacional",
    duration: "12 - 15 Días",
    stops: ["Madrid", "París", "Ámsterdam", "Roma"],
    description: "Recorre los monumentos más icónicos de Europa con guías en español, transporte entre ciudades y hospedaje seleccionado.",
    image: "/images/09_san_fransokyo.webp",
    href: "/viajes?detalles=europa-clasica",
  },
  {
    id: "magia-disney",
    title: "Ruta Magia Disney California",
    tag: "Agentes Certificados Disney",
    duration: "5 - 7 Días",
    stops: ["Disneyland Park", "California Adventure", "San Fransokyo"],
    description: "Planeación paso a paso con boletería oficial, estrategia de parques, Lightning Lane y hoteles dentro o muy cerca del resort.",
    image: "/images/05_disney_california_adventure.webp",
    href: "/disney",
  },
  {
    id: "asia-turquia",
    title: "Japón, Turquía & Egipto",
    tag: "Circuito Exótico Internacional",
    duration: "10 - 14 Días",
    stops: ["Tokio", "Estambul", "El Cairo", "Capadocia"],
    description: "Una inmersión inolvidable navegando por el Nilo, sobrevolando Capadocia en globo y explorando el futurismo de Tokio.",
    image: "/images/08_avengers_campus_disney_california_adventure.webp",
    href: "/viajes?detalles=asia-turquia",
  },
  {
    id: "chepe-express",
    title: "Ruta Chepe & Barrancas del Cobre",
    tag: "Aventura Nacional Premium",
    duration: "5 - 6 Días",
    stops: ["Los Mochis", "El Fuerte", "Creel", "Chihuahua"],
    description: "Disfruta uno de los recorridos en tren más impresionantes del mundo a través de los cañones de la Sierra Tarahumara.",
    image: "/images/07_rayo_mcqueen.webp",
    href: "/viajes?detalles=chepe-express",
  },
];

export default function FeaturedRoutesSection() {
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
            <h2 className="text-2xl sm:text-3xl lg:text-[35px] font-heading font-bold text-brand-primary uppercase tracking-tight">
              Rutas & Destinos Inolvidables
            </h2>
            <p className="text-smoke text-[15px] font-sans font-light max-w-xl mt-2.5 leading-relaxed">
              Explora los itinerarios más solicitados por nuestros viajeros. Cada ruta cuenta con asesoría personalizada y diseño a tu medida.
            </p>
          </div>

          <Link
            href="/destinos"
            className="hidden sm:inline-flex items-center gap-2 text-brand-primary font-bold text-sm hover:underline group shrink-0"
          >
            <span>Ver todos los destinos</span>
            <ArrowRight size={18} className="text-[#F4B92A] group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Responsive Container: Horizontal Carousel on Mobile/Tablet (< lg), 4-Card Grid on Desktop (>= lg) */}
        <div 
          className="flex overflow-x-auto gap-5 snap-x snap-mandatory scrollbar-none [&::-webkit-scrollbar]:hidden py-2 px-1 lg:grid lg:grid-cols-4 lg:gap-7 lg:overflow-visible lg:py-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featuredRoutes.map((route, index) => (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.9, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="shrink-0 w-[285px] sm:w-[330px] lg:w-full snap-start flex"
            >
              <div className="bg-surface-white border border-[#2c0054]/15 rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between w-full group">
                
                {/* Image Header with Badge Overlay */}
                <div className="relative h-[210px] w-full overflow-hidden shrink-0">
                  <Image 
                    src={route.image} 
                    alt={route.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  
                  {/* Soft Bottom Gradient Overlay for title legibility */}
                  <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-0" />

                  {/* Top Right Duration Pill */}
                  <div className="absolute top-3.5 right-3.5 z-10">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#2C0054] text-white flex items-center gap-1 shadow-md">
                      <Clock size={12} className="text-[#F4B92A]" />
                      {route.duration}
                    </span>
                  </div>

                  {/* Bottom Image Title - Aligned with text padding below */}
                  <div className="absolute bottom-4 left-5 right-5 sm:left-6 sm:right-6 z-10 text-white">
                    <h3 className="text-lg font-heading font-bold leading-snug group-hover:text-[#F4B92A] transition-colors">
                      {route.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body Content */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                  
                  <div>
                    {/* Route Stops / Cities Path */}
                    <div className="flex flex-wrap items-center gap-1 text-xs text-cinder font-semibold mb-3.5">
                      {route.stops.map((stop, sIdx) => (
                        <span key={stop} className="inline-flex items-center">
                          <span>{stop}</span>
                          {sIdx < route.stops.length - 1 && (
                            <span className="mx-1 text-[#F4B92A] font-bold">›</span>
                          )}
                        </span>
                      ))}
                    </div>

                    {/* Description Paragraph (15px) */}
                    <p className="text-smoke text-[15px] font-sans font-light leading-relaxed mb-6 line-clamp-3">
                      {route.description}
                    </p>
                  </div>

                  {/* Card Bottom CTA Button without top border line */}
                  <div className="pt-1">
                    <Link
                      href={route.href}
                      className="w-full py-3.5 px-4 bg-[#f3eff7] border border-[#2c0054]/15 rounded-[14px] text-[#2C0054] font-bold text-sm hover:bg-brand-primary hover:text-white transition-all flex items-center justify-center gap-2.5 group/btn shadow-xs"
                    >
                      <span>Ver más</span>
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
            href="/destinos"
            className="inline-flex items-center gap-2 text-brand-primary font-bold text-sm hover:underline"
          >
            <span>Ver todos los destinos</span>
            <ArrowRight size={16} className="text-[#F4B92A]" />
          </Link>
        </div>

      </div>
    </section>
  );
}
