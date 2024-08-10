// import { Link, routes } from '@redwoodjs/router'
import { useParams } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import MoviesCell from 'src/components/MoviesCell'

const NewMovieMashupPage = () => {
  const { firstMovieId, secondMovieId } = useParams()
  return (
    <>
      <Metadata
        title="Mashup!"
        description="Pick 2 movies and let's create movie magic!"
      />

      <MoviesCell firstMovieId={firstMovieId} secondMovieId={secondMovieId} />
    </>
  )
}

export default NewMovieMashupPage
