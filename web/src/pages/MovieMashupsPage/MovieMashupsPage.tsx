import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const MovieMashupsPage = () => {
  return (
    <>
      <Metadata title="Smashups" description="Smashups page" />

      <h1>MovieMashupsPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/MovieMashupsPage/MovieMashupsPage.tsx</code>
        <Link to={routes.movieMashups()}>Mashups</Link>
        <Link to={routes.movieMashup({ id: '1' })}>View Mashup</Link>
        <Link
          to={routes.newMovieMashup({ firstMovieId: '1', secondMovieId: '2' })}
        >
          New Mashup
        </Link>
      </p>
    </>
  )
}

export default MovieMashupsPage
