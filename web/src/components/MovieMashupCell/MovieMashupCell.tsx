import type {
  FindMovieMashupQuery,
  FindMovieMashupQueryVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

export const QUERY: TypedDocumentNode<
  FindMovieMashupQuery,
  FindMovieMashupQueryVariables
> = gql`
  query FindMovieMashupQuery($id: String!) {
    movieMashup: movieMashup(id: $id) {
      id
      title
      tagline
      treatment
      photo
      firstMovie {
        id
        title
        photo
      }
      secondMovie {
        id
        title
        photo
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindMovieMashupQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  movieMashup,
}: CellSuccessProps<FindMovieMashupQuery, FindMovieMashupQueryVariables>) => {
  const handleMovieClick = (movieId: string) => {
    navigate(routes.newMovieMashup({ firstMovieId: movieId }))
  }

  return (
    <div className="movie-mashup">
      <h2>{movieMashup.title}</h2>
      <p>{movieMashup.tagline}</p>
      <img src={movieMashup.photo} alt={movieMashup.title} />
      <p>{movieMashup.treatment}</p>

      <div className="mashed-movies">
        <button
          onClick={() => handleMovieClick(movieMashup.firstMovie.id)}
          className="movie-card"
        >
          <h3>{movieMashup.firstMovie.title}</h3>
          <img
            src={movieMashup.firstMovie.photo}
            alt={movieMashup.firstMovie.title}
          />
        </button>
        <button
          onClick={() => handleMovieClick(movieMashup.secondMovie.id)}
          className="movie-card"
        >
          <h3>{movieMashup.secondMovie.title}</h3>
          <img
            src={movieMashup.secondMovie.photo}
            alt={movieMashup.secondMovie.title}
          />
        </button>
      </div>
    </div>
  )
}
