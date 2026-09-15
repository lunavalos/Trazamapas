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

export const TripCategories: CollectionConfig = {
  slug: 'trip-categories',
  labels: {
    singular: 'Categoria de Viaje',
    plural: 'Categorias de Viaje',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Viajes',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titulo',
    },
    {
      name: 'value',
      type: 'text',
      required: false,
      unique: true,
      label: 'Valor/Slug',
      admin: {
        description: 'Se generara automaticamente (ej. parques, playas).',
      },
      hooks: {
        beforeValidate: [formatSlugHook('title')],
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Imagen Principal (Para la pagina de inicio)',
    },
    {
      name: 'iconName',
      type: 'select',
      label: 'Icono representativo',
      admin: {
        description: 'Selecciona el icono que aparecera en el boton del filtro',
      },
      options: [
        { label: '🌎 Globo terraqueo', value: 'Globe2' },
        { label: '🎟️ Ticket / Entrada', value: 'Ticket' },
        { label: '🌴 Palmera / Playa', value: 'Palmtree' },
        { label: '🧭 Brujula', value: 'Compass' },
        { label: '🚢 Barco / Crucero', value: 'Ship' },
        { label: '✈️ Avion', value: 'Plane' },
        { label: '📍 Pin de Mapa', value: 'MapPin' },
        { label: '💳 Tarjeta / Compras', value: 'CreditCard' },
        { label: '🎡 Rueda de la Fortuna', value: 'FerrisWheel' },
        { label: '🎢 Montaña Rusa', value: 'RollerCoaster' },
        { label: '🏰 Castillo', value: 'Castle' },
      ],
    },
  ],
};