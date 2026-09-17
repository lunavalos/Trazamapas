"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, ShieldCheck, ArrowRight, MapPin } from "lucide-react";

export default function AboutIntroSection() {
  return (
    <section className="py-[80px] px-5 sm:px-6 relative bg-[#f7f5f8]">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-24 items-center">
          
          {/* Left Column: Image Showcase Grid */}
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-[24px] overflow-hidden shadow-xl border border-mist-border/60 h-[420px] sm:h-[480px]">
              <Image 
                src="/images/trazamapas equipo.JPG" 
                alt="TrazaMapas Agencia de Viajes" 
                fill 
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C0054]/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-xs uppercase tracking-widest font-semibold text-[#F4B92A] mb-1">
                  Nuestro Equipo
                </p>
                <h3 className="text-xl sm:text-2xl font-heading font-bold">
                  Expertos en crear experiencias inolvidables
                </h3>
              </div>
            </div>
          </motion.div>

          {/* Right Column: About Info Content (Plain text without bold strong tags) */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-[35px] font-heading font-bold text-brand-primary uppercase tracking-tight mb-4">
              Tu viaje soñado en manos de expertos locales
            </h2>

            <p className="text-smoke text-[15px] font-sans font-light leading-relaxed mb-5">
              Aperturamos el 15 de noviembre de 2019 al norte de Saltillo bajo el nombre de ZIVA Travel La Salle. En noviembre de 2024 dimos el paso para consolidar nuestra identidad propia: TrazaMapas.
            </p>

            <p className="text-smoke text-[15px] font-sans font-light leading-relaxed mb-7">
              Vendemos viajes nacionales e internacionales, vuelos, resorts todo incluido, cruceros, seguros de viaje e Internet eSIM. Nuestro gran fuerte es la magia Disney: todos nuestros asesores son Agentes Certificados Disney.
            </p>

            {/* Perfect 2x2 Grid (4 elements: 3 info items + 1 highlighted button at bottom-right) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Top Left: Agentes Certificados Disney */}
              <div className="flex items-center gap-3 bg-surface-white border border-[#2c0054]/15 rounded-[14px] p-3.5 shadow-xs">
                <Award size={18} className="text-[#F4B92A] shrink-0" />
                <span className="text-brand-primary font-semibold text-xs sm:text-sm">Agentes Certificados Disney</span>
              </div>

              {/* Top Right: Garantía & Confianza */}
              <div className="flex items-center gap-3 bg-surface-white border border-[#2c0054]/15 rounded-[14px] p-3.5 shadow-xs">
                <ShieldCheck size={18} className="text-[#F4B92A] shrink-0" />
                <span className="text-brand-primary font-semibold text-xs sm:text-sm">Garantía & Confianza</span>
              </div>

              {/* Bottom Left: Frente al Colegio La Salle */}
              <div className="flex items-center gap-3 bg-surface-white border border-[#2c0054]/15 rounded-[14px] p-3.5 shadow-xs">
                <MapPin size={18} className="text-[#F4B92A] shrink-0" />
                <span className="text-brand-primary font-semibold text-xs sm:text-sm">Frente al Colegio La Salle</span>
              </div>

              {/* Bottom Right: Highlighted CTA Button */}
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full">
                <Link
                  href="/nosotros"
                  className="w-full h-full min-h-[48px] flex items-center justify-between gap-2 bg-brand-primary text-white font-bold text-xs sm:text-sm rounded-[14px] p-3.5 hover:bg-[#3d0075] transition shadow-md group border border-brand-primary"
                >
                  <span>Conocer más sobre nosotros</span>
                  <ArrowRight size={18} className="text-[#F4B92A] group-hover:translate-x-1 transition-transform shrink-0" />
                </Link>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
