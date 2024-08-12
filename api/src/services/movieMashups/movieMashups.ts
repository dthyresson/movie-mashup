import type {
  MovieMashupResolver,
  MovieMashupsResolver,
  CreateMovieMashupResolver,
  UpdateMovieMashupResolver,
  DeleteMovieMashupResolver,
  MovieMashupTypeResolvers,
  MashMoviesResolver,
} from 'types/movieMashups'

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
        photo: posterUrl,
        firstMovie: {
          connect: { id: input.firstMovieId },
        },
        secondMovie: {
          connect: { id: input.secondMovieId },
        },
      },
    })

    return mashup
  } catch (error) {
    logger.error(error)
    throw new ValidationError('Failed to create movie mashup')
  }
}

export const movieMashups: MovieMashupsResolver = () => {
  return db.movieMashup.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export const movieMashup: MovieMashupResolver = ({ id }) => {
  return db.movieMashup.findUnique({
    where: { id },
  })
}

export const createMovieMashup: CreateMovieMashupResolver = ({ input }) => {
  return db.movieMashup.create({
    data: input,
  })
}

export const updateMovieMashup: UpdateMovieMashupResolver = ({ id, input }) => {
  return db.movieMashup.update({
    data: input,
    where: { id },
  })
}

export const deleteMovieMashup: DeleteMovieMashupResolver = ({ id }) => {
  return db.movieMashup.delete({
    where: { id },
  })
}

export const MovieMashup: MovieMashupTypeResolvers = {
  firstMovie: (_obj, { root }) => {
    return db.movieMashup.findUnique({ where: { id: root?.id } }).firstMovie()
  },
  secondMovie: (_obj, { root }) => {
    return db.movieMashup.findUnique({ where: { id: root?.id } }).secondMovie()
  },
}
