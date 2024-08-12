import type {
  PhotosResolver,
  PhotoResolver,
  CreatePhotoResolver,
  UpdatePhotoResolver,
  DeletePhotoResolver,
  SetMovieMashupPhotoResolver,
  PhotoTypeResolvers,
} from 'types/photos'

import { db } from 'src/lib/db'
import { generateMovieMashupPosterUrl } from 'src/lib/fal'
import { logger } from 'src/lib/logger'
import { movieMashup } from 'src/services/movieMashups/movieMashups'

export const setMovieMashupPhoto: SetMovieMashupPhotoResolver = async ({
  input,
}) => {
  await db.photo.update({
    data: {
      movieMashupId: input.movieMashupId,
    },
    where: { id: input.photoId },
  })

  return await movieMashup({ id: input.movieMashupId })
}

export const photos: PhotosResolver = async () => {
  return await db.photo.findMany()
}

export const photo: PhotoResolver = async ({ id }) => {
  return await db.photo.findUnique({
    where: { id },
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
  })

  const updatedMashup = await movieMashup({ id: input.movieMashupId })
  logger.debug(updatedMashup, 'updatedMashup')
  return updatedMashup
}

export const updatePhoto: UpdatePhotoResolver = async ({ id, input }) => {
  return await db.photo.update({
    data: input,
    where: { id },
  })
}

export const deletePhoto: DeletePhotoResolver = async ({ id }) => {
  return await db.photo.delete({
    where: { id },
  })
}

export const Photo: PhotoTypeResolvers = {
  movieMashup: async (_obj, { root }) => {
    return await db.photo.findUnique({ where: { id: root?.id } }).movieMashup()
  },
}
