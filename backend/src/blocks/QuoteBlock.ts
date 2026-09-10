import type { Block } from 'payload';

export const QuoteBlock: Block = {
  slug: 'quoteBlock',
  labels: {
    singular: 'Bloque de Cita',
    plural: 'Bloques de Citas',
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      label: 'Texto de la Cita / Frase Destacada',
      required: true,
    },
    {
      name: 'author',
      type: 'text',
      label: 'Autor o Fuente de la Cita',
    },
  ],
};
