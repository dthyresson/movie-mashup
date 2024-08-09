import type {
  MoviesResolver,
  MovieResolver,
  CreateMovieResolver,
  UpdateMovieResolver,
  DeleteMovieResolver,
  MovieTypeResolvers,
} from 'types/movies'

import { db } from 'src/lib/db'

export const movies: MoviesResolver = () => {
  return db.movie.findMany({ orderBy: { title: 'asc' } })
}

export const movie: MovieResolver = ({ id }) => {
  return db.movie.findUnique({
    where: { id },
  })
}

export const createMovie: CreateMovieResolver = ({ input }) => {
  return db.movie.create({
    data: input,
  })
}

export const updateMovie: UpdateMovieResolver = ({ id, input }) => {
  return db.movie.update({
    data: input,
    where: { id },
  })
}

export const deleteMovie: DeleteMovieResolver = ({ id }) => {
  return db.movie.delete({
    where: { id },
  })
}

export const Movie: MovieTypeResolvers = {
  firstMovieMashups: (_obj, { root }) => {
    return db.movie.findUnique({ where: { id: root?.id } }).firstMovieMashups()
  },
  secondMovieMashups: (_obj, { root }) => {
    return db.movie.findUnique({ where: { id: root?.id } }).secondMovieMashups()
  },
  mashups: (_obj, { root }) => {
    return db.movie.findUnique({ where: { id: root?.id } }).mashups()
  },
}
