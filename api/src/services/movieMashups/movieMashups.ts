import type {
  MovieMashupResolver,
  MovieMashupsResolver,
  CreateMovieMashupResolver,
  UpdateMovieMashupResolver,
  DeleteMovieMashupResolver,
  MovieMashupTypeResolvers,
  MashMoviesResolver,
} from 'types/movieMashups'

import { db } from 'src/lib/db'
import { generateMovieMashupPosterUrl } from 'src/lib/fal'
import { movieMashupGenerator } from 'src/lib/langbase'
import { logger } from 'src/lib/logger'
import { movie } from 'src/services/movies/movies'
export const mashMovies: MashMoviesResolver = async ({ input }) => {
  const firstMovie = await movie({ id: input.firstMovieId })
  const secondMovie = await movie({ id: input.secondMovieId })

  const { title, tagline, treatment } = await movieMashupGenerator({
    firstMovieTitle: firstMovie.title,
    secondMovieTitle: secondMovie.title,
  })

  logger.info({ title, tagline, treatment })

  const posterUrl = await generateMovieMashupPosterUrl({
    title,
    tagline,
    treatment,
  })

  const mashup = await db.movieMashup.create({
    data: {
      title,
      tagline,
      treatment,
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
}

export const movieMashups: MovieMashupsResolver = () => {
  return db.movieMashup.findMany()
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
