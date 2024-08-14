import { SetMovieMashupPhotoResolver } from 'types/setMovieMashupPhoto'

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

  return await movieMashup({ id: input.movieMashupId })
}
