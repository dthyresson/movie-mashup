import type {
  PhotosResolver,
  PhotoResolver,
  CreatePhotoResolver,
  UpdatePhotoResolver,
  DeletePhotoResolver,
  PhotoTypeResolvers,
} from 'types/photos'

import { db } from 'src/lib/db'

export const photos: PhotosResolver = async () => {
  return await db.photo.findMany()
}

export const photo: PhotoResolver = async ({ id }) => {
  return await db.photo.findUnique({
    where: { id },
  })
}

export const createPhoto: CreatePhotoResolver = async ({ input }) => {
  return await db.photo.create({
    data: input,
  })
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
