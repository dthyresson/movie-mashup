import { Metadata } from '@redwoodjs/web'

import MovieMashupsCell from 'src/components/MovieMashupsCell'

const MovieMashupsPage = () => {
  return (
    <>
      <Metadata title="Smashups" description="Smashups page" />

      <h1 className="mb-4 text-xl font-bold">All Mashups</h1>
      <MovieMashupsCell />
    </>
  )
}

export default MovieMashupsPage
