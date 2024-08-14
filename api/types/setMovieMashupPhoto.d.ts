import type { GraphQLResolveInfo } from 'graphql'

import type { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/types'

import type { MovieMashup as RTMovieMashup } from './shared-return-types'
import type { SetMovieMashupPhotoInput, Mutation } from './shared-schema-types'

/** SDL: setMovieMashupPhoto(input: SetMovieMashupPhotoInput!): MovieMashup! */
export interface SetMovieMashupPhotoResolver {
  (
    args: { input: SetMovieMashupPhotoInput },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTMovieMashup>
}
