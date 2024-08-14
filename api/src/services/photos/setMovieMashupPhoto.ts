import { SetMovieMashupPhotoResolver } from 'types/setMovieMashupPhoto'

import { cache } from 'src/functions/graphql'
import { db } from 'src/lib/db'
import { movieMashup } from 'src/services/movieMashups/movieMashups'
export const setMovieMashupPhoto: SetMovieMashupPhotoResolver = async ({
  input,
}) => {
  await db.photo.update({
    data: {
      movieMashupId: input.movieMashupId,
      updatedAt: new Date(),
    },
    where: { id: input.photoId },
    include: { movieMashup: true },
  })

  cache.invalidate([
    { typename: 'MovieMashup', id: input.movieMashupId },
    { typename: 'Photo', id: input.photoId },
  ])

  return await movieMashup({ id: input.movieMashupId })
}
