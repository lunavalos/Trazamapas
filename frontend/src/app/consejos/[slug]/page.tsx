import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Compass } from "lucide-react";
import { getPostBySlug, getImageUrl } from "@/lib/payload";

// ISR: guarda una copia estática de cada post.
// Si el backend está caído, sirve la última versión cacheada.
// Cuando el backend vuelva, regenera la página cada hora.
export const revalidate = 3600;

// Helper to render rich text nodes from Lexical editor
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
    case 'quote':
      return <blockquote key={index} className="border-l-4 border-[#F4B92A] pl-5 italic my-6 text-[#2C0054] font-medium bg-[#2C0054]/5 py-3 rounded-r-lg">{children}</blockquote>;
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

// Helper to render modular blocks created in Payload CMS with 80px vertical separation
function renderBlock(block: any, index: number) {
  if (!block || !block.blockType) return null;
  switch (block.blockType) {
    case 'mediaBlock': {
      const imgUrl = getImageUrl(block.image);
      const isRight = block.imagePosition === 'right';
      return (
        <div key={index} className="my-[80px] flex flex-col md:flex-row gap-8 lg:gap-12 items-center">
          {/* Image: left by default, right if imagePosition === 'right' */}
          <div className={`relative h-[280px] sm:h-[360px] w-full md:w-1/2 flex-shrink-0 rounded-[20px] overflow-hidden shadow-md ${isRight ? 'md:order-2' : 'md:order-1'}`}>
            <Image src={imgUrl} alt={block.title || 'Imagen del artículo'} fill unoptimized className="object-cover" />
          </div>
          {/* Text: right by default, left if imagePosition === 'right' */}
          <div className={`flex flex-col justify-center w-full md:w-1/2 ${isRight ? 'md:order-1' : 'md:order-2'}`}>
            {block.title && (
              <h3 className="text-2xl font-heading font-bold text-[#2C0054] mb-4 uppercase tracking-tight">
                {block.title}
              </h3>
            )}
            <p className="text-[#333] text-base leading-relaxed font-sans font-light">
              {block.text}
            </p>
          </div>
        </div>
      );
    }
    case 'quoteBlock': {
      return (
        <blockquote key={index} className="my-[80px] border-l-4 border-[#F4B92A] pl-6 italic text-[#2C0054] font-medium bg-[#2C0054]/5 py-6 px-6 rounded-r-2xl">
          <p className="text-xl leading-relaxed mb-3">"{block.quote}"</p>
          {block.author && <cite className="block text-xs font-bold not-italic text-[#2C0054] uppercase tracking-wider">— {block.author}</cite>}
        </blockquote>
      );
    }
    case 'tipBlock': {
      return (
        <div key={index} className="my-[80px] bg-[#F4B92A]/15 border border-[#F4B92A]/40 rounded-[24px] p-8 flex items-center gap-5 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-[#2C0054] flex items-center justify-center flex-shrink-0 text-2xl shadow-md">
            💡
          </div>
          <div>
            <h4 className="font-heading font-bold text-[#2C0054] text-xl mb-3 uppercase tracking-tight">{block.title || 'Tip de Viaje'}</h4>
            <p className="text-[#333] text-base leading-relaxed font-light">{block.description}</p>
          </div>
        </div>
      );
    }
    case 'ctaBlock': {
      return (
        <div key={index} className="my-[80px] bg-[#2C0054] text-white rounded-[28px] py-14 sm:py-20 px-6 sm:px-12 text-center shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto relative z-10">
            <h3 className="text-2xl sm:text-3xl font-heading font-bold uppercase mb-4 text-[#F4B92A] leading-tight">
              {block.title || '¿Quieres planear este viaje con nosotros?'}
            </h3>
            {block.description && (
              <p className="text-white/90 text-base font-light leading-relaxed mb-8">
                {block.description}
              </p>
            )}
            <Link
              href={block.buttonLink || '/contacto'}
              className="inline-flex items-center gap-3 px-6 py-3 bg-[#F4B92A] text-[#2C0054] font-bold text-sm rounded-xl border-0 outline-none hover:bg-[#e6a820] transition-all duration-200"
            >
              <span>{block.buttonText || 'Cotizar Viaje Ahora'}</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      );
    }
    default:
      return null;
  }
}

export default async function BlogPostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    return (
      <main className="flex flex-col min-h-screen bg-[#f7f5f8]">
        <section className="relative -mt-[104px] pt-[150px] pb-20 px-5 bg-[#2C0054] text-white flex items-center justify-center min-h-[350px]">
          <h1 className="text-3xl font-heading font-bold uppercase">Artículo no encontrado</h1>
        </section>
        <section className="py-20 px-5 text-center">
          <p className="text-smoke mb-6">El artículo que buscas no existe o ha sido movido.</p>
          <Link
            href="/consejos"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#2C0054] text-[#F4B92A] font-bold rounded-xl hover:bg-black transition"
          >
            <ArrowLeft size={16} />
            <span>Volver al Blog</span>
          </Link>
        </section>
      </main>
    );
  }

  const imageUrl = getImageUrl(post.featuredImage);
  const authorName = typeof post.author === 'object' && post.author?.name 
    ? post.author.name 
    : 'Asesor TrazaMapas';
  const formattedDate = post.publishedAt 
    ? new Date(post.publishedAt).toLocaleDateString('es-MX', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    : null;

  return (
    <main className="flex flex-col min-h-screen bg-[#f7f5f8]">
      
      {/* HERO SECTION */}
      <section className="relative -mt-[104px] pt-[150px] sm:pt-[180px] pb-16 sm:pb-20 px-5 sm:px-8 bg-[#2C0054] text-white overflow-hidden flex items-center min-h-[420px]">
        <div className="absolute inset-0 z-0">
          <Image 
            src={imageUrl} 
            alt={post.title} 
            fill 
            unoptimized
            className="object-cover object-center opacity-30 blur-sm"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2C0054]/95 via-[#2C0054]/85 to-[#2C0054]/70" />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto w-full">
          <Link
            href="/consejos"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#F4B92A] hover:text-white uppercase tracking-wider mb-6 transition"
          >
            <ArrowLeft size={16} />
            <span>Volver a todos los artículos</span>
          </Link>

          {formattedDate && (
            <div className="flex items-center gap-1.5 text-white/80 text-xs font-medium mb-3">
              <Calendar size={13} />
              <span>{formattedDate}</span>
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-heading font-bold text-white leading-tight uppercase mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-2 text-white/80 text-xs font-light">
            <User size={14} className="text-[#F4B92A]" />
            <span>Escrito por: <strong className="font-semibold text-white">{authorName}</strong></span>
          </div>
        </div>
      </section>

      {/* ARTICLE CONTENT BODY */}
      <section className="py-12 sm:py-16 px-5 sm:px-8 relative bg-[#f7f5f8]">
        <div className="max-w-[1280px] mx-auto">
          
          <div className="bg-white border border-[#2c0054]/10 rounded-[24px] p-6 sm:p-10 lg:p-12 shadow-sm mb-12">
            {/* Featured Image */}
            {imageUrl && (
              <div className="relative h-[320px] sm:h-[480px] w-full rounded-[20px] overflow-hidden mb-8 shadow-md">
                <Image
                  src={imageUrl}
                  alt={post.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            )}

            {/* Excerpt */}
            {post.excerpt && (
              <div className="bg-[#2C0054]/5 border-l-4 border-[#2C0054] p-5 rounded-r-xl text-[#2C0054] font-medium text-lg leading-relaxed mb-8 italic">
                {post.excerpt}
              </div>
            )}

            {/* Body Rich Text Content */}
            <div className="prose prose-lg max-w-none text-[#333] mb-[80px]">
              {renderContent(post.content)}
            </div>

            {/* Modular Blocks Layout with 80px Vertical Spacing */}
            {Array.isArray((post as any).layout) && (post as any).layout.length > 0 && (
              <div className="pt-6 border-t border-[#2c0054]/10">
                {(post as any).layout.map((block: any, i: number) => renderBlock(block, i))}
              </div>
            )}

            {/* Bottom Footer Call to Action */}
            <div className="mt-[80px] pt-8 border-t border-[#2c0054]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/consejos"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#f7f5f8] border border-[#2c0054]/20 text-[#2C0054] font-bold text-sm rounded-xl hover:bg-[#2C0054] hover:text-white transition"
              >
                <ArrowLeft size={16} />
                <span>Ver más consejos de viaje</span>
              </Link>

              <Link
                href="/contacto"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#2C0054] text-[#F4B92A] font-bold text-sm rounded-xl hover:bg-black transition shadow-md"
              >
                <Compass size={16} />
                <span>Cotizar viaje con este asesor</span>
              </Link>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}
