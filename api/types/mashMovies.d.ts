import type { GraphQLResolveInfo } from 'graphql'

import type { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/types'

import type { MovieMashup as RTMovieMashup } from './shared-return-types'
import type { MashMoviesInput, Mutation } from './shared-schema-types'

/** SDL: mashMovies(input: MashMoviesInput!): MovieMashup! */
export interface MashMoviesResolver {
  (
    args: { input: MashMoviesInput },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTMovieMashup>
}
