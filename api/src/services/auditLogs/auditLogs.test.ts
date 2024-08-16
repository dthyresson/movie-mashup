import { db } from 'src/lib/db'

import {
  auditLogs,
  auditLog,
  createAuditLog,
  auditLogsByMovieMashup,
} from './auditLogs'

describe('auditLogs', () => {
  const movieMashupData = {
    id: 'test-movie-mashup-id',
    title: 'Test Movie Mashup',
    tagline: 'A test tagline',
    treatment: 'A test treatment',
    description: 'A test description',
    firstMovieId: 'test-first-movie-id',
    secondMovieId: 'test-second-movie-id',
  }

  const auditLogData = {
    requestTime: new Date('2023-01-01T00:00:00Z'),
    completionTime: new Date('2023-01-01T00:00:01Z'),
    operationType: 'MASHUP',
    prompt: 'Test prompt',
    model: 'Test model',
    tokenUsage: 100,
    movieMashupId: 'test-movie-mashup-id',
  }

  beforeEach(async () => {
    await db.movieMashup.create({ data: movieMashupData })
  })

  afterEach(async () => {
    await db.auditLog.deleteMany()
    await db.movieMashup.deleteMany()
  })

  scenario('creates an audit log', async () => {
    const result = await createAuditLog(auditLogData)

    expect(result).toEqual({
      id: expect.any(String),
      createdAt: expect.any(Date),
      ...auditLogData,
    })

    const dbAuditLog = await db.auditLog.findUnique({ where: { id: result.id } })
    expect(dbAuditLog).toEqual(result)
  })

  scenario('returns all audit logs', async () => {
    const auditLog1 = await createAuditLog(auditLogData)
    const auditLog2 = await createAuditLog({
      ...auditLogData,
      operationType: 'POSTER',
    })

    const result = await auditLogs()

    expect(result.length).toEqual(2)
    expect(result).toEqual(expect.arrayContaining([auditLog1, auditLog2]))
  })

  scenario('returns a single audit log', async () => {
    const newAuditLog = await createAuditLog(auditLogData)

    const result = await auditLog({ id: newAuditLog.id })

    expect(result).toEqual(newAuditLog)
  })

  scenario('returns null for non-existent audit log', async () => {
    const result = await auditLog({ id: 'non-existent-id' })

    expect(result).toBeNull()
  })

  scenario('returns audit logs for a specific movie mashup', async () => {
    const auditLog1 = await createAuditLog(auditLogData)
    const auditLog2 = await createAuditLog({
      ...auditLogData,
      operationType: 'POSTER',
    })
    await createAuditLog({
      ...auditLogData,
      movieMashupId: 'different-movie-mashup-id',
    })

    const result = await auditLogsByMovieMashup({
      movieMashupId: 'test-movie-mashup-id',
    })

    expect(result.length).toEqual(2)
    expect(result).toEqual(expect.arrayContaining([auditLog1, auditLog2]))
  })

  scenario('returns empty array for non-existent movie mashup', async () => {
    const result = await auditLogsByMovieMashup({
      movieMashupId: 'non-existent-movie-mashup-id',
    })

    expect(result).toEqual([])
  })

  scenario('creates audit log with correct relationships', async () => {
    const newAuditLog = await createAuditLog(auditLogData)

    const result = await db.auditLog.findUnique({
      where: { id: newAuditLog.id },
      include: { movieMashup: true },
    })

    expect(result.movieMashup).toEqual(
      expect.objectContaining({
        id: 'test-movie-mashup-id',
        title: 'Test Movie Mashup',
      })
    )
  })

  scenario('handles different operation types', async () => {
    await createAuditLog(auditLogData)
    await createAuditLog({ ...auditLogData, operationType: 'POSTER' })

    const result = await auditLogs()

    expect(result.length).toEqual(2)
    expect(result[0].operationType).toEqual('POSTER')
    expect(result[1].operationType).toEqual('MASHUP')
  })
})
