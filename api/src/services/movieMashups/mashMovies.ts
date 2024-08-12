import type { MashMoviesResolver } from 'types/mashMovies'

import { ValidationError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { generateMovieMashupPosterUrl } from 'src/lib/fal'
import { movieMashupGenerator } from 'src/lib/langbase'
import { logger } from 'src/lib/logger'
import { movie } from 'src/services/movies/movies'

export const mashMovies: MashMoviesResolver = async ({ input }) => {
  const firstMovie = await movie({ id: input.firstMovieId })
  const secondMovie = await movie({ id: input.secondMovieId })

  try {
    const { title, tagline, treatment, description } =
      await movieMashupGenerator({
        firstMovieTitle: firstMovie.title,
        secondMovieTitle: secondMovie.title,
      })

    logger.info({ title, tagline, treatment, description })

    const posterUrl = await generateMovieMashupPosterUrl({
      title,
      tagline,
      treatment,
      description,
    })

    const mashup = await db.movieMashup.create({
      data: {
        title,
        tagline,
        treatment,
        description,
        photos: {
          create: {
            imageUrl: posterUrl,
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

    return mashup
  } catch (error) {
    logger.error(error)
    throw new ValidationError('Failed to create movie mashup')
  }
}
