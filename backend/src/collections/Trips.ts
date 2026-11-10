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
      name: 'operator',
      type: 'relationship',
      relationTo: 'trip-operators',
      hasMany: false,
      required: false,
      label: 'Operador (Ej. Mega Travel, Nefertari, Eme Travel)',
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
      name: 'price',
      type: 'text',
      required: false,
      label: 'Precio (Ej. Desde $1,599 USD + $899 USD IMP.)',
    },
    {
      name: 'airline',
      type: 'text',
      required: false,
      label: 'Aerolinea (Ej. Aeromexico)',
    },
    {
      name: 'termsAndConditions',
      type: 'textarea',
      required: false,
      label: 'Terminos y Condiciones',
      defaultValue:
        'Precios por persona en habitación doble o triple (DBL ó TPL P/P). Suplemento según fecha de salida. Tarifas sujetas a disponibilidad y cambios sin previo aviso.',
      admin: {
        description:
          'Si se deja el valor por defecto, mostrará la leyenda estándar. Puedes personalizarla por viaje si aplica.',
      },
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
