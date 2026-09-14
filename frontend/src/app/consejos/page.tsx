import Image from "next/image";
import Link from "next/link";
import { Compass, Sparkles, BookOpen, ArrowRight, Calendar } from "lucide-react";
import { getPosts, getImageUrl, getCategoryName } from "@/lib/payload";

// ISR: Next.js guarda una copia estática de los posts.
// Si el backend está caído, sirve la última versión cacheada.
// Cuando el backend vuelva, regenera la página cada hora.
export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="flex flex-col min-h-screen bg-[#f7f5f8]">
      
      {/* 1. HERO SECTION BLOG */}
      <section className="relative -mt-[104px] pt-[150px] sm:pt-[180px] pb-20 sm:pb-24 px-5 sm:px-8 bg-[#2C0054] text-white overflow-hidden min-h-[460px] flex items-center">
        {/* Background Image with Dark Purple Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/04_desfile_personajes_disneyland_california.webp" 
            alt="Blog TrazaMapas Consejos de Viaje" 
            fill 
            className="object-cover object-center opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2C0054]/95 via-[#2C0054]/80 to-[#2C0054]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C0054]/90 via-transparent to-[#2C0054]/60" />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto w-full">
          <div className="max-w-3xl animate-fadeIn">
            <h1 className="text-3xl sm:text-4xl lg:text-[45px] font-heading font-bold uppercase tracking-tight mb-4 leading-tight text-white">
              Blog & Consejos de Viaje
            </h1>

            <p className="text-white/90 text-[15px] sm:text-[16px] font-sans font-light leading-relaxed">
              Explora nuestros artículos, guías detalladas, itinerarios sugeridos y secretos para aprovechar al máximo tus vacaciones Disney, destinos nacionales e internacionales.
            </p>
          </div>
        </div>
      </section>

      {/* 2. BLOG POSTS LISTING / FALLBACK SECTION */}
      <section className="py-[80px] px-5 sm:px-8 relative bg-[#f7f5f8]">
        <div className="max-w-[1280px] mx-auto">
          
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => {
                const imageUrl = getImageUrl(post.featuredImage);
                const formattedDate = post.publishedAt 
                  ? new Date(post.publishedAt).toLocaleDateString('es-MX', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })
                  : null;

                return (
                  <article
                    key={post.id || index}
                    className="bg-white border border-[#2c0054]/10 rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                  >
                    {/* Image Container */}
                    <Link href={`/consejos/${post.slug}`} className="relative h-64 sm:h-72 w-full overflow-hidden block">
                      <Image
                        src={imageUrl}
                        alt={post.title}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    {/* Content */}
                    <div className="p-6 sm:p-7 flex flex-col flex-1">
                      {formattedDate && (
                        <div className="flex items-center gap-1.5 text-xs text-[#2C0054]/60 font-medium mb-3">
                          <Calendar size={14} />
                          <span>{formattedDate}</span>
                        </div>
                      )}

                      <h2 className="text-xl font-heading font-bold text-[#2C0054] mb-3 line-clamp-2 leading-snug group-hover:text-black transition">
                        <Link href={`/consejos/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h2>

                      {post.excerpt && (
                        <p className="text-[#555] text-sm font-light leading-relaxed line-clamp-3 mb-6 flex-1">
                          {post.excerpt}
                        </p>
                      )}

                      <div className="pt-4 border-t border-[#2c0054]/10 flex items-center justify-between mt-auto">
                        <Link
                          href={`/consejos/${post.slug}`}
                          className="inline-flex items-center gap-2 text-xs font-bold text-[#2C0054] hover:text-black uppercase tracking-wider group/link"
                        >
                          <span>Leer artículo completo</span>
                          <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="bg-surface-white border border-[#2c0054]/15 rounded-[24px] p-8 sm:p-12 lg:p-16 text-center max-w-3xl mx-auto shadow-sm">
              <div className="w-16 h-16 rounded-full bg-[#2C0054]/10 text-brand-primary flex items-center justify-center mx-auto mb-6">
                <BookOpen size={32} />
              </div>

              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F4B92A]/20 text-[#2C0054] font-bold text-xs mb-4 border border-[#F4B92A]/30">
                <Sparkles size={14} className="text-[#2C0054]" />
                Próximamente
              </span>

              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-brand-primary uppercase tracking-tight mb-3">
                Estamos Trazando Nuevas Historias
              </h2>

              <p className="text-smoke text-[15px] font-sans font-light leading-relaxed mb-8 max-w-xl mx-auto">
                Nuestros asesores certificados están preparando guías exclusivas, tips de ahorro en parques Disney, itinerarios recomendados por Europa y novedades de viajes.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/viajes"
                  className="w-full sm:w-auto py-3.5 px-7 bg-[#2C0054] text-[#F4B92A] font-bold text-sm rounded-[14px] hover:bg-black hover:text-white transition shadow-md flex items-center justify-center gap-2 group"
                >
                  <Compass size={18} />
                  <span>Explorar Viajes</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/contacto"
                  className="w-full sm:w-auto py-3.5 px-7 bg-[#f7f5f8] border border-[#2c0054]/20 text-[#2C0054] font-bold text-sm rounded-[14px] hover:bg-[#2C0054] hover:text-[#F4B92A] transition flex items-center justify-center gap-2"
                >
                  <span>Cotizar Asesoría</span>
                </Link>
              </div>
            </div>
          )}

        </div>
      </section>

    </main>
  );
}
