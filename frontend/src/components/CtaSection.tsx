'use client';
import { ArrowRight, Phone, MapPin, Mail } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CtaSection() {
  return (
    <section className="py-[60px] px-5 sm:px-8 relative bg-[#f7f5f8]">
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
            <a 
              href="https://wa.me/528443409914?text=Hola,%20quisiera%20cotizar%20un%20viaje"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 bg-[#F4B92A] text-[#2C0054] font-bold text-sm rounded-[14px] hover:bg-white transition shadow-md inline-flex items-center justify-center gap-2.5 group shrink-0"
            >
              <span>Cotizar por WhatsApp</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>

            <Link 
              href="/contacto" 
              className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-[14px] border border-white/20 transition inline-flex items-center justify-center gap-2 text-center shrink-0"
            >
              <span>Cotizar por la página</span>
            </Link>
          </div>

        </motion.div>

      </div>
    </section>
  );
}