import type { GraphQLResolveInfo } from 'graphql'

import type { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/types'

import type { PaginatedMovieMashups as RTPaginatedMovieMashups } from './shared-return-types'
import type { Query } from './shared-schema-types'

/** SDL: paginatedMovieMashups(limit: Int!, page: Int!): PaginatedMovieMashups */
export interface PaginatedMovieMashupsResolver {
  (
    args: { limit: number; page: number },
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTPaginatedMovieMashups | null>
}
