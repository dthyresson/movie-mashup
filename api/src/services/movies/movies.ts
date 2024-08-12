import type {
  MoviesResolver,
  MovieResolver,
  CreateMovieResolver,
  UpdateMovieResolver,
  DeleteMovieResolver,
  MovieTypeResolvers,
} from 'types/movies'

import { db } from 'src/lib/db'

export const movies: MoviesResolver = async () => {
  return await db.movie.findMany({
    orderBy: { title: 'asc' },
    include: { firstMovieMashups: true, secondMovieMashups: true },
  })
}

export const movie: MovieResolver = async ({ id }) => {
  return await db.movie.findUnique({
    where: { id },
    include: { firstMovieMashups: true, secondMovieMashups: true },
  })
}

export const createMovie: CreateMovieResolver = async ({ input }) => {
  return await db.movie.create({
    data: input,
  })
}

export const updateMovie: UpdateMovieResolver = async ({ id, input }) => {
  return await db.movie.update({
    data: input,
    where: { id },
  })
}

export const deleteMovie: DeleteMovieResolver = async ({ id }) => {
  return await db.movie.delete({
    where: { id },
  })
}

export const Movie: MovieTypeResolvers = {
  firstMovieMashups: async (_obj, { root }) => {
    return await db.movie
      .findUnique({ where: { id: root?.id } })
      .firstMovieMashups()
  },
  secondMovieMashups: async (_obj, { root }) => {
    return await db.movie
      .findUnique({ where: { id: root?.id } })
      .secondMovieMashups()
  },
}
