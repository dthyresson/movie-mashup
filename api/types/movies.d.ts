import type {
  MovieMashup as PMovieMashup,
  Movie as PMovie,
} from '@prisma/client'
import type { GraphQLResolveInfo } from 'graphql'

import type { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/types'

import type {
  Movie as RTMovie,
  MovieMashup as RTMovieMashup,
} from './shared-return-types'
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
  ): RTMovie[] | Promise<RTMovie[]> | (() => Promise<RTMovie[]>)
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
  ): RTMovie | null | Promise<RTMovie | null> | (() => Promise<RTMovie | null>)
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
  ): RTMovie | Promise<RTMovie> | (() => Promise<RTMovie>)
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
  ): RTMovie | Promise<RTMovie> | (() => Promise<RTMovie>)
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
  ): RTMovie | Promise<RTMovie> | (() => Promise<RTMovie>)
}

export interface MovieTypeResolvers {
  /** SDL: firstMovieMashups: [MovieMashup]! */
  firstMovieMashups: (
    args: undefined,
    obj: {
      root: MovieAsParent
      context?: RedwoodGraphQLContext
      info?: GraphQLResolveInfo
    }
  ) =>
    | Array<RTMovieMashup>
    | Promise<Array<RTMovieMashup>>
    | (() => Promise<Array<RTMovieMashup>>)

  /** SDL: secondMovieMashups: [MovieMashup]! */
  secondMovieMashups: (
    args: undefined,
    obj: {
      root: MovieAsParent
      context?: RedwoodGraphQLContext
      info?: GraphQLResolveInfo
    }
  ) =>
    | Array<RTMovieMashup>
    | Promise<Array<RTMovieMashup>>
    | (() => Promise<Array<RTMovieMashup>>)

  /** SDL: mashups: [MovieMashup]! */
  mashups: (
    args: undefined,
    obj: {
      root: MovieAsParent
      context?: RedwoodGraphQLContext
      info?: GraphQLResolveInfo
    }
  ) =>
    | Array<RTMovieMashup>
    | Promise<Array<RTMovieMashup>>
    | (() => Promise<Array<RTMovieMashup>>)
}

type MovieAsParent = PMovie & {
  firstMovieMashups: () =>
    | Array<PMovieMashup>
    | Promise<Array<PMovieMashup>>
    | (() => Promise<Array<PMovieMashup>>)
  secondMovieMashups: () =>
    | Array<PMovieMashup>
    | Promise<Array<PMovieMashup>>
    | (() => Promise<Array<PMovieMashup>>)
  mashups: () =>
    | Array<PMovieMashup>
    | Promise<Array<PMovieMashup>>
    | (() => Promise<Array<PMovieMashup>>)
}
