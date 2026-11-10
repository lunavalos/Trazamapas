import { CollectionConfig, FieldHook } from 'payload';

const formatSlug = (val: string): string =>
  val
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 -]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

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

export const TripOperators: CollectionConfig = {
  slug: 'trip-operators',
  labels: {
    singular: 'Operador',
    plural: 'Operadores',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Viajes',
    defaultColumns: ['title', 'value', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Nombre del Operador (Ej. Mega Travel)',
    },
    {
      name: 'value',
      type: 'text',
      required: false,
      unique: true,
      label: 'Valor / Slug (URL)',
      admin: {
        description: 'Se generará automáticamente (ej. mega-travel, nefertari, eme-travel).',
      },
      hooks: {
        beforeValidate: [formatSlugHook('title')],
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Logo del Operador (Opcional)',
    },
  ],
};

