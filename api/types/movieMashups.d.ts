import type {
  Movie as PMovie,
  MovieMashup as PMovieMashup,
} from '@prisma/client'
import type { GraphQLResolveInfo } from 'graphql'

import type { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/types'

import type {
  MovieMashup as RTMovieMashup,
  Movie as RTMovie,
} from './shared-return-types'
import type {
  MashMoviesInput,
  CreateMovieMashupInput,
  UpdateMovieMashupInput,
  Mutation,
  Query,
} from './shared-schema-types'

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

/** SDL: movieMashups: [MovieMashup!]! */
export interface MovieMashupsResolver {
  (
    args?: object,
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ):
    | RTMovieMashup[]
    | Promise<RTMovieMashup[]>
    | (() => Promise<RTMovieMashup[]>)
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
  ):
    | RTMovieMashup
    | null
    | Promise<RTMovieMashup | null>
    | (() => Promise<RTMovieMashup | null>)
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
  ): RTMovieMashup | Promise<RTMovieMashup> | (() => Promise<RTMovieMashup>)
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
  ): RTMovieMashup | Promise<RTMovieMashup> | (() => Promise<RTMovieMashup>)
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
  ): RTMovieMashup | Promise<RTMovieMashup> | (() => Promise<RTMovieMashup>)
}

export interface MovieMashupTypeResolvers {
  /** SDL: firstMovie: Movie! */
  firstMovie: (
    args: undefined,
    obj: {
      root: MovieMashupAsParent
      context?: RedwoodGraphQLContext
      info?: GraphQLResolveInfo
    }
  ) => RTMovie | Promise<RTMovie> | (() => Promise<RTMovie>)

  /** SDL: secondMovie: Movie! */
  secondMovie: (
    args: undefined,
    obj: {
      root: MovieMashupAsParent
      context?: RedwoodGraphQLContext
      info?: GraphQLResolveInfo
    }
  ) => RTMovie | Promise<RTMovie> | (() => Promise<RTMovie>)

  /** SDL: movies: [Movie]! */
  movies: (
    args: undefined,
    obj: {
      root: MovieMashupAsParent
      context?: RedwoodGraphQLContext
      info?: GraphQLResolveInfo
    }
  ) =>
    | Array<RTMovie>
    | Promise<Array<RTMovie>>
    | (() => Promise<Array<RTMovie>>)
}

type MovieMashupAsParent = PMovieMashup & {
  firstMovie: () => PMovie | Promise<PMovie> | (() => Promise<PMovie>)
  secondMovie: () => PMovie | Promise<PMovie> | (() => Promise<PMovie>)
  movies: () =>
    | Array<PMovie>
    | Promise<Array<PMovie>>
    | (() => Promise<Array<PMovie>>)
}
