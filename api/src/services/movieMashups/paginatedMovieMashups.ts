import { PaginatedMovieMashupsResolver } from 'types/paginatedMovieMashups'

import { db } from 'src/lib/db'

export const paginatedMovieMashups: PaginatedMovieMashupsResolver = async ({
  page = 1,
  limit = 10,
}) => {
  const items = await db.movieMashup.findMany({
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
    skip: (page - 1) * limit,
    take: limit,
  })

  const totalItems = await db.movieMashup.count()
  const totalPages = Math.ceil(totalItems / limit)

  if (totalItems === 0) {
    return null
  }

  return {
    items,
    page,
    limit,
    totalItems,
    totalPages,
  }
}
