'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  CheckCircle2, 
  Compass, 
  Globe2, 
  Ticket, 
  Palmtree,
  Ship,
  Plane,
  CreditCard,
  FerrisWheel,
  RollerCoaster,
  Castle,
  Briefcase
} from 'lucide-react';
import { PayloadTrip, PayloadTripCategory, PayloadTripOperator, getImageUrl } from '@/lib/payload';

const ICONS: Record<string, any> = {
  Globe2, Ticket, Palmtree, Compass, Ship, Plane, MapPin, CreditCard, FerrisWheel, RollerCoaster, Castle
};

function ViajesContent({ 
  initialCategories = [], 
  initialOperators = [],
  trips = []
}: { 
  initialCategories: PayloadTripCategory[], 
  initialOperators?: PayloadTripOperator[],
  trips: PayloadTrip[] 
}) {
  const searchParams = useSearchParams();
  const catParam = searchParams.get('categoria');
  const opParam = searchParams.get('operador');
  
  // Agregamos "todos" estáticamente
  const categories = [
    { id: 'todos', label: 'Todos los Viajes', icon: Globe2 },
    ...initialCategories.map(cat => ({
      id: cat.value,
      label: cat.title,
      icon: cat.iconName && ICONS[cat.iconName] ? ICONS[cat.iconName] : Compass
    }))
  ];

  const operators = [
    { id: 'todos', label: 'Todos los Operadores' },
    ...initialOperators.map(op => ({
      id: op.value,
      label: op.title,
    }))
  ];

  const resolveValidCategory = (param: string | null) => {
    if (!param) return 'todos';
    const exists = initialCategories.some(c => c.value === param);
    return exists ? param : 'todos';
  };

  const [activeCategory, setActiveCategory] = useState(() => resolveValidCategory(catParam));
  const [activeOperator, setActiveOperator] = useState(opParam || 'todos');

  useEffect(() => {
    setActiveCategory(resolveValidCategory(catParam));
    setActiveOperator(opParam || 'todos');
  }, [catParam, opParam, initialCategories]);

  const filteredTrips = trips.filter(trip => {
    const matchesCategory =
      activeCategory === 'todos' ||
      trip.categories?.some((c: any) => (typeof c === 'object' ? c.value : c) === activeCategory);

    const tripOpValue =
      typeof trip.operator === 'object' && trip.operator !== null
        ? trip.operator.value
        : trip.operator;

    const matchesOperator =
      activeOperator === 'todos' || tripOpValue === activeOperator;

    return matchesCategory && matchesOperator;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f5f8] pb-24">
      {/* 1. HERO SECTION */}
      <section className="relative -mt-[104px] pt-[150px] sm:pt-[180px] pb-28 sm:pb-36 px-5 sm:px-8 bg-[#2C0054] text-white overflow-hidden min-h-[460px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/03_ tianas_bayou_adenture_disneyland_park_california.webp" 
            alt="Viajes TrazaMapas" 
            fill 
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-[#2C0054]/50" />
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto w-full">
          <div className="max-w-3xl animate-fadeIn">
            <h1 className="text-3xl sm:text-4xl lg:text-[45px] font-heading font-bold uppercase tracking-tight mb-4 leading-tight text-white">
              Experiencias de Viaje
            </h1>
            <p className="text-white/90 text-[15px] sm:text-[16px] font-sans font-light leading-relaxed">
              Encuentra tu próximo destino ideal. Desde la magia de Disney hasta playas cristalinas y aventuras internacionales, nosotros trazamos la ruta de tus vacaciones perfectas.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY & OPERATOR NAVIGATION */}
      <section className="relative bg-white border-b border-[#2c0054]/10 shadow-sm py-[40px] sm:py-[50px]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 flex flex-col gap-5">
          <div className="overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-3 min-w-max">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;
                
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? 'bg-[#2C0054] text-[#F4B92A] shadow-md border border-[#2C0054]' 
                        : 'bg-white text-[#2C0054]/70 border border-[#2c0054]/15 hover:border-[#2C0054]/40 hover:text-[#2C0054] hover:bg-[#f7f5f8]'
                    }`}
                  >
                    <Icon size={16} className={isActive ? 'text-[#F4B92A]' : 'text-[#2C0054]/50'} />
                    <span>{category.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {initialOperators.length > 0 && (
            <div className="overflow-x-auto scrollbar-none pt-5 border-t border-[#2c0054]/10">
              <div className="flex items-center gap-3 min-w-max">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2C0054]/60 flex items-center gap-1.5 mr-2">
                  <Briefcase size={14} className="text-[#F4B92A]" />
                  Operador:
                </span>
                {operators.map((op) => {
                  const isActive = activeOperator === op.id;
                  return (
                    <button
                      key={op.id}
                      onClick={() => setActiveOperator(op.id)}
                      className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'bg-[#F4B92A] text-[#2C0054] shadow-xs border border-[#F4B92A]'
                          : 'bg-[#f7f5f8] text-[#2C0054]/70 border border-[#2c0054]/10 hover:border-[#2C0054]/30 hover:text-[#2C0054]'
                      }`}
                    >
                      {op.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. EXPERIENCES GRID */}
      <section className="py-[120px] sm:py-[140px] px-5 sm:px-8 relative z-10">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {filteredTrips.map((exp, index) => (
              <motion.article
                key={exp.id || exp.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-surface-white border border-[#2c0054]/10 rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 group"
              >
                <Link
                  href={`/viajes/${exp.slug}`}
                  className="block w-full overflow-hidden cursor-pointer"
                  aria-label={exp.title}
                >
                  <Image
                    src={getImageUrl(exp.featuredImage)}
                    alt={exp.title}
                    width={exp.featuredImage?.width || 894}
                    height={exp.featuredImage?.height || 1280}
                    unoptimized
                    className="w-full h-auto block group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </Link>
              </motion.article>
            ))}
          </div>

          {filteredTrips.length === 0 && (
            <div className="py-20 text-center">
              <Compass size={48} className="mx-auto text-[#2C0054]/20 mb-4" />
              <h3 className="text-xl font-heading font-bold text-[#2C0054]">No hay viajes en esta categoría</h3>
              <p className="text-smoke font-light mt-2">Estamos preparando nuevas experiencias para ti.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* 4. WORKFLOW / COMO FUNCIONA */}
      <section className="py-[140px] sm:py-[160px] bg-white border-t border-[#2c0054]/10">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-bold tracking-widest text-[#F4B92A] uppercase mb-2 block">Nuestro Proceso</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-brand-primary">¿Cómo planeamos tu viaje ideal?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#f7f5f8] border border-[#2c0054]/15 rounded-[24px] p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition group relative"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-[52px] h-[52px] rounded-full bg-[#2C0054] text-[#F4B92A] flex items-center justify-center shadow-md shrink-0 group-hover:scale-110 transition-transform">
                    <MapPin size={25} />
                  </div>
                  <span className="text-xs font-bold bg-[#F4B92A] text-[#2C0054] px-3 py-1 rounded-full border border-[#2C0054]/20">
                    Paso 01
                  </span>
                </div>
                <h4 className="text-lg font-heading font-bold text-brand-primary mb-2.5">
                  1. Asesoría Inicial
                </h4>
                <p className="text-smoke text-[14px] font-sans font-light leading-relaxed">
                  Nos cuentas tus fechas, presupuesto y expectativas. Como asesores certificados, te damos las mejores opciones y tips de viaje.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#f7f5f8] border border-[#2c0054]/15 rounded-[24px] p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition group relative"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-[52px] h-[52px] rounded-full bg-[#2C0054] text-[#F4B92A] flex items-center justify-center shadow-md shrink-0 group-hover:scale-110 transition-transform">
                    <CreditCard size={25} />
                  </div>
                  <span className="text-xs font-bold bg-[#F4B92A] text-[#2C0054] px-3 py-1 rounded-full border border-[#2C0054]/20">
                    Paso 02
                  </span>
                </div>
                <h4 className="text-lg font-heading font-bold text-brand-primary mb-2.5">
                  2. Reserva & Tarifas Congeladas
                </h4>
                <p className="text-smoke text-[14px] font-sans font-light leading-relaxed">
                  Te entregamos un presupuesto claro sin costos ocultos. Aseguras con un pago inicial mínimo y liquidas tu paquete en plazos cómodos.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#f7f5f8] border border-[#2c0054]/15 rounded-[24px] p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition group relative"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-[52px] h-[52px] rounded-full bg-[#2C0054] text-[#F4B92A] flex items-center justify-center shadow-md shrink-0 group-hover:scale-110 transition-transform">
                    <Plane size={25} />
                  </div>
                  <span className="text-xs font-bold bg-[#F4B92A] text-[#2C0054] px-3 py-1 rounded-full border border-[#2C0054]/20">
                    Paso 03
                  </span>
                </div>
                <h4 className="text-lg font-heading font-bold text-brand-primary mb-2.5">
                  3. Itinerario & Acompañamiento 360°
                </h4>
                <p className="text-smoke text-[14px] font-sans font-light leading-relaxed">
                  Recibes tus boletos, voucher y recomendaciones exclusivas. Te brindamos soporte continuo antes y durante toda tu estancia.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ViajesClient(props: any) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f7f5f8]" />}>
      <ViajesContent {...props} />
    </Suspense>
  );
}