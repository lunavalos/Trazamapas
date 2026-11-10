"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Heart, 
  Sparkles, 
  Palmtree, 
  Clock, 
  Calendar, 
  Users, 
  Plane, 
  Hotel, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  MessageCircle, 
  Send,
  Sun,
  Camera,
  GlassWater
} from "lucide-react";

export default function BodasPage() {
  const [formData, setFormData] = useState({
    novios: "",
    destino: "Riviera Maya",
    fecha: "",
    invitados: "50 - 100",
    telefono: "",
    mensaje: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `¡Hola TrazaMapas! Me gustaría cotizar nuestra boda en la playa.
*Novios:* ${formData.novios || "No especificado"}
*Destino de interés:* ${formData.destino}
*Fecha estimada:* ${formData.fecha || "Por definir"}
*Número de invitados:* ${formData.invitados}
*WhatsApp:* ${formData.telefono}
*Detalles adicionales:* ${formData.mensaje || "Sin mensaje adicional"}`;

    window.open(`https://wa.me/528443409914?text=${encodeURIComponent(text)}`, "_blank");
  };

  // 6 Destinos principales mencionados en el texto del cliente
  const destinosPlaya = [
    {
      nombre: "Cancún",
      estado: "Quintana Roo",
      tagline: "El azul turquesa más icónico del Caribe",
      descripcion: "Playas de arena blanca suave, atardeceres de ensueño, infraestructura hotelera de primer nivel y la mejor conectividad aérea directa para que todos tus invitados lleguen sin complicaciones.",
      imagenSugerida: "/images/bodas-destino-2.webp",
      alt: "Boda en Cancún",
    },
    {
      nombre: "Riviera Maya",
      estado: "Quintana Roo",
      tagline: "Magia caribeña entre selva y mar",
      descripcion: "El equilibrio sublime entre naturaleza virgen, cenotes sagrados, alta gastronomía y resorts all-inclusive de ultra lujo diseñados para bodas íntimas o monumentales.",
      imagenSugerida: "/images/bodas-destino-3.webp",
      alt: "Boda en Riviera Maya",
    },
    {
      nombre: "Tulum",
      estado: "Quintana Roo",
      tagline: "Estilo boho-chic y romanticismo natural",
      descripcion: "Atmósferas bohemias y sofisticadas frente al mar, hoteles boutique ecológicos, diseño vanguardista y una energía mística inigualable para enlaces memorables.",
      imagenSugerida: "/images/bodas-destino.webp",
      alt: "Boda en Tulum",
    },
    {
      nombre: "Puerto Vallarta",
      estado: "Jalisco",
      tagline: "El romance del Pacífico mexicano",
      descripcion: "La calidez de un pueblo tradicional con arquitectura colonial que se fusiona con la majestuosidad de la Bahía de Banderas y sus famosos atardeceres dorados en el mar.",
      imagenSugerida: "/images/bodas-destino-2.webp",
      alt: "Boda en Puerto Vallarta",
    },
    {
      nombre: "Huatulco",
      estado: "Oaxaca",
      tagline: "Bahías serenas de belleza protegida",
      descripcion: "9 bahías vírgenes de aguas cristalinas y oleaje tranquilo. Destino certificado sustentable, exclusivo y apacible, perfecto para celebraciones rodeadas de paz y calidez.",
      imagenSugerida: "/images/bodas-destino-3.webp",
      alt: "Boda en Huatulco",
    },
    {
      nombre: "Mazatlán",
      estado: "Sinaloa",
      tagline: "La Perla del Pacífico y su alegría única",
      descripcion: "Kilómetros de playas doradas, malecón espectacular, una rica herencia cultural y el ambiente festivo inigualable del noroeste para celebrar el amor en grande.",
      imagenSugerida: "/images/bodas-destino.webp",
      alt: "Boda en Mazatlán",
    },
  ];

  return (
    <main className="flex flex-col min-h-screen bg-[#f7f5f8]">
      
      {/* 1. HERO SECTION BODAS (Background inicial con imagen horizontal de los novios en altar) */}
      <section className="relative -mt-[104px] pt-[155px] sm:pt-[190px] pb-28 sm:pb-36 px-5 sm:px-8 bg-[#2C0054] text-white overflow-hidden min-h-[540px] lg:min-h-[620px] flex items-center">
        {/* Background Image: bodas-destino-2.webp provista por el cliente */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/bodas-destino-2.webp" 
            alt="Boda de ensueño frente al mar TrazaMapas" 
            fill 
            className="object-cover object-[center_35%] scale-105 transition-transform duration-1000" 
            priority
          />
          {/* Overlay suave con degradado lateral para legibilidad óptima y lucir a los novios */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2C0054]/95 via-[#2C0054]/80 to-[#2C0054]/40 lg:from-[#2C0054]/90 lg:via-[#2C0054]/65 lg:to-black/30" />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            {/* Badge flotante */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[#F4B92A] text-xs font-semibold uppercase tracking-wider mb-5">
              <Sparkles className="w-3.5 h-3.5 text-[#F4B92A]" />
              <span>Bodas de Destino · TrazaMapas</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-heading font-extrabold uppercase tracking-tight mb-5 leading-[1.1] text-white drop-shadow-md">
              Bodas en Playa
            </h1>

            <p className="text-white/95 text-lg sm:text-xl font-sans font-light leading-relaxed mb-8 max-w-2xl drop-shadow-sm">
              Hay momentos que marcan la vida para siempre. El día de tu boda es uno de ellos.
            </p>

            <div className="flex flex-wrap items-center gap-3.5">
              <a 
                href="https://wa.me/528443409914?text=Hola,%20quisiera%20asesor%C3%ADa%20para%20una%20Boda%20en%20Playa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[12px] bg-[#F4B92A] text-[#2C0054] font-bold text-sm hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Cotizar Boda con un Asesor</span>
              </a>

              <a 
                href="#filosofia"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[12px] bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md border border-white/20 transition-all duration-200"
              >
                <span>Conoce la Experiencia</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. FILOSOFÍA: LA MAGIA ESTÁ EN EL TIEMPO */}
      <section id="filosofia" className="py-[140px] sm:py-[160px] px-5 sm:px-8 relative bg-surface-white border-b border-[#2C0054]/10">
        <div className="max-w-[1280px] mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Narrativa */}
            <motion.div 
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 flex flex-col justify-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2C0054]/5 text-[#2C0054] text-xs font-bold uppercase tracking-wider mb-4 w-fit">
                <Clock className="w-3.5 h-3.5 text-[#F4B92A]" />
                <span>La verdadera magia</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-heading font-bold text-[#2C0054] uppercase tracking-tight mb-6 leading-tight">
                No está solamente en el mar. <br className="hidden sm:inline" />
                <span className="text-[#2C0054]/80">Está en el tiempo.</span>
              </h2>

              <p className="text-smoke text-[16px] sm:text-[17px] font-sans font-light leading-relaxed mb-5">
                La verdadera magia de una boda en la playa no está solamente en el mar, la arena o el atardecer. <strong>Está en el tiempo.</strong>
              </p>

              <p className="text-smoke text-[15px] sm:text-[16px] font-sans font-light leading-relaxed mb-5">
                Porque mientras una boda tradicional dura unas cuantas horas, <strong>una boda destino se vive durante varios días</strong>. Es la oportunidad de reunir a familiares y amigos que llegan desde diferentes lugares con un mismo propósito: celebrar el amor.
              </p>

              <p className="text-smoke text-[15px] sm:text-[16px] font-sans font-light leading-relaxed mb-8">
                Durante esos días se comparten desayunos, risas, paseos, brindis y momentos que difícilmente podrían vivirse en cualquier otra celebración. Personas que no se veían desde hace años vuelven a encontrarse, las familias conviven como pocas veces y cada instante se convierte en un recuerdo para toda la vida.
              </p>

              <div className="p-5 rounded-[16px] bg-[#fbfaff] border-l-4 border-[#F4B92A] border border-[#2C0054]/10 shadow-xs">
                <p className="font-heading font-bold text-base sm:text-lg text-[#2C0054] italic">
                  &ldquo;Eso es la magia de una boda en la playa.&rdquo;
                </p>
              </div>
            </motion.div>

            {/* Right Column: IMAGEN VERTICAL 1 (bodas-destino.webp - Centros de mesa, convivencia y detalles) */}
            <motion.div 
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-[24px] overflow-hidden shadow-2xl border border-[#2c0054]/15 h-[500px] sm:h-[580px] lg:h-[620px] group">
                {/* IMAGEN VERTICAL DE DETALLES Y RECEPCIÓN EN PLAYA */}
                <Image 
                  src="/images/bodas-destino.webp" 
                  alt="Detalles de mesa y convivencia en boda de playa" 
                  fill 
                  className="object-cover object-[center_35%] group-hover:scale-105 transition-transform duration-700" 
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                
                {/* Pill elegante inferior */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-[18px] bg-[#2C0054]/85 backdrop-blur-md border border-white/20 text-white shadow-xl">
                  <span className="text-[#F4B92A] text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Días de Celebración
                  </span>
                  <p className="text-white text-xs sm:text-sm font-medium leading-snug">
                    Desayunos, brindis, paseos y reencuentros familiares que duran días enteros.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 3. EXPERIENCIA SENSORIAL: MÁS QUE CASARSE FRENTE AL MAR */}
      <section className="py-[140px] sm:py-[160px] px-5 sm:px-8 relative bg-gradient-to-b from-[#f7f5f8] to-[#f2eef8]">
        <div className="max-w-[1280px] mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest font-bold text-[#2C0054]/70 block mb-2">
              Una historia que inicia antes de la ceremonia
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-heading font-bold text-[#2C0054] uppercase tracking-tight mb-4 leading-tight">
              Mucho más que una ceremonia
            </h2>
            <p className="text-smoke text-[15px] sm:text-[16px] font-sans font-light leading-relaxed">
              No se trata solamente de casarse frente al mar. Se trata de despertar con la emoción de que llegó el gran día, de compartir con las personas que más quieres y de vivir una celebración que inicia mucho antes de la ceremonia y continúa mucho después del último baile.
            </p>
          </div>

          {/* Gran tarjeta poética con foto vertical y cita sensorial */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white rounded-[24px] p-6 sm:p-10 border border-[#2C0054]/10 shadow-xl">
            
            {/* IMAGEN VERTICAL 2 (bodas-destino-3.webp - Pasarela de madera hacia el altar en la playa) */}
            <div className="lg:col-span-5 relative rounded-[20px] overflow-hidden h-[480px] sm:h-[560px] lg:h-[620px] border border-[#2C0054]/10 shadow-lg group">
              <Image 
                src="/images/bodas-destino-3.webp" 
                alt="Pasarela hacia el altar frente al mar en la playa" 
                fill 
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700" 
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#2C0054] text-[11px] font-bold uppercase tracking-wider shadow-md flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-[#F4B92A] fill-[#F4B92A]" />
                <span>Hacia el Altar Frente al Mar</span>
              </div>
            </div>

            {/* Texto sensorial poético */}
            <div className="lg:col-span-7 flex flex-col justify-center pl-0 lg:pl-2">
              <p className="text-smoke text-[15px] sm:text-[16px] font-sans font-light leading-relaxed mb-6">
                Cada cena, cada brindis, cada amanecer y cada puesta de sol forman parte de una historia que quedará grabada para siempre.
              </p>

              <blockquote className="relative p-6 sm:p-8 rounded-[18px] bg-gradient-to-br from-[#fbfaff] to-[#f4eef9] border-l-4 border-[#2C0054] mb-6 shadow-xs">
                <p className="font-heading text-lg sm:text-xl lg:text-[22px] font-semibold text-[#2C0054] leading-relaxed italic">
                  &ldquo;Imagina caminar hacia el altar con el mar de fondo, sentir la arena bajo tus pies, escuchar las olas mientras pronuncias tus votos y ver cómo el sol se esconde en el momento más importante de tu vida.&rdquo;
                </p>
              </blockquote>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2.5 p-3 rounded-[12px] bg-[#f7f5f8] border border-[#2C0054]/10">
                  <Palmtree className="w-4 h-4 text-[#2C0054]" />
                  <span className="text-xs font-bold text-[#2C0054]">Arena bajo tus pies</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-[12px] bg-[#f7f5f8] border border-[#2C0054]/10">
                  <Sun className="w-4 h-4 text-[#F4B92A]" />
                  <span className="text-xs font-bold text-[#2C0054]">Atardecer dorado</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-[12px] bg-[#f7f5f8] border border-[#2C0054]/10">
                  <GlassWater className="w-4 h-4 text-[#2C0054]" />
                  <span className="text-xs font-bold text-[#2C0054]">Brindis inolvidables</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. DESTINOS DE ENSUEÑO: CANCÚN, RIVIERA MAYA, TULUM, HUATULCO, PUERTO VALLARTA Y MAZATLÁN */}
      <section className="py-[140px] sm:py-[160px] px-5 sm:px-8 relative bg-surface-white border-y border-[#2C0054]/10">
        <div className="max-w-[1280px] mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-[#2C0054]/70 block mb-2">
              Escenarios de Película
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-heading font-bold text-[#2C0054] uppercase tracking-tight mb-4 leading-tight">
              Los Destinos Más Deseados de México
            </h2>
            <p className="text-smoke text-[15px] sm:text-[16px] font-sans font-light leading-relaxed">
              Cancún, Riviera Maya, Tulum, Huatulco, Puerto Vallarta y Mazatlán ofrecen escenarios que parecen de ensueño. Lugares donde cada fotografía parece sacada de una película.
            </p>
          </div>

          {/* Grid de 6 destinos con espacios preparados para imágenes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {destinosPlaya.map((destino, index) => (
              <motion.div
                key={destino.nombre}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="group rounded-[20px] bg-white border border-[#2C0054]/15 hover:border-[#2C0054]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* ESPACIO PARA IMAGEN PREPARADA POR EL USUARIO: Foto de cada destino */}
                  <div className="relative w-full h-[190px] overflow-hidden bg-[#2C0054]/5">
                    <Image 
                      src={destino.imagenSugerida} 
                      alt={destino.alt} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#2C0054] text-[10px] font-bold uppercase tracking-wider shadow-xs">
                      <MapPin className="w-3 h-3 text-[#F4B92A]" />
                      <span>{destino.estado}</span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="font-heading font-bold text-xl drop-shadow-sm">
                        {destino.nombre}
                      </h3>
                    </div>
                  </div>

                  {/* Contenido descriptivo del destino */}
                  <div className="p-5">
                    <span className="text-[11px] font-bold text-[#F4B92A] uppercase tracking-wider block mb-1.5">
                      {destino.tagline}
                    </span>
                    <p className="text-smoke text-xs sm:text-[13px] font-light leading-relaxed">
                      {destino.descripcion}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <a
                    href={`https://wa.me/528443409914?text=Hola,%20quisiera%20cotizar%20mi%20Boda%20en%20Playa%20en%20${encodeURIComponent(destino.nombre)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-[10px] bg-[#f7f5f8] hover:bg-[#2C0054] text-[#2C0054] hover:text-white font-bold text-xs transition-all duration-200 inline-flex items-center justify-center gap-2 border border-[#2C0054]/10 group-hover:border-[#2C0054]"
                  >
                    <span>Cotizar Boda en {destino.nombre}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. EN TRAZAMAPAS NOS ENCARGAMOS DE TODO (SERVICIOS Y VALOR) */}
      <section className="py-[140px] sm:py-[160px] px-5 sm:px-8 relative bg-[#2C0054] text-white overflow-hidden">
        
        {/* Glows de fondo */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F4B92A]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-[1280px] mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#F4B92A] text-xs font-semibold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-4 h-4 text-[#F4B92A]" />
              <span>Experiencia 100% Sin Estrés</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-heading font-extrabold uppercase tracking-tight mb-4 leading-tight text-white">
              Nos encargamos de todo
            </h2>

            <p className="text-white/85 text-[15px] sm:text-[17px] font-sans font-light leading-relaxed">
              Y para que tú sólo te dediques a vivir cada instante, en <strong>TrazaMapas</strong> nos encargamos de todo. No somos sólo una agencia de viajes: <strong>nos convertimos en parte de tu historia.</strong>
            </p>
          </div>

          {/* 6 Pilares de servicio */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            
            {/* Pilar 1 */}
            <div className="p-6 rounded-[20px] bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#F4B92A]/50 transition-all duration-300">
              <div className="w-10 h-10 rounded-[12px] bg-[#F4B92A] text-[#2C0054] flex items-center justify-center font-bold mb-4">
                <Hotel className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">
                Destino y Hotel Perfecto
              </h3>
              <p className="text-white/75 text-xs sm:text-sm font-light leading-relaxed">
                Te ayudamos a encontrar el destino ideal y seleccionamos las mejores propiedades y cadenas hoteleras para tu estilo de boda y presupuesto.
              </p>
            </div>

            {/* Pilar 2 */}
            <div className="p-6 rounded-[20px] bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#F4B92A]/50 transition-all duration-300">
              <div className="w-10 h-10 rounded-[12px] bg-[#F4B92A] text-[#2C0054] flex items-center justify-center font-bold mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">
                Logística de tus Invitados
              </h3>
              <p className="text-white/75 text-xs sm:text-sm font-light leading-relaxed">
                Coordinamos la llegada, hospedaje, traslados aeropuerto-hotel y resolución de dudas de cada uno de tus invitados de manera personalizada.
              </p>
            </div>

            {/* Pilar 3 */}
            <div className="p-6 rounded-[20px] bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#F4B92A]/50 transition-all duration-300">
              <div className="w-10 h-10 rounded-[12px] bg-[#F4B92A] text-[#2C0054] flex items-center justify-center font-bold mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">
                Administración de Pagos
              </h3>
              <p className="text-white/75 text-xs sm:text-sm font-light leading-relaxed">
                Administramos los pagos y reservaciones de tus invitados con planes flexibles. Los novios no tienen que preocuparse jamás por cobrar a nadie.
              </p>
            </div>

            {/* Pilar 4 */}
            <div className="p-6 rounded-[20px] bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#F4B92A]/50 transition-all duration-300">
              <div className="w-10 h-10 rounded-[12px] bg-[#F4B92A] text-[#2C0054] flex items-center justify-center font-bold mb-4">
                <Plane className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">
                Tarifas Especiales de Vuelos
              </h3>
              <p className="text-white/75 text-xs sm:text-sm font-light leading-relaxed">
                Gestionamos convenios y bloqueos con aerolíneas para asegurar las mejores tarifas y condiciones para grupos desde cualquier ciudad.
              </p>
            </div>

            {/* Pilar 5 */}
            <div className="p-6 rounded-[20px] bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#F4B92A]/50 transition-all duration-300">
              <div className="w-10 h-10 rounded-[12px] bg-[#F4B92A] text-[#2C0054] flex items-center justify-center font-bold mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">
                Alianza con Wedding Planners
              </h3>
              <p className="text-white/75 text-xs sm:text-sm font-light leading-relaxed">
                Trabajamos de la mano con los mejores Wedding Planners y proveedores certificados para que la decoración y ceremonia fluyan en perfecta armonía.
              </p>
            </div>

            {/* Pilar 6 */}
            <div className="p-6 rounded-[20px] bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#F4B92A]/50 transition-all duration-300">
              <div className="w-10 h-10 rounded-[12px] bg-[#F4B92A] text-[#2C0054] flex items-center justify-center font-bold mb-4">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">
                Contigo en Cada Paso
              </h3>
              <p className="text-white/75 text-xs sm:text-sm font-light leading-relaxed">
                Cuidamos cada boda como si fuera nuestra. Supervisamos cada detalle para que todo salga exactamente como lo imaginaste... o incluso mejor.
              </p>
            </div>

          </div>

          {/* Manifiesto y Cierre Poético */}
          <div className="max-w-3xl mx-auto rounded-[24px] bg-white/10 backdrop-blur-md border border-white/20 p-8 sm:p-12 text-center shadow-2xl">
            <p className="text-white/90 text-sm sm:text-base font-light mb-6 leading-relaxed">
              Porque entendemos que no estás organizando un viaje. <br />
              <strong className="text-white font-semibold">Estás construyendo uno de los recuerdos más importantes de tu vida.</strong>
            </p>

            <div className="space-y-2 py-4 mb-6 border-y border-white/15">
              <p className="text-lg sm:text-xl font-heading font-bold text-[#F4B92A] tracking-wide">
                Tú vive la emoción.
              </p>
              <p className="text-lg sm:text-xl font-heading font-bold text-[#F4B92A] tracking-wide">
                Tú disfruta cada abrazo.
              </p>
              <p className="text-lg sm:text-xl font-heading font-bold text-[#F4B92A] tracking-wide">
                Tú guarda cada recuerdo.
              </p>
              <p className="text-xl sm:text-2xl font-heading font-extrabold text-white pt-2">
                Nosotros nos encargamos del resto.
              </p>
            </div>

            <p className="text-white/90 font-heading text-base sm:text-lg italic mb-6">
              TrazaMapas… Porque las mejores historias de amor merecen comenzar en el paraíso.
            </p>

            <a 
              href="https://wa.me/528443409914?text=Hola,%20quisiera%20comenzar%20a%20planear%20nuestra%20boda%20en%20playa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-[12px] bg-[#F4B92A] text-[#2C0054] font-extrabold text-sm hover:bg-white transition-all duration-200 shadow-xl hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Hablar con un Especialista en Bodas</span>
            </a>
          </div>

        </div>
      </section>

      {/* 6. FORMULARIO DE ASESORÍA Y CONTACTO PARA BODAS */}
      <section className="py-[140px] sm:py-[160px] px-5 sm:px-8 relative bg-surface-white">
        <div className="max-w-[1280px] mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Información de contacto */}
            <div className="lg:col-span-5">
              <span className="text-xs uppercase tracking-widest font-bold text-[#2C0054]/70 block mb-2">
                Primer Paso
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-heading font-bold text-[#2C0054] uppercase tracking-tight mb-4 leading-tight">
                Comencemos a trazar su fecha mágica
              </h2>
              <p className="text-smoke text-[15px] font-sans font-light leading-relaxed mb-6">
                Cuéntanos tu visión, tus fechas tentativas o el destino que tienes en mente. Uno de nuestros asesores especializados te responderá con opciones de hoteles, paquetes y beneficios grupales.
              </p>

              <div className="space-y-4 pt-2 border-t border-[#2C0054]/10">
                <div className="flex items-center gap-3 text-smoke text-sm">
                  <div className="w-8 h-8 rounded-full bg-[#2C0054]/5 text-[#2C0054] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-[#F4B92A]" />
                  </div>
                  <span>Asesoría personalizada sin costo inicial</span>
                </div>
                <div className="flex items-center gap-3 text-smoke text-sm">
                  <div className="w-8 h-8 rounded-full bg-[#2C0054]/5 text-[#2C0054] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-[#F4B92A]" />
                  </div>
                  <span>Convenios con las mejores cadenas hoteleras</span>
                </div>
                <div className="flex items-center gap-3 text-smoke text-sm">
                  <div className="w-8 h-8 rounded-full bg-[#2C0054]/5 text-[#2C0054] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-[#F4B92A]" />
                  </div>
                  <span>Facilidades de pago y meses sin intereses para invitados</span>
                </div>
              </div>
            </div>

            {/* Right: Formulario */}
            <div className="lg:col-span-7 bg-[#fbfaff] p-6 sm:p-10 rounded-[24px] border border-[#2C0054]/15 shadow-xl">
              <h3 className="font-heading font-bold text-xl text-[#2C0054] mb-1">
                Solicitud de Cotización Nupcial
              </h3>
              <p className="text-smoke text-xs font-light mb-6">
                Completa este breve formulario y te contactaremos de inmediato con propuestas ideales.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#2C0054] uppercase tracking-wider mb-1.5">
                      Nombre de los novios
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Sofía & Carlos"
                      value={formData.novios}
                      onChange={(e) => setFormData({ ...formData, novios: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-[10px] border border-mist-border focus:border-[#2C0054] focus:outline-none text-sm text-cinder bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2C0054] uppercase tracking-wider mb-1.5">
                      Teléfono / WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="844 123 4567"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-[10px] border border-mist-border focus:border-[#2C0054] focus:outline-none text-sm text-cinder bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#2C0054] uppercase tracking-wider mb-1.5">
                      Destino de interés
                    </label>
                    <select
                      value={formData.destino}
                      onChange={(e) => setFormData({ ...formData, destino: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-[10px] border border-mist-border focus:border-[#2C0054] focus:outline-none text-sm text-cinder bg-white cursor-pointer"
                    >
                      <option value="Cancún">Cancún, Quintana Roo</option>
                      <option value="Riviera Maya">Riviera Maya, Quintana Roo</option>
                      <option value="Tulum">Tulum, Quintana Roo</option>
                      <option value="Puerto Vallarta">Puerto Vallarta / Riviera Nayarit</option>
                      <option value="Huatulco">Huatulco, Oaxaca</option>
                      <option value="Mazatlán">Mazatlán, Sinaloa</option>
                      <option value="Aún por definir">Aún por definir (Deseo asesoría)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2C0054] uppercase tracking-wider mb-1.5">
                      Invitados estimados
                    </label>
                    <select
                      value={formData.invitados}
                      onChange={(e) => setFormData({ ...formData, invitados: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-[10px] border border-mist-border focus:border-[#2C0054] focus:outline-none text-sm text-cinder bg-white cursor-pointer"
                    >
                      <option value="Íntima (menos de 40)">Íntima (menos de 40 invitados)</option>
                      <option value="50 - 100">50 a 100 invitados</option>
                      <option value="100 - 180">100 a 180 invitados</option>
                      <option value="Más de 200">Más de 200 invitados</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2C0054] uppercase tracking-wider mb-1.5">
                    Fecha o año tentativo
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Noviembre 2026, Primavera 2027..."
                    value={formData.fecha}
                    onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-[10px] border border-mist-border focus:border-[#2C0054] focus:outline-none text-sm text-cinder bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2C0054] uppercase tracking-wider mb-1.5">
                    Cuéntanos tu visión o preguntas
                  </label>
                  <textarea
                    rows={3}
                    placeholder="¿Tienen algún hotel en mente? ¿Tipo de ceremonia simbólica, civil o religiosa? ¿Presupuesto aproximado?"
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-[10px] border border-mist-border focus:border-[#2C0054] focus:outline-none text-sm text-cinder bg-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-[12px] bg-[#2C0054] hover:bg-black text-[#F4B92A] font-extrabold text-sm transition-all duration-200 inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar y contactar por WhatsApp</span>
                </button>
              </form>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}
