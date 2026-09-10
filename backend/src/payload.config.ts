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

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- TrazaMapas CMS',
      icons: [{ rel: 'icon', type: 'image/x-icon', url: '/images/favicon.ico' }],
    },
  },
  collections: [Users, Media, Categories, Posts],
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
      generateTitle: ({ doc }) => `${doc?.title?.val || doc?.title || 'Artículo'} | Blog TrazaMapas`,
      generateDescription: ({ doc }) => doc?.excerpt?.val || doc?.excerpt || 'Lee los mejores consejos de viaje en TrazaMapas.',
      uploadsCollection: 'media',
    }),
  ],
});
