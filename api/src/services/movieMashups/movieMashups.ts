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

export const mashMovies: MashMoviesResolver = async ({ input }) => {
  const mashup = await db.movieMashup.create({
    data: {
      title: 'foo',
      tagline: 'bar',
      treatment: 'baz',
      photo: 'https://example.com/photo.jpg',
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
  movies: (_obj, { root }) => {
    return db.movieMashup.findUnique({ where: { id: root?.id } }).movies()
  },
}
