'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const SLIDES = [
  {
    image: '/images/04_desfile_personajes_disneyland_california.webp',
    alt: 'Desfile de personajes Disney',
    title: 'Viaja sin límites por el mundo, trazamos la ruta de tu viaje.',
    subtitle: 'TrazaMapas conecta tus deseos de viajar con experiencias perfectamente organizadas. Planea tus vacaciones, parques Disney y circuitos con agentes certificados.',
  },
  {
    image: '/images/06_cars_land_disneycalifornia_adventure.webp',
    alt: 'Cars Land Disney California Adventure',
    title: 'Vive la magia de Disney y Universal en los mejores destinos.',
    subtitle: 'Somos Agentes Certificados Disney. Asesoría experta en hospedaje, boletos y estrategia de parques para una experiencia inolvidable.',
  },
  {
    image: '/images/11_world_of_color.webp',
    alt: 'World of Color Disney California',
    title: 'Diseñamos momentos espectaculares y viajes de ensueño.',
    subtitle: 'Desde cruceros hasta circuitos guiados por Europa y Asia. Descubre itinerarios a tu medida con atención de alta calidad.',
  },
];

export default function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Slideshow interval (10 seconds)
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  };

  return (
    <section className="relative min-h-[85vh] -mt-[104px] pt-36 pb-20 flex items-center justify-start overflow-hidden px-5 sm:px-8 md:px-16 text-left text-white">
      {/* Background Slideshow images with smooth crossfade */}
      {SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-0' : 'opacity-0 pointer-events-none'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={index === 0}
          />
          {/* Semi-transparent brand purple overlay 0.5 */}
          <div className="absolute inset-0 bg-[#2C0054]/50" />
        </div>
      ))}

      {/* Navigation Arrow Left */}
      <motion.button 
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={handlePrev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 text-[#F4B92A] transition-transform duration-200 cursor-pointer p-2 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
        aria-label="Anterior diapositiva"
      >
        <svg className="w-24 h-24 sm:w-28 sm:h-28 md:w-20 md:h-20 stroke-[3.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </motion.button>

      {/* Navigation Arrow Right */}
      <motion.button 
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 text-[#F4B92A] transition-transform duration-200 cursor-pointer p-2 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
        aria-label="Siguiente diapositiva"
      >
        <svg className="w-24 h-24 sm:w-28 sm:h-28 md:w-20 md:h-20 stroke-[3.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1280px] mx-auto w-full flex flex-col items-start text-left pl-24 sm:pl-40 md:pl-36 lg:pl-28 pr-24 sm:pr-40 md:pr-36 lg:pr-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start text-left max-w-4xl"
          >
            {/* White logo — only on the first slide */}
            {currentIndex === 0 && (
              <Image
                src="/images/trazamapas logo.webp"
                alt="TrazaMapas"
                width={320}
                height={90}
                className="h-[120px] sm:h-[140px] w-auto object-contain mb-1 drop-shadow-lg"
                style={{ filter: 'brightness(0) invert(1)' }}
                priority
              />
            )}

            {/* Title styled with Outfit font-bold, max 2 lines */}
            <h1 className="text-3xl sm:text-4xl lg:text-[50px] font-heading font-bold tracking-tight text-white mb-5 text-left leading-[1.18] drop-shadow-lg max-w-3xl">
              {SLIDES[currentIndex].title}
            </h1>
            
            {/* Subtitle explicitly set to 18px */}
            <p className="text-[16px] sm:text-[18px] text-white/95 mb-8 font-sans font-light leading-relaxed text-left drop-shadow-md max-w-2xl">
              {SLIDES[currentIndex].subtitle}
            </p>
            
            {/* CTA Button with standard site signature style (rounded-[14px], bold, hover transition, gold icon) */}
            <motion.a 
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href="https://wa.me/528443409914?text=Hola,%20quisiera%20planear%20un%20viaje" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-7 py-3.5 bg-white text-[#2C0054] font-bold text-sm sm:text-[15px] rounded-[14px] border border-white/20 hover:bg-[#f7f5f8] hover:border-[#F4B92A] transition-all duration-200 shadow-md inline-flex items-center gap-2.5 group cursor-pointer"
            >
              <svg className="w-5 h-5 text-[#F4B92A] shrink-0 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Comenzar a planear</span>
            </motion.a>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
