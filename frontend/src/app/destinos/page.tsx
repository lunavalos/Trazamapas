"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const DESTINOS = [
  { name: "Disney Resorts", location: "California / Florida", tag: "Certificados", link: "/disney", bg: "bg-[#2C0054] text-white" },
  { name: "Cancún y Riviera Maya", location: "Quintana Roo, México", tag: "Todo Incluido", link: "/viajes", bg: "bg-[#3d0075] text-white" },
  { name: "Universal Studios", location: "Orlando / Hollywood", tag: "Parques Temáticos", link: "/viajes", bg: "bg-[#2C0054] text-white" },
  { name: "Circuitos por Europa", location: "España, Francia, Italia", tag: "Internacional", link: "/viajes", bg: "bg-[#3d0075] text-white" },
  { name: "Parques Xcaret", location: "Riviera Maya, México", tag: "Experiencias", link: "/viajes", bg: "bg-[#2C0054] text-white" },
  { name: "Cruceros Caribeños", location: "Caribe & Las Bahamas", tag: "Marítimo", link: "/viajes", bg: "bg-[#3d0075] text-white" }
];

export default function DestinosPage() {
  return (
    <main className="flex flex-col min-h-screen bg-[#f7f5f8] pb-24">
      <section className="pt-24 pb-16 px-6 max-w-[1200px] mx-auto text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-heading font-bold text-brand-primary uppercase tracking-tight mb-4"
        >
          Destinos Recomendados
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-base sm:text-lg max-w-2xl mx-auto text-smoke font-light leading-relaxed"
        >
          Trazamos la ruta hacia los mejores rincones del mundo. Elige tu próximo viaje o consulta con nuestros asesores.
        </motion.p>
      </section>

      <section className="px-6 max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {DESTINOS.map((dest, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`p-8 rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[260px] border border-[#2c0054]/15 ${dest.bg}`}
          >
            <div>
              <span className="bg-[#F4B92A] text-[#2C0054] text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                {dest.tag}
              </span>
              <h3 className="text-2xl font-heading font-bold mt-6 mb-2 text-white">{dest.name}</h3>
              <p className="text-white/80 font-light text-sm">📍 {dest.location}</p>
            </div>
            <Link 
              href={dest.link}
              className="mt-6 inline-flex items-center text-sm font-bold hover:underline gap-1.5 text-[#F4B92A]"
            >
              Explorar Destino →
            </Link>
          </motion.div>
        ))}
      </section>
    </main>
  );
}

