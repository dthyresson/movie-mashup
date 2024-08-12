import type {
  MovieMashup as PMovieMashup,
  Photo as PPhoto,
} from '@prisma/client'
import type { GraphQLResolveInfo } from 'graphql'

import type { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/types'

import type {
  Photo as RTPhoto,
  MovieMashup as RTMovieMashup,
} from './shared-return-types'
import type {
  CreatePhotoInput,
  UpdatePhotoInput,
  Query,
  Mutation,
} from './shared-schema-types'

/** SDL: photos: [Photo!]! */
export interface PhotosResolver {
  (
    args?: object,
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTPhoto[]>
}

/** SDL: photo(id: String!): Photo */
export interface PhotoResolver {
  (
    args: { id: string },
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTPhoto | null>
}

/** SDL: createPhoto(input: CreatePhotoInput!): Photo! */
export interface CreatePhotoResolver {
  (
    args: { input: CreatePhotoInput },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTPhoto>
}

/** SDL: updatePhoto(id: String!, input: UpdatePhotoInput!): Photo! */
export interface UpdatePhotoResolver {
  (
    args: { id: string; input: UpdatePhotoInput },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTPhoto>
}

/** SDL: deletePhoto(id: String!): Photo! */
export interface DeletePhotoResolver {
  (
    args: { id: string },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTPhoto>
}

export interface PhotoTypeResolvers {
  /** SDL: movieMashup: MovieMashup */
  movieMashup: (
    args: undefined,
    obj: {
      root: PhotoAsParent
      context?: RedwoodGraphQLContext
      info?: GraphQLResolveInfo
    }
  ) => Promise<RTMovieMashup | null>
}

type PhotoAsParent = PPhoto & {
  movieMashup: () => Promise<PMovieMashup | null>
}
