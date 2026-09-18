import type { CollectionConfig, Access } from 'payload';

const isAdmin: Access = ({ req: { user } }) => {
  if (!user) return true; // Allows first user registration during setup
  return user.role === 'admin';
};

const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false;
  if (user.role === 'admin') return true;
  return {
    id: {
      equals: user.id,
    },
  };
};

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role', 'createdAt'],
  },
  auth: true,
  access: {
    create: isAdmin,
    read: () => true,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre Completo',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      label: 'Rol de Usuario',
      defaultValue: 'admin',
      required: true,
      options: [
        { label: 'Administrador (Acceso total y gestión de usuarios)', value: 'admin' },
        { label: 'Usuario Normal / Editor (Solo edita su propio usuario)', value: 'user' },
      ],
      access: {
        read: ({ req: { user } }) => Boolean(user && user.role === 'admin'),
        create: ({ req: { user } }) => !user || user.role === 'admin',
        update: ({ req: { user } }) => Boolean(user && user.role === 'admin'),
      },
    },
  ],
};
