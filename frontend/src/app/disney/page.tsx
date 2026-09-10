"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Award, 
  Clock, 
  Utensils, 
  Building2, 
  Phone, 
  Mail, 
  ArrowRight,
  ExternalLink,
  MapPin,
  Star,
  CheckCircle2,
  Video,
  Car,
  Shield,
  Camera,
  Compass,
  Rocket,
  Ticket,
  Zap
} from "lucide-react";
import DisneyMap from "@/components/DisneyMap";

export default function DisneyPage() {
  return (
    <main className="flex flex-col min-h-screen bg-[#f7f5f8]">
      
      {/* 1. HERO SECTION DISNEY */}
      <section className="relative -mt-[104px] pt-[150px] sm:pt-[180px] pb-20 sm:pb-24 px-5 sm:px-8 bg-[#2C0054] text-white overflow-hidden min-h-[460px] flex items-center">
        {/* Background Image with Dark Purple Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/04_desfile_personajes_disneyland_california.webp" 
            alt="Desfile de Personajes Disney en el Mundo" 
            fill 
            className="object-cover object-center opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2C0054]/95 via-[#2C0054]/80 to-[#2C0054]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C0054]/90 via-transparent to-[#2C0054]/60" />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-[45px] font-heading font-bold uppercase tracking-tight mb-4 leading-tight text-white">
              Disney en el Mundo
            </h1>

            <p className="text-white/90 text-[15px] sm:text-[16px] font-sans font-light leading-relaxed">
              Planear tu viaje a Disney es el primer paso para vivir un sueño inolvidable. Te asesoramos como <strong>Agentes Certificados Disney</strong> para diseñar cada detalle de tu itinerario y aprovechar al máximo cada momento en los parques.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. INTERACTIVE MAP SECTION (6 GLOBAL DESTINATIONS) */}
      <section className="py-[80px] px-5 sm:px-8 relative bg-[#f7f5f8]">
        <div className="max-w-[1280px] mx-auto">
          
          <div className="text-left max-w-3xl mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-[35px] font-heading font-bold text-brand-primary uppercase tracking-tight mb-3">
              ¿Qué debes saber para comenzar a planear?
            </h2>
            <p className="text-smoke text-[15px] font-sans font-light leading-relaxed mb-2">
              Lo primero es definir cuál de los <strong>6 destinos Disney</strong> quieres visitar.
            </p>
            <p className="text-smoke text-[15px] font-sans font-light leading-relaxed">
              Actualmente Disney está presente en <strong>California, Florida, Francia, Tokyo, Hong Kong y China</strong>, cada uno con atracciones totalmente diferentes. Haz clic en los pines para explorarlos:
            </p>
          </div>

          {/* Interactive Map Component */}
          <DisneyMap />

        </div>
      </section>

      {/* 3. DETAILED DISNEYLAND RESORT CALIFORNIA CONTENT (CONDENSED & OPTIMIZED) */}
      <section className="py-[60px] px-5 sm:px-8 relative bg-surface-white border-y border-[#2c0054]/15">
        <div className="max-w-[1280px] mx-auto space-y-16 sm:space-y-20">
          
          {/* Main Section Header */}
          <div className="text-center max-w-3xl mx-auto border-b border-[#2c0054]/15 pb-8">
            <span className="text-xs uppercase tracking-widest font-bold text-[#2C0054]/70 block mb-1.5">
              Destino Destacado
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[35px] font-heading font-bold text-brand-primary uppercase tracking-tight mb-2">
              Disneyland Resort (California, EE. UU.)
            </h2>
            <p className="text-smoke text-[15px] font-sans font-light leading-relaxed flex items-center justify-center gap-2">
              <MapPin size={18} className="text-[#F4B92A] shrink-0" />
              <span>Anaheim, California (a 40 min de Los Ángeles). Cuenta con 2 parques temáticos imperdibles.</span>
            </p>
          </div>

          {/* PARQUE 1: DISNEYLAND PARK */}
          <div className="space-y-16 sm:space-y-20 pt-6 sm:pt-10">
            
            {/* 50% / 50% Split Layout (Image stretches to match full height of right column) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-stretch">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative rounded-[20px] overflow-hidden shadow-lg border border-[#2c0054]/15 min-h-[340px] sm:min-h-[400px] h-full w-full"
              >
                <Image 
                  src="/images/02_castilo_aurora_disneyland_park_california.webp" 
                  alt="Disneyland Park Castillo de la Bella Durmiente" 
                  fill 
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute top-3 right-3 bg-[#2C0054]/90 text-[#F4B92A] text-xs font-bold px-3 py-1 rounded-full border border-[#F4B92A]/40 backdrop-blur-xs">
                  Parque Original 1955
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <h3 className="text-2xl font-heading font-bold text-brand-primary uppercase">
                    1. Disneyland Park
                  </h3>
                  <p className="text-smoke text-[15px] font-sans font-light leading-relaxed">
                    El parque <strong>original</strong> inaugurado por Walt Disney en 1955. Alberga el emblemático <strong>Castillo de la Bella Durmiente</strong>, encuentros con princesas y la tierra de <em>Star Wars: Galaxy’s Edge</em> con su atracción estrella <strong>Star Wars: Rise of the Resistance</strong>.
                  </p>
                </div>

                {/* Video Embed Box: Gemelas Viajeras */}
                <div className="bg-[#f7f5f8] border border-[#2c0054]/15 rounded-[18px] p-4 space-y-2.5 mt-6">
                  <div className="flex items-center gap-2 text-brand-primary font-bold text-xs sm:text-sm">
                    <Video size={16} className="text-[#F4B92A]" />
                    <span>Experiencia Rise of the Resistance (Gemelas Viajeras):</span>
                  </div>
                  <div className="relative aspect-[16/9] w-full rounded-[12px] overflow-hidden shadow-sm border border-[#2c0054]/15">
                    <iframe
                      src="https://www.youtube.com/embed/vOPRZFMgTsc"
                      title="Star Wars Rise of the Resistance - Gemelas Viajeras"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ATRACCIONES IMPERDIBLES DE DISNEYLAND PARK (Line marked in red removed) */}
            <div className="space-y-6 pt-10 sm:pt-14">
              <h4 className="text-lg sm:text-xl font-heading font-bold text-brand-primary uppercase">
                Otras Atracciones Imperdibles en Disneyland Park:
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                
                {/* Tiana's Bayou Featured Card (Larger & Prominent) */}
                <div className="bg-surface-white border border-[#2c0054]/15 rounded-[20px] p-6 shadow-xs hover:shadow-md transition flex flex-col sm:flex-row gap-5 items-start">
                  <div className="relative h-[130px] w-full sm:w-[170px] rounded-[16px] overflow-hidden shrink-0 shadow-sm border border-[#2c0054]/10">
                    <Image 
                      src="/images/03_ tianas_bayou_adenture_disneyland_park_california.webp" 
                      alt="Tiana's Bayou Adventure" 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-heading font-bold text-base text-brand-primary">
                      Tiana’s Bayou Adventure
                    </h5>
                    <p className="text-smoke text-xs sm:text-[13px] font-sans font-light leading-relaxed">
                      Disfruta de un emocionante paseo en tronco por el río inspirado en <em>La Princesa y el Sapo</em>. Recorre impresionantes escenografías con animatrónicos de última generación, alegre música de jazz y una vibrante caída final de 15 metros de altura. Una aventura imperdible llena de diversión y frescura.
                    </p>
                  </div>
                </div>

                {/* List of Top Attractions Container (Unique Icons) */}
                <div className="bg-surface-white border border-[#2c0054]/15 rounded-[20px] p-6 shadow-xs hover:shadow-md transition flex flex-col justify-center space-y-3">
                  <ul className="space-y-3 text-xs sm:text-[13px] font-sans text-smoke font-light">
                    <li className="flex items-start gap-2.5">
                      <Compass size={16} className="text-[#F4B92A] shrink-0 mt-0.5" />
                      <span><strong>Indiana Jones Adventure:</strong> Simulación 4x4 hiperrealista en Jeep por la selva y la cueva del templo.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Rocket size={16} className="text-[#F4B92A] shrink-0 mt-0.5" />
                      <span><strong>Space Mountain:</strong> Emocionante montaña rusa totalmente a oscuras volando a gran velocidad por el espacio.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Ticket size={16} className="text-[#F4B92A] shrink-0 mt-0.5" />
                      <span><strong>Mickey & Minnie’s Runaway Railway:</strong> Aventura colorida e inmersiva dentro de un corto clásico de caricatura.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Zap size={16} className="text-[#F4B92A] shrink-0 mt-0.5" />
                      <span><strong>Big Thunder Mountain:</strong> Tren familiar a toda velocidad a través de una mina de oro encantada.</span>
                    </li>
                  </ul>
                </div>

              </div>

            </div>

          </div>

          {/* PARQUE 2: DISNEY CALIFORNIA ADVENTURE */}
          <div className="space-y-16 sm:space-y-20 pt-24 sm:pt-32 mt-6 sm:mt-10 border-t border-[#2c0054]/15">
            
            {/* 50% / 50% Split Header Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-stretch">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:order-2 relative rounded-[20px] overflow-hidden shadow-lg border border-[#2c0054]/15 min-h-[260px] sm:min-h-[280px] h-full w-full"
              >
                <Image 
                  src="/images/05_disney_california_adventure.webp" 
                  alt="Disney California Adventure" 
                  fill 
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:order-1 space-y-3"
              >
                <h3 className="text-2xl font-heading font-bold text-brand-primary uppercase">
                  2. Disney California Adventure
                </h3>
                <p className="text-smoke text-[15px] font-sans font-light leading-relaxed">
                  El parque dedicado a la acción y la magia de Pixar, destacando la rueda Pixar Pal-A-Round y la laguna de Paradise Bay. Aquí se encuentran las fascinantes tierras de <strong>Cars Land, Avengers Campus y San Fransokyo</strong>.
                </p>
              </motion.div>
            </div>

            {/* 4 CARDS (Line marked in red removed) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 sm:pt-12">
              
              {/* Cars Land */}
              <div className="bg-surface-white border border-[#2c0054]/15 rounded-[20px] p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h4 className="text-base font-heading font-bold text-brand-primary uppercase flex items-center gap-2">
                    <Car size={18} className="text-[#F4B92A] shrink-0" />
                    <span>Cars Land & Radiator Springs Racers</span>
                  </h4>
                  <p className="text-smoke text-xs sm:text-[13px] font-sans font-light leading-relaxed">
                    Siente la emoción de correr con Rayo McQueen en el pueblo de Radiador Springs. Imperdible de día y de noche por sus luces de neón.
                  </p>
                </div>
                <div>
                  <a 
                    href="https://youtu.be/Hbks3jCJ9Yk?si=kIJbFY3xUOQOHfts" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#2C0054] text-[#F4B92A] font-bold text-[11px] px-3.5 py-2 rounded-lg hover:bg-black transition shadow-xs group"
                  >
                    <Video size={14} />
                    <span>Ver Radiator Springs Racers en YouTube</span>
                    <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Avengers Campus */}
              <div className="bg-surface-white border border-[#2c0054]/15 rounded-[20px] p-6 shadow-xs hover:shadow-md transition space-y-2.5">
                <h4 className="text-base font-heading font-bold text-brand-primary uppercase flex items-center gap-2">
                  <Shield size={18} className="text-[#F4B92A] shrink-0" />
                  <span>Campus Avengers & Incredicoaster</span>
                </h4>
                <p className="text-smoke text-xs sm:text-[13px] font-sans font-light leading-relaxed">
                  Hogar de Spider-Man (WEB Slingers) y Guardians of the Galaxy. Además, vive la adrenalina pura en <strong>Incredicoaster</strong> (giro 360° a 90 km/h).
                </p>
              </div>

              {/* San Fransokyo */}
              <div className="bg-surface-white border border-[#2c0054]/15 rounded-[20px] p-6 shadow-xs hover:shadow-md transition space-y-2.5">
                <h4 className="text-base font-heading font-bold text-brand-primary uppercase flex items-center gap-2">
                  <Camera size={18} className="text-[#F4B92A] shrink-0" />
                  <span>San Fransokyo Square</span>
                </h4>
                <p className="text-smoke text-xs sm:text-[13px] font-sans font-light leading-relaxed">
                  Cruza el famoso puente de <em>Big Hero 6</em>, disfruta comida de fusión asiática y tómate fotos exclusivas con <strong>Baymax</strong>.
                </p>
              </div>

              {/* World of Color & Soarin (WITHOUT RED-MARKED BADGE) */}
              <div className="bg-surface-white border border-[#2c0054]/15 rounded-[20px] p-6 shadow-xs hover:shadow-md transition space-y-2.5">
                <h4 className="text-base font-heading font-bold text-brand-primary uppercase flex items-center gap-2">
                  <Compass size={18} className="text-[#F4B92A] shrink-0" />
                  <span>World of Color & Soarin</span>
                </h4>
                <p className="text-smoke text-xs sm:text-[13px] font-sans font-light leading-relaxed">
                  Vuela en parapente por el mundo en <strong>Soarin</strong> y termina la noche con <strong>World of Color</strong>: proyecciones sobre agua, luces y láseres en Paradise Bay.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 4. WHY BOOK WITH DISNEY CERTIFIED AGENTS */}
      <section className="py-[80px] px-5 sm:px-8 relative bg-[#f7f5f8]">
        <div className="max-w-[1280px] mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-[35px] font-heading font-bold text-brand-primary uppercase tracking-tight">
              ¿Por qué planear tu viaje con TrazaMapas?
            </h2>
            <p className="text-smoke text-[15px] font-sans font-light mt-2.5 leading-relaxed">
              Planear un viaje a Disney requiere estrategia de boletos, hospedaje y horarios. Nos encargamos de todo para que disfrutes al máximo.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            
            {/* Card 1: Disney Certified Agents */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-surface-white border border-[#2c0054]/15 rounded-[24px] p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition group"
            >
              <div>
                <div className="w-[52px] h-[52px] rounded-full bg-[#2C0054] text-[#F4B92A] flex items-center justify-center mb-5 shadow-md shrink-0 group-hover:scale-110 transition-transform">
                  <Award size={25} />
                </div>
                <h3 className="text-lg font-heading font-bold text-brand-primary mb-2.5">
                  Agentes Certificados Disney
                </h3>
                <p className="text-smoke text-[15px] font-sans font-light leading-relaxed">
                  Capacitación continua directo con la marca Disney para asesorarte en la mejor fecha y distribución de parques.
                </p>
              </div>
            </motion.div>

            {/* Card 2: Lightning Lane & Strategy */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-surface-white border border-[#2c0054]/15 rounded-[24px] p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition group"
            >
              <div>
                <div className="w-[52px] h-[52px] rounded-full bg-[#2C0054] text-[#F4B92A] flex items-center justify-center mb-5 shadow-md shrink-0 group-hover:scale-110 transition-transform">
                  <Clock size={25} />
                </div>
                <h3 className="text-lg font-heading font-bold text-brand-primary mb-2.5">
                  Estrategia Lightning Lane
                </h3>
                <p className="text-smoke text-[15px] font-sans font-light leading-relaxed">
                  Te explicamos cómo usar la app de Disney para reservar tus pases de fila rápida y evitar largas esperas en atracciones.
                </p>
              </div>
            </motion.div>

            {/* Card 3: Official Resort Hotels */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-surface-white border border-[#2c0054]/15 rounded-[24px] p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition group"
            >
              <div>
                <div className="w-[52px] h-[52px] rounded-full bg-[#2C0054] text-[#F4B92A] flex items-center justify-center mb-5 shadow-md shrink-0 group-hover:scale-110 transition-transform">
                  <Building2 size={25} />
                </div>
                <h3 className="text-lg font-heading font-bold text-brand-primary mb-2.5">
                  Hoteles Temáticos Oficiales
                </h3>
                <p className="text-smoke text-[15px] font-sans font-light leading-relaxed">
                  Acceso a beneficios exclusivos de hospedaje dentro del resort como entrada temprana a los parques y transporte gratuito.
                </p>
              </div>
            </motion.div>

            {/* Card 4: Dining & Reservations */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-surface-white border border-[#2c0054]/15 rounded-[24px] p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition group"
            >
              <div>
                <div className="w-[52px] h-[52px] rounded-full bg-[#2C0054] text-[#F4B92A] flex items-center justify-center mb-5 shadow-md shrink-0 group-hover:scale-110 transition-transform">
                  <Utensils size={25} />
                </div>
                <h3 className="text-lg font-heading font-bold text-brand-primary mb-2.5">
                  Reservación de Comidas
                </h3>
                <p className="text-smoke text-[15px] font-sans font-light leading-relaxed">
                  Te apoyamos agendando restaurantes temáticos y cenas inolvidables con personajes Disney desde el día en que abre la ventana de reservas.
                </p>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 5. LOCATION & CONTACT CALLOUT (INNER PURPLE BANNER: py-[80px] px-[30px]) */}
      <section className="py-[60px] px-5 sm:px-8 relative bg-surface-white border-t border-[#2c0054]/15">
        <div className="max-w-[1280px] mx-auto">
          
          {/* Inner Purple Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#2C0054] text-white rounded-[28px] py-[80px] px-[30px] relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-14"
          >
            
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#F4B92A]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-xl text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-[35px] font-heading font-bold uppercase tracking-tight mb-4 text-white">
                ¿Listo para trazar tu viaje a Disney?
              </h2>

              <p className="text-white/85 text-[15px] font-sans font-light leading-relaxed mb-6">
                Visítanos en nuestra oficina en <strong>Av. La Salle #437</strong> (frente al Colegio La Salle en Saltillo) o cotiza directamente con nuestros Agentes Certificados Disney vía WhatsApp.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs font-medium text-white/80 pt-4 border-t border-white/15">
                <a href="tel:8443409914" className="flex items-center gap-2 hover:text-[#F4B92A] transition">
                  <Phone size={15} className="text-[#F4B92A]" />
                  <span>844-340-9914</span>
                </a>
                <span className="hidden sm:inline text-white/30">•</span>
                <a href="mailto:agenciadeviajes@trazamapas.com.mx" className="flex items-center gap-2 hover:text-[#F4B92A] transition break-all">
                  <Mail size={15} className="text-[#F4B92A]" />
                  <span>agenciadeviajes@trazamapas.com.mx</span>
                </a>
              </div>
            </div>

            {/* Buttons Container */}
            <div className="relative z-10 flex flex-col sm:flex-row lg:flex-col gap-6 w-full sm:w-auto shrink-0">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                href="https://wa.me/528443409914?text=Hola,%20quisiera%20cotizar%20un%20viaje%20a%20Disney"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 bg-[#F4B92A] text-[#2C0054] font-bold text-sm rounded-[14px] hover:bg-white transition shadow-md inline-flex items-center justify-center gap-2.5 group shrink-0"
              >
                <span>Cotizar Disney por WhatsApp</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <a 
                href="tel:8443409914" 
                className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-[14px] border border-white/20 transition inline-flex items-center justify-center gap-2 text-center shrink-0"
              >
                <Phone size={16} className="text-[#F4B92A]" />
                <span>Llamar a una Agente</span>
              </a>
            </div>

          </motion.div>

        </div>
      </section>

    </main>
  );
}
