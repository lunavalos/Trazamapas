"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Award, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  Sparkles, 
  Compass, 
  Globe2,
  HeartHandshake,
  Sun,
  Palmtree,
  Ship,
  Wifi
} from "lucide-react";

export default function NosotrosPage() {
  return (
    <main className="flex flex-col min-h-screen bg-[#f7f5f8]">
      
      {/* 1. HERO SECTION FOR NOSOTROS (Matching Disney Hero style) */}
      <section className="relative -mt-[104px] pt-[150px] sm:pt-[180px] pb-20 sm:pb-24 px-5 sm:px-8 bg-[#2C0054] text-white overflow-hidden min-h-[460px] flex items-center">
        {/* Background Image with Dark Purple Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/04_desfile_personajes_disneyland_california.webp" 
            alt="TrazaMapas Agencia de Viajes" 
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
            <h1 className="text-3xl sm:text-4xl lg:text-[45px] font-heading font-bold uppercase tracking-tight mb-5 leading-tight text-white">
              Trazamos la ruta de tu viaje soñado
            </h1>

            <p className="text-white/85 text-[15px] font-sans font-light leading-relaxed max-w-2xl">
              De ZIVA Travel La Salle a TrazaMapas: más de 5 años diseñando experiencias memorables, paquetes todo incluido, parques Disney y circuitos internacionales desde el norte de Saltillo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. HISTORY & EVOLUTION SECTION */}
      <section className="py-[80px] px-5 sm:px-8 relative bg-[#f7f5f8]">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column Image Showcase */}
            <motion.div 
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 relative"
            >
              <div className="relative rounded-[24px] overflow-hidden shadow-xl border border-[#2c0054]/15 h-[380px] sm:h-[460px] group">
                <Image 
                  src="/images/trazamapas equipo.JPG" 
                  alt="TrazaMapas Saltillo" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>

            {/* Right Column Story Narrative */}
            <motion.div 
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 flex flex-col justify-center"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-[35px] font-heading font-bold text-brand-primary uppercase tracking-tight mb-4">
                Nuestra Trayectoria & Evolución
              </h2>

              <p className="text-smoke text-[15px] font-sans font-light leading-relaxed mb-4">
                Aperturamos nuestras puertas el <strong>15 de noviembre de 2019</strong> al norte de Saltillo bajo el nombre de <em>ZIVA Travel La Salle</em>, posicionándonos rápidamente como una agencia enfocada en la atención cálida, transparente y sin complicaciones.
              </p>

              <p className="text-smoke text-[15px] font-sans font-light leading-relaxed mb-6">
                En <strong>noviembre de 2024</strong> dimos el gran paso para consolidar nuestra propia esencia bajo la marca <strong>TrazaMapas</strong>. Este cambio nos permitió evolucionar nuestra imagen y fortalecer el compromiso de trazar itinerarios a la medida exacta de cada viajero.
              </p>

              {/* Highlight Cards Grid */}
              <div className="space-y-3.5">
                <div className="flex items-center gap-4 bg-surface-white border border-[#2c0054]/15 rounded-[16px] p-4 shadow-xs">
                  <div className="w-[44px] h-[44px] rounded-full bg-[#2C0054] text-[#F4B92A] flex items-center justify-center shrink-0 shadow-md">
                    <MapPin size={21} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-primary">Ubicación Estratégica</h4>
                    <p className="text-xs text-smoke font-light">Estamos ubicados en Av. La Salle #437, directamente frente al Colegio La Salle.</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-surface-white border border-[#2c0054]/15 rounded-[16px] p-4 shadow-xs">
                  <div className="w-[44px] h-[44px] rounded-full bg-[#2C0054] text-[#F4B92A] flex items-center justify-center shrink-0 shadow-md">
                    <Award size={21} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-primary">Agentes Certificados Disney</h4>
                    <p className="text-xs text-smoke font-light">Capacitación constante directamente con Disney para garantizar la mejor estrategia de viaje.</p>
                  </div>
                </div>
              </div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. OUR DIFFERENTIATORS & VALUES (LARGE CIRCULAR PURPLE/GOLD BADGE ICONS MATCHING TOP SECTION) */}
      <section className="py-[80px] px-5 sm:px-8 relative bg-surface-white border-y border-[#2c0054]/15">
        <div className="max-w-[1280px] mx-auto">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-[35px] font-heading font-bold text-brand-primary uppercase tracking-tight">
              ¿Por qué viajar con TrazaMapas?
            </h2>
            <p className="text-smoke text-[15px] font-sans font-light mt-2.5 leading-relaxed">
              Nos enfocamos en brindar tranquilidad, asesoría experta y acompañamiento continuo en cada paso.
            </p>
          </motion.div>

          {/* 4 Differentiator Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            
            {/* Card 1: Disney Expertise */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#f7f5f8] border border-[#2c0054]/15 rounded-[24px] p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition group"
            >
              <div>
                <div className="w-[52px] h-[52px] rounded-full bg-[#2C0054] text-[#F4B92A] flex items-center justify-center mb-5 shadow-md shrink-0 group-hover:scale-110 transition-transform">
                  <Sparkles size={25} />
                </div>
                <h3 className="text-lg font-heading font-bold text-brand-primary mb-2.5">
                  Expertos Certificados Disney
                </h3>
                <p className="text-smoke text-[15px] font-sans font-light leading-relaxed">
                  Asesoría paso a paso en hoteles Disney, boletos con fecha fija o flexible, pases Lightning Lane y reserva de experiencias gastronómicas.
                </p>
              </div>
            </motion.div>

            {/* Card 2: Personal Local Service */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#f7f5f8] border border-[#2c0054]/15 rounded-[24px] p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition group"
            >
              <div>
                <div className="w-[52px] h-[52px] rounded-full bg-[#2C0054] text-[#F4B92A] flex items-center justify-center mb-5 shadow-md shrink-0 group-hover:scale-110 transition-transform">
                  <HeartHandshake size={25} />
                </div>
                <h3 className="text-lg font-heading font-bold text-brand-primary mb-2.5">
                  Atención Cercana & Humana
                </h3>
                <p className="text-smoke text-[15px] font-sans font-light leading-relaxed">
                  Te atendemos en persona en nuestra sucursal de Saltillo o por atención directa vía WhatsApp, sin contestadores automáticos.
                </p>
              </div>
            </motion.div>

            {/* Card 3: Transparent Pricing */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#f7f5f8] border border-[#2c0054]/15 rounded-[24px] p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition group"
            >
              <div>
                <div className="w-[52px] h-[52px] rounded-full bg-[#2C0054] text-[#F4B92A] flex items-center justify-center mb-5 shadow-md shrink-0 group-hover:scale-110 transition-transform">
                  <ShieldCheck size={25} />
                </div>
                <h3 className="text-lg font-heading font-bold text-brand-primary mb-2.5">
                  Sin Cargos Ocultos
                </h3>
                <p className="text-smoke text-[15px] font-sans font-light leading-relaxed">
                  Presupuestos claros, facilidades de pago para congelar tu viaje y tarifas transparentes con impuestos ya incluidos.
                </p>
              </div>
            </motion.div>

            {/* Card 4: End-to-End Support */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-[#f7f5f8] border border-[#2c0054]/15 rounded-[24px] p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition group"
            >
              <div>
                <div className="w-[52px] h-[52px] rounded-full bg-[#2C0054] text-[#F4B92A] flex items-center justify-center mb-5 shadow-md shrink-0 group-hover:scale-110 transition-transform">
                  <Compass size={25} />
                </div>
                <h3 className="text-lg font-heading font-bold text-brand-primary mb-2.5">
                  Acompañamiento 360°
                </h3>
                <p className="text-smoke text-[15px] font-sans font-light leading-relaxed">
                  Estamos atentos a tu itinerario antes del abordaje, durante la estancia y hasta que regresas con bien a casa.
                </p>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 4. FULL SERVICES PORTFOLIO GRID (MATCHING CIRCULAR PURPLE/GOLD ICONS) */}
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
              Portafolio de Servicios Integrales
            </h2>
            <p className="text-smoke text-[15px] font-sans font-light mt-2.5 leading-relaxed">
              Diseñamos soluciones completas para todo tipo de viajeros, desde escapadas de fin de semana hasta circuitos internacionales.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Service 1: Disney */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-surface-white border border-[#2c0054]/15 rounded-[20px] p-6 sm:p-7 flex items-start gap-4 shadow-xs"
            >
              <div className="w-[52px] h-[52px] rounded-full bg-[#2C0054] text-[#F4B92A] flex items-center justify-center shrink-0 shadow-md">
                <Sparkles size={25} />
              </div>
              <div>
                <h4 className="font-heading font-bold text-base text-brand-primary mb-1">Parques Disney & Universal</h4>
                <p className="text-smoke text-[15px] font-sans font-light leading-relaxed">Boletos oficiales, hoteles temáticos y estrategia personalizada para Orlando y California.</p>
              </div>
            </motion.div>

            {/* Service 2: All Inclusive */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-surface-white border border-[#2c0054]/15 rounded-[20px] p-6 sm:p-7 flex items-start gap-4 shadow-xs"
            >
              <div className="w-[52px] h-[52px] rounded-full bg-[#2C0054] text-[#F4B92A] flex items-center justify-center shrink-0 shadow-md">
                <Palmtree size={25} />
              </div>
              <div>
                <h4 className="font-heading font-bold text-base text-brand-primary mb-1">Resorts Todo Incluido de Playa</h4>
                <p className="text-smoke text-[15px] font-sans font-light leading-relaxed">Cancún, Riviera Maya, Los Cabos y Vallarta con hospedaje, alimentos, bebidas y vuelos.</p>
              </div>
            </motion.div>

            {/* Service 3: International Circuits */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-surface-white border border-[#2c0054]/15 rounded-[20px] p-6 sm:p-7 flex items-start gap-4 shadow-xs"
            >
              <div className="w-[52px] h-[52px] rounded-full bg-[#2C0054] text-[#F4B92A] flex items-center justify-center shrink-0 shadow-md">
                <Globe2 size={25} />
              </div>
              <div>
                <h4 className="font-heading font-bold text-base text-brand-primary mb-1">Circuitos Internacionales</h4>
                <p className="text-smoke text-[15px] font-sans font-light leading-relaxed">Itinerarios guiados inolvidables por Europa, Japón, Turquía, Egipto y Sudamérica.</p>
              </div>
            </motion.div>

            {/* Service 4: Flights & Cruises */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-surface-white border border-[#2c0054]/15 rounded-[20px] p-6 sm:p-7 flex items-start gap-4 shadow-xs"
            >
              <div className="w-[52px] h-[52px] rounded-full bg-[#2C0054] text-[#F4B92A] flex items-center justify-center shrink-0 shadow-md">
                <Ship size={25} />
              </div>
              <div>
                <h4 className="font-heading font-bold text-base text-brand-primary mb-1">Cruceros & Boletos de Avión</h4>
                <p className="text-smoke text-[15px] font-sans font-light leading-relaxed">Zarpes Royal Caribbean y vuelos nacionales/internacionales saliendo desde MTY o SLW.</p>
              </div>
            </motion.div>

            {/* Service 5: Chepe & National */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="bg-surface-white border border-[#2c0054]/15 rounded-[20px] p-6 sm:p-7 flex items-start gap-4 shadow-xs"
            >
              <div className="w-[52px] h-[52px] rounded-full bg-[#2C0054] text-[#F4B92A] flex items-center justify-center shrink-0 shadow-md">
                <Sun size={25} />
              </div>
              <div>
                <h4 className="font-heading font-bold text-base text-brand-primary mb-1">Viajes Nacionales & Chepe</h4>
                <p className="text-smoke text-[15px] font-sans font-light leading-relaxed">Recorridos por las Barrancas del Cobre en el Chepe Express, Pueblos Mágicos y Chiapas.</p>
              </div>
            </motion.div>

            {/* Service 6: eSIM & Insurance */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="bg-surface-white border border-[#2c0054]/15 rounded-[20px] p-6 sm:p-7 flex items-start gap-4 shadow-xs"
            >
              <div className="w-[52px] h-[52px] rounded-full bg-[#2C0054] text-[#F4B92A] flex items-center justify-center shrink-0 shadow-md">
                <Wifi size={25} />
              </div>
              <div>
                <h4 className="font-heading font-bold text-base text-brand-primary mb-1">Seguros de Viaje & eSIM</h4>
                <p className="text-smoke text-[15px] font-sans font-light leading-relaxed">Cobertura médica internacional y conectividad a Internet móvil sin cambiar de chip.</p>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 5. LOCATION & CONTACT CALLOUT (INNER PURPLE BANNER PADDINGS 80PX TOP/BOTTOM, 20PX MIN SIDES, BUTTON GAP) */}
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
                ¿Listo para trazar tu próximo viaje?
              </h2>

              <p className="text-white/85 text-[15px] font-sans font-light leading-relaxed mb-6">
                Visítanos en nuestra oficina en <strong>Av. La Salle #437</strong> (frente al Colegio La Salle) o escríbenos directamente por WhatsApp para recibir atención personalizada sin compromiso.
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

            {/* Buttons Container with generous gap-6 separation */}
            <div className="relative z-10 flex flex-col sm:flex-row lg:flex-col gap-6 w-full sm:w-auto shrink-0">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                href="https://wa.me/528443409914?text=Hola,%20quisiera%20cotizar%20un%20viaje"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 bg-[#F4B92A] text-[#2C0054] font-bold text-sm rounded-[14px] hover:bg-white transition shadow-md inline-flex items-center justify-center gap-2.5 group shrink-0"
              >
                <span>Cotizar por WhatsApp</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <a 
                href="https://maps.google.com/?q=Av.+La+Salle+437,+La+Salle,+25240+Saltillo,+Coah." 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-[14px] border border-white/20 transition inline-flex items-center justify-center gap-2 text-center shrink-0"
              >
                <MapPin size={16} className="text-[#F4B92A]" />
                <span>Ver en Google Maps</span>
              </a>
            </div>

          </motion.div>

        </div>
      </section>

    </main>
  );
}
