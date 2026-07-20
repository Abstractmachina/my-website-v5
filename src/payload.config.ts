import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import ExpenseTags from './collections/personal/ExpenseTags'
import Income from './collections/personal/Income'
import Budget from './globals/personal/Budget'
import Expenses from './collections/personal/Expenses'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Expenses, ExpenseTags, Income],
  globals: [
    Budget,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
  cors: {
    origins: [
      'http://localhost:3000',
      'https://my-website-v5.vercel.app',
    ]
  },
  csrf: [
      'http://localhost:3000',
      'https://my-website-v5.vercel.app',
    ]
})
