import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { seoPlugin } from '@payloadcms/plugin-seo';
import path from 'path';
import { fileURLToPath } from 'url';

import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Categories } from './collections/Categories';
import { Posts } from './collections/Posts';
import { TripCategories } from './collections/TripCategories';
import { Trips } from './collections/Trips';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'https://trazamapas-back.vercel.app',
  cors: '*',
  csrf: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://trazamapas-back.vercel.app',
    ...(process.env.NEXT_PUBLIC_SERVER_URL ? [process.env.NEXT_PUBLIC_SERVER_URL] : []),
    ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
  ],
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- TrazaMapas CMS',
      icons: [{ rel: 'icon', type: 'image/x-icon', url: '/images/favicon.ico' }],
    },
  },
  collections: [Users, Media, Categories, Posts, TripCategories, Trips],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'trazamapas-payload-secret-key-2026-secure',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || 'postgresql://postgres:postgres@127.0.0.1:5432/trazamapas',
    },
  }),
  plugins: [
    seoPlugin({
      collections: ['posts'],
      generateTitle: ({ doc }) => `${doc?.title?.val || doc?.title || 'ArtÃ­culo'} | Blog TrazaMapas`,
      generateDescription: ({ doc }) => doc?.excerpt?.val || doc?.excerpt || 'Lee los mejores consejos de viaje en TrazaMapas.',
      uploadsCollection: 'media',
    }),
  ],
});
