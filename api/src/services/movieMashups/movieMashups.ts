import type {
  MovieMashupResolver,
  MovieMashupsResolver,
  CreateMovieMashupResolver,
  UpdateMovieMashupResolver,
  DeleteMovieMashupResolver,
} from 'types/movieMashups'

import { db } from 'src/lib/db'

export const movieMashups: MovieMashupsResolver = async () => {
  return await db.movieMashup.findMany({
    include: {
      photos: {
        orderBy: {
          updatedAt: 'desc',
        },
        take: 1, // Include only the most recent photo
      },
      firstMovie: true,
      secondMovie: true,
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
      photos: {
        orderBy: {
          updatedAt: 'desc',
        },
      },
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
