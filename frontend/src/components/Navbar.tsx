'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-3.5 z-50 w-full px-5 sm:px-6 relative"
    >
      <div className="max-w-[1280px] mx-auto flex items-center gap-3">
        
        {/* Main Navigation Container */}
        <div className="flex-1 bg-surface-white border border-mist-border/70 rounded-[16px] shadow-sm h-[64px] px-5 relative flex items-center justify-between">
          
          {/* Left: Logo (h-[44px]) */}
          <Link href="/" className="flex items-center group shrink-0">
            <Image 
              src="/images/trazamapas logo.webp" 
              alt="TrazaMapas Logo" 
              width={210} 
              height={60} 
              className="h-[44px] w-auto object-contain transition-transform group-hover:scale-105"
              priority
            />
          </Link>

          {/* Center: Nav links centered horizontally */}
          <nav className="hidden lg:flex items-center gap-1 font-sans text-cinder lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            <Link 
              href="/" 
              className="px-3.5 py-1.5 rounded-[10px] text-sm font-semibold text-cinder hover:bg-brand-primary hover:text-white transition-all duration-150"
            >
              Inicio
            </Link>
            
            <Link 
              href="/nosotros" 
              className="px-3.5 py-1.5 rounded-[10px] text-sm font-semibold text-cinder hover:bg-brand-primary hover:text-white transition-all duration-150"
            >
              Nosotros
            </Link>
            
            <Link 
              href="/viajes" 
              className="px-3.5 py-1.5 rounded-[10px] text-sm font-semibold text-cinder hover:bg-brand-primary hover:text-white transition-all duration-150"
            >
              Viajes
            </Link>
            
            <Link 
              href="/disney" 
              className="px-3.5 py-1.5 rounded-[10px] text-sm font-semibold text-cinder hover:bg-brand-primary hover:text-white transition-all duration-150"
            >
              Disney
            </Link>

            <Link 
              href="/consejos" 
              className="px-3.5 py-1.5 rounded-[10px] text-sm font-semibold text-cinder hover:bg-brand-primary hover:text-white transition-all duration-150"
            >
              Consejos
            </Link>

            <Link 
              href="/contacto" 
              className="px-3.5 py-1.5 rounded-[10px] text-sm font-semibold text-cinder hover:bg-brand-primary hover:text-white transition-all duration-150"
            >
              Contacto
            </Link>
          </nav>

          {/* Right End: "Cotizar Viaje" button styled identically to active/hover pill */}
          <motion.a 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="https://wa.me/528443409914?text=Hola,%20quisiera%20cotizar%20un%20viaje" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden lg:inline-block px-3.5 py-1.5 rounded-[10px] bg-brand-primary text-white font-semibold hover:bg-[#3d0075] transition-all duration-150 text-sm shadow-sm"
          >
            Cotizar Viaje
          </motion.a>

          {/* Mobile Hamburger Icon */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-[10px] border border-mist-border text-cinder flex items-center justify-center hover:bg-surface-lift transition"
            aria-label="Abrir menú"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

        </div>

        {/* Detached Right Column: Purple Social Media Bubbles */}
        <div className="hidden md:flex items-center gap-2.5 bg-surface-white border border-mist-border/70 rounded-[16px] shadow-sm h-[64px] px-3.5 shrink-0">
          {/* WhatsApp Bubble */}
          <motion.a
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            href="https://wa.me/528443409914"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center hover:bg-brand-primary/90 transition-all shadow-sm"
            aria-label="WhatsApp TrazaMapas"
            title="WhatsApp"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
          </motion.a>

          {/* Facebook Bubble */}
          <motion.a
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            href="https://www.facebook.com/agenciadeviajessaltillotrazamapas/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center hover:bg-brand-primary/90 transition-all shadow-sm"
            aria-label="Facebook TrazaMapas"
            title="Facebook"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </motion.a>

          {/* Instagram Bubble */}
          <motion.a
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            href="https://www.instagram.com/trazamapas/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center hover:bg-brand-primary/90 transition-all shadow-sm"
            aria-label="Instagram TrazaMapas"
            title="Instagram"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </motion.a>
        </div>

      </div>

      {/* Mobile Drawer Dropdown (Absolute overlay: floats over content without pushing containers down) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-[calc(100%+8px)] left-5 right-5 max-w-[1280px] mx-auto bg-surface-white rounded-[16px] border border-mist-border p-5 shadow-2xl z-50 flex flex-col gap-3"
          >
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-cinder font-semibold text-sm py-2 border-b border-mist-border/30">Inicio</Link>
            <Link href="/nosotros" onClick={() => setMobileMenuOpen(false)} className="text-cinder font-semibold text-sm py-2 border-b border-mist-border/30">Nosotros</Link>
            <Link href="/viajes" onClick={() => setMobileMenuOpen(false)} className="text-cinder font-semibold text-sm py-2 border-b border-mist-border/30">Viajes</Link>
            <Link href="/disney" onClick={() => setMobileMenuOpen(false)} className="text-cinder font-semibold text-sm py-2 border-b border-mist-border/30">Disney</Link>
            <Link href="/consejos" onClick={() => setMobileMenuOpen(false)} className="text-cinder font-semibold text-sm py-2 border-b border-mist-border/30">Consejos</Link>
            <Link href="/contacto" onClick={() => setMobileMenuOpen(false)} className="text-cinder font-semibold text-sm py-2 border-b border-mist-border/30">Contacto</Link>
            
            <div className="flex items-center justify-between pt-2">
              <a 
                href="https://wa.me/528443409914" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-brand-primary text-white text-center font-semibold text-sm py-2 px-4 rounded-[10px] flex-1 mr-3"
              >
                Cotizar Viaje
              </a>
              <div className="flex items-center gap-2">
                <a href="https://wa.me/528443409914" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-brand-primary text-white flex items-center justify-center">
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                </a>
                <a href="https://www.facebook.com/agenciadeviajessaltillotrazamapas/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-brand-primary text-white flex items-center justify-center">
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://www.instagram.com/trazamapas/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-brand-primary text-white flex items-center justify-center">
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
