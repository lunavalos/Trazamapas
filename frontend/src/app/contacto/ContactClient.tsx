"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import QuoteFormSection from "@/components/QuoteFormSection";

export default function ContactClient({ categories, trips }: { categories: any[]; trips?: any[] }) {
  return (
    <main className="flex flex-col min-h-screen bg-[#f7f5f8]">
      
      {/* 1. HERO SECTION CONTACTO (Matching Disney Hero style) */}
      <section className="relative -mt-[104px] pt-[150px] sm:pt-[180px] pb-20 sm:pb-24 px-5 sm:px-8 bg-[#2C0054] text-white overflow-hidden min-h-[460px] flex items-center">
        {/* Background Image with 0.5 Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/04_desfile_personajes_disneyland_california.webp" 
            alt="Contacto TrazaMapas Agencia de Viajes" 
            fill 
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-[#2C0054]/50" />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-[45px] font-heading font-bold uppercase tracking-tight mb-4 leading-tight text-white">
              Contacto & Cotizaciones
            </h1>

            <p className="text-white/90 text-[15px] sm:text-[16px] font-sans font-light leading-relaxed">
              Estamos listos para hacer realidad tu próximo viaje. Escríbenos, llámanos o visítanos en nuestra sucursal al norte de Saltillo para diseñar juntos tu itinerario soñado.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. QUOTE & CONTACT FORM SECTION (Joined 2-Column Design) */}
      <QuoteFormSection variant="contactPage" categories={categories} trips={trips} />

    </main>
  );
}
