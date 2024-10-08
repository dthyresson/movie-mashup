import {
  useResponseCache,
  createInMemoryCache,
} from '@graphql-yoga/plugin-response-cache'

import { createGraphQLHandler } from '@redwoodjs/graphql-server'

import directives from 'src/directives/**/*.{js,ts}'
import sdls from 'src/graphql/**/*.sdl.{js,ts}'
import services from 'src/services/**/*.{js,ts}'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

export const cache = createInMemoryCache()

export const handler = createGraphQLHandler({
  loggerConfig: { logger, options: { level: 'debug', query: true } },
  directives,
  sdls,
  services,
  extraPlugins: [useResponseCache({ session: () => null, cache })],
  onException: () => {
    // Disconnect from your database with an unhandled exception.
    db.$disconnect()
  },
})
