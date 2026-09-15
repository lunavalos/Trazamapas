"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Send, CheckCircle2, User, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

interface QuoteFormSectionProps {
  categories?: any[];
  variant?: "default" | "contactPage";
}

export default function QuoteFormSection({ variant = "default", categories = [] }: QuoteFormSectionProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Parques Temáticos",
    message: "",
  });

  const [dynamicCategories, setDynamicCategories] = useState<any[]>(categories);
  
  useEffect(() => {
    if (categories.length > 0) {
      setDynamicCategories(categories);
    } else {
      const url = process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:3001";
      fetch(url + "/api/trip-categories?limit=50")
        .then(res => res.json())
        .then(data => {
          if (data && data.docs) setDynamicCategories(data.docs);
        })
        .catch(err => console.error(err));
    }
  }, [categories]);

  useEffect(() => {
    if (dynamicCategories.length > 0 && formData.service.includes("Parques")) {
      setFormData(prev => ({ ...prev, service: dynamicCategories[0].title }));
    }
  }, [dynamicCategories]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const isContactPage = variant === "contactPage";

  return (
    <section className={`relative bg-[#f7f5f8] ${isContactPage ? "py-[90px] sm:py-[110px] px-6 sm:px-10 lg:px-16" : "py-[80px] px-5 sm:px-6"}`}>
      <div className={`${isContactPage ? "max-w-[1340px]" : "max-w-[1280px]"} mx-auto`}>
        
        {/* Section Header Centered (Only shown in default variant) */}
        {!isContactPage && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-14"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-[35px] font-heading font-bold text-brand-primary uppercase tracking-tight">
              ¿Tienes preguntas o quieres cotizar?
            </h2>
            <p className="text-smoke text-[15px] font-sans font-light max-w-xl mx-auto mt-2.5 leading-relaxed">
              Te brindaremos una solución personalizada a tu medida.
            </p>
          </motion.div>
        )}

        {isContactPage ? (
          /* Joined 2-Column Card Container for Contact Page (Matching reference design image) */
          <div className="bg-[#2C0054] rounded-[24px] sm:rounded-[28px] border border-[#2c0054]/15 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column (Colored Dark Purple, White text, Title moved here, Logo removed) */}
            <motion.div 
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 p-7 sm:p-[35px] text-white flex flex-col justify-between relative bg-gradient-to-b from-[#2C0054] to-[#1e003b]"
            >
              <div>
                {/* Title moved from centered header to Left Column */}
                <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-heading font-bold text-white uppercase tracking-tight leading-snug mb-4">
                  ¿Tienes preguntas o quieres cotizar?
                </h2>

                <p className="text-white/85 text-[14px] sm:text-[15px] font-sans font-light leading-relaxed mb-6">
                  Te brindaremos una solución personalizada a tu medida. En TrazaMapas somos tu agencia de viajes de confianza al norte de Saltillo. Te asesoramos paso a paso en paquetes todo incluido, parques Disney, circuitos internacionales, cruceros y vuelos.
                </p>

                {/* Contact Info List with Circular Icon Badges */}
                <div className="space-y-5 mb-6 w-full">
                  {/* Address */}
                  <a 
                    href="https://maps.google.com/?q=Av.+La+Salle+437,+La+Salle,+25240+Saltillo,+Coah." 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-start gap-3.5 text-white/90 font-medium text-sm hover:text-[#F4B92A] transition group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[#F4B92A] shrink-0 group-hover:bg-[#F4B92A] group-hover:text-[#2C0054] transition shadow-xs">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-[#F4B92A] mb-0.5">Ubicación</span>
                      <span className="group-hover:underline leading-snug text-xs sm:text-sm">Av. La Salle #437, La Salle, 25240 Saltillo, Coah.</span>
                    </div>
                  </a>

                  {/* Phone */}
                  <a 
                    href="tel:8443409914" 
                    className="flex items-start gap-3.5 text-white/90 font-medium text-sm hover:text-[#F4B92A] transition group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[#F4B92A] shrink-0 group-hover:bg-[#F4B92A] group-hover:text-[#2C0054] transition shadow-xs">
                      <Phone size={18} />
                    </div>
                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-[#F4B92A] mb-0.5">Teléfono / WhatsApp</span>
                      <span className="group-hover:underline leading-snug text-xs sm:text-sm">844-340-9914</span>
                    </div>
                  </a>

                  {/* Email */}
                  <a 
                    href="mailto:agenciadeviajes@trazamapas.com.mx" 
                    className="flex items-start gap-3.5 text-white/90 font-medium text-sm hover:text-[#F4B92A] transition group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[#F4B92A] shrink-0 group-hover:bg-[#F4B92A] group-hover:text-[#2C0054] transition shadow-xs">
                      <Mail size={18} />
                    </div>
                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-[#F4B92A] mb-0.5">Correo Electrónico</span>
                      <span className="group-hover:underline break-all leading-snug text-xs sm:text-sm">agenciadeviajes@trazamapas.com.mx</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Social Media Icon Buttons */}
              <div className="flex items-center gap-3 pt-5 border-t border-white/15">
                <motion.a
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://wa.me/528443409914"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9.5 h-9.5 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#F4B92A] hover:text-[#2C0054] transition-all border border-white/20 shadow-xs"
                  aria-label="WhatsApp TrazaMapas"
                  title="WhatsApp"
                >
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.facebook.com/agenciadeviajessaltillotrazamapas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9.5 h-9.5 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#F4B92A] hover:text-[#2C0054] transition-all border border-white/20 shadow-xs"
                  aria-label="Facebook TrazaMapas"
                  title="Facebook"
                >
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.instagram.com/trazamapas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9.5 h-9.5 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#F4B92A] hover:text-[#2C0054] transition-all border border-white/20 shadow-xs"
                  aria-label="Instagram TrazaMapas"
                  title="Instagram"
                >
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </motion.a>
              </div>
            </motion.div>

            {/* Right Column (Form Column on Surface White) */}
            <motion.div 
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 bg-surface-white p-7 sm:p-[35px] flex flex-col justify-center"
            >
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#F4B92A]/20 text-brand-primary flex items-center justify-center mb-4">
                    <CheckCircle2 size={36} className="text-brand-primary" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-brand-primary mb-2">
                    ¡Solicitud Enviada con Éxito!
                  </h3>
                  <p className="text-smoke text-base max-w-md mx-auto font-sans font-light mb-6">
                    Gracias por comunicarte con TrazaMapas. Uno de nuestros asesores certificados te responderá a la brevedad.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-[#f7f5f8] border border-[#2c0054]/15 text-brand-primary font-semibold text-sm rounded-[12px] hover:bg-brand-primary hover:text-white transition"
                  >
                    Enviar otra cotización
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
                  {/* Full Name Field */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-primary mb-2.5">
                      Nombre completo *
                    </label>
                    <div className="relative">
                      <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-primary/50" />
                      <input
                        type="text"
                        required
                        placeholder="Nombre"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3.5 bg-[#f7f5f8] border border-[#2c0054]/15 rounded-[12px] text-sm text-cinder focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition"
                      />
                    </div>
                  </div>

                  {/* Email & Phone Fields Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-brand-primary mb-2.5">
                        Correo electrónico *
                      </label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-primary/50" />
                        <input
                          type="email"
                          required
                          placeholder="Correo electrónico"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-3.5 bg-[#f7f5f8] border border-[#2c0054]/15 rounded-[12px] text-sm text-cinder focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-brand-primary mb-2.5">
                        Teléfono / WhatsApp *
                      </label>
                      <div className="relative">
                        <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-primary/50" />
                        <input
                          type="tel"
                          required
                          placeholder="Teléfono"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-10 pr-4 py-3.5 bg-[#f7f5f8] border border-[#2c0054]/15 rounded-[12px] text-sm text-cinder focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Service Selection Dropdown */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-primary mb-2.5">
                      Servicio o Destino de Interés *
                    </label>
                    <div className="relative">
                      <MapPin size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-primary/50" />
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full pl-10 pr-4 py-3.5 bg-[#f7f5f8] border border-[#2c0054]/15 rounded-[12px] text-sm text-cinder focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition appearance-none cursor-pointer"
                      >
                        {dynamicCategories.length > 0 ? (
                          dynamicCategories.map((cat, i) => (
                            <option key={i} value={cat.title}>{cat.title}</option>
                          ))
                        ) : (
                          <option value="General">Cotización General</option>
                        )}
                        <option value="Otro">Otro Destino</option>
                      </select>
                    </div>
                  </div>

                  {/* Message / Details Field */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-primary mb-2.5">
                      Mensaje / Detalles de tu viaje
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Mensaje o detalles del viaje"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-4 bg-[#f7f5f8] border border-[#2c0054]/15 rounded-[12px] text-sm text-cinder focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-3.5 px-7 bg-brand-primary text-white font-bold text-sm rounded-[14px] hover:bg-[#3d0075] border border-brand-primary transition shadow-md flex items-center justify-center gap-2.5 group cursor-pointer"
                    >
                      <span>Enviar Mensaje</span>
                      <ArrowRight size={18} className="text-[#F4B92A] group-hover:translate-x-1 transition-transform shrink-0" />
                    </motion.button>
                  </div>
                </form>
              )}
            </motion.div>

          </div>
        ) : (
          /* Default 2-Column Layout for Homepage Index */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            
            {/* Left Column (50%): Vertically centered, left-aligned content */}
            <motion.div 
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-start text-left justify-center h-full pt-2"
            >
              {/* Logo */}
              <div className="w-full flex justify-start mb-6">
                <Image 
                  src="/images/trazamapas logo.webp" 
                  alt="TrazaMapas Logo" 
                  width={340} 
                  height={100} 
                  className="h-[80px] sm:h-[92px] w-auto object-contain"
                />
              </div>

              {/* Description Paragraph set to 15px */}
              <p className="text-smoke text-[15px] font-sans font-light leading-relaxed mb-8">
                En TrazaMapas somos tu agencia de viajes de confianza al norte de Saltillo. Te asesoramos paso a paso en paquetes todo incluido, parques Disney, circuitos internacionales, cruceros y vuelos. Déjanos tus datos o contáctanos para brindarte atención personalizada sin compromiso.
              </p>

              {/* Contact Details List with Clickable Links (Address, Phone, Email) */}
              <div className="space-y-4 mb-8 w-full">
                {/* Address Link to Google Maps */}
                <a 
                  href="https://maps.google.com/?q=Av.+La+Salle+437,+La+Salle,+25240+Saltillo,+Coah." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-cinder font-medium text-sm hover:text-brand-primary transition group"
                >
                  <div className="w-9 h-9 rounded-[10px] bg-surface-white border border-[#2c0054]/15 flex items-center justify-center text-brand-primary shrink-0 shadow-xs group-hover:bg-brand-primary group-hover:text-white transition">
                    <MapPin size={18} />
                  </div>
                  <span className="group-hover:underline">Av. La Salle #437, La Salle, 25240 Saltillo, Coah.</span>
                </a>

                {/* Click to Call Phone Link */}
                <a 
                  href="tel:8443409914" 
                  className="flex items-center gap-3 text-cinder font-medium text-sm hover:text-brand-primary transition group"
                >
                  <div className="w-9 h-9 rounded-[10px] bg-surface-white border border-[#2c0054]/15 flex items-center justify-center text-brand-primary shrink-0 shadow-xs group-hover:bg-brand-primary group-hover:text-white transition">
                    <Phone size={18} />
                  </div>
                  <span className="group-hover:underline">844-340-9914</span>
                </a>

                {/* Click to Email Link */}
                <a 
                  href="mailto:agenciadeviajes@trazamapas.com.mx" 
                  className="flex items-center gap-3 text-cinder font-medium text-sm hover:text-brand-primary transition group"
                >
                  <div className="w-9 h-9 rounded-[10px] bg-surface-white border border-[#2c0054]/15 flex items-center justify-center text-brand-primary shrink-0 shadow-xs group-hover:bg-brand-primary group-hover:text-white transition">
                    <Mail size={18} />
                  </div>
                  <span className="group-hover:underline">agenciadeviajes@trazamapas.com.mx</span>
                </a>
              </div>

              {/* Squared Social Media Icon Buttons */}
              <div className="flex items-center gap-3 pt-1">
                {/* WhatsApp Button */}
                <motion.a
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://wa.me/528443409914"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-[10px] bg-brand-primary text-white flex items-center justify-center hover:bg-[#3d0075] transition-all shadow-sm"
                  aria-label="WhatsApp TrazaMapas"
                  title="WhatsApp"
                >
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </motion.a>

                {/* Facebook Button */}
                <motion.a
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.facebook.com/agenciadeviajessaltillotrazamapas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-[10px] bg-brand-primary text-white flex items-center justify-center hover:bg-[#3d0075] transition-all shadow-sm"
                  aria-label="Facebook TrazaMapas"
                  title="Facebook"
                >
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </motion.a>

                {/* Instagram Button */}
                <motion.a
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.instagram.com/trazamapas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-[10px] bg-brand-primary text-white flex items-center justify-center hover:bg-[#3d0075] transition-all shadow-sm"
                  aria-label="Instagram TrazaMapas"
                  title="Instagram"
                >
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </motion.a>
              </div>
            </motion.div>

            {/* Right Column (50%): Form Card Container */}
            <motion.div 
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
              className="bg-surface-white border border-[#2c0054]/15 rounded-[24px] p-6 sm:p-8 md:p-10 shadow-lg relative overflow-hidden"
            >
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#F4B92A]/20 text-brand-primary flex items-center justify-center mb-4">
                    <CheckCircle2 size={36} className="text-brand-primary" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-brand-primary mb-2">
                    ¡Solicitud Enviada con Éxito!
                  </h3>
                  <p className="text-smoke text-base max-w-md mx-auto font-sans font-light mb-6">
                    Gracias por comunicarte con TrazaMapas. Uno de nuestros asesores certificados te responderá a la brevedad.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-[#f7f5f8] border border-[#2c0054]/15 text-brand-primary font-semibold text-sm rounded-[12px] hover:bg-brand-primary hover:text-white transition"
                  >
                    Enviar otra cotización
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Full Name Field */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-primary mb-2">
                      Nombre completo *
                    </label>
                    <div className="relative">
                      <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-primary/50" />
                      <input
                        type="text"
                        required
                        placeholder="Nombre"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-[#f7f5f8] border border-[#2c0054]/15 rounded-[12px] text-sm text-cinder focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition"
                      />
                    </div>
                  </div>

                  {/* Email & Phone Fields Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-brand-primary mb-2">
                        Correo electrónico *
                      </label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-primary/50" />
                        <input
                          type="email"
                          required
                          placeholder="Correo electrónico"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-[#f7f5f8] border border-[#2c0054]/15 rounded-[12px] text-sm text-cinder focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-brand-primary mb-2">
                        Teléfono / WhatsApp *
                      </label>
                      <div className="relative">
                        <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-primary/50" />
                        <input
                          type="tel"
                          required
                          placeholder="Teléfono"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-[#f7f5f8] border border-[#2c0054]/15 rounded-[12px] text-sm text-cinder focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Service Selection Dropdown */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-primary mb-2">
                      Servicio o Destino de Interés *
                    </label>
                    <div className="relative">
                      <MapPin size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-primary/50" />
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-[#f7f5f8] border border-[#2c0054]/15 rounded-[12px] text-sm text-cinder focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition appearance-none cursor-pointer"
                      >
                        {dynamicCategories.length > 0 ? (
                          dynamicCategories.map((cat, i) => (
                            <option key={i} value={cat.title}>{cat.title}</option>
                          ))
                        ) : (
                          <option value="General">Cotización General</option>
                        )}
                        <option value="Otro">Otro Destino</option>
                      </select>
                    </div>
                  </div>

                  {/* Message / Details Field */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-primary mb-2">
                      Mensaje / Detalles de tu viaje
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Mensaje o detalles del viaje"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-3.5 bg-[#f7f5f8] border border-[#2c0054]/15 rounded-[12px] text-sm text-cinder focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-3.5 px-7 bg-brand-primary text-white font-bold text-sm rounded-[14px] hover:bg-[#3d0075] border border-brand-primary transition shadow-md flex items-center justify-center gap-2.5 group cursor-pointer"
                    >
                      <span>Enviar Mensaje</span>
                      <ArrowRight size={18} className="text-[#F4B92A] group-hover:translate-x-1 transition-transform shrink-0" />
                    </motion.button>
                  </div>
                </form>
              )}
            </motion.div>

          </div>
        )}

      </div>
    </section>
  );
}
