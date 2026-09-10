'use client';
import Image from "next/image";
import Link from "next/link";
import HeroSlideshow from "@/components/HeroSlideshow";
import ServicesCarousel from "@/components/ServicesCarousel";
import AboutIntroSection from "@/components/AboutIntroSection";
import FeaturedRoutesSection from "@/components/FeaturedRoutesSection";
import QuoteFormSection from "@/components/QuoteFormSection";
import { MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[#f7f5f8]">
      {/* Hero Section Slideshow */}
      <HeroSlideshow />

      {/* 1. Services Section - 80px Spacing */}
      <section className="py-[80px] px-5 sm:px-6 relative bg-[#f7f5f8] overflow-hidden">
        <div className="max-w-[1280px] mx-auto">
          
          {/* Interactive Services Carousel with scroll reveal animations */}
          <ServicesCarousel />

          {/* Bottom Callout Banner with explicit 10px gap between location icon and text */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 bg-surface-white border border-[#2c0054]/15 rounded-[24px] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm"
          >
            <div className="flex items-center gap-[10px]">
              <div className="w-9 h-9 rounded-full bg-[#2C0054] flex items-center justify-center shrink-0 shadow-xs">
                <MapPin size={18} className="text-[#F4B92A]" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-lg text-brand-primary mb-0.5">Agencia al Norte de Saltillo</h4>
                <p className="text-smoke text-sm font-light leading-relaxed">
                  <a 
                    href="https://maps.google.com/?q=Av.+La+Salle+437,+La+Salle,+25240+Saltillo,+Coah." 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-brand-primary hover:underline transition"
                  >
                    Av. La Salle #437, La Salle, 25240 Saltillo, Coah.
                  </a>
                  {" "}• Te atendemos en persona o por WhatsApp.
                </p>
              </div>
            </div>
            
            {/* WhatsApp CTA Button matching exact highlighted style (brand purple background + gold arrow) */}
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              href="https://wa.me/528443409914?text=Hola,%20quisiera%20cotizar%20un%20servicio"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 bg-brand-primary text-white font-bold text-sm rounded-[14px] hover:bg-[#3d0075] border border-brand-primary transition shadow-md whitespace-nowrap shrink-0 inline-flex items-center gap-2.5 group"
            >
              <span>Cotizar por WhatsApp</span>
              <ArrowRight size={18} className="text-[#F4B92A] group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>

        </div>
      </section>

      {/* 2. Company Intro Section ("Nosotros" intro) */}
      <AboutIntroSection />

      {/* 3. Featured Travel Routes & Itineraries Section */}
      <FeaturedRoutesSection />
      
      {/* 4. Quote Request Form Section */}
      <QuoteFormSection />
    </main>
  );
}
