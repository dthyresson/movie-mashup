import type {
  PhotosResolver,
  PhotoResolver,
  CreatePhotoResolver,
  UpdatePhotoResolver,
  DeletePhotoResolver,
  SetMovieMashupPhotoResolver,
} from 'types/photos'

import { db } from 'src/lib/db'
import { generateMovieMashupPosterUrl } from 'src/lib/fal'
import { logger } from 'src/lib/logger'
import { movieMashup } from 'src/services/movieMashups/movieMashups'

export const photos: PhotosResolver = async () => {
  return await db.photo.findMany({ include: { movieMashup: true } })
}

export const photo: PhotoResolver = async ({ id }) => {
  return await db.photo.findUnique({
    where: { id },
    include: { movieMashup: true },
  })
}

export const createPhoto: CreatePhotoResolver = async ({ input }) => {
  const mashup = await movieMashup({ id: input.movieMashupId })
  const { falModel, imageUrl } = await generateMovieMashupPosterUrl({
    ...mashup,
    realism: input.realism,
  })
  await db.photo.create({
    data: {
      movieMashupId: input.movieMashupId,
      imageUrl,
      falModel,
    },
    include: { movieMashup: true },
  })

  const updatedMashup = await movieMashup({ id: input.movieMashupId })
  logger.debug(updatedMashup, 'updatedMashup')
  return updatedMashup
}

export const updatePhoto: UpdatePhotoResolver = async ({ id, input }) => {
  return await db.photo.update({
    data: input,
    where: { id },
    include: { movieMashup: true },
  })
}

export const deletePhoto: DeletePhotoResolver = async ({ id }) => {
  return await db.photo.delete({
    where: { id },
  })
}
