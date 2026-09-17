import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { getTripBySlug, getImageUrl } from '@/lib/payload';
import CtaSection from '@/components/CtaSection';

export const revalidate = 3600;

function renderLexicalNode(node: any, index: number) {
  if (!node) return null;
  if (node.text) {
    let text: any = node.text;
    if (node.format & 1) text = <strong key={index}>{text}</strong>; // bold
    if (node.format & 2) text = <em key={index}>{text}</em>; // italic
    if (node.format & 4) text = <u key={index}>{text}</u>; // underline
    return text;
  }

  const children = node.children ? node.children.map((child: any, i: number) => renderLexicalNode(child, i)) : null;

  switch (node.type) {
    case 'heading':
      if (node.tag === 'h1') return <h1 key={index} className="text-3xl font-heading font-bold text-[#2C0054] my-6">{children}</h1>;
      if (node.tag === 'h2') return <h2 key={index} className="text-2xl font-heading font-bold text-[#2C0054] my-5">{children}</h2>;
      if (node.tag === 'h3') return <h3 key={index} className="text-xl font-heading font-bold text-[#2C0054] my-4">{children}</h3>;
      return <h4 key={index} className="text-lg font-heading font-bold text-[#2C0054] my-3">{children}</h4>;
    case 'paragraph':
      return <p key={index} className="text-[#333] text-base leading-relaxed mb-5 font-sans font-light">{children}</p>;
    case 'list':
      if (node.listType === 'number') return <ol key={index} className="list-decimal pl-6 mb-5 space-y-2 text-[#333]">{children}</ol>;
      return <ul key={index} className="list-disc pl-6 mb-5 space-y-2 text-[#333]">{children}</ul>;
    case 'listitem':
      return <li key={index} className="text-base leading-relaxed">{children}</li>;
    default:
      return <div key={index}>{children}</div>;
  }
}

function renderContent(content: any) {
  if (!content) return null;
  if (typeof content === 'string') {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }
  if (content.root && content.root.children) {
    return content.root.children.map((node: any, index: number) => renderLexicalNode(node, index));
  }
  return null;
}

export default async function TripDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const trip = await getTripBySlug(resolvedParams.slug);

  if (!trip) {
    return (
      <main className="flex flex-col min-h-screen bg-[#f7f5f8]">
        <section className="relative -mt-[104px] pt-[150px] pb-20 px-5 bg-[#2C0054] text-white flex items-center justify-center min-h-[350px]">
          <h1 className="text-3xl font-heading font-bold uppercase">Viaje no encontrado</h1>
        </section>
        <section className="py-20 px-5 text-center">
          <p className="text-smoke mb-6">El viaje que buscas no existe o ha sido movido.</p>
          <Link
            href="/viajes"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#2C0054] text-[#F4B92A] font-bold rounded-xl hover:bg-black transition"
          >
            <ArrowLeft size={16} />
            <span>Volver a Viajes</span>
          </Link>
        </section>
      </main>
    );
  }

  const imageUrl = getImageUrl(trip.featuredImage);

  return (
    <main className="flex flex-col min-h-screen bg-[#f7f5f8]">
      {/* HERO SECTION */}
      <section className="relative -mt-[104px] pt-[150px] sm:pt-[180px] pb-16 sm:pb-20 px-5 sm:px-8 bg-[#2C0054] text-white overflow-hidden flex items-center min-h-[420px]">
        <div className="absolute inset-0 z-0">
          <Image 
            src={imageUrl} 
            alt={trip.title} 
            fill 
            unoptimized
            className="object-cover object-center opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2C0054]/95 via-[#2C0054]/80 to-[#2C0054]/50" />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto w-full">
          <Link
            href="/viajes"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#F4B92A] hover:text-white uppercase tracking-wider mb-6 transition"
          >
            <ArrowLeft size={16} />
            <span>Volver a todos los viajes</span>
          </Link>

          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-heading font-bold text-white leading-tight uppercase mb-6">
            {trip.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm font-medium">
            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/10">
              <MapPin size={16} className="text-[#F4B92A]" />
              <span>{trip.location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLE CONTENT BODY */}
      <section className="py-12 sm:py-16 px-5 sm:px-8 relative bg-[#f7f5f8]">
        <div className="max-w-[1280px] mx-auto">
          <div className="bg-white border border-[#2c0054]/10 rounded-[24px] p-6 sm:p-10 lg:p-24 shadow-sm mb-12">
            
            {/* Meta Bar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-[#f7f5f8] rounded-[16px] border border-[#2c0054]/10 mb-24">
              <div className="flex items-center gap-3 text-sm text-cinder font-sans">
                <Clock size={20} className="text-brand-primary shrink-0" />
                <div>
                  <span className="font-bold block text-brand-primary">Duración Sugerida:</span>
                  <span>{trip.duration}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-cinder font-sans">
                <Calendar size={20} className="text-brand-primary shrink-0" />
                <div>
                  <span className="font-bold block text-brand-primary">Mejor Época para Viajar:</span>
                  <span>{trip.bestTime}</span>
                </div>
              </div>
            </div>

            {/* Content & Features Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              
              {/* Left Column: Long Description */}
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-heading font-bold text-[#2C0054] mb-4 uppercase">Descripción del Viaje</h3>
                <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-[#2C0054] prose-a:text-[#2C0054] prose-a:font-bold prose-img:rounded-xl">
                  {renderContent(trip.longDesc)}
                </div>
              </div>

              {/* Right Column: Features List */}
              <div className="lg:col-span-1">
                <div className="bg-[#2C0054]/5 rounded-[20px] p-6 border border-[#2c0054]/10 sticky top-28">
                  <h4 className="font-heading font-bold text-lg text-[#2C0054] uppercase tracking-wide mb-5">
                    Lo que Incluye:
                  </h4>
                  <ul className="space-y-4">
                    {trip.features?.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm font-sans text-smoke">
                        <CheckCircle2 size={18} className="text-[#F4B92A] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{feat.feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <CtaSection />
      
    </main>
  );
}