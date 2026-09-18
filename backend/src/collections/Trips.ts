import { CollectionConfig } from 'payload';

export const Trips: CollectionConfig = {
  slug: 'trips',
  labels: {
    singular: 'Viaje',
    plural: 'Viajes',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Viajes',
    defaultColumns: ['title', 'location', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titulo del Viaje',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug (URL)',
      admin: {
        description: 'Se generara automaticamente de no ingresarse. (ej. mi-viaje)',
      },
      hooks: {
        beforeValidate: [
          ({ data, value }) => {
            if (!value && data?.title) {
              return data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            }
            return value;
          }
        ]
      }
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'trip-categories',
      hasMany: true,
      required: true,
      label: 'Categorias',
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      label: 'Pais o Localizacion',
    },
    {
      name: 'duration',
      type: 'text',
      required: true,
      label: 'Duracion (Ej. 4 a 6 Dias Recomendados)',
    },
    {
      name: 'bestTime',
      type: 'text',
      required: true,
      label: 'Mejor epoca para viajar (Ej. Todo el Ano)',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Imagen Principal',
    },
    {
      name: 'gallery',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      label: 'Galería de Imágenes',
      admin: {
        description: 'Imágenes complementarias para la galería del viaje.',
      },
    },
    {
      name: 'shortDesc',
      type: 'textarea',
      required: true,
      label: 'Descripcion Corta (Para la tarjeta)',
    },
    {
      name: 'longDesc',
      type: 'richText',
      required: true,
      label: 'Descripcion Larga (Para la pagina individual)',
    },
    {
      name: 'features',
      type: 'array',
      label: 'Que incluye la experiencia',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
          label: 'Elemento',
        },
      ],
    },
  ],
};
