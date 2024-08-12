import type {
  MovieMashupResolver,
  MovieMashupsResolver,
  CreateMovieMashupResolver,
  UpdateMovieMashupResolver,
  DeleteMovieMashupResolver,
  MovieMashupTypeResolvers,
} from 'types/movieMashups'

import { db } from 'src/lib/db'

export const movieMashups: MovieMashupsResolver = async () => {
  return await db.movieMashup.findMany({
    include: {
      photos: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export const movieMashup: MovieMashupResolver = async ({ id }) => {
  return await db.movieMashup.findUnique({
    where: { id },
    include: {
      photos: true,
      firstMovie: true,
      secondMovie: true,
    },
  })
}

export const createMovieMashup: CreateMovieMashupResolver = async ({
  input,
}) => {
  const { firstMovieId, secondMovieId, falModel, imageUrl, ...restInput } =
    input
  return await db.movieMashup.create({
    data: {
      ...restInput,
      photos: {
        create: {
          falModel,
          imageUrl,
        },
      },
      firstMovie: {
        connect: { id: firstMovieId },
      },
      secondMovie: {
        connect: { id: secondMovieId },
      },
    },
  })
}

export const updateMovieMashup: UpdateMovieMashupResolver = async ({
  id,
  input,
}) => {
  return await db.movieMashup.update({
    data: input,
    where: { id },
    include: {
      firstMovie: true,
      secondMovie: true,
      photos: true,
    },
  })
}

export const deleteMovieMashup: DeleteMovieMashupResolver = async ({ id }) => {
  return await db.movieMashup.delete({
    where: { id },
  })
}

export const MovieMashup: MovieMashupTypeResolvers = {
  firstMovie: async (_obj, { root }) => {
    return await db.movieMashup
      .findUnique({ where: { id: root?.id } })
      .firstMovie()
  },
  secondMovie: async (_obj, { root }) => {
    return await db.movieMashup
      .findUnique({ where: { id: root?.id } })
      .secondMovie()
  },
}
