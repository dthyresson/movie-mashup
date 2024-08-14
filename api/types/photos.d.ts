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

/** SDL: createPhoto(input: CreatePhotoInput!): MovieMashup! */
export interface CreatePhotoResolver {
  (
    args: { input: CreatePhotoInput },
    obj?: {
      root: Mutation
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): Promise<RTMovieMashup>
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
