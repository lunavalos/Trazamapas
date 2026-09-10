'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full mt-auto font-sans">
      
      {/* Upper Main Footer Container with 80px top/bottom padding and 20px minimum side padding */}
      <div className="bg-surface-white border-t border-[#2c0054]/15 py-[80px]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
          
          {/* Clean 4-Column Evenly Distributed Layout across full container width */}
          <div className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row justify-between items-start gap-8 lg:gap-10 w-full">
            
            {/* Column 1: Brand Logo & About Us */}
            <div className="w-full lg:max-w-[320px] flex flex-col">
              <Link href="/" className="inline-block mb-2.5 group">
                <Image 
                  src="/images/trazamapas logo.webp" 
                  alt="TrazaMapas Logo" 
                  width={280} 
                  height={80} 
                  className="h-[64px] sm:h-[68px] w-auto object-contain transition-transform group-hover:scale-105"
                />
              </Link>

              <h4 className="font-heading font-bold text-base text-brand-primary mb-2.5">
                Sobre Nosotros
              </h4>
              <p className="text-smoke text-sm font-light leading-relaxed">
                Tu agencia de viajes de confianza al norte de Saltillo. Especialistas en la magia Disney, paquetes todo incluido de playa, circuitos internacionales y boletos de avión.
              </p>
            </div>

            {/* Column 2: Services / Servicios */}
            <div className="w-full lg:w-auto flex flex-col">
              <h4 className="font-heading font-bold text-base text-brand-primary mb-4">
                Servicios
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/disney" className="text-smoke hover:text-brand-primary transition-colors inline-flex items-center gap-1.5 group">
                    <span className="text-[#F4B92A] font-bold text-xs group-hover:translate-x-0.5 transition-transform">›</span>
                    <span>Parques Disney</span>
                  </Link>
                </li>
                <li>
                  <Link href="/viajes" className="text-smoke hover:text-brand-primary transition-colors inline-flex items-center gap-1.5 group">
                    <span className="text-[#F4B92A] font-bold text-xs group-hover:translate-x-0.5 transition-transform">›</span>
                    <span>Todo Incluido</span>
                  </Link>
                </li>
                <li>
                  <Link href="/viajes" className="text-smoke hover:text-brand-primary transition-colors inline-flex items-center gap-1.5 group">
                    <span className="text-[#F4B92A] font-bold text-xs group-hover:translate-x-0.5 transition-transform">›</span>
                    <span>Circuitos Globales</span>
                  </Link>
                </li>
                <li>
                  <Link href="/destinos" className="text-smoke hover:text-brand-primary transition-colors inline-flex items-center gap-1.5 group">
                    <span className="text-[#F4B92A] font-bold text-xs group-hover:translate-x-0.5 transition-transform">›</span>
                    <span>Viajes Nacionales</span>
                  </Link>
                </li>
                <li>
                  <Link href="/viajes" className="text-smoke hover:text-brand-primary transition-colors inline-flex items-center gap-1.5 group">
                    <span className="text-[#F4B92A] font-bold text-xs group-hover:translate-x-0.5 transition-transform">›</span>
                    <span>Vuelos & eSIM</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Company / Empresa */}
            <div className="w-full lg:w-auto flex flex-col">
              <h4 className="font-heading font-bold text-base text-brand-primary mb-4">
                Empresa
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/" className="text-smoke hover:text-brand-primary transition-colors inline-flex items-center gap-1.5 group">
                    <span className="text-[#F4B92A] font-bold text-xs group-hover:translate-x-0.5 transition-transform">›</span>
                    <span>Inicio</span>
                  </Link>
                </li>
                <li>
                  <Link href="/viajes" className="text-smoke hover:text-brand-primary transition-colors inline-flex items-center gap-1.5 group">
                    <span className="text-[#F4B92A] font-bold text-xs group-hover:translate-x-0.5 transition-transform">›</span>
                    <span>Viajes</span>
                  </Link>
                </li>
                <li>
                  <Link href="/nosotros" className="text-smoke hover:text-brand-primary transition-colors inline-flex items-center gap-1.5 group">
                    <span className="text-[#F4B92A] font-bold text-xs group-hover:translate-x-0.5 transition-transform">›</span>
                    <span>Nosotros</span>
                  </Link>
                </li>
                <li>
                  <Link href="/consejos" className="text-smoke hover:text-brand-primary transition-colors inline-flex items-center gap-1.5 group">
                    <span className="text-[#F4B92A] font-bold text-xs group-hover:translate-x-0.5 transition-transform">›</span>
                    <span>Blog</span>
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="text-smoke hover:text-brand-primary transition-colors inline-flex items-center gap-1.5 group">
                    <span className="text-[#F4B92A] font-bold text-xs group-hover:translate-x-0.5 transition-transform">›</span>
                    <span>Contacto</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact Us / Contáctanos */}
            <div className="w-full lg:w-auto flex flex-col">
              <h4 className="font-heading font-bold text-base text-brand-primary mb-4">
                Contáctanos
              </h4>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-brand-primary/70 mb-0.5">
                    Llamar / WhatsApp:
                  </span>
                  <a href="tel:8443409914" className="text-cinder font-medium hover:text-brand-primary hover:underline transition">
                    844-340-9914
                  </a>
                </div>

                <div>
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-brand-primary/70 mb-0.5">
                    Correo electrónico:
                  </span>
                  <a href="mailto:agenciadeviajes@trazamapas.com.mx" className="text-cinder font-medium hover:text-brand-primary hover:underline transition break-words">
                    agenciadeviajes@trazamapas.com.mx
                  </a>
                </div>

                <div>
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-brand-primary/70 mb-0.5">
                    Ubicación:
                  </span>
                  <a href="https://maps.google.com/?q=Av.+La+Salle+437,+La+Salle,+25240+Saltillo,+Coah." target="_blank" rel="noopener noreferrer" className="text-cinder font-medium hover:text-brand-primary hover:underline transition">
                    Av. La Salle #437, Saltillo, Coah.
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Sub-Footer Dark Purple Bar */}
      <div className="bg-[#2C0054] text-white/80 py-4">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans">
          {/* Left: Standard Privacy & Policy Links */}
          <div className="flex items-center gap-3">
            <Link href="#" className="hover:text-white transition">Aviso de Privacidad</Link>
            <span className="text-white/30">|</span>
            <Link href="#" className="hover:text-white transition">Términos y Condiciones</Link>
            <span className="text-white/30">|</span>
            <Link href="#" className="hover:text-white transition">Políticas de Reservación</Link>
          </div>

          {/* Right: Copyright */}
          <p>© {new Date().getFullYear()} TrazaMapas. Todos los derechos reservados.</p>
        </div>
      </div>

    </footer>
  );
}
