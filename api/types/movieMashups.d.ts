import type { GraphQLResolveInfo } from 'graphql'

import type { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/types'

import type { MovieMashup as RTMovieMashup } from './shared-return-types'
import type {
  CreateMovieMashupInput,
  UpdateMovieMashupInput,
  Query,
  Mutation,
} from './shared-schema-types'

/** SDL: movieMashups: [MovieMashup!]! */
export interface MovieMashupsResolver {
  (
    args?: object,
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTMovieMashup[]>
}

/** SDL: movieMashup(id: String!): MovieMashup */
export interface MovieMashupResolver {
  (
    args: { id: string },
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTMovieMashup | null>
}

/** SDL: createMovieMashup(input: CreateMovieMashupInput!): MovieMashup! */
export interface CreateMovieMashupResolver {
  (
    args: { input: CreateMovieMashupInput },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTMovieMashup>
}

/** SDL: updateMovieMashup(id: String!, input: UpdateMovieMashupInput!): MovieMashup! */
export interface UpdateMovieMashupResolver {
  (
    args: { id: string; input: UpdateMovieMashupInput },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTMovieMashup>
}

/** SDL: deleteMovieMashup(id: String!): MovieMashup! */
export interface DeleteMovieMashupResolver {
  (
    args: { id: string },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTMovieMashup>
}
