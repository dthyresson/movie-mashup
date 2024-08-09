import { Metadata } from '@redwoodjs/web'

import MovieMashupsCell from 'src/components/MovieMashupsCell'

const MovieMashupsPage = () => {
  return (
    <>
      <Metadata title="Movie Mashups" description="Smashups page" />

      <MovieMashupsCell />
    </>
  )
}

export default MovieMashupsPage
