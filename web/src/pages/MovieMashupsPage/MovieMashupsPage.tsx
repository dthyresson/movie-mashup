import { Metadata } from '@redwoodjs/web'

import PaginatedMovieMashupsCell from 'src/components/PaginatedMovieMashupsCell'

const MovieMashupsPage = () => {
  return (
    <>
      <Metadata title="Movie Mashups" description="A cinematic adventure" />

      <PaginatedMovieMashupsCell page={1} limit={10} />
    </>
  )
}

export default MovieMashupsPage
