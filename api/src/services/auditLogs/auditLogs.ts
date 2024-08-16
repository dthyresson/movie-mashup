import type {
  QueryResolvers,
  MutationResolvers,
  AuditLogResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const createAuditLog = async ({
  requestTime,
  completionTime,
  operationType,
  prompt,
  model,
  tokenUsage,
  movieMashupId,
}: {
  requestTime: Date
  completionTime: Date
  operationType: 'MASHUP' | 'POSTER'
  prompt: string
  model: string
  tokenUsage: number
  movieMashupId: string
}) => {
  return await db.auditLog.create({
    data: {
      requestTime,
      completionTime,
      operationType,
      prompt,
      model,
      tokenUsage,
      movieMashup: { connect: { id: movieMashupId } },
    },
  })
}

export const auditLogs: QueryResolvers['auditLogs'] = () => {
  return db.auditLog.findMany({
    orderBy: { createdAt: 'desc' },
    include: { movieMashup: true },
  })
}

export const auditLog: QueryResolvers['auditLog'] = ({ id }) => {
  return db.auditLog.findUnique({
    where: { id },
    include: { movieMashup: true },
  })
}

export const AuditLog: AuditLogResolvers = {
  movieMashup: (_obj, { root }) =>
    db.auditLog.findUnique({ where: { id: root.id } }).movieMashup(),
}

export const auditLogsByMovieMashup: QueryResolvers['auditLogsByMovieMashup'] = ({
  movieMashupId,
}) => {
  return db.auditLog.findMany({
    where: { movieMashupId },
    orderBy: { createdAt: 'desc' },
  })
}
