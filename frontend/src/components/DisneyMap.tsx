'use client';
import { useState } from 'react';
import Image from 'next/image';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ParkInfo {
  id: string;
  title: string;
  location: string;
  description: React.ReactNode;
}

const PARKS_DATA: Record<string, ParkInfo> = {
  california: {
    id: 'california',
    title: 'Disneyland Resort California',
    location: 'Anaheim, California (EE. UU.)',
    description: (
      <div className="space-y-5 text-[#4a4a4a] text-[15px] font-sans font-light leading-relaxed">
        <p>Ubicado en Anaheim, California, a tan solo 40 minutos en automóvil desde Los Ángeles. Es el complejo temático original inaugurado por el propio Walt Disney en 1955. Cuenta con 2 parques temáticos extraordinarios:</p>
        <div className="bg-[#f7f5f8] border border-[#2c0054]/15 rounded-[18px] p-5 space-y-3">
          <h4 className="font-heading font-bold text-lg text-brand-primary flex items-center gap-2"><Sparkles size={18} className="text-[#F4B92A]" />Disneyland Park</h4>
          <p>El parque mágico original donde se encuentra el icónico <strong>Castillo de la Bella Durmiente</strong>. Explora <em>Star Wars: Galaxy&apos;s Edge</em> con <strong>Star Wars: Rise of the Resistance</strong>, vive la velocidad en <strong>Space Mountain</strong> y disfruta <strong>Tiana&apos;s Bayou Adventure</strong>.</p>
        </div>
        <div className="bg-[#f7f5f8] border border-[#2c0054]/15 rounded-[18px] p-5 space-y-3">
          <h4 className="font-heading font-bold text-lg text-brand-primary flex items-center gap-2"><Sparkles size={18} className="text-[#F4B92A]" />Disney California Adventure</h4>
          <p>Hogar de <strong>Cars Land</strong>, el <strong>Campus Avengers</strong> con los superhéroes de Marvel, <strong>San Fransokyo Square</strong> para conocer a Baymax y el show nocturno <strong>World of Color</strong>.</p>
        </div>
      </div>
    )
  },
  orlando: {
    id: 'orlando',
    title: 'Walt Disney World Resort Florida',
    location: 'Orlando, Florida (EE. UU.)',
    description: (
      <div className="space-y-5 text-[#4a4a4a] text-[15px] font-sans font-light leading-relaxed">
        <p>El resort de entretenimiento más impresionante y extenso del mundo. 4 parques temáticos, 2 acuáticos y más de 25 hoteles Disney:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#f7f5f8] border border-[#2c0054]/15 rounded-[18px] p-4 space-y-2"><h4 className="font-heading font-bold text-base text-brand-primary">Magic Kingdom</h4><p className="text-xs text-smoke font-light">Castillo de Cenicienta, Tron Lightcycle Run y Space Mountain.</p></div>
          <div className="bg-[#f7f5f8] border border-[#2c0054]/15 rounded-[18px] p-4 space-y-2"><h4 className="font-heading font-bold text-base text-brand-primary">Epcot</h4><p className="text-xs text-smoke font-light">Guardians of the Galaxy: Cosmic Rewind y el Pabellón de Países.</p></div>
          <div className="bg-[#f7f5f8] border border-[#2c0054]/15 rounded-[18px] p-4 space-y-2"><h4 className="font-heading font-bold text-base text-brand-primary">Hollywood Studios</h4><p className="text-xs text-smoke font-light">Star Wars: Galaxy&apos;s Edge, Toy Story Land y Tower of Terror.</p></div>
          <div className="bg-[#f7f5f8] border border-[#2c0054]/15 rounded-[18px] p-4 space-y-2"><h4 className="font-heading font-bold text-base text-brand-primary">Animal Kingdom</h4><p className="text-xs text-smoke font-light">Pandora (Avatar), Árbol de la Vida y Expedition Everest.</p></div>
        </div>
      </div>
    )
  },
  paris: {
    id: 'paris',
    title: 'Disneyland Paris Resort',
    location: 'Marne-la-Vallée, París (Francia)',
    description: (
      <div className="space-y-5 text-[#4a4a4a] text-[15px] font-sans font-light leading-relaxed">
        <p>El toque de magia Disney en el corazón de Europa, a solo 35 minutos de París.</p>
        <div className="bg-[#f7f5f8] border border-[#2c0054]/15 rounded-[18px] p-5 space-y-3">
          <h4 className="font-heading font-bold text-lg text-brand-primary flex items-center gap-2"><Sparkles size={18} className="text-[#F4B92A]" />Disneyland Park Paris</h4>
          <p>El encantador <strong>Castillo de la Bella Durmiente</strong> victoriano y la impactante <strong>Star Wars Hyperspace Mountain</strong>.</p>
        </div>
        <div className="bg-[#f7f5f8] border border-[#2c0054]/15 rounded-[18px] p-5 space-y-3">
          <h4 className="font-heading font-bold text-lg text-brand-primary flex items-center gap-2"><Sparkles size={18} className="text-[#F4B92A]" />Walt Disney Studios Park</h4>
          <p>El fascinante <strong>Marvel Avengers Campus</strong> y <strong>Ratatouille: The Adventure</strong>.</p>
        </div>
      </div>
    )
  },
  shanghai: {
    id: 'shanghai',
    title: 'Shanghai Disney Resort',
    location: 'Pudong, Shanghái (China)',
    description: (
      <div className="space-y-5 text-[#4a4a4a] text-[15px] font-sans font-light leading-relaxed">
        <p>Uno de los parques más modernos del mundo, &quot;auténticamente Disney y distintivamente chino&quot;.</p>
        <div className="bg-[#f7f5f8] border border-[#2c0054]/15 rounded-[18px] p-5 space-y-3">
          <h4 className="font-heading font-bold text-lg text-brand-primary flex items-center gap-2"><Sparkles size={18} className="text-[#F4B92A]" />Shanghai Disneyland</h4>
          <p>El castillo Disney más grande: <strong>Enchanted Storybook Castle</strong>. Atracciones únicas como <strong>TRON Lightcycle Power Run</strong> y la primera tierra de <strong>Zootopia</strong>.</p>
        </div>
      </div>
    )
  },
  hongkong: {
    id: 'hongkong',
    title: 'Hong Kong Disneyland Resort',
    location: 'Isla Lantau, Hong Kong',
    description: (
      <div className="space-y-5 text-[#4a4a4a] text-[15px] font-sans font-light leading-relaxed">
        <p>En la hermosa Isla Lantau, combina el encanto íntimo Disney con experiencias exclusivas.</p>
        <div className="bg-[#f7f5f8] border border-[#2c0054]/15 rounded-[18px] p-5 space-y-3">
          <h4 className="font-heading font-bold text-lg text-brand-primary flex items-center gap-2"><Sparkles size={18} className="text-[#F4B92A]" />Hong Kong Disneyland</h4>
          <p>El majestuoso <strong>Castle of Magical Dreams</strong>, la exclusiva tierra de <strong>World of Frozen</strong>, <strong>Mystic Manor</strong> e <strong>Iron Man Experience</strong>.</p>
        </div>
      </div>
    )
  },
  tokyo: {
    id: 'tokyo',
    title: 'Tokyo Disney Resort',
    location: 'Urayasu, Chiba (Japón)',
    description: (
      <div className="space-y-5 text-[#4a4a4a] text-[15px] font-sans font-light leading-relaxed">
        <p>El resort con la mejor calidad de servicio y atención al detalle del mundo. 2 parques legendarios:</p>
        <div className="bg-[#f7f5f8] border border-[#2c0054]/15 rounded-[18px] p-5 space-y-3">
          <h4 className="font-heading font-bold text-lg text-brand-primary flex items-center gap-2"><Sparkles size={18} className="text-[#F4B92A]" />Tokyo Disneyland</h4>
          <p>Atracciones exclusivas como <strong>Enchanted Tale of Beauty and the Beast</strong> y <strong>The Happy Ride with Baymax</strong>.</p>
        </div>
        <div className="bg-[#f7f5f8] border border-[#2c0054]/15 rounded-[18px] p-5 space-y-3">
          <h4 className="font-heading font-bold text-lg text-brand-primary flex items-center gap-2"><Sparkles size={18} className="text-[#F4B92A]" />Tokyo DisneySea</h4>
          <p>El parque más hermoso del planeta. <strong>Fantasy Springs</strong> (Peter Pan, Rapunzel y Frozen) y <strong>Journey to the Center of the Earth</strong>.</p>
        </div>
      </div>
    )
  }
};

export default function DisneyMap() {
  const [selectedPark, setSelectedPark] = useState<ParkInfo | null>(null);

  return (
    <div className="relative w-full mx-auto">
      <div className="relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[16/8.5] bg-[#2C0054] rounded-[24px] overflow-hidden shadow-2xl border border-[#2c0054]/20">
        <Image src="/images/mapa mundial disney.webp" alt="Mapa Mundial Ilustrado de Parques Disney" fill className="object-cover" priority />

        {/* =====================================================
            POSICIONES DE LOS PINES — 3 DISPOSITIVOS
            Formato: top-[MOVIL%] sm:top-[TABLET%] md:top-[DESKTOP%]
                     left-[MOVIL%] sm:left-[TABLET%] md:left-[DESKTOP%]
            *** md: = computadora — NO MODIFICAR ***
        ====================================================== */}

        {/* PIN 1: Anaheim, California */}
        <button onClick={() => setSelectedPark(PARKS_DATA.california)}
          className="absolute
            top-[40%] left-[3%]
            sm:top-[43%] sm:left-[4%]
            md:top-[40%] md:left-[4%]
            group/pin flex flex-col items-center cursor-pointer z-20 focus:outline-hidden"
          title="Anaheim, California">
          <div className="relative flex items-center justify-center w-6 h-6 md:w-10 md:h-10">
            <span className="absolute w-6 h-6 md:w-10 md:h-10 rounded-full border border-[#2C0054]/40 pointer-events-none" />
            <span className="absolute w-4 h-4 md:w-6.5 md:h-6.5 rounded-full border border-[#2C0054]/60 pointer-events-none" />
            <span className="animate-ping absolute inline-flex h-5 w-5 md:h-8 md:w-8 rounded-full bg-[#2C0054] opacity-50"></span>
            <span className="animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] absolute inline-flex h-3 w-3 md:h-5 md:w-5 rounded-full bg-[#2C0054] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 md:h-3.5 md:w-3.5 bg-[#2C0054] border border-white shadow-[0_0_10px_#2C0054] group-hover/pin:scale-125 transition-transform"></span>
          </div>
          <span className="hidden md:inline mt-1 bg-[#2C0054]/90 backdrop-blur-xs text-[#F4B92A] text-[10px] lg:text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-[#F4B92A]/60 shadow-md group-hover/pin:bg-[#F4B92A] group-hover/pin:text-[#2C0054] transition-colors">Anaheim, California</span>
        </button>

        {/* PIN 2: Orlando, Florida */}
        <button onClick={() => setSelectedPark(PARKS_DATA.orlando)}
          className="absolute
            top-[45%] left-[14%]
            sm:top-[46%] sm:left-[15%]
            md:top-[45%] md:left-[15%]
            group/pin flex flex-col items-center cursor-pointer z-20 focus:outline-hidden"
          title="Orlando, Florida">
          <div className="relative flex items-center justify-center w-6 h-6 md:w-10 md:h-10">
            <span className="absolute w-6 h-6 md:w-10 md:h-10 rounded-full border border-[#2C0054]/40 pointer-events-none" />
            <span className="absolute w-4 h-4 md:w-6.5 md:h-6.5 rounded-full border border-[#2C0054]/60 pointer-events-none" />
            <span className="animate-ping absolute inline-flex h-5 w-5 md:h-8 md:w-8 rounded-full bg-[#2C0054] opacity-50"></span>
            <span className="animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] absolute inline-flex h-3 w-3 md:h-5 md:w-5 rounded-full bg-[#2C0054] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 md:h-3.5 md:w-3.5 bg-[#2C0054] border border-white shadow-[0_0_10px_#2C0054] group-hover/pin:scale-125 transition-transform"></span>
          </div>
          <span className="hidden md:inline mt-1 bg-[#2C0054]/90 backdrop-blur-xs text-[#F4B92A] text-[10px] lg:text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-[#F4B92A]/60 shadow-md group-hover/pin:bg-[#F4B92A] group-hover/pin:text-[#2C0054] transition-colors">Orlando, Florida</span>
        </button>

        {/* PIN 3: París, Francia */}
        <button onClick={() => setSelectedPark(PARKS_DATA.paris)}
          className="absolute
            top-[34%] left-[40%]
            sm:top-[37%] sm:left-[42%]
            md:top-[32%] md:left-[40%]
            group/pin flex flex-col items-center cursor-pointer z-20 focus:outline-hidden"
          title="París, Francia">
          <div className="relative flex items-center justify-center w-6 h-6 md:w-10 md:h-10">
            <span className="absolute w-6 h-6 md:w-10 md:h-10 rounded-full border border-[#2C0054]/40 pointer-events-none" />
            <span className="absolute w-4 h-4 md:w-6.5 md:h-6.5 rounded-full border border-[#2C0054]/60 pointer-events-none" />
            <span className="animate-ping absolute inline-flex h-5 w-5 md:h-8 md:w-8 rounded-full bg-[#2C0054] opacity-50"></span>
            <span className="animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] absolute inline-flex h-3 w-3 md:h-5 md:w-5 rounded-full bg-[#2C0054] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 md:h-3.5 md:w-3.5 bg-[#2C0054] border border-white shadow-[0_0_10px_#2C0054] group-hover/pin:scale-125 transition-transform"></span>
          </div>
          <span className="hidden md:inline mt-1 bg-[#2C0054]/90 backdrop-blur-xs text-[#F4B92A] text-[10px] lg:text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-[#F4B92A]/60 shadow-md group-hover/pin:bg-[#F4B92A] group-hover/pin:text-[#2C0054] transition-colors">París, Francia</span>
        </button>

        {/* PIN 4: Shanghái, China */}
        <button onClick={() => setSelectedPark(PARKS_DATA.shanghai)}
          className="absolute
            top-[46%] left-[78%]
            sm:top-[46%] sm:left-[80%]
            md:top-[46%] md:left-[75%]
            group/pin flex flex-col items-center cursor-pointer z-20 focus:outline-hidden"
          title="Shanghái, China">
          <div className="relative flex items-center justify-center w-6 h-6 md:w-10 md:h-10">
            <span className="absolute w-6 h-6 md:w-10 md:h-10 rounded-full border border-[#2C0054]/40 pointer-events-none" />
            <span className="absolute w-4 h-4 md:w-6.5 md:h-6.5 rounded-full border border-[#2C0054]/60 pointer-events-none" />
            <span className="animate-ping absolute inline-flex h-5 w-5 md:h-8 md:w-8 rounded-full bg-[#2C0054] opacity-50"></span>
            <span className="animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] absolute inline-flex h-3 w-3 md:h-5 md:w-5 rounded-full bg-[#2C0054] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 md:h-3.5 md:w-3.5 bg-[#2C0054] border border-white shadow-[0_0_10px_#2C0054] group-hover/pin:scale-125 transition-transform"></span>
          </div>
          <span className="hidden md:inline mt-1 bg-[#2C0054]/90 backdrop-blur-xs text-[#F4B92A] text-[10px] lg:text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-[#F4B92A]/60 shadow-md group-hover/pin:bg-[#F4B92A] group-hover/pin:text-[#2C0054] transition-colors">Shanghái, China</span>
        </button>

        {/* PIN 5: Hong Kong */}
        <button onClick={() => setSelectedPark(PARKS_DATA.hongkong)}
          className="absolute
            top-[50%] left-[74%]
            sm:top-[52%] sm:left-[77%]
            md:top-[54%] md:left-[74%]
            group/pin flex flex-col items-center cursor-pointer z-20 focus:outline-hidden"
          title="Hong Kong">
          <div className="relative flex items-center justify-center w-6 h-6 md:w-10 md:h-10">
            <span className="absolute w-6 h-6 md:w-10 md:h-10 rounded-full border border-[#2C0054]/40 pointer-events-none" />
            <span className="absolute w-4 h-4 md:w-6.5 md:h-6.5 rounded-full border border-[#2C0054]/60 pointer-events-none" />
            <span className="animate-ping absolute inline-flex h-5 w-5 md:h-8 md:w-8 rounded-full bg-[#2C0054] opacity-50"></span>
            <span className="animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] absolute inline-flex h-3 w-3 md:h-5 md:w-5 rounded-full bg-[#2C0054] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 md:h-3.5 md:w-3.5 bg-[#2C0054] border border-white shadow-[0_0_10px_#2C0054] group-hover/pin:scale-125 transition-transform"></span>
          </div>
          <span className="hidden md:inline mt-1 bg-[#2C0054]/90 backdrop-blur-xs text-[#F4B92A] text-[10px] lg:text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-[#F4B92A]/60 shadow-md group-hover/pin:bg-[#F4B92A] group-hover/pin:text-[#2C0054] transition-colors">Hong Kong</span>
        </button>

        {/* PIN 6: Tokio, Japón */}
        <button onClick={() => setSelectedPark(PARKS_DATA.tokyo)}
          className="absolute
            top-[42%] left-[85%]
            sm:top-[42%] sm:left-[87%]
            md:top-[42%] md:left-[82%]
            group/pin flex flex-col items-center cursor-pointer z-20 focus:outline-hidden"
          title="Tokio, Japón">
          <div className="relative flex items-center justify-center w-6 h-6 md:w-10 md:h-10">
            <span className="absolute w-6 h-6 md:w-10 md:h-10 rounded-full border border-[#2C0054]/40 pointer-events-none" />
            <span className="absolute w-4 h-4 md:w-6.5 md:h-6.5 rounded-full border border-[#2C0054]/60 pointer-events-none" />
            <span className="animate-ping absolute inline-flex h-5 w-5 md:h-8 md:w-8 rounded-full bg-[#2C0054] opacity-50"></span>
            <span className="animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] absolute inline-flex h-3 w-3 md:h-5 md:w-5 rounded-full bg-[#2C0054] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 md:h-3.5 md:w-3.5 bg-[#2C0054] border border-white shadow-[0_0_10px_#2C0054] group-hover/pin:scale-125 transition-transform"></span>
          </div>
          <span className="hidden md:inline mt-1 bg-[#2C0054]/90 backdrop-blur-xs text-[#F4B92A] text-[10px] lg:text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-[#F4B92A]/60 shadow-md group-hover/pin:bg-[#F4B92A] group-hover/pin:text-[#2C0054] transition-colors">Tokio, Japón</span>
        </button>

        {/* Instruction Badge */}
        <div className="hidden md:flex absolute bottom-4 left-4 bg-[#2C0054]/85 backdrop-blur-md text-white text-xs px-7 py-2.5 rounded-full border border-white/20 shadow-md items-center pointer-events-none">
          <span>Haz clic en los 6 puntos para explorar cada Disney del mundo</span>
        </div>
      </div>

      {/* Interactive Modal */}
      <AnimatePresence>
        {selectedPark && (
          <div className="fixed inset-0 bg-[#2C0054]/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.3 }} className="bg-white rounded-[24px] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-[#2c0054]/15 relative flex flex-col">
              <div className="sticky top-0 bg-white/95 backdrop-blur-sm p-6 sm:p-7 flex justify-between items-start border-b border-[#2c0054]/10 z-10">
                <div>
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#2C0054]/70 block mb-1">{selectedPark.location}</span>
                  <h3 className="text-2xl sm:text-3xl font-heading font-bold text-brand-primary">{selectedPark.title}</h3>
                </div>
                <button onClick={() => setSelectedPark(null)} className="w-9 h-9 rounded-full bg-[#f7f5f8] text-[#2C0054] hover:bg-[#2C0054] hover:text-white flex items-center justify-center transition shrink-0" aria-label="Cerrar modal">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 sm:p-7">{selectedPark.description}</div>
              <div className="p-6 bg-[#f7f5f8] flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#2c0054]/10 rounded-b-[24px]">
                <p className="text-xs text-smoke font-light">¿Quieres cotizar tu paquete completo a este destino?</p>
                <a href={"https://wa.me/528443409914?text=Hola,%20quisiera%20cotizar%20un%20viaje%20a%20" + encodeURIComponent(selectedPark.title)} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-6 py-3 bg-[#F4B92A] text-[#2C0054] font-bold text-sm rounded-[14px] hover:bg-[#2C0054] hover:text-white transition shadow-md inline-flex items-center justify-center gap-2 group">
                  <span>Cotizar por WhatsApp</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
