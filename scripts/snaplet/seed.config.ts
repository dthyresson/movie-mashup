import { SeedPrisma } from '@snaplet/seed/adapter-prisma'
import { defineConfig } from '@snaplet/seed/config'
import { db } from 'api/src/lib/db'

export default defineConfig({
  adapter: () => {
    // const client = new PrismaClient()
    return new SeedPrisma(db)
  },
  select: ['!*_prisma_migrations'],
})
