import type { CollectionConfig } from 'payload';

export const Documents: CollectionConfig = {
  slug: 'documents',
  labels: {
    singular: 'Documento Oficial (RNT)',
    plural: 'Documentos Oficiales (RNT)',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Configuración',
    defaultColumns: ['title', 'documentType', 'vigencia', 'isCurrent', 'updatedAt'],
  },
  upload: {
    staticDir: 'public/documents',
    mimeTypes: ['application/pdf', 'image/*'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Nombre del Documento',
      required: true,
      defaultValue: 'Registro Nacional de Turismo (RNT)',
    },
    {
      name: 'documentType',
      type: 'select',
      label: 'Tipo de Documento',
      defaultValue: 'rnt',
      required: true,
      options: [
        { label: 'Registro Nacional de Turismo (RNT)', value: 'rnt' },
        { label: 'Cédula de Identificación Fiscal (SAT)', value: 'sat' },
        { label: 'Certificado de Agencia', value: 'certificado' },
        { label: 'Otro Documento', value: 'otro' },
      ],
    },
    {
      name: 'vigencia',
      type: 'text',
      label: 'Año / Vigencia',
      defaultValue: '2026',
      admin: {
        description: 'Texto que se mostrará en el sitio web (ej. 2026, 2027, etc.).',
      },
    },
    {
      name: 'isCurrent',
      type: 'checkbox',
      label: '¿Es el documento activo en el sitio web?',
      defaultValue: true,
      admin: {
        description: 'Activa esta casilla para que este documento se muestre en el botón RNT del navbar.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción / Notas internas',
    },
  ],
};
