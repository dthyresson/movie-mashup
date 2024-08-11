// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { db } from 'api/src/lib/db'

import { MOVIES } from '../data/movies'

export default async () => {
  console.info('🎬 Seeding movies')
  // if count is 0, seed
  const count = await db.movie.count()

  if (count === 0) {
    try {
      await db.movie.createMany({
        data: MOVIES,
      })
      console.info('🍿 Movies seeded')
    } catch (error) {
      console.error(error)
    }
  } else {
    console.info('🍿 Movies already seeded')
  }
}
