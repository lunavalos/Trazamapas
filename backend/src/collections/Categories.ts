import type { CollectionConfig, FieldHook } from 'payload';

const formatSlug = (val: string): string =>
  val
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9 -]/g, '') // Remove special characters
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/-+/g, '-'); // Collapse dashes

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

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre de la Categoría',
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
        description: 'Se genera automáticamente a partir del nombre de la categoría.',
      },
      hooks: {
        beforeValidate: [formatSlugHook('name')],
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción de la Categoría',
    },
  ],
};
