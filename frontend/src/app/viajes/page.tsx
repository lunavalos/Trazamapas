"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  CheckCircle2, 
  Compass, 
  Globe2, 
  Ticket, 
  Palmtree,
  Ship,
  Plane,
  Info,
  X,
  Send,
  Calendar,
  Sparkles,
  Clock,
  CreditCard
} from "lucide-react";

// Categories for Mundukos-style filter navigation
const CATEGORIES = [
  { id: "todos", label: "Todos los Viajes", icon: Globe2 },
  { id: "parques", label: "Parques Temáticos", icon: Ticket },
  { id: "playas", label: "Playas & Todo Incluido", icon: Palmtree },
  { id: "circuitos", label: "Circuitos Internacionales", icon: Compass },
  { id: "cruceros", label: "Cruceros & Servicios", icon: Ship },
];

// Rich Destinations and Travel Experiences Catalogue
const EXPERIENCES = [
  {
    id: "disney-california",
    category: "parques",
    title: "Disneyland Resort (California, EE. UU.)",
    location: "Anaheim, California",
    tag: "Agentes Certificados Disney",
    duration: "4 a 6 Días Recomendados",
    bestTime: "Todo el Año",
    image: "/images/02_castilo_aurora_disneyland_park_california.webp",
    desc: "Disfruta del parque original inaugurado por Walt Disney. Incluye entradas a Disneyland Park, California Adventure, hospedaje cercano y estrategia personalizada de acceso.",
    longDesc: "Disneyland Resort en Anaheim te invita a vivir la magia donde todo comenzó. Como Agentes Certificados Disney, diseñamos un itinerario a tu medida que incluye reservación de hoteles participantes (a solo unos pasos de la entrada), accesos con boleto Park Hopper, optimización de pases Lightning Lane mediante la app Disney Genie y reservaciones en restaurantes temáticos exclusivos.",
    features: [
      "Estrategia de acceso Lightning Lane & Optimización en App Oficial",
      "Reserva de Hoteles Seleccionados a pocos pasos de la entrada principal",
      "Asesoría personalizada por Agentes Certificados Disney",
      "Gestión de reservaciones para experiencias y restaurantes temáticos",
      "Planes flexibles de pago y asistencia personalizada previa y durante el viaje",
      "Tips exclusivos sobre horarios de espectáculos y desfiles nocturnos"
    ]
  },
  {
    id: "disney-world",
    category: "parques",
    title: "Walt Disney World (Orlando, Florida)",
    location: "Orlando, Florida",
    tag: "Agentes Certificados Disney",
    duration: "5 a 8 Días Recomendados",
    bestTime: "Septiembre a Mayo",
    image: "/images/01_disney_en_el_mundo_trazamapas.webp",
    desc: "Vive la magia en los 4 parques principales (Magic Kingdom, EPCOT, Hollywood Studios y Animal Kingdom) y resorts mágicos dentro de la propiedad.",
    longDesc: "El complejo vacacional más grande del mundo cuenta con 4 parques temáticos icónicos, 2 parques acuáticos y decenas de hoteles resort con tematización inigualable. Te guiamos paso a paso para elegir la mejor temporada, modalidad de boletos Park Hopper o Water Park, reservaciones de comidas con personajes y transportación gratuita dentro del complejo Disney.",
    features: [
      "Plan de Alimentos (Dining Plan) & Reserva de Restaurantes con Personajes",
      "Hospedaje en Hoteles Resort dentro de la propiedad Disney con transporte gratuito",
      "Planificación personalizada día por día ajustada a los ritmos de tu familia",
      "Beneficios de entrada anticipada a los parques para huéspedes de Disney",
      "Asesoría completa en vuelos redondos y seguros de asistencia médica",
      "Acompañamiento directo antes y durante toda tu estancia"
    ]
  },
  {
    id: "universal-studios",
    category: "parques",
    title: "Universal Studios & Epic Universe",
    location: "Orlando / Hollywood",
    tag: "Parques de Aventura",
    duration: "3 a 5 Días Recomendados",
    bestTime: "Todo el Año",
    image: "/images/05_disney_california_adventure.webp",
    desc: "Adéntrate en The Wizarding World of Harry Potter, Super Nintendo World y atracciones de máxima adrenalina para toda la familia.",
    longDesc: "Sumérgete en el universo cinematográfico más emocionante de la industria. Disfruta de la magia de Harry Potter en Diagon Alley y Hogsmeade, la acción inmersiva de Super Nintendo World y el nuevo y revolucionario parque Epic Universe. Cotizamos paquetes integrales con pases Express Pass para evitar filas y alojamiento en los resorts oficiales de Universal.",
    features: [
      "Pases Universal Express Pass (acceso rápido prioritario)",
      "Hoteles oficiales dentro del complejo con transporte gratuito y entrada temprana",
      "Combos integrados con parques Disney o paseos por Orlando/Hollywood",
      "Asesoría experta en boletos multidía y paquetes familiares",
      "Acceso directo a Universal CityWalk y opciones gastronómicas",
      "Soporte continuo de nuestros asesores de viaje"
    ]
  },
  {
    id: "cancun-riviera",
    category: "playas",
    title: "Cancún & Riviera Maya Todo Incluido",
    location: "Quintana Roo, México",
    tag: "Todo Incluido Premium",
    duration: "4 a 7 Días Recomendados",
    bestTime: "Noviembre a Mayo",
    image: "/images/03_ tianas_bayou_adenture_disneyland_park_california.webp",
    desc: "Relájate en las mejores playas del Caribe Mexicano con hospedaje, alimentos, bebidas ilimitadas y transportación aeropuerto-hotel.",
    longDesc: "Las aguas turquesas del Caribe Mexicano te esperan para unas vacaciones sin preocupaciones. Seleccionamos resorts 5 estrellas y de gran turismo según tus preferencias (familiar, parejas o solo adultos) garantizando alta gastronomía internacional, clubes de playa, actividades acuáticas y traslados privados cómodos y puntuales.",
    features: [
      "Resorts 5 Estrellas y Gran Turismo All-Inclusive de primera categoría",
      "Transportación redonda privada Aeropuerto - Hotel - Aeropuerto",
      "Tarifas preferenciales negociadas y planes de pago congelados",
      "Asistencia en reservación de tours y excursiones (Cenotes, Isla Mujeres, Tulum)",
      "Opciones con o sin vuelos redondos desde tu ciudad de origen",
      "Atención personalizada a grupos, bodas de destino y viajes familiares"
    ]
  },
  {
    id: "xcaret-nickelodeon",
    category: "playas",
    title: "Parques Xcaret & Nickelodeon Hotels",
    location: "Riviera Maya, México",
    tag: "Experiencia Familiar",
    duration: "4 a 6 Días Recomendados",
    bestTime: "Todo el Año",
    image: "/images/10_meet_baymax.webp",
    desc: "Aventuras ecoturísticas en ríos subterráneos, cenotes y parques de aventura, o hospedaje con convivencia de personajes Nickelodeon.",
    longDesc: "Experimenta los resorts conceptuales más aclamados de México. En Hotel Xcaret disfruta del innovador programa All-Fun Inclusive con acceso ilimitado a todos sus parques (Xcaret, Xel-Há, Xplor, Xenses, Xenotes y Xoximilco) y en Nickelodeon Resort diviértete con el parque acuático Aqua Nick y la convivencia diaria con Bob Esponja y los personajes de Nick.",
    features: [
      "Concepto All-Fun Inclusive: entradas y transportación ilimitada a todos los parques",
      "Experiencias gastronómicas de autor dirigidas por reconocidos chefs",
      "Parque acuático Aqua Nick y convivencia exclusiva con personajes",
      "Habitaciones temáticas familiares con amenidades premium de lujo",
      "Traslados aeropuerto-hotel incluidos sin costo adicional",
      "Asesoría para optimizar tus visitas a cada parque según tus intereses"
    ]
  },
  {
    id: "los-cabos-vallarta",
    category: "playas",
    title: "Los Cabos & Puerto Vallarta",
    location: "Pacífico Mexicano",
    tag: "Playas Nacionales",
    duration: "4 a 5 Días Recomendados",
    bestTime: "Octubre a Mayo",
    image: "/images/09_san_fransokyo.webp",
    desc: "Disfruta de espectaculares atardeceres en el Arco de Los Cabos o la tradición colonial de Puerto Vallarta en resorts de lujo.",
    longDesc: "El Pacífico Mexicano fusiona paisajes imponentes de desierto y mar con una inigualable hospitalidad. Te ofrecemos paquetes a tu medida en Cabo San Lucas, San José del Cabo, Puerto Vallarta y Riviera Nayarit, con vuelos directos, hoteles de cadena internacional y paseos marítimos memorables.",
    features: [
      "Flexibilidad entre Plan Todo Incluido o Solo Desayunos",
      "Vuelos directos con equipaje coordinado y traslados seguros",
      "Tours emblemáticos: Arco en Transparente, Yate Privado, Avistamiento de Ballenas",
      "Selección de resorts reconocidos por su servicio gastronómico",
      "Facilidad de diferir tu viaje a meses sin intereses o pagos periódicos",
      "Atención cercana de nuestro equipo antes y durante la estancia"
    ]
  },
  {
    id: "europa-clasica",
    category: "circuitos",
    title: "Circuitos por Europa Clásica",
    location: "España, Francia, Italia & Suiza",
    tag: "Guías en Español",
    duration: "12 a 18 Días Recomendados",
    bestTime: "Abril a Octubre",
    image: "/images/04_desfile_personajes_disneyland_california.webp",
    desc: "Recorre las capitales europeas más icónicas con autobús climatizado, guías bilingües en español, desayunos diarios y excursiones incluidas.",
    longDesc: "Recorre el viejo continente sin complicaciones logísticas. Nuestros circuitos por Europa incluyen transporte en autobuses de alto confort con Wi-Fi, guías profesionales acompañantes en español, desayunos diarios en cada ciudad, seguro de viaje internacional y visitas guiadas a monumentos históricos en Madrid, París, Roma, Venecia, Florencia y Lucerna.",
    features: [
      "Hoteles seleccionados de categoría turista superior e 4 estrellas",
      "Guía acompañante profesional bilingüe durante todo el recorrido",
      "Desayunos buffet diarios e itinerario estructurado con tiempo libre",
      "Vuelos internacionales y traslados aeropuerto-hotel incluidos",
      "Seguro médico internacional con amplia cobertura de gastos médicos",
      "Sesión previa de orientación sobre divisas, documentos y equipaje"
    ]
  },
  {
    id: "asia-turquia",
    category: "circuitos",
    title: "Japón, Turquía & Egipto",
    location: "Asia & Medio Oriente",
    tag: "Destino Exótico",
    duration: "10 a 15 Días Recomendados",
    bestTime: "Marzo a Mayo / Septiembre a Noviembre",
    image: "/images/08_avengers_campus_disney_california_adventure.webp",
    desc: "Desde los templos y trenes bala en Tokio hasta los paseos en globo por Capadocia y cruceros por el Río Nilo en Egipto.",
    longDesc: "Aventúrate a destinos milenarios llenos de misticismo y cultura viva. Diseñamos itinerarios guiados en español para explorar Tokio, Kioto y Monte Fuji en Japón; Estambul y el vuelo en globo sobre los paisajes de Capadocia en Turquía; o el Cairo y la navegación en crucero de lujo por el Río Nilo en Egipto.",
    features: [
      "Itinerarios completos con vuelos internacionales e internos",
      "Experiencias icónicas: Tren Bala JR, Crucero por el Nilo, Vuelo en Globo",
      "Guías locales de habla hispana en cada punto de interés",
      "Asesoría y acompañamiento en tramitación de visados y permisos",
      "Hoteles seleccionados con excelente ubicación estratégica",
      "Asistencia 24/7 en español durante toda tu travesía"
    ]
  },
  {
    id: "chepe-express",
    category: "circuitos",
    title: "Chepe Express & Barrancas del Cobre",
    location: "Chihuahua & Sinaloa, México",
    tag: "Circuito Nacional",
    duration: "5 a 7 Días Recomendados",
    bestTime: "Octubre a Marzo",
    image: "/images/07_rayo_mcqueen.webp",
    desc: "Recorre una de las maravillas naturales más espectaculares de México a bordo del famoso tren Chepe Express por las Barrancas del Cobre.",
    longDesc: "Vive una experiencia inolvidable atravesando la Sierra Tarahumara en el único tren de pasajeros de México. El recorrido del Chepe Express te lleva desde Los Mochis y El Fuerte en Sinaloa hasta Bahuichivo, Divisadero, Creel y la ciudad de Chihuahua. Incluye boletos de tren en categoría Ejecutiva o Primera, hospedaje en hoteles con vistas impresionantes a los cañones, traslados y excursiones guiadas por la cultura rarámuri.",
    features: [
      "Boletos en Tren Chepe Express (Categoría Ejecutiva o Primera)",
      "Hospedaje en Hoteles seleccionados en Divisadero y Creel",
      "Excursiones al Parque de Aventura Barrancas del Cobre y Teleférico",
      "Traslados privados o compartidos entre estaciones y hoteles",
      "Visitas a comunidades Rarámuris y valles de formación rocosa",
      "Asesoría completa en vuelos de llegada y salida (Los Mochis / Chihuahua)"
    ]
  },
  {
    id: "cruceros-caribe",
    category: "cruceros",
    title: "Cruceros Caribeños & Mediterráneo",
    location: "Royal Caribbean & Disney Cruise",
    tag: "Navegación de Lujo",
    duration: "5 a 8 Días Recomendados",
    bestTime: "Todo el Año",
    image: "/images/11_world_of_color.webp",
    desc: "Zarpa en los barcos más imponentes del mundo hacia islas privadas, playas cristalinas y puertos gastronómicos del Mediterráneo.",
    longDesc: "Disfruta de un resort flotante de 5 estrellas que abre sus puertas a un destino diferente cada mañana. Cotizamos camarotes interiores, con vista al mar o balcón privado en navieras líderes como Royal Caribbean, Disney Cruise Line, NCL y MSC. Incluye todas las comidas, espectáculos de nivel Broadway y paradas en islas privadas exclusivas.",
    features: [
      "Elección personalizada de camarote (Balcón, Vista al Mar, Suites)",
      "Plan All-Inclusive de alimentos gourmet y entretenimiento a bordo",
      "Escalas exclusivas en islas privadas como Perfect Day at CocoCay o Castaway Cay",
      "Coordinación de vuelos redondos y noches de hospedaje en puerto de salida",
      "Asesoría en paquetes de bebidas, internet y excursiones en puerto",
      "Atención integral previa al abordaje y check-in en línea asistido"
    ]
  },
  {
    id: "vuelos-esim-seguros",
    category: "cruceros",
    title: "Vuelos, Seguros & eSIM Internacional",
    location: "Cobertura Global",
    tag: "Servicios Esenciales",
    duration: "A la Medida de tu Viaje",
    bestTime: "Disponible 365 días",
    image: "/images/06_cars_land_disneycalifornia_adventure.webp",
    desc: "Complementa cualquier viaje con boletos de avión en todas las aerolíneas, seguro médico internacional y tarjetas eSIM con datos móviles al instante.",
    longDesc: "Garantiza un viaje seguro y cómodo con nuestros servicios complementarios de soporte integral. Emitimos boletos de avión en aerolíneas nacionales e internacionales, contratamos pólizas de seguro de viajero con cobertura contra imprevistos de salud y extravío de equipaje, y activamos tarjetas eSIM con datos de internet inmediatos sin necesidad de cambiar tu chip físico.",
    features: [
      "eSIM de internet celular instantáneo para más de 150 países",
      "Seguros de asistencia médica internacional con cobertura COVID y equipaje",
      "Búsqueda y emisión de boletos de avión al mejor precio con tarifas flexibles",
      "Gestión de equipaje, selección de asientos y check-in anticipado",
      "Atención y soporte telefónico ante reprogramaciones o contingencias de vuelo",
      "Facturación y atención personalizada directa en nuestras oficinas de Saltillo"
    ]
  }
];

function ViajesContent() {
  const [activeCategory, setActiveCategory] = useState("todos");
  const [selectedExperience, setSelectedExperience] = useState<typeof EXPERIENCES[0] | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    const detallesId = searchParams.get("detalles") || searchParams.get("verDetails");
    if (detallesId) {
      const found = EXPERIENCES.find((item) => item.id === detallesId);
      if (found) {
        setSelectedExperience(found);
      }
    }
  }, [searchParams]);

  const filteredExperiences = activeCategory === "todos" 
    ? EXPERIENCES 
    : EXPERIENCES.filter(item => item.category === activeCategory);

  return (
    <main className="flex flex-col min-h-screen bg-[#f7f5f8]">
      
      {/* 1. HERO SECTION (Matching Disney Hero style) */}
      <section className="relative -mt-[104px] pt-[150px] sm:pt-[180px] pb-20 sm:pb-24 px-5 sm:px-8 bg-[#2C0054] text-white overflow-hidden min-h-[460px] flex items-center">
        {/* Background Image with Dark Purple Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/04_desfile_personajes_disneyland_california.webp" 
            alt="Nuestros Viajes y Experiencias TrazaMapas" 
            fill 
            className="object-cover object-center opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2C0054]/95 via-[#2C0054]/80 to-[#2C0054]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C0054]/90 via-transparent to-[#2C0054]/60" />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-[45px] font-heading font-bold uppercase tracking-tight mb-4 leading-tight text-white">
              Nuestros Viajes & Experiencias
            </h1>

            <p className="text-white/90 text-[15px] sm:text-[16px] font-sans font-light leading-relaxed">
              Explora nuestro catálogo de destinos principales. Te asesoramos como <strong>Agentes Certificados Disney</strong> y expertos en paquetes todo incluido, circuitos internacionales y asesoría de viaje.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. MUNDUKOS-STYLE INTERACTIVE CATEGORY FILTER BAR (NON-STICKY) */}
      <section className="py-10 px-5 sm:px-8 bg-[#f7f5f8] border-b border-[#2c0054]/10">
        <div className="max-w-[1280px] mx-auto">
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center">
            {CATEGORIES.map((cat) => {
              const IconComp = cat.icon;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-200 flex items-center gap-2 border cursor-pointer shrink-0 ${
                    isActive
                      ? "bg-[#2C0054] text-[#F4B92A] border-[#2C0054] shadow-md scale-105"
                      : "bg-surface-white text-cinder border-[#2c0054]/15 hover:bg-[#2C0054]/10 hover:border-[#2C0054]/30"
                  }`}
                >
                  <IconComp size={16} className={isActive ? "text-[#F4B92A]" : "text-brand-primary"} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. EXPERIENCES GRID */}
      <section className="py-[80px] px-5 sm:px-8 relative bg-[#f7f5f8]">
        <div className="max-w-[1280px] mx-auto space-y-12">
          
          {/* Section Subtitle */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#2c0054]/15 pb-6"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-brand-primary uppercase tracking-tight">
                Destinos & Opciones de Viaje
              </h2>
              <p className="text-smoke text-sm font-sans font-light mt-1">
                Haz clic en cualquier tarjeta para ver información detallada o cotizar tu viaje con nuestros asesores.
              </p>
            </div>

            {/* Counter Badge with Extra Horizontal Space */}
            <div className="bg-surface-white px-7 py-2.5 rounded-full border border-[#2c0054]/15 text-xs font-bold text-brand-primary shadow-2xs">
              <span>{filteredExperiences.length} Opciones disponibles</span>
            </div>
          </motion.div>

          {/* Experience Cards Grid with Smooth Non-Distorting Filter Animations */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            <AnimatePresence mode="popLayout">
              {filteredExperiences.map((exp) => (
                <motion.div
                  layout="position"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  key={exp.id}
                  className="bg-surface-white border border-[#2c0054]/15 rounded-[22px] overflow-hidden shadow-xs hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between group"
                >
                  {/* Card Header Image */}
                  <div>
                    <div className="relative h-[220px] w-full overflow-hidden">
                      <Image 
                        src={exp.image} 
                        alt={exp.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      
                      {/* Location Badge at Bottom Left */}
                      <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-xs font-light px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
                        <MapPin size={13} className="text-[#F4B92A]" />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-heading font-bold text-brand-primary group-hover:text-[#3d0075] transition-colors leading-snug">
                        {exp.title}
                      </h3>

                      <p className="text-smoke text-xs sm:text-[13px] font-sans font-light leading-relaxed">
                        {exp.desc}
                      </p>

                      {/* Bullet Features */}
                      <ul className="space-y-2 pt-2 border-t border-[#2c0054]/10">
                        {exp.features.slice(0, 3).map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs font-sans text-smoke">
                            <CheckCircle2 size={14} className="text-[#F4B92A] shrink-0" />
                            <span className="line-clamp-1">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Action Buttons: Ver detalles + Cotizar (leading to /contacto) */}
                  <div className="p-6 pt-0 flex flex-col sm:flex-row items-center gap-2.5">
                    <button
                      onClick={() => setSelectedExperience(exp)}
                      className="w-full sm:flex-1 py-2.5 px-3 bg-[#f7f5f8] text-[#2C0054] font-bold text-xs rounded-[12px] border border-[#2c0054]/20 hover:bg-[#2C0054] hover:text-white transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Info size={14} />
                      <span>Ver detalles</span>
                    </button>

                    <Link 
                      href="/contacto"
                      className="w-full sm:flex-1 py-2.5 px-3 bg-[#2C0054] text-[#F4B92A] font-bold text-xs rounded-[12px] hover:bg-black hover:text-white transition-all shadow-xs inline-flex items-center justify-center gap-1.5"
                    >
                      <Send size={14} />
                      <span>Cotizar</span>
                    </Link>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* 4. HOW WE TRACE YOUR TRIP - 3-STEP PROCESS BANNER */}
      <section className="py-[80px] px-5 sm:px-8 bg-surface-white border-t border-[#2c0054]/15">
        <div className="max-w-[1280px] mx-auto">
          
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-[35px] font-heading font-bold text-brand-primary uppercase tracking-tight">
              ¿Cómo Trazamos Tu Próximo Viaje?
            </h2>
            <p className="text-smoke text-[15px] font-sans font-light mt-2.5 leading-relaxed">
              Diseñamos una experiencia sin complicaciones desde tu primera consulta hasta que regresas feliz a casa.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Step 1 */}
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
                    <Compass size={25} />
                  </div>
                  <span className="text-xs font-bold bg-[#F4B92A] text-[#2C0054] px-3 py-1 rounded-full border border-[#2C0054]/20">
                    Paso 01
                  </span>
                </div>
                <h4 className="text-lg font-heading font-bold text-brand-primary mb-2.5">
                  1. Asesoría & Selección
                </h4>
                <p className="text-smoke text-[14px] font-sans font-light leading-relaxed">
                  Escuchamos tus ideas, fechas y presupuesto para sugerirte los mejores destinos, paquetes todo incluido o experiencias Disney a tu medida.
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
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

            {/* Step 3 */}
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

      {/* 5. EXPANDED INTERACTIVE MODAL FOR DETAILED EXPERIENCE FEATURES */}
      <AnimatePresence>
        {selectedExperience && (
          <div className="fixed inset-0 bg-[#2C0054]/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-surface-white rounded-[24px] max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#2c0054]/20 relative space-y-6 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedExperience(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#f7f5f8] text-[#2C0054] hover:bg-[#2C0054] hover:text-white flex items-center justify-center transition shrink-0 cursor-pointer z-10"
                aria-label="Cerrar modal"
              >
                <X size={18} />
              </button>

              {/* Modal Image Header */}
              <div className="relative h-[220px] sm:h-[260px] w-full rounded-[18px] overflow-hidden shadow-sm border border-[#2c0054]/10">
                <Image 
                  src={selectedExperience.image} 
                  alt={selectedExperience.title} 
                  fill 
                  className="object-cover"
                />
                
                {/* Overlay Tags */}
                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="bg-black/70 backdrop-blur-xs text-white text-xs font-medium px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
                    <MapPin size={14} className="text-[#F4B92A]" />
                    <span>{selectedExperience.location}</span>
                  </div>

                  <div className="bg-[#2C0054]/90 backdrop-blur-xs text-[#F4B92A] text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-[#F4B92A]/30">
                    <Sparkles size={13} />
                    <span>{selectedExperience.tag}</span>
                  </div>
                </div>
              </div>

              {/* Modal Meta Bar (Duration & Best Season) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-[#f7f5f8] rounded-[16px] border border-[#2c0054]/10">
                <div className="flex items-center gap-2.5 text-xs text-cinder font-sans">
                  <Clock size={16} className="text-brand-primary shrink-0" />
                  <div>
                    <span className="font-bold block text-brand-primary">Duración Sugerida:</span>
                    <span>{selectedExperience.duration}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-xs text-cinder font-sans">
                  <Calendar size={16} className="text-brand-primary shrink-0" />
                  <div>
                    <span className="font-bold block text-brand-primary">Mejor Época para Viajar:</span>
                    <span>{selectedExperience.bestTime}</span>
                  </div>
                </div>
              </div>

              {/* Modal Title & Long Description */}
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-brand-primary leading-tight">
                  {selectedExperience.title}
                </h3>
                <p className="text-smoke text-sm font-sans font-light leading-relaxed">
                  {selectedExperience.longDesc}
                </p>
              </div>

              {/* Full Features & Itinerary List */}
              <div className="space-y-3 pt-4 border-t border-[#2c0054]/15">
                <h4 className="font-heading font-bold text-sm text-brand-primary uppercase tracking-wide flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#F4B92A]" />
                  <span>Lo que Incluye tu Experiencia TrazaMapas:</span>
                </h4>
                <ul className="grid grid-cols-1 gap-3">
                  {selectedExperience.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-sans text-smoke bg-[#f7f5f8]/50 p-2.5 rounded-[10px]">
                      <CheckCircle2 size={16} className="text-[#F4B92A] shrink-0 mt-0.5" />
                      <span className="leading-normal">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modal Footer Action Buttons */}
              <div className="pt-4 border-t border-[#2c0054]/15 flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href="/contacto"
                  onClick={() => setSelectedExperience(null)}
                  className="w-full sm:flex-1 py-3.5 px-6 bg-[#2C0054] text-[#F4B92A] font-bold text-sm rounded-[14px] hover:bg-black hover:text-white transition shadow-md inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send size={16} />
                  <span>Cotizar este Viaje</span>
                </Link>

                <button
                  onClick={() => setSelectedExperience(null)}
                  className="w-full sm:w-auto py-3.5 px-6 bg-[#f7f5f8] text-smoke font-semibold text-sm rounded-[14px] hover:bg-smoke/10 transition cursor-pointer"
                >
                  Cerrar
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}

export default function ViajesPage() {
  return (
    <Suspense fallback={<main className="flex flex-col min-h-screen bg-[#f7f5f8] pb-24" />}>
      <ViajesContent />
    </Suspense>
  );
}
