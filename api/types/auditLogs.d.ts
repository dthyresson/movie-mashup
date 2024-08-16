import type {
  MovieMashup as PMovieMashup,
  AuditLog as PAuditLog,
} from '@prisma/client'
import type { GraphQLResolveInfo } from 'graphql'

import type { RedwoodGraphQLContext } from '@redwoodjs/graphql-server/dist/types'

import type {
  AuditLog as RTAuditLog,
  MovieMashup as RTMovieMashup,
} from './shared-return-types'
import type { Query } from './shared-schema-types'

// createAuditLog does not exist on Query or Mutation
/** SDL: auditLogs: [AuditLog!]! */
export interface AuditLogsResolver {
  (
    args?: object,
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): RTAuditLog[] | Promise<RTAuditLog[]> | (() => Promise<RTAuditLog[]>)
}

/** SDL: auditLog(id: String!): AuditLog */
export interface AuditLogResolver {
  (
    args: { id: string },
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ):
    | RTAuditLog
    | null
    | Promise<RTAuditLog | null>
    | (() => Promise<RTAuditLog | null>)
}

/** SDL: auditLogsByMovieMashup(movieMashupId: String!): [AuditLog!]! */
export interface AuditLogsByMovieMashupResolver {
  (
    args: { movieMashupId: string },
    obj?: {
      root: Query
      context: RedwoodGraphQLContext
      info: GraphQLResolveInfo
    }
  ): RTAuditLog[] | Promise<RTAuditLog[]> | (() => Promise<RTAuditLog[]>)
}

export interface AuditLogTypeResolvers {
  /** SDL: movieMashup: MovieMashup! */
  movieMashup: (
    args: undefined,
    obj: {
      root: AuditLogAsParent
      context?: RedwoodGraphQLContext
      info?: GraphQLResolveInfo
    }
  ) => RTMovieMashup | Promise<RTMovieMashup> | (() => Promise<RTMovieMashup>)
}

type AuditLogAsParent = PAuditLog & {
  movieMashup: () =>
    | PMovieMashup
    | Promise<PMovieMashup>
    | (() => Promise<PMovieMashup>)
}
