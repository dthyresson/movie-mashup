import type { GraphQLResolveInfo } from 'graphql'

import type { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/types'

import type { Movie as RTMovie } from './shared-return-types'
import type {
  CreateMovieInput,
  UpdateMovieInput,
  Query,
  Mutation,
} from './shared-schema-types'

/** SDL: movies: [Movie!]! */
export interface MoviesResolver {
  (
    args?: object,
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTMovie[]>
}

/** SDL: movie(id: String!): Movie */
export interface MovieResolver {
  (
    args: { id: string },
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTMovie | null>
}

/** SDL: createMovie(input: CreateMovieInput!): Movie! */
export interface CreateMovieResolver {
  (
    args: { input: CreateMovieInput },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTMovie>
}

/** SDL: updateMovie(id: String!, input: UpdateMovieInput!): Movie! */
export interface UpdateMovieResolver {
  (
    args: { id: string; input: UpdateMovieInput },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTMovie>
}

/** SDL: deleteMovie(id: String!): Movie! */
export interface DeleteMovieResolver {
  (
    args: { id: string },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTMovie>
}
