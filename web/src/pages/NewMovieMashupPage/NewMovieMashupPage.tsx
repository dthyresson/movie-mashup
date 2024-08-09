// import { Link, routes } from '@redwoodjs/router'
import { useParams } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import MoviesCell from 'src/components/MoviesCell'

const NewMovieMashupPage = () => {
  const { firstMovieId, secondMovieId } = useParams()
  return (
    <>
      <Metadata title="NewMovieMashup" description="NewMovieMashup page" />

      <MoviesCell firstMovieId={firstMovieId} secondMovieId={secondMovieId} />
    </>
  )
}

export default NewMovieMashupPage
