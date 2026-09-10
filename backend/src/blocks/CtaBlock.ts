import type { Block } from 'payload';

export const CtaBlock: Block = {
  slug: 'ctaBlock',
  labels: {
    singular: 'Bloque de Botón / Llamado a la Acción',
    plural: 'Bloques de Botón / Llamado a la Acción',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título o Encabezado de la Sección',
      defaultValue: '¿Quieres planear este viaje con nosotros?',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Texto Explicativo / Descripción',
      defaultValue: 'Nuestros asesores certificados te ayudan a cotizar y diseñar el itinerario perfecto con atención personalizada.',
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Texto del Botón',
      required: true,
      defaultValue: 'Cotizar Viaje Ahora',
    },
    {
      name: 'buttonLink',
      type: 'text',
      label: 'Enlace del Botón',
      required: true,
      defaultValue: '/contacto',
    },
  ],
};
