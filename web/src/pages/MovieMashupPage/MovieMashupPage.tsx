// import { Link, routes } from '@redwoodjs/router'

import MovieMashupCell from 'src/components/MovieMashupCell'

const MovieMashupPage = ({ id }: { id: string }) => {
  return (
    <>
      <MovieMashupCell id={id} />
    </>
  )
}

export default MovieMashupPage
