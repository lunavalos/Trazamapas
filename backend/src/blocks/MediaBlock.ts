import type { Block } from 'payload';

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  labels: {
    singular: 'Bloque de Imagen y Texto (50/50)',
    plural: 'Bloques de Imagen y Texto (50/50)',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Título (Opcional)',
    },
    {
      name: 'text',
      type: 'textarea',
      label: 'Texto / Descripción (50% de la columna)',
      required: true,
    },
    {
      name: 'imagePosition',
      type: 'select',
      label: 'Posición de la Imagen',
      defaultValue: 'left',
      options: [
        { label: 'Imagen a la Izquierda / Texto a la Derecha', value: 'left' },
        { label: 'Imagen a la Derecha / Texto a la Izquierda', value: 'right' },
      ],
    },
  ],
};
