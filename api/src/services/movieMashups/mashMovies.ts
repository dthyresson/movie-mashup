import type { MashMoviesResolver } from 'types/mashMovies'

import { ValidationError } from '@redwoodjs/graphql-server'

import { createAuditLog } from 'src/services/auditLogs/auditLogs'
import { cache } from 'src/functions/graphql'
import { db } from 'src/lib/db'
import { generateMovieMashupPosterUrl } from 'src/lib/fal'
import { movieMashupGenerator } from 'src/lib/langbase'
import { logger } from 'src/lib/logger'
import { movie } from 'src/services/movies/movies'

export const mashMovies: MashMoviesResolver = async ({ input }) => {
  const firstMovie = await movie({ id: input.firstMovieId })
  const secondMovie = await movie({ id: input.secondMovieId })

  try {
    const mashupStartTime = Date.now()
    const { title, tagline, treatment, description, raw } = await movieMashupGenerator({
      firstMovieTitle: firstMovie.title,
      secondMovieTitle: secondMovie.title,
    })
    const mashupEndTime = Date.now()

    await createAuditLog({
      requestTime: new Date(mashupStartTime),
      completionTime: new Date(mashupEndTime),
      operationType: 'MASHUP',
      prompt: `Mash movies: ${firstMovie.title} and ${secondMovie.title}`,
      model: raw.model,
      tokenUsage: raw.usage.total_tokens,
      movieMashupId: '', // We'll update this after creating the MovieMashup
    })

    logger.info({
      title,
      tagline,
      treatment,
      description,
    })

    const posterStartTime = Date.now()
    const { falModel, imageUrl, timings, prompt } = await generateMovieMashupPosterUrl({
      title,
      tagline,
      treatment,
      description,
      realism: input.realism,
    })
    const posterEndTime = Date.now()

    await createAuditLog({
      requestTime: new Date(posterStartTime),
      completionTime: new Date(posterEndTime),
      operationType: 'POSTER',
      prompt,
      model: falModel,
      tokenUsage: 0, // fal doesn't provide token usage, so we'll set it to 0
      movieMashupId: '', // We'll update this after creating the MovieMashup
    })

    const mashup = await db.movieMashup.create({
      data: {
        title,
        tagline,
        treatment,
        description,
        photos: {
          create: {
            falModel,
            imageUrl,
          },
        },
        firstMovie: {
          connect: { id: input.firstMovieId },
        },
        secondMovie: {
          connect: { id: input.secondMovieId },
        },
      },
      include: {
        photos: true,
        firstMovie: true,
        secondMovie: true,
      },
    })

    // Update the movieMashupId for both audit logs
    await db.auditLog.updateMany({
      where: {
        movieMashupId: '',
        createdAt: {
          gte: new Date(mashupStartTime),
          lte: new Date(posterEndTime),
        },
      },
      data: { movieMashupId: mashup.id },
    })

    cache.invalidate([{ typename: 'MovieMashup' }])

    return mashup
  } catch (error) {
    logger.error(error)
    throw new ValidationError('Failed to create movie mashup')
  }
}
