"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
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
  Wifi, 
  Camera, 
  Trophy, 
  Heart, 
  Palette, 
  BookOpen, 
  Users, 
  CheckCircle2, 
  Smile, 
  MessageCircle,
  Calendar,
  Ticket
} from "lucide-react";

export default function NosotrosPage() {
  // Datos del equipo provistos por el cliente
  const equipo = [
    {
      nombre: "Blanca",
      apodo: "Itinerarios & Rutas",
      rol: "Organizadora de Itinerarios",
      badge: "Japón 2027",
      descripcion:
        'Apasionada de los viajes, es la amiga que siempre organiza los itinerarios y te avisa de tu próximo viaje así: “Blanca te ha agregado a Japón 2027”. Con ella ya no tienes que preocuparte de nada, sólo de transferirle.',
      imagen: "/images/team/equipo-blanca.webp",
      whatsappMsg: "Hola,%20me%20gustar%C3%ADa%20planear%20mi%20itinerario%20con%20Blanca",
      colorAccent: "#F4B92A",
    },
    {
      nombre: "César",
      apodo: "El Artista del Grupo",
      rol: "Experiencias Culturales & Nightlife",
      badge: "Cultura & Fiesta",
      descripcion:
        "Es el artista del grupo, vive en las nubes (no siempre en aviones) de alma libre y despreocupada. Con él siempre tendrás el dato perfecto si vas de tour, excelente para visitar museos o ir de fiesta.",
      imagen: "/images/team/equipo-cesar.webp",
      whatsappMsg: "Hola,%20me%20gustar%C3%ADa%20asesorarme%20con%20C%C3%A9sar%20para%20un%20tour%20cultural%20o%20fiesta",
      colorAccent: "#2C0054",
    },
    {
      nombre: "Eliud",
      apodo: "El Sr. Bitácora",
      rol: "Atención & Cultura Urbana",
      badge: "Cultura Urbana & Naturaleza",
      descripcion:
        "Conocido como el Sr. Bitácora, es el más atento del grupo, servicial, alivianado, amante de la cultura urbana y la naturaleza. Tiene la mejor cabellera, lo puedes distinguir a kilómetros de distancia.",
      imagen: "/images/team/equipo-eliud.webp",
      whatsappMsg: "Hola,%20me%20gustar%C3%ADa%20cotizar%20un%20viaje%20con%20Eliud%20(Sr.%20Bit%C3%A1cora)",
      colorAccent: "#F4B92A",
    },
    {
      nombre: "Nita",
      apodo: "La Mamá del Grupo",
      rol: "Optimizadora de Presupuestos",
      badge: "Bueno, Bonito & Excelente Precio",
      descripcion:
        "Es la mamá de grupo, siempre encontrará la manera de que viajes bueno, bonito y a excelente precio. Hace rendir tu presupuesto para que pases las mejores vacaciones, le encanta la fiesta y siempre tiene la mejor actitud.",
      imagen: "/images/team/equipo-nita.webp",
      whatsappMsg: "Hola,%20me%20gustar%C3%ADa%20que%20Nita%20me%20ayude%20a%20optimizar%20mi%20presupuesto%20de%20viaje",
      colorAccent: "#2C0054",
    },
    {
      nombre: "Sendy",
      apodo: "Fotógrafa & Memorias",
      rol: "Contenido Visual & Recuerdos",
      badge: "Fotos & Videos Chidos",
      descripcion:
        "Es la que siempre trae la cámara, toma videos y fotos chidas en los viajes. Si quieres tener una memoria digital de tu experiencia, puedes invitarla a tu próximo destino.",
      imagen: "/images/team/equipo-sendy.webp",
      whatsappMsg: "Hola,%20me%20gustar%C3%ADa%20asesorar%20mi%20viaje%20con%20Sendy",
      colorAccent: "#F4B92A",
    },
    {
      nombre: "Renata",
      apodo: "La Deportista del Equipo",
      rol: "Especialista en Estadios & Deporte",
      badge: "Estadios & Fútbol Soccer",
      descripcion:
        "Es la más pequeña y deportista del equipo, siempre sabe sobre los estadios alrededor del mundo que los viajeros quieren visitar. Si eres fanático del fútbol soccer búscala cuando vengas a planear tu próximo viaje.",
      imagen: "/images/team/equipo-renata.webp",
      whatsappMsg: "Hola,%20quisiera%20asesorarme%20con%20Renata%20para%20un%20viaje%20a%20estadios%20o%20deportes",
      colorAccent: "#2C0054",
    },
    {
      nombre: "Regina",
      apodo: "Experta Disney, Universal & Swiftie",
      rol: "Agente Certificada Disney y Universal",
      badge: "Presentaciones a Detalle & Magia",
      descripcion:
        "Swiftie, amante de Disney, la adrenalina, los conciertos y todo aquello que implique magia. Organiza los itinerarios y hasta te hace una presentación para que sepas a detalle lo que vas a conocer en tu viaje. Experta en Nueva York, Disney y Universal.",
      imagen: "/images/team/equipo-regina.webp",
      whatsappMsg: "Hola,%20quisiera%20planear%20un%20viaje%20a%20Disney,%20Universal%20o%20Nueva%20York%20con%20Regina",
      colorAccent: "#F4B92A",
    },
    {
      nombre: "Valentina",
      apodo: "Directora de la Felicidad 🐾",
      rol: "Chief Happiness Officer",
      badge: "Recibimiento & Apapachos",
      descripcion:
        "Directora del Departamento de la Felicidad, es amigable, siempre se acerca a la puerta para recibirte, ama a los niños y le encanta que le sobes la pancita mientras te están elaborando tu cotización.",
      imagen: "/images/team/equipo-valentina.webp",
      whatsappMsg: "Hola,%20quisiera%20ir%20a%20la%20agencia%20a%20conocer%20a%20Valentina%20y%20cotizar%20un%20viaje",
      colorAccent: "#F4B92A",
      isPet: true,
    },
  ];

  return (
    <main className="flex flex-col min-h-screen bg-[#f7f5f8]">
      
      {/* 1. HERO SECTION (¿Quiénes somos?) */}
      <section className="relative -mt-[104px] pt-[155px] sm:pt-[190px] pb-28 sm:pb-36 px-5 sm:px-8 bg-[#2C0054] text-white overflow-hidden min-h-[500px] flex items-center">
        {/* Background Image con overlay de marca */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/04_desfile_personajes_disneyland_california.webp" 
            alt="TrazaMapas Saltillo - Quiénes Somos" 
            fill 
            className="object-cover object-center scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2C0054]/95 via-[#2C0054]/85 to-[#2C0054]/60" />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            {/* Badge flotante */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[#F4B92A] text-xs font-semibold uppercase tracking-wider mb-5">
              <Sparkles className="w-3.5 h-3.5 text-[#F4B92A]" />
              <span>Pasión por Viajar · TrazaMapas</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-heading font-extrabold uppercase tracking-tight mb-5 leading-[1.1] text-white drop-shadow-md">
              ¿Quiénes somos?
            </h1>

            <p className="text-white/95 text-lg sm:text-xl font-sans font-light leading-relaxed mb-8 max-w-2xl drop-shadow-sm">
              Somos un grupo de amigos que nos encanta viajar y queremos contagiarte nuestra pasión por los viajes.
            </p>

            <div className="flex flex-wrap items-center gap-3.5">
              <a 
                href="#equipo"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[12px] bg-[#F4B92A] text-[#2C0054] font-bold text-sm hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Users className="w-4 h-4" />
                <span>Conoce a Nuestro Equipo</span>
              </a>

              <a 
                href="https://wa.me/528443409914?text=Hola,%20quisiera%20planear%20mi%20pr%C3%B3xima%20aventura"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[12px] bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md border border-white/20 transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Planear mi Aventura</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. MANIFIESTO & PROPÓSITO (Texto exacto del cliente en tarjetas interactivas) */}
      <section className="py-[120px] sm:py-[140px] px-5 sm:px-8 relative bg-surface-white border-b border-[#2C0054]/10">
        <div className="max-w-[1280px] mx-auto">
          
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-xs uppercase tracking-widest font-bold text-[#2C0054]/70 block mb-2">
              Nuestra Esencia
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-heading font-bold text-[#2C0054] uppercase tracking-tight mb-4 leading-tight">
              Trazamos experiencias a tu medida
            </h2>
            <p className="text-smoke text-[16px] font-sans font-light leading-relaxed">
              Te ayudamos a trazar experiencias a tu medida, ya sea que quieras ir sólo o acompañado. Como Agentes Certificados Disney y Universal te daremos los mejores tips para aprovechar al máximo tu visita a estos destinos.
            </p>
          </div>

          {/* 4 Bloques de Valor del Cliente */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 rounded-[20px] bg-[#fbfaff] border border-[#2C0054]/15 hover:border-[#2C0054]/40 transition shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-[#2C0054] text-[#F4B92A] flex items-center justify-center mb-4 shadow-sm">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#2C0054] mb-2">A Tu Medida</h3>
                <p className="text-smoke text-sm font-light leading-relaxed">
                  Ya sea que viajes solo, en pareja, con amigos o en familia, adaptamos la ruta a tus tiempos e intereses.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-[20px] bg-[#fbfaff] border border-[#2C0054]/15 hover:border-[#2C0054]/40 transition shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-[#2C0054] text-[#F4B92A] flex items-center justify-center mb-4 shadow-sm">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#2C0054] mb-2">Disney & Universal</h3>
                <p className="text-smoke text-sm font-light leading-relaxed">
                  Agentes certificados con los tips oficiales más actualizados para maximizar tu tiempo y diversión.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 rounded-[20px] bg-[#fbfaff] border border-[#2C0054]/15 hover:border-[#2C0054]/40 transition shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-[#2C0054] text-[#F4B92A] flex items-center justify-center mb-4 shadow-sm">
                  <Globe2 className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#2C0054] mb-2">Nacional e Internacional</h3>
                <p className="text-smoke text-sm font-light leading-relaxed">
                  ¡Tenemos opciones de paquetes nacionales y tours internacionales a cualquier parte del mundo!
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-6 rounded-[20px] bg-[#fbfaff] border border-[#2C0054]/15 hover:border-[#2C0054]/40 transition shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-[#2C0054] text-[#F4B92A] flex items-center justify-center mb-4 shadow-sm">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#2C0054] mb-2">Atención Personalizada</h3>
                <p className="text-smoke text-sm font-light leading-relaxed">
                  Nos enfocamos en ofrecerte una atención cercana y personalizada, cuidando cada detalle como si fuera nuestro propio viaje.
                </p>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 3. SECCIÓN NUESTRO EQUIPO (El corazón de TrazaMapas con los 8 integrantes) */}
      <section id="equipo" className="py-[140px] sm:py-[160px] px-5 sm:px-8 relative bg-gradient-to-b from-[#f7f5f8] via-[#fbfaff] to-[#f7f5f8]">
        <div className="max-w-[1280px] mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2C0054]/10 text-[#2C0054] text-xs font-bold uppercase tracking-wider mb-3">
              <Users className="w-3.5 h-3.5 text-[#F4B92A]" />
              <span>Conoce a los Especialistas</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-heading font-extrabold text-[#2C0054] uppercase tracking-tight mb-4">
              Nuestro Equipo
            </h2>

            <p className="text-smoke text-[16px] font-sans font-light leading-relaxed">
              Detrás de cada reservación, recomendación y sonrisa hay un amigo listo para hacer de tu viaje una experiencia inolvidable.
            </p>
          </div>

          {/* Grid de 8 miembros del equipo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {equipo.map((miembro, index) => (
              <motion.div
                key={miembro.nombre}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className={`group rounded-[24px] bg-white border ${miembro.isPet ? 'border-[#F4B92A] ring-2 ring-[#F4B92A]/30' : 'border-[#2C0054]/15'} hover:border-[#2C0054]/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden`}
              >
                <div>
                  {/* Contenedor de Foto de Perfil */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#2C0054]/5">
                    <Image 
                      src={miembro.imagen} 
                      alt={`Foto de ${miembro.nombre} - TrazaMapas`} 
                      fill 
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Badge distintivo flotante */}
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#2C0054] text-[10px] font-bold uppercase tracking-wider shadow-xs">
                      {miembro.isPet ? (
                        <span className="text-xs">🐾</span>
                      ) : (
                        <Sparkles className="w-3 h-3 text-[#F4B92A]" />
                      )}
                      <span>{miembro.badge}</span>
                    </div>

                    {/* Nombre y apodo sobre la imagen */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="font-heading font-extrabold text-2xl drop-shadow-sm flex items-center gap-1.5">
                        {miembro.nombre}
                      </h3>
                      <p className="text-white/90 text-xs font-medium tracking-wide">
                        {miembro.apodo}
                      </p>
                    </div>
                  </div>

                  {/* Cuerpo de la tarjeta con descripción textual del cliente */}
                  <div className="p-5 sm:p-6">
                    <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#2C0054]/75 mb-2.5">
                      {miembro.rol}
                    </span>

                    <p className="text-smoke text-[14px] font-sans font-light leading-relaxed">
                      {miembro.descripcion}
                    </p>
                  </div>
                </div>

                {/* Footer de tarjeta con botón directo a WhatsApp */}
                <div className="px-5 pb-5 pt-0">
                  <a
                    href={`https://wa.me/528443409914?text=${miembro.whatsappMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-[12px] bg-[#f7f5f8] group-hover:bg-[#2C0054] text-[#2C0054] group-hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 border border-[#2C0054]/10 group-hover:border-[#2C0054]"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#F4B92A]" />
                    <span>Preguntar por {miembro.nombre}</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. HISTORIA & TRAYECTORIA (Manteniendo la foto de equipo y arraigo en Saltillo) */}
      <section className="py-[140px] sm:py-[160px] px-5 sm:px-8 relative bg-surface-white border-y border-[#2c0054]/15">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Foto Grupal del Equipo */}
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
                  alt="Equipo TrazaMapas Saltillo" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C0054]/80 via-transparent to-transparent flex flex-col justify-end p-6">
                  <span className="text-[#F4B92A] text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5" /> Familia TrazaMapas
                  </span>
                  <p className="text-white text-sm font-medium leading-snug">
                    Más de 5 años compartiendo la pasión por viajar desde el norte de Saltillo.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Narrativa de Trayectoria */}
            <motion.div 
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 flex flex-col justify-center"
            >
              <span className="text-xs uppercase tracking-widest font-bold text-[#2C0054]/70 block mb-2">
                Nuestra Trayectoria
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-heading font-bold text-[#2C0054] uppercase tracking-tight mb-4 leading-tight">
                Más de 5 años trazando historias
              </h2>

              <p className="text-smoke text-[15px] font-sans font-light leading-relaxed mb-4">
                Aperturamos nuestras puertas el <strong>15 de noviembre de 2019</strong> al norte de Saltillo, posicionándonos rápidamente como una agencia enfocada en la atención cálida, transparente y sin complicaciones.
              </p>

              <p className="text-smoke text-[15px] font-sans font-light leading-relaxed mb-6">
                En <strong>TrazaMapas</strong> consolidamos nuestra pasión por viajar con el firme compromiso de trazar itinerarios a la medida exacta de cada viajero, cuidando cada detalle como si fuera nuestro propio viaje.
              </p>

              {/* Highlights de Confianza */}
              <div className="space-y-3.5">
                <div className="flex items-center gap-4 bg-[#fbfaff] border border-[#2c0054]/15 rounded-[16px] p-4 shadow-xs">
                  <div className="w-[44px] h-[44px] rounded-full bg-[#2C0054] text-[#F4B92A] flex items-center justify-center shrink-0 shadow-md">
                    <MapPin size={21} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#2C0054]">Ubicación Estratégica</h4>
                    <p className="text-xs text-smoke font-light">Estamos ubicados en Av. La Salle #437, directamente frente al Colegio La Salle.</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-[#fbfaff] border border-[#2c0054]/15 rounded-[16px] p-4 shadow-xs">
                  <div className="w-[44px] h-[44px] rounded-full bg-[#2C0054] text-[#F4B92A] flex items-center justify-center shrink-0 shadow-md">
                    <Award size={21} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#2C0054]">Agentes Certificados Disney y Universal</h4>
                    <p className="text-xs text-smoke font-light">Capacitación constante y directa para garantizar la mejor estrategia en tus vacaciones.</p>
                  </div>
                </div>
              </div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* 5. BANNER FINAL CTA: COMIENZA A PLANEAR HOY MISMO */}
      <section className="py-[130px] sm:py-[150px] px-5 sm:px-8 relative bg-surface-white">
        <div className="max-w-[1280px] mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#2C0054] text-white rounded-[28px] py-[70px] sm:py-[80px] px-[24px] sm:px-[45px] relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-14"
          >
            {/* Resplandor dorado decorativo */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#F4B92A]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-xl text-left">
              <span className="text-[#F4B92A] text-xs font-bold uppercase tracking-wider mb-2 block">
                Tu Próxima Aventura Inicia Aquí
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-heading font-bold uppercase tracking-tight mb-4 text-white">
                Descubre el mundo con nosotros
              </h2>

              <p className="text-white/90 text-[15px] sm:text-[16px] font-sans font-light leading-relaxed mb-6">
                Comienza a planear tu próxima aventura hoy mismo. Visítanos en nuestra oficina en <strong>Av. La Salle #437</strong> o escríbenos directamente por WhatsApp para recibir atención personalizada sin compromiso.
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

            {/* Botones de acción */}
            <div className="relative z-10 flex flex-col sm:flex-row lg:flex-col gap-4 w-full sm:w-auto shrink-0">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                href="https://wa.me/528443409914?text=¡Hola%20TrazaMapas!%20Me%20gustar%C3%ADa%20comenzar%20a%20planear%20mi%20pr%C3%B3ximo%20viaje"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 bg-[#F4B92A] text-[#2C0054] font-bold text-sm rounded-[14px] hover:bg-white transition shadow-md inline-flex items-center justify-center gap-2.5 group shrink-0"
              >
                <MessageCircle size={18} className="text-[#2C0054]" />
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
