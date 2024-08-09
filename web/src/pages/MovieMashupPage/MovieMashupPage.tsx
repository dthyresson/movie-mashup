// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import MovieMashupCell from 'src/components/MovieMashupCell'

const MovieMashupPage = ({ id }: { id: string }) => {
  return (
    <>
      <Metadata title="Smashup" description="Smashup page" />

      <MovieMashupCell id={id} />
    </>
  )
}

export default MovieMashupPage
