'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Palmtree,
  Globe2,
  Compass,
  ArrowRight,
  Sparkles,
  Castle,
  Ticket,
  RollerCoaster,
  Heart,
  Users,
  Hotel,
  Plane,
  Route,
  Sliders,
  ShieldCheck,
  X
} from 'lucide-react';
import { getActiveRntDocument } from '@/lib/payload';

type DropdownKey = 'viajes' | 'disney' | 'universal' | 'bodas' | null;

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [rntModalOpen, setRntModalOpen] = useState(false);
  const [rntDoc, setRntDoc] = useState<{ url: string; vigencia: string }>({
    url: '/images/RNT-trazamapas-2026.pdf',
    vigencia: '2026',
  });

  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  // Load active RNT document from Payload CMS if available
  useEffect(() => {
    getActiveRntDocument().then((doc) => {
      if (doc?.url) {
        setRntDoc({
          url: doc.url,
          vigencia: doc.vigencia || '2026',
        });
      }
    });
  }, []);

  // Close dropdowns and mobile drawer on route change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    setRntModalOpen(false);
  }, [pathname]);

  // Lock body scroll when RNT modal is open
  useEffect(() => {
    if (rntModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [rntModalOpen]);

  // Handle outside click & escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setRntModalOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleMouseEnter = (key: DropdownKey) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const toggleMobileAccordion = (key: string) => {
    setMobileExpanded(prev => prev === key ? null : key);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-3.5 z-50 w-full px-4 sm:px-6 relative"
      >
        <div className="max-w-[1280px] mx-auto">

          {/* Main Navigation Container (pill shape - full width) */}
          <div
            ref={navContainerRef}
            className="w-full bg-surface-white border border-mist-border/70 rounded-[16px] shadow-sm h-[64px] px-4 sm:px-6 relative flex items-center justify-between"
          >

            {/* Left: Logo */}
            <Link href="/" className="flex items-center group shrink-0 mr-3 xl:mr-6">
              <Image
                src="/images/trazamapas logo.webp"
                alt="TrazaMapas Logo"
                width={200}
                height={55}
                className="h-[46px] xl:h-[52px] w-auto object-contain transition-transform group-hover:scale-105"
                style={{ width: 'auto' }}
                priority
              />
            </Link>

            {/* Center: Desktop Navigation Links with Mega Menu Triggers */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 font-sans text-cinder">

              {/* 1. Inicio */}
              <Link
                href="/"
                className={`px-3 xl:px-3.5 py-1.5 rounded-[10px] text-xs xl:text-sm font-semibold transition-all duration-150 ${pathname === '/'
                  ? 'bg-brand-primary text-white'
                  : 'text-cinder hover:bg-brand-primary hover:text-white'
                  }`}
              >
                Inicio
              </Link>

              {/* 2. Nosotros */}
              <Link
                href="/nosotros"
                className={`px-3 xl:px-3.5 py-1.5 rounded-[10px] text-xs xl:text-sm font-semibold transition-all duration-150 ${pathname === '/nosotros'
                  ? 'bg-brand-primary text-white'
                  : 'text-cinder hover:bg-brand-primary hover:text-white'
                  }`}
              >
                Nosotros
              </Link>

              {/* 3. Viajes (Mega menu dropdown) */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('viajes')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(prev => prev === 'viajes' ? null : 'viajes')}
                  aria-expanded={activeDropdown === 'viajes'}
                  className={`px-3 xl:px-3.5 py-1.5 rounded-[10px] text-xs xl:text-sm font-semibold transition-all duration-150 inline-flex items-center gap-1 cursor-pointer ${activeDropdown === 'viajes' || (pathname.startsWith('/viajes') && !pathname.includes('cruceros'))
                    ? 'bg-brand-primary text-white'
                    : 'text-cinder hover:bg-brand-primary hover:text-white'
                    }`}
                >
                  <span>Viajes</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'viajes' ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* 4. Disney (Mega menu dropdown) */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('disney')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(prev => prev === 'disney' ? null : 'disney')}
                  aria-expanded={activeDropdown === 'disney'}
                  className={`px-3 xl:px-3.5 py-1.5 rounded-[10px] text-xs xl:text-sm font-semibold transition-all duration-150 inline-flex items-center gap-1 cursor-pointer ${activeDropdown === 'disney' || pathname.startsWith('/disney')
                    ? 'bg-brand-primary text-white'
                    : 'text-cinder hover:bg-brand-primary hover:text-white'
                    }`}
                >
                  <span>Disney</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'disney' ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* 5. Universal (Mega menu dropdown) */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('universal')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(prev => prev === 'universal' ? null : 'universal')}
                  aria-expanded={activeDropdown === 'universal'}
                  className={`px-3 xl:px-3.5 py-1.5 rounded-[10px] text-xs xl:text-sm font-semibold transition-all duration-150 inline-flex items-center gap-1 cursor-pointer ${activeDropdown === 'universal'
                    ? 'bg-brand-primary text-white'
                    : 'text-cinder hover:bg-brand-primary hover:text-white'
                    }`}
                >
                  <span>Universal</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'universal' ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* 6. Cruceros */}
              <Link
                href="/viajes?categoria=cruceros"
                className={`px-3 xl:px-3.5 py-1.5 rounded-[10px] text-xs xl:text-sm font-semibold transition-all duration-150 ${pathname.includes('categoria=cruceros')
                  ? 'bg-brand-primary text-white'
                  : 'text-cinder hover:bg-brand-primary hover:text-white'
                  }`}
              >
                Cruceros
              </Link>

              {/* 7. Bodas y Eventos (Mega menu dropdown) */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('bodas')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(prev => prev === 'bodas' ? null : 'bodas')}
                  aria-expanded={activeDropdown === 'bodas'}
                  className={`px-3 xl:px-3.5 py-1.5 rounded-[10px] text-xs xl:text-sm font-semibold transition-all duration-150 inline-flex items-center gap-1 cursor-pointer ${activeDropdown === 'bodas' || pathname.startsWith('/bodas')
                    ? 'bg-brand-primary text-white'
                    : 'text-cinder hover:bg-brand-primary hover:text-white'
                    }`}
                >
                  <span>Bodas y Eventos</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'bodas' ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* 8. Contacto */}
              <Link
                href="/contacto"
                className={`px-2.5 xl:px-3 py-1.5 rounded-[10px] text-xs xl:text-sm font-semibold transition-all duration-150 ${pathname === '/contacto'
                  ? 'bg-brand-primary text-white'
                  : 'text-cinder hover:bg-brand-primary hover:text-white'
                  }`}
              >
                Contacto
              </Link>

              {/* 9. RNT (Registro Nacional de Turismo) */}
              <button
                type="button"
                onClick={() => {
                  setActiveDropdown(null);
                  setRntModalOpen(true);
                }}
                className={`px-2.5 xl:px-3 py-1.5 rounded-[10px] text-xs xl:text-sm font-semibold transition-all duration-150 cursor-pointer ${rntModalOpen
                  ? 'bg-brand-primary text-white'
                  : 'text-cinder hover:bg-brand-primary hover:text-white'
                  }`}
                title="Registro Nacional de Turismo"
              >
                RNT
              </button>
            </nav>

            {/* Right End: "Cotizar Viaje" button */}
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="https://wa.me/528443409914?text=Hola,%20quisiera%20cotizar%20un%20viaje"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center justify-center px-5 py-2 rounded-[10px] bg-brand-primary text-white font-semibold hover:bg-[#3d0075] transition-all duration-150 text-xs xl:text-sm shadow-sm shrink-0"
            >
              Cotizar Viaje
            </motion.a>

            {/* Mobile/Tablet Hamburger Icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 rounded-[10px] border border-mist-border text-cinder flex items-center justify-center hover:bg-surface-lift transition cursor-pointer"
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            {/* DESKTOP MEGA MENU DROPDOWN PANEL */}
            <AnimatePresence>
              {activeDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.99 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={() => {
                    if (closeTimeoutRef.current) {
                      clearTimeout(closeTimeoutRef.current);
                      closeTimeoutRef.current = null;
                    }
                  }}
                  onMouseLeave={handleMouseLeave}
                  className="hidden lg:block absolute top-[calc(100%+10px)] left-0 right-0 w-full bg-white/98 backdrop-blur-md rounded-[24px] border border-mist-border/80 shadow-2xl p-7 xl:p-8 z-50 overflow-hidden"
                >

                  {/* 1. MEGA MENU: VIAJES */}
                  {activeDropdown === 'viajes' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-stretch">

                      {/* Column 1: Viajes Nacionales (4 cols) */}
                      <div className="lg:col-span-4 flex flex-col justify-between border-r border-[#2C0054]/10 pr-3 xl:pr-6">
                        <div>
                          <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-[#2C0054]/10">
                            <div className="flex items-center gap-2">
                              <Palmtree className="w-4 h-4 text-[#2C0054]" />
                              <span className="text-xs xl:text-[13px] font-extrabold uppercase tracking-wider text-[#2C0054]">
                                Viajes Nacionales
                              </span>
                            </div>
                            <span className="text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#2C0054]/5 text-[#2C0054]">
                              México
                            </span>
                          </div>

                          <div className="flex flex-col gap-2">
                            {/* Hotelería */}
                            <Link
                              href="/viajes?categoria=nacionales&tipo=hoteleria"
                              onClick={() => setActiveDropdown(null)}
                              className="group/item p-3 xl:p-3.5 rounded-[14px] hover:bg-[#2C0054] transition-all duration-150 flex items-start gap-3.5"
                            >
                              <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-[12px] bg-[#2C0054]/5 text-[#2C0054] group-hover/item:bg-white group-hover/item:text-[#2C0054] flex items-center justify-center shrink-0 transition-colors mt-0.5">
                                <Hotel className="w-4 h-4 xl:w-5 xl:h-5" />
                              </div>
                              <div>
                                <h5 className="font-heading font-bold text-sm xl:text-[15px] text-[#2C0054] group-hover/item:text-white transition-colors">
                                  Hotelería
                                </h5>
                                <p className="text-xs xl:text-[12.5px] text-smoke group-hover/item:text-white/85 font-normal leading-relaxed transition-colors mt-0.5">
                                  Resorts todo incluido, hoteles de playa y estancias boutique.
                                </p>
                              </div>
                            </Link>

                            {/* Paquete (Vuelo + Hotel) */}
                            <Link
                              href="/viajes?categoria=nacionales&tipo=paquete"
                              onClick={() => setActiveDropdown(null)}
                              className="group/item p-3 xl:p-3.5 rounded-[14px] hover:bg-[#2C0054] transition-all duration-150 flex items-start gap-3.5"
                            >
                              <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-[12px] bg-[#2C0054]/5 text-[#2C0054] group-hover/item:bg-white group-hover/item:text-[#2C0054] flex items-center justify-center shrink-0 transition-colors mt-0.5">
                                <Plane className="w-4 h-4 xl:w-5 xl:h-5" />
                              </div>
                              <div>
                                <h5 className="font-heading font-bold text-sm xl:text-[15px] text-[#2C0054] group-hover/item:text-white transition-colors">
                                  Paquete (Vuelo + Hotel)
                                </h5>
                                <p className="text-xs xl:text-[12.5px] text-smoke group-hover/item:text-white/85 font-normal leading-relaxed transition-colors mt-0.5">
                                  Vuelos redondos con tarifas congeladas y hospedaje garantizado.
                                </p>
                              </div>
                            </Link>

                            {/* Tours y experiencias */}
                            <Link
                              href="/viajes?categoria=nacionales&tipo=tours"
                              onClick={() => setActiveDropdown(null)}
                              className="group/item p-3 xl:p-3.5 rounded-[14px] hover:bg-[#2C0054] transition-all duration-150 flex items-start gap-3.5"
                            >
                              <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-[12px] bg-[#2C0054]/5 text-[#2C0054] group-hover/item:bg-white group-hover/item:text-[#2C0054] flex items-center justify-center shrink-0 transition-colors mt-0.5">
                                <Compass className="w-4 h-4 xl:w-5 xl:h-5" />
                              </div>
                              <div>
                                <h5 className="font-heading font-bold text-sm xl:text-[15px] text-[#2C0054] group-hover/item:text-white transition-colors">
                                  Tours y experiencias
                                </h5>
                                <p className="text-xs xl:text-[12.5px] text-smoke group-hover/item:text-white/85 font-normal leading-relaxed transition-colors mt-0.5">
                                  Excursiones, parques Xcaret, traslados y actividades guiadas.
                                </p>
                              </div>
                            </Link>
                          </div>
                        </div>

                        <div className="pt-3 mt-3 border-t border-[#2C0054]/10">
                          <Link
                            href="/viajes?categoria=nacionales"
                            onClick={() => setActiveDropdown(null)}
                            className="text-xs xl:text-[13px] font-bold text-[#2C0054] hover:text-[#F4B92A] transition-colors inline-flex items-center gap-1.5 py-1"
                          >
                            <span>Ver todos los destinos nacionales</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>

                      {/* Column 2: Viajes Internacionales (4 cols) */}
                      <div className="lg:col-span-4 flex flex-col justify-between border-r border-[#2C0054]/10 pr-3 xl:pr-6">
                        <div>
                          <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-[#2C0054]/10">
                            <div className="flex items-center gap-2">
                              <Globe2 className="w-4 h-4 text-[#2C0054]" />
                              <span className="text-xs xl:text-[13px] font-extrabold uppercase tracking-wider text-[#2C0054]">
                                Viajes Internacionales
                              </span>
                            </div>
                            <span className="text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#2C0054]/5 text-[#2C0054]">
                              Mundo
                            </span>
                          </div>

                          <div className="flex flex-col gap-2.5">
                            {/* Circuitos con operadores */}
                            <div className="p-3.5 xl:p-4 rounded-[16px] bg-[#f7f5f8]/80 border border-[#2C0054]/10">
                              <div className="flex items-center gap-2.5 mb-2.5">
                                <div className="w-8 h-8 xl:w-9 xl:h-9 rounded-[10px] bg-[#2C0054] text-[#F4B92A] flex items-center justify-center shrink-0">
                                  <Route className="w-4 h-4" />
                                </div>
                                <div>
                                  <h5 className="font-heading font-bold text-sm xl:text-[15px] text-[#2C0054]">
                                    Circuitos
                                  </h5>
                                  <span className="text-xs text-smoke block">Operadores internacionales</span>
                                </div>
                              </div>

                              {/* Sub-items: Mega Travel, Nefertari, Eme Travel */}
                              <div className="flex flex-col gap-1.5 pl-2.5 border-l-2 border-[#2C0054]/20 ml-3.5 mt-1.5">
                                <Link
                                  href="/viajes?categoria=internacionales&operador=mega-travel"
                                  onClick={() => setActiveDropdown(null)}
                                  className="text-[13px] xl:text-sm font-semibold text-[#2C0054] hover:bg-white px-2.5 py-1.5 rounded-[8px] transition-all flex items-center justify-between group/op"
                                >
                                  <span className="group-hover/op:translate-x-0.5 transition-transform">› Mega Travel</span>
                                  <span className="text-xs text-smoke font-normal">Europa & Asia</span>
                                </Link>
                                <Link
                                  href="/viajes?categoria=internacionales&operador=nefertari"
                                  onClick={() => setActiveDropdown(null)}
                                  className="text-[13px] xl:text-sm font-semibold text-[#2C0054] hover:bg-white px-2.5 py-1.5 rounded-[8px] transition-all flex items-center justify-between group/op"
                                >
                                  <span className="group-hover/op:translate-x-0.5 transition-transform">› Nefertari</span>
                                  <span className="text-xs text-smoke font-normal">Egipto & Medio Oriente</span>
                                </Link>
                                <Link
                                  href="/viajes?categoria=internacionales&operador=eme-travel"
                                  onClick={() => setActiveDropdown(null)}
                                  className="text-[13px] xl:text-sm font-semibold text-[#2C0054] hover:bg-white px-2.5 py-1.5 rounded-[8px] transition-all flex items-center justify-between group/op"
                                >
                                  <span className="group-hover/op:translate-x-0.5 transition-transform">› Eme Travel</span>
                                  <span className="text-xs text-smoke font-normal">Europa & Mediterráneo</span>
                                </Link>
                              </div>
                            </div>

                            {/* Viajes Personalizados */}
                            <Link
                              href="/contacto?servicio=viaje-personalizado"
                              onClick={() => setActiveDropdown(null)}
                              className="group/item p-3 xl:p-3.5 rounded-[14px] hover:bg-[#2C0054] transition-all duration-150 flex items-start gap-3.5"
                            >
                              <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-[12px] bg-[#2C0054]/5 text-[#2C0054] group-hover/item:bg-white group-hover/item:text-[#2C0054] flex items-center justify-center shrink-0 transition-colors mt-0.5">
                                <Sliders className="w-4 h-4 xl:w-5 xl:h-5" />
                              </div>
                              <div>
                                <h5 className="font-heading font-bold text-sm xl:text-[15px] text-[#2C0054] group-hover/item:text-white transition-colors">
                                  Viajes Personalizados
                                </h5>
                                <p className="text-xs xl:text-[12.5px] text-smoke group-hover/item:text-white/85 font-normal leading-relaxed transition-colors mt-0.5">
                                  ¿Quieres viajar por tu propia cuenta y a tu ritmo? Realizamos itinerarios a tu medida.
                                </p>
                              </div>
                            </Link>
                          </div>
                        </div>

                        <div className="pt-3 mt-3 border-t border-[#2C0054]/10">
                          <Link
                            href="/viajes?categoria=internacionales"
                            onClick={() => setActiveDropdown(null)}
                            className="text-xs xl:text-[13px] font-bold text-[#2C0054] hover:text-[#F4B92A] transition-colors inline-flex items-center gap-1.5 py-1"
                          >
                            <span>Ver todos los destinos internacionales</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>

                      {/* Column 3: Portada & Promociones de Viajes (4 cols) */}
                      <div className="lg:col-span-4 rounded-[18px] border border-[#2C0054]/15 bg-gradient-to-br from-[#fbfaff] to-[#f4eef9] p-5 flex flex-col justify-between shadow-xs hover:border-[#2C0054]/30 transition-all">
                        <div>
                          {/* Portada Viajes */}
                          <div className="relative w-full h-[140px] xl:h-[150px] rounded-[14px] overflow-hidden mb-3.5 group shadow-xs">
                            <Image
                              src="/images/viajes-mega-cover.webp"
                              alt="Viajes y Promociones"
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                              sizes="(max-width: 1024px) 100vw, 400px"
                            />
                            <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2C0054]/85 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-wider">
                              <Sparkles className="w-3.5 h-3.5 text-[#F4B92A]" />
                              <span>Temporada 2026</span>
                            </div>
                          </div>

                          <h4 className="font-heading font-bold text-base xl:text-lg text-[#2C0054] mb-1.5">
                            Promociones & Temporadas
                          </h4>
                          <p className="text-xs xl:text-[13px] text-smoke font-normal leading-relaxed mb-4">
                            Tarifas exclusivas en hotelería, paquetes todo incluido y circuitos internacionales con salidas programadas.
                          </p>
                        </div>
                        <div className="pt-1">
                          <a
                            href="https://wa.me/528443409914?text=Hola,%20quisiera%20cotizar%20un%20viaje"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-[12px] bg-[#2C0054] text-[#F4B92A] hover:bg-black font-bold text-xs xl:text-sm transition-colors shadow-sm"
                          >
                            <span>Cotizar viaje con un Asesor</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* 2. MEGA MENU: DISNEY */}
                  {activeDropdown === 'disney' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-stretch">

                      {/* Left: Enlaces Disney (8 cols) */}
                      <div className="lg:col-span-8 flex flex-col justify-between pr-2 xl:pr-4">
                        <div>
                          <div className="flex items-center justify-between mb-5 pb-2.5 border-b border-[#2C0054]/10">
                            <span className="text-xs xl:text-[13px] font-extrabold uppercase tracking-wider text-[#2C0054]">
                              Agentes Certificados Disney y Universal
                            </span>
                            <span className="text-xs xl:text-[13px] text-[#2C0054] font-bold flex items-center gap-1.5 bg-[#2C0054]/5 px-3 py-1 rounded-full">
                              <Sparkles className="w-3.5 h-3.5 text-[#F4B92A]" /> Planificación Oficial
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-5">
                            <Link
                              href="/disney"
                              onClick={() => setActiveDropdown(null)}
                              className="group/item p-5 xl:p-6 rounded-[16px] bg-[#f7f5f8]/80 hover:bg-[#2C0054] border border-[#2C0054]/10 hover:border-[#2C0054] transition-all duration-200 flex flex-col justify-between"
                            >
                              <div>
                                <div className="w-10 h-10 xl:w-11 xl:h-11 rounded-[12px] bg-[#2C0054] group-hover/item:bg-white text-[#F4B92A] group-hover/item:text-[#2C0054] flex items-center justify-center mb-3 transition-colors shrink-0">
                                  <Castle className="w-5 h-5" />
                                </div>
                                <h4 className="font-heading font-bold text-base xl:text-lg text-[#2C0054] group-hover/item:text-white mb-2 transition-colors">
                                  Guía & Paquetes Disney
                                </h4>
                                <p className="text-xs xl:text-[13.5px] text-smoke group-hover/item:text-white/85 font-normal leading-relaxed transition-colors">
                                  Conoce nuestra guía especial con recomendaciones, parques temáticos y beneficios de hospedaje oficial.
                                </p>
                              </div>
                              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#2C0054] group-hover/item:text-[#F4B92A] transition-colors">
                                <span>Ver paquetes y hoteles</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </div>
                            </Link>

                            <Link
                              href="/disney#parques"
                              onClick={() => setActiveDropdown(null)}
                              className="group/item p-5 xl:p-6 rounded-[16px] bg-[#f7f5f8]/80 hover:bg-[#2C0054] border border-[#2C0054]/10 hover:border-[#2C0054] transition-all duration-200 flex flex-col justify-between"
                            >
                              <div>
                                <div className="w-10 h-10 xl:w-11 xl:h-11 rounded-[12px] bg-[#2C0054] group-hover/item:bg-white text-[#F4B92A] group-hover/item:text-[#2C0054] flex items-center justify-center mb-3 transition-colors shrink-0">
                                  <Ticket className="w-5 h-5" />
                                </div>
                                <h4 className="font-heading font-bold text-base xl:text-lg text-[#2C0054] group-hover/item:text-white mb-2 transition-colors">
                                  Boletos & Hoteles Resort
                                </h4>
                                <p className="text-xs xl:text-[13.5px] text-smoke group-hover/item:text-white/85 font-normal leading-relaxed transition-colors">
                                  Walt Disney World (Orlando), Disneyland Resort (California) y Disney Cruise Line.
                                </p>
                              </div>
                              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#2C0054] group-hover/item:text-[#F4B92A] transition-colors">
                                <span>Explorar boletos y resorts</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </div>
                            </Link>
                          </div>
                        </div>

                        <div className="mt-5 pt-3.5 border-t border-[#2C0054]/10 flex items-center justify-between">
                          <Link
                            href="/disney"
                            onClick={() => setActiveDropdown(null)}
                            className="text-xs xl:text-sm font-bold text-[#2C0054] hover:text-[#F4B92A] transition-colors inline-flex items-center gap-2"
                          >
                            <Castle className="w-4 h-4" />
                            <span>Explorar toda la magia Disney</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                          <span className="text-xs text-smoke font-normal">Asesores Certificados</span>
                        </div>
                      </div>

                      {/* Right: Portada & Promociones Disney (4 cols) */}
                      <div className="lg:col-span-4 rounded-[18px] border border-[#2C0054]/15 bg-gradient-to-br from-[#fbfaff] to-[#f4eef9] p-5 flex flex-col justify-between shadow-xs hover:border-[#2C0054]/30 transition-all">
                        <div>
                          {/* Portada Disney */}
                          <div className="relative w-full h-[140px] xl:h-[150px] rounded-[14px] overflow-hidden mb-3.5 group shadow-xs">
                            <Image
                              src="/images/disney-mega-cover.webp"
                              alt="Disney Portada"
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                              sizes="(max-width: 1024px) 100vw, 400px"
                            />
                            <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2C0054]/85 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-wider">
                              <Sparkles className="w-3.5 h-3.5 text-[#F4B92A]" />
                              <span>Magia Oficial</span>
                            </div>
                          </div>

                          <h4 className="font-heading font-bold text-base xl:text-lg text-[#2C0054] mb-1.5">
                            Promociones y Paquetes Disney
                          </h4>
                          <p className="text-xs xl:text-[13px] text-smoke font-normal leading-relaxed mb-4">
                            Tarifas oficiales, planes de comidas y beneficios exclusivos de hospedaje en hoteles Resort.
                          </p>
                        </div>
                        <div className="pt-1">
                          <a
                            href="https://wa.me/528443409914?text=Hola,%20quisiera%20cotizar%20un%20viaje%20a%20Disney"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-[12px] bg-[#2C0054] text-[#F4B92A] hover:bg-black font-bold text-xs xl:text-sm transition-colors shadow-sm"
                          >
                            <span>Hablar con un Agente Disney</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* 3. MEGA MENU: UNIVERSAL */}
                  {activeDropdown === 'universal' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-stretch">

                      {/* Left: Universal Options (8 cols) */}
                      <div className="lg:col-span-8 flex flex-col justify-between pr-2 xl:pr-4">
                        <div>
                          <div className="flex items-center justify-between mb-5 pb-2.5 border-b border-[#2C0054]/10">
                            <span className="text-xs xl:text-[13px] font-extrabold uppercase tracking-wider text-[#2C0054]">
                              Parques Universal Destinations
                            </span>
                            <span className="text-xs xl:text-[13px] text-[#2C0054] font-bold flex items-center gap-1.5 bg-[#2C0054]/5 px-3 py-1 rounded-full">
                              <Sparkles className="w-3.5 h-3.5 text-[#F4B92A]" /> Orlando, Hollywood & Epic Universe
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-5">
                            <a
                              href="https://wa.me/528443409914?text=Hola,%20quisiera%20cotizar%20Universal%20Orlando%20Resort"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/item p-5 xl:p-6 rounded-[16px] bg-[#f7f5f8]/80 hover:bg-[#2C0054] border border-[#2C0054]/10 hover:border-[#2C0054] transition-all duration-200 flex flex-col justify-between"
                            >
                              <div>
                                <div className="w-10 h-10 xl:w-11 xl:h-11 rounded-[12px] bg-[#2C0054] group-hover/item:bg-white text-[#F4B92A] group-hover/item:text-[#2C0054] flex items-center justify-center mb-3 transition-colors shrink-0">
                                  <RollerCoaster className="w-5 h-5" />
                                </div>
                                <h4 className="font-heading font-bold text-base xl:text-lg text-[#2C0054] group-hover/item:text-white mb-2 transition-colors">
                                  Universal Orlando Resort
                                </h4>
                                <p className="text-xs xl:text-[13.5px] text-smoke group-hover/item:text-white/85 font-normal leading-relaxed transition-colors">
                                  Universal Studios Florida, Islands of Adventure y parque acuático Volcano Bay.
                                </p>
                              </div>
                              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#2C0054] group-hover/item:text-[#F4B92A] transition-colors">
                                <span>Ver boletos y hoteles</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </div>
                            </a>

                            <a
                              href="https://wa.me/528443409914?text=Hola,%20quisiera%20cotizar%20Epic%20Universe"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/item p-5 xl:p-6 rounded-[16px] bg-[#f7f5f8]/80 hover:bg-[#2C0054] border border-[#2C0054]/10 hover:border-[#2C0054] transition-all duration-200 flex flex-col justify-between"
                            >
                              <div>
                                <div className="w-10 h-10 xl:w-11 xl:h-11 rounded-[12px] bg-[#2C0054] group-hover/item:bg-white text-[#F4B92A] group-hover/item:text-[#2C0054] flex items-center justify-center mb-3 transition-colors shrink-0">
                                  <Sparkles className="w-5 h-5" />
                                </div>
                                <h4 className="font-heading font-bold text-base xl:text-lg text-[#2C0054] group-hover/item:text-white mb-2 transition-colors">
                                  Universal Epic Universe
                                </h4>
                                <p className="text-xs xl:text-[13.5px] text-smoke group-hover/item:text-white/85 font-normal leading-relaxed transition-colors">
                                  El parque temático más esperado con mundos inmersivos de última generación.
                                </p>
                              </div>
                              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#2C0054] group-hover/item:text-[#F4B92A] transition-colors">
                                <span>Conocer Epic Universe</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </div>
                            </a>
                          </div>
                        </div>

                        <div className="mt-5 pt-3.5 border-t border-[#2C0054]/10 flex items-center justify-between">
                          <a
                            href="https://wa.me/528443409914?text=Hola,%20quisiera%20cotizar%20Universal%20Studios"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs xl:text-sm font-bold text-[#2C0054] hover:text-[#F4B92A] transition-colors inline-flex items-center gap-2"
                          >
                            <Ticket className="w-4 h-4" />
                            <span>Cotizar boletos y hoteles Universal</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                          <span className="text-xs text-smoke font-normal">Asesoría directa</span>
                        </div>
                      </div>

                      {/* Right: Portada & Promociones Universal (4 cols) */}
                      <div className="lg:col-span-4 rounded-[18px] border border-[#2C0054]/15 bg-gradient-to-br from-[#fbfaff] to-[#f4eef9] p-5 flex flex-col justify-between shadow-xs hover:border-[#2C0054]/30 transition-all">
                        <div>
                          {/* Portada Universal */}
                          <div className="relative w-full h-[140px] xl:h-[150px] rounded-[14px] overflow-hidden mb-3.5 group shadow-xs">
                            <Image
                              src="/images/universal-orlando-mega-cover.webp"
                              alt="Universal Orlando Resort"
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                              sizes="(max-width: 1024px) 100vw, 400px"
                            />
                            <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2C0054]/85 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-wider">
                              <Sparkles className="w-3.5 h-3.5 text-[#F4B92A]" />
                              <span>Universal Destinations</span>
                            </div>
                          </div>

                          <h4 className="font-heading font-bold text-base xl:text-lg text-[#2C0054] mb-1.5">
                            Boletos & Hoteles Temáticos
                          </h4>
                          <p className="text-xs xl:text-[13px] text-smoke font-normal leading-relaxed mb-4">
                            Universal Studios Florida, Islands of Adventure, Volcano Bay y el revolucionario Epic Universe.
                          </p>
                        </div>
                        <div className="pt-1">
                          <a
                            href="https://wa.me/528443409914?text=Hola,%20quisiera%20cotizar%20Universal%20Studios"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-[12px] bg-[#2C0054] text-[#F4B92A] hover:bg-black font-bold text-xs xl:text-sm transition-colors shadow-sm"
                          >
                            <span>Solicitar cotización Universal</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* 4. MEGA MENU: BODAS Y EVENTOS */}
                  {activeDropdown === 'bodas' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-stretch">

                      {/* Left: Bodas y Eventos Options (8 cols) */}
                      <div className="lg:col-span-8 flex flex-col justify-between pr-2 xl:pr-4">
                        <div>
                          <div className="flex items-center justify-between mb-5 pb-2.5 border-b border-[#2C0054]/10">
                            <span className="text-xs xl:text-[13px] font-extrabold uppercase tracking-wider text-[#2C0054]">
                              Celebraciones & Grupos
                            </span>
                            <span className="text-xs xl:text-[13px] text-[#2C0054] font-bold flex items-center gap-1.5 bg-[#2C0054]/5 px-3 py-1 rounded-full">
                              <Heart className="w-3.5 h-3.5 text-[#F4B92A]" /> Bodas, lunas de miel y logística
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-5">
                            <Link
                              href="/bodas"
                              onClick={() => setActiveDropdown(null)}
                              className="group/item p-5 xl:p-6 rounded-[16px] bg-[#f7f5f8]/80 hover:bg-[#2C0054] border border-[#2C0054]/10 hover:border-[#2C0054] transition-all duration-200 flex flex-col justify-between"
                            >
                              <div>
                                <div className="w-10 h-10 xl:w-11 xl:h-11 rounded-[12px] bg-[#2C0054] group-hover/item:bg-white text-[#F4B92A] group-hover/item:text-[#2C0054] flex items-center justify-center mb-3 transition-colors shrink-0">
                                  <Heart className="w-5 h-5" />
                                </div>
                                <h4 className="font-heading font-bold text-base xl:text-lg text-[#2C0054] group-hover/item:text-white mb-2 transition-colors">
                                  Bodas de Destino & Lunas de Miel
                                </h4>
                                <p className="text-xs xl:text-[13.5px] text-smoke group-hover/item:text-white/85 font-normal leading-relaxed transition-colors">
                                  Playas mexicanas, Riviera Maya, Cancún, Los Cabos y haciendas mágicas para tu gran día.
                                </p>
                              </div>
                              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#2C0054] group-hover/item:text-[#F4B92A] transition-colors">
                                <span>Ver paquetes de boda</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </div>
                            </Link>

                            <Link
                              href="/contacto?motivo=eventos-grupales"
                              onClick={() => setActiveDropdown(null)}
                              className="group/item p-5 xl:p-6 rounded-[16px] bg-[#f7f5f8]/80 hover:bg-[#2C0054] border border-[#2C0054]/10 hover:border-[#2C0054] transition-all duration-200 flex flex-col justify-between"
                            >
                              <div>
                                <div className="w-10 h-10 xl:w-11 xl:h-11 rounded-[12px] bg-[#2C0054] group-hover/item:bg-white text-[#F4B92A] group-hover/item:text-[#2C0054] flex items-center justify-center mb-3 transition-colors shrink-0">
                                  <Users className="w-5 h-5" />
                                </div>
                                <h4 className="font-heading font-bold text-base xl:text-lg text-[#2C0054] group-hover/item:text-white mb-2 transition-colors">
                                  Grupos & Convenciones
                                </h4>
                                <p className="text-xs xl:text-[13.5px] text-smoke group-hover/item:text-white/85 font-normal leading-relaxed transition-colors">
                                  Tarifas corporativas especiales, congresos, graduaciones y viajes familiares numerosos.
                                </p>
                              </div>
                              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#2C0054] group-hover/item:text-[#F4B92A] transition-colors">
                                <span>Cotizar viaje grupal</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </div>
                            </Link>
                          </div>
                        </div>

                        <div className="mt-5 pt-3.5 border-t border-[#2C0054]/10 flex items-center justify-between">
                          <Link
                            href="/bodas"
                            onClick={() => setActiveDropdown(null)}
                            className="text-xs xl:text-sm font-bold text-[#2C0054] hover:text-[#F4B92A] transition-colors inline-flex items-center gap-2"
                          >
                            <Heart className="w-4 h-4" />
                            <span>Explorar Bodas en Playa</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                          <span className="text-xs text-smoke font-normal">Atención 100% personalizada</span>
                        </div>
                      </div>

                      {/* Right: Portada & Catálogo de Bodas y Eventos (4 cols) */}
                      <div className="lg:col-span-4 rounded-[18px] border border-[#2C0054]/15 bg-gradient-to-br from-[#fbfaff] to-[#f4eef9] p-5 flex flex-col justify-between shadow-xs hover:border-[#2C0054]/30 transition-all">
                        <div>
                          {/* Portada Bodas */}
                          <div className="relative w-full h-[140px] xl:h-[150px] rounded-[14px] overflow-hidden mb-3.5 group shadow-xs">
                            <Image
                              src="/images/bodas-mega-cover.webp"
                              alt="Bodas en Playa"
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                              sizes="(max-width: 1024px) 100vw, 400px"
                            />
                            <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2C0054]/85 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-wider">
                              <Sparkles className="w-3.5 h-3.5 text-[#F4B92A]" />
                              <span>Bodas de Destino</span>
                            </div>
                          </div>

                          <h4 className="font-heading font-bold text-base xl:text-lg text-[#2C0054] mb-1.5">
                            Bodas en Playa & Eventos
                          </h4>
                          <p className="text-xs xl:text-[13px] text-smoke font-normal leading-relaxed mb-4">
                            Convenios hoteleros, bloques de habitaciones, traslados y tarifas aéreas preferenciales para tus invitados.
                          </p>
                        </div>
                        <div className="pt-1">
                          <a
                            href="https://wa.me/528443409914?text=Hola,%20quisiera%20información%20para%20una%20boda%20o%20evento"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-[12px] bg-[#2C0054] text-[#F4B92A] hover:bg-black font-bold text-xs xl:text-sm transition-colors shadow-sm"
                          >
                            <span>Hablar con un Asesor de Eventos</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>

                    </div>
                  )}

                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

        {/* Mobile/Tablet Drawer Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden absolute top-[calc(100%+8px)] left-4 sm:left-6 right-4 sm:right-6 max-w-[1280px] mx-auto bg-surface-white rounded-[16px] border border-mist-border/70 p-5 shadow-2xl z-50 flex flex-col gap-4 max-h-[calc(100vh-110px)] overflow-y-auto"
            >
              <nav className="flex flex-col gap-1 font-sans">

                {/* 1. Inicio */}
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-semibold text-sm py-2 px-3 rounded-[10px] border-b border-mist-border/30 transition-all duration-150 ${pathname === '/' ? 'bg-brand-primary text-white' : 'text-cinder hover:bg-brand-primary hover:text-white'
                    }`}
                >
                  Inicio
                </Link>

                {/* 2. Nosotros */}
                <Link
                  href="/nosotros"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-semibold text-sm py-2 px-3 rounded-[10px] border-b border-mist-border/30 transition-all duration-150 ${pathname === '/nosotros' ? 'bg-brand-primary text-white' : 'text-cinder hover:bg-brand-primary hover:text-white'
                    }`}
                >
                  Nosotros
                </Link>

                {/* 3. Viajes (Accordion) */}
                <div className="border-b border-mist-border/30 pb-1">
                  <button
                    type="button"
                    onClick={() => toggleMobileAccordion('viajes')}
                    className="w-full flex items-center justify-between text-cinder font-semibold text-sm py-2 px-3 rounded-[10px] hover:bg-brand-primary hover:text-white transition-all duration-150 cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">Viajes</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === 'viajes' ? 'rotate-180 text-brand-primary' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileExpanded === 'viajes' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-3 pr-2 py-2.5 flex flex-col gap-2.5 bg-[#f7f5f8] rounded-[10px] mt-1"
                      >
                        {/* Nacionales */}
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#2C0054]/70 block px-2 mb-1">
                            Viajes Nacionales
                          </span>
                          <div className="flex flex-col gap-1">
                            <Link
                              href="/viajes?categoria=nacionales&tipo=hoteleria"
                              onClick={() => setMobileMenuOpen(false)}
                              className="text-xs font-semibold text-[#2C0054] py-1.5 px-2.5 rounded-[8px] hover:bg-white flex items-center gap-2"
                            >
                              <Hotel className="w-3.5 h-3.5 text-[#2C0054]/70" /> Hotelería
                            </Link>
                            <Link
                              href="/viajes?categoria=nacionales&tipo=paquete"
                              onClick={() => setMobileMenuOpen(false)}
                              className="text-xs font-semibold text-[#2C0054] py-1.5 px-2.5 rounded-[8px] hover:bg-white flex items-center gap-2"
                            >
                              <Plane className="w-3.5 h-3.5 text-[#2C0054]/70" /> Paquete (Vuelo + Hotel)
                            </Link>
                            <Link
                              href="/viajes?categoria=nacionales&tipo=tours"
                              onClick={() => setMobileMenuOpen(false)}
                              className="text-xs font-semibold text-[#2C0054] py-1.5 px-2.5 rounded-[8px] hover:bg-white flex items-center gap-2"
                            >
                              <Compass className="w-3.5 h-3.5 text-[#2C0054]/70" /> Tours y experiencias
                            </Link>
                          </div>
                        </div>

                        {/* Internacionales */}
                        <div className="pt-2 border-t border-[#2C0054]/10">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#2C0054]/70 block px-4 mb-1">
                            Viajes Internacionales
                          </span>
                          <div className="flex flex-col gap-1.5">
                            {/* Circuitos con operadores */}
                            <div className="bg-white/80 rounded-[8px] p-2 border border-[#2C0054]/10">
                              <div className="text-xs font-bold text-[#2C0054] flex items-center gap-1.5 mb-1.5">
                                <Route className="w-3.5 h-3.5 text-[#2C0054]" />
                                <span>Circuitos</span>
                              </div>
                              <div className="flex flex-col gap-1 pl-3 border-l-2 border-[#2C0054]/20 ml-1.5">
                                <Link
                                  href="/viajes?categoria=internacionales&operador=mega-travel"
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="text-xs text-[#2C0054] hover:text-[#F4B92A] py-1 flex items-center justify-between font-medium"
                                >
                                  <span>› Mega Travel</span>
                                  <span className="text-[10px] text-smoke font-light">Europa / Asia</span>
                                </Link>
                                <Link
                                  href="/viajes?categoria=internacionales&operador=nefertari"
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="text-xs text-[#2C0054] hover:text-[#F4B92A] py-1 flex items-center justify-between font-medium"
                                >
                                  <span>› Nefertari</span>
                                  <span className="text-[10px] text-smoke font-light">Egipto / M. Oriente</span>
                                </Link>
                                <Link
                                  href="/viajes?categoria=internacionales&operador=eme-travel"
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="text-xs text-[#2C0054] hover:text-[#F4B92A] py-1 flex items-center justify-between font-medium"
                                >
                                  <span>› Eme Travel</span>
                                  <span className="text-[10px] text-smoke font-light">Europa</span>
                                </Link>
                              </div>
                            </div>

                            {/* Viajes Personalizados */}
                            <Link
                              href="/contacto?servicio=viaje-personalizado"
                              onClick={() => setMobileMenuOpen(false)}
                              className="text-xs font-semibold text-[#2C0054] py-1.5 px-2.5 rounded-[8px] hover:bg-white flex items-center gap-2"
                            >
                              <Sliders className="w-3.5 h-3.5 text-[#2C0054]/70" /> Viajes Personalizados
                            </Link>
                          </div>
                        </div>

                        {/* Miniatura Portada */}
                        <div className="relative w-full h-[85px] rounded-[8px] overflow-hidden my-1 shadow-xs">
                          <Image
                            src="/images/viajes-mega-cover.webp"
                            alt="Viajes Portada"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 300px"
                          />
                        </div>

                        {/* Ver todos */}
                        <Link
                          href="/viajes"
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-xs font-bold text-[#2C0054] py-2 px-2.5 rounded-[8px] hover:bg-white flex items-center gap-1.5 mt-1 border-t border-[#2C0054]/10"
                        >
                          <Compass className="w-3.5 h-3.5 text-[#F4B92A]" /> Ver todos los viajes
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 4. Disney (Accordion) */}
                <div className="border-b border-mist-border/30 pb-1">
                  <button
                    type="button"
                    onClick={() => toggleMobileAccordion('disney')}
                    className="w-full flex items-center justify-between text-cinder font-semibold text-sm py-2 px-3 rounded-[10px] hover:bg-brand-primary hover:text-white transition-all duration-150 cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">Disney</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === 'disney' ? 'rotate-180 text-brand-primary' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileExpanded === 'disney' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-3 pr-2 py-2 flex flex-col gap-1.5 bg-[#f7f5f8] rounded-[10px] mt-1"
                      >
                        <Link
                          href="/disney"
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-xs font-semibold text-[#2C0054] py-1.5 px-2.5 rounded-[8px] hover:bg-white flex items-center gap-1.5"
                        >
                          <Castle className="w-3.5 h-3.5" /> Ver todo Disney
                        </Link>
                        <div className="relative w-full h-[85px] rounded-[8px] overflow-hidden my-1 shadow-xs">
                          <Image
                            src="/images/disney-mega-cover.webp"
                            alt="Disney Portada"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 300px"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 5. Universal (Accordion) */}
                <div className="border-b border-mist-border/30 pb-1">
                  <button
                    type="button"
                    onClick={() => toggleMobileAccordion('universal')}
                    className="w-full flex items-center justify-between text-cinder font-semibold text-sm py-2 px-3 rounded-[10px] hover:bg-brand-primary hover:text-white transition-all duration-150 cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">Universal</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === 'universal' ? 'rotate-180 text-brand-primary' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileExpanded === 'universal' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-3 pr-2 py-2 flex flex-col gap-1.5 bg-[#f7f5f8] rounded-[10px] mt-1"
                      >
                        <a
                          href="https://wa.me/528443409914?text=Hola,%20quisiera%20cotizar%20Universal%20Studios"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-[#2C0054] py-1.5 px-2.5 rounded-[8px] hover:bg-white flex items-center gap-1.5"
                        >
                          <RollerCoaster className="w-3.5 h-3.5" /> Cotizar Universal Studios
                        </a>
                        <div className="relative w-full h-[85px] rounded-[8px] overflow-hidden my-1 shadow-xs">
                          <Image
                            src="/images/universal-orlando-mega-cover.webp"
                            alt="Universal Orlando Portada"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 300px"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 6. Cruceros */}
                <Link
                  href="/viajes?categoria=cruceros"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-semibold text-sm py-2 px-3 rounded-[10px] border-b border-mist-border/30 transition-all duration-150 ${pathname.includes('categoria=cruceros') ? 'bg-brand-primary text-white' : 'text-cinder hover:bg-brand-primary hover:text-white'
                    }`}
                >
                  Cruceros
                </Link>

                {/* 7. Bodas y Eventos (Accordion) */}
                <div className="border-b border-mist-border/30 pb-1">
                  <button
                    type="button"
                    onClick={() => toggleMobileAccordion('bodas')}
                    className="w-full flex items-center justify-between text-cinder font-semibold text-sm py-2 px-3 rounded-[10px] hover:bg-brand-primary hover:text-white transition-all duration-150 cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">Bodas y Eventos</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === 'bodas' ? 'rotate-180 text-brand-primary' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileExpanded === 'bodas' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-3 pr-2 py-2 flex flex-col gap-1.5 bg-[#f7f5f8] rounded-[10px] mt-1"
                      >
                        <Link
                          href="/bodas"
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-xs font-semibold text-[#2C0054] py-1.5 px-2.5 rounded-[8px] hover:bg-white flex items-center gap-1.5"
                        >
                          <Heart className="w-3.5 h-3.5 text-[#2C0054]" /> Ver Bodas en Playa
                        </Link>
                        <Link
                          href="/contacto?motivo=bodas"
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-xs font-semibold text-[#2C0054] py-1.5 px-2.5 rounded-[8px] hover:bg-white flex items-center gap-1.5"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-[#F4B92A]" /> Cotizar Evento o Boda
                        </Link>
                        <div className="relative w-full h-[85px] rounded-[8px] overflow-hidden my-1 shadow-xs">
                          <Image
                            src="/images/bodas-mega-cover.webp"
                            alt="Bodas en Playa Portada"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 300px"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 8. Contacto */}
                <Link
                  href="/contacto"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-semibold text-sm py-2 px-3 rounded-[10px] border-b border-mist-border/30 transition-all duration-150 ${pathname === '/contacto' ? 'bg-brand-primary text-white' : 'text-cinder hover:bg-brand-primary hover:text-white'
                    }`}
                >
                  Contacto
                </Link>

                {/* 9. RNT */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setRntModalOpen(true);
                  }}
                  className="w-full text-left font-semibold text-sm py-2 px-3 rounded-[10px] border-b border-mist-border/30 transition-all duration-150 text-cinder hover:bg-brand-primary hover:text-white flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-primary" />
                    <span>RNT</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#2C0054]/5 text-[#2C0054]">
                    Constancia Oficial
                  </span>
                </button>
              </nav>

              {/* Actions: Cotizar Viaje + Social Bubbles */}
              <div className="flex items-center justify-between pt-2">
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href="https://wa.me/528443409914?text=Hola,%20quisiera%20cotizar%20un%20viaje"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-primary text-white text-center font-semibold text-sm py-2.5 px-5 rounded-[10px] flex-1 hover:bg-[#3d0075] transition-all duration-150 shadow-sm mr-3"
                >
                  Cotizar Viaje
                </motion.a>

                {/* Social bubbles in mobile drawer */}
                <div className="flex items-center gap-2">
                  <a
                    href="https://wa.me/528443409914"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-brand-primary text-white flex items-center justify-center hover:bg-brand-primary/90 transition-all shadow-sm"
                    aria-label="WhatsApp TrazaMapas"
                    title="WhatsApp"
                  >
                    <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
                  </a>
                  <a
                    href="https://www.facebook.com/agenciadeviajessaltillotrazamapas/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-brand-primary text-white flex items-center justify-center hover:bg-brand-primary/90 transition-all shadow-sm"
                    aria-label="Facebook TrazaMapas"
                    title="Facebook"
                  >
                    <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  </a>
                  <a
                    href="https://www.instagram.com/trazamapas/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-brand-primary text-white flex items-center justify-center hover:bg-brand-primary/90 transition-all shadow-sm"
                    aria-label="Instagram TrazaMapas"
                    title="Instagram"
                  >
                    <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                  </a>
                  <a
                    href="https://www.tiktok.com/@trazamapas?is_from_webapp=1&sender_device=pc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-brand-primary text-white flex items-center justify-center hover:bg-brand-primary/90 transition-all shadow-sm"
                    aria-label="TikTok TrazaMapas"
                    title="TikTok"
                  >
                    <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Fixed Right Viewport Floating Social Media Dock */}
      <div
        className="fixed right-3.5 sm:right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3 p-2 bg-surface-white/95 backdrop-blur-md border border-mist-border/70 rounded-full shadow-xl"
        aria-label="Redes sociales TrazaMapas"
      >
        {/* WhatsApp Bubble */}
        <motion.a
          whileHover={{ scale: 1.15, x: -3 }}
          whileTap={{ scale: 0.95 }}
          href="https://wa.me/528443409914"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center hover:bg-[#25D366] transition-all shadow-sm group relative"
          aria-label="WhatsApp TrazaMapas"
          title="WhatsApp"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
          <span className="absolute right-full mr-2.5 px-2.5 py-1 rounded-[8px] bg-[#2C0054] text-white text-[11px] font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-md">
            WhatsApp
          </span>
        </motion.a>

        {/* Facebook Bubble */}
        <motion.a
          whileHover={{ scale: 1.15, x: -3 }}
          whileTap={{ scale: 0.95 }}
          href="https://www.facebook.com/agenciadeviajessaltillotrazamapas/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center hover:bg-[#1877F2] transition-all shadow-sm group relative"
          aria-label="Facebook TrazaMapas"
          title="Facebook"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          <span className="absolute right-full mr-2.5 px-2.5 py-1 rounded-[8px] bg-[#2C0054] text-white text-[11px] font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-md">
            Facebook
          </span>
        </motion.a>

        {/* Instagram Bubble */}
        <motion.a
          whileHover={{ scale: 1.15, x: -3 }}
          whileTap={{ scale: 0.95 }}
          href="https://www.instagram.com/trazamapas/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] transition-all shadow-sm group relative"
          aria-label="Instagram TrazaMapas"
          title="Instagram"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          <span className="absolute right-full mr-2.5 px-2.5 py-1 rounded-[8px] bg-[#2C0054] text-white text-[11px] font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-md">
            Instagram
          </span>
        </motion.a>

        {/* TikTok Bubble */}
        <motion.a
          whileHover={{ scale: 1.15, x: -3 }}
          whileTap={{ scale: 0.95 }}
          href="https://www.tiktok.com/@trazamapas?is_from_webapp=1&sender_device=pc"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center hover:bg-black transition-all shadow-sm group relative"
          aria-label="TikTok TrazaMapas"
          title="TikTok"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
          </svg>
          <span className="absolute right-full mr-2.5 px-2.5 py-1 rounded-[8px] bg-[#2C0054] text-white text-[11px] font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-md">
            TikTok
          </span>
        </motion.a>
      </div>

      {/* RNT (Registro Nacional de Turismo) Modal Popup */}
      <AnimatePresence>
        {rntModalOpen && (
          <div
            className="fixed inset-0 bg-[#2C0054]/75 backdrop-blur-md z-[100] flex items-center justify-center p-3 sm:p-5"
            onClick={() => setRntModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[24px] w-full max-w-4xl h-[90vh] max-h-[850px] shadow-2xl border border-[#2C0054]/15 flex flex-col overflow-hidden relative"
            >
              {/* Header */}
              <div className="bg-white px-5 sm:px-7 py-4 border-b border-[#2C0054]/10 flex items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-[12px] bg-[#2C0054] text-[#F4B92A] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-heading font-bold text-base sm:text-lg text-[#2C0054] truncate">
                        Registro Nacional de Turismo (RNT)
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#2C0054]/5 text-[#2C0054] border border-[#2C0054]/10 shrink-0">
                        Constancia Oficial SECTUR
                      </span>
                    </div>
                    <p className="text-xs text-smoke font-normal truncate hidden sm:block">
                      TrazaMapas • Agencia de Viajes Certificada y Registrada ante el Gobierno de México
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Close button */}
                  <button
                    onClick={() => setRntModalOpen(false)}
                    className="w-9 h-9 rounded-full bg-[#f7f5f8] text-[#2C0054] hover:bg-[#2C0054] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Cerrar modal"
                  >
                    <X className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>

              {/* Body: Embedded PDF */}
              <div className="flex-1 w-full bg-[#323639] relative overflow-hidden">
                <iframe
                  src={`${rntDoc.url}#toolbar=1&navpanes=0`}
                  title="Registro Nacional de Turismo - TrazaMapas"
                  className="w-full h-full border-0"
                />
              </div>

              {/* Footer */}
              <div className="bg-[#f7f5f8] px-5 sm:px-7 py-3 border-t border-[#2C0054]/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2 text-xs text-smoke font-light text-center sm:text-left">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 inline-block animate-pulse" />
                  <span>Documento oficial con validez nacional vigente para el ejercicio {rntDoc.vigencia}.</span>
                </div>
                <button
                  onClick={() => setRntModalOpen(false)}
                  className="w-full sm:w-auto px-5 py-1.5 rounded-[10px] bg-[#2C0054] text-[#F4B92A] hover:bg-black text-xs font-bold transition-colors cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
