import type {
  QueryResolvers,
  MutationResolvers,
  MovieMashupRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const movieMashups: QueryResolvers['movieMashups'] = () => {
  return db.movieMashup.findMany()
}

export const movieMashup: QueryResolvers['movieMashup'] = ({ id }) => {
  return db.movieMashup.findUnique({
    where: { id },
  })
}

export const createMovieMashup: MutationResolvers['createMovieMashup'] = ({
  input,
}) => {
  return db.movieMashup.create({
    data: input,
  })
}

export const updateMovieMashup: MutationResolvers['updateMovieMashup'] = ({
  id,
  input,
}) => {
  return db.movieMashup.update({
    data: input,
    where: { id },
  })
}

export const deleteMovieMashup: MutationResolvers['deleteMovieMashup'] = ({
  id,
}) => {
  return db.movieMashup.delete({
    where: { id },
  })
}

export const MovieMashup: MovieMashupRelationResolvers = {
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
