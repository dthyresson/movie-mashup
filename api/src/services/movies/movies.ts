import type {
  QueryResolvers,
  MutationResolvers,
  MovieRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const movies: QueryResolvers['movies'] = () => {
  return db.movie.findMany()
}

export const movie: QueryResolvers['movie'] = ({ id }) => {
  return db.movie.findUnique({
    where: { id },
  })
}

export const createMovie: MutationResolvers['createMovie'] = ({ input }) => {
  return db.movie.create({
    data: input,
  })
}

export const updateMovie: MutationResolvers['updateMovie'] = ({
  id,
  input,
}) => {
  return db.movie.update({
    data: input,
    where: { id },
  })
}

export const deleteMovie: MutationResolvers['deleteMovie'] = ({ id }) => {
  return db.movie.delete({
    where: { id },
  })
}

export const Movie: MovieRelationResolvers = {
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
