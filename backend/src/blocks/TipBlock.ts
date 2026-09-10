import type { Block } from 'payload';

export const TipBlock: Block = {
  slug: 'tipBlock',
  labels: {
    singular: 'Bloque de Tip / Consejo de Viaje',
    plural: 'Bloques de Tips / Consejos',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título del Consejo',
      required: true,
      defaultValue: 'Tip de Viaje TrazaMapas',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción / Recomendación',
      required: true,
    },
  ],
};
