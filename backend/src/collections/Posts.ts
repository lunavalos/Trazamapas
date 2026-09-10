import type { CollectionConfig, FieldHook } from 'payload';
import { MediaBlock } from '../blocks/MediaBlock';
import { QuoteBlock } from '../blocks/QuoteBlock';
import { TipBlock } from '../blocks/TipBlock';
import { CtaBlock } from '../blocks/CtaBlock';

const formatSlug = (val: string): string =>
  val
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents / diacritics
    .replace(/[^a-z0-9 -]/g, '') // Remove special characters
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/-+/g, '-'); // Collapse consecutive dashes

const formatSlugHook =
  (fallbackField: string): FieldHook =>
  ({ data, originalDoc, value }) => {
    if (typeof value === 'string' && value.trim().length > 0) {
      return formatSlug(value);
    }
    const fallbackData = data?.[fallbackField] || originalDoc?.[fallbackField];
    if (fallbackData && typeof fallbackData === 'string') {
      return formatSlug(fallbackData);
    }
    return value;
  };

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        const path = data?.slug ? `/consejos/${data.slug}` : '';
        return `http://localhost:3000${path}`;
      },
    },
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: {
      autosave: true,
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título del Artículo',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'URL Slug',
      required: false,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Se genera automáticamente a partir del título (puedes dejarlo vacío o editarlo).',
      },
      hooks: {
        beforeValidate: [formatSlugHook('title')],
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Resumen / Extracto',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen Destacada / Portada',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Contenido Principal (Editor de Texto)',
      required: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      label: 'Bloques Modulares Adicionales (Imágenes, Citas, Tips, Botones)',
      blocks: [MediaBlock, QuoteBlock, TipBlock, CtaBlock],
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Categoría',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      label: 'Autor',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Fecha de Publicación',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date();
            }
            return value;
          },
        ],
      },
    },
  ],
};
