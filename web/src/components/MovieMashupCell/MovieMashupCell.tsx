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
      description
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
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">{movieMashup.title}</h2>
      <h3 className="text-lg font-semibold">{movieMashup.tagline}</h3>
      <div className="relative aspect-[4/3] w-full">
        <img
          className="absolute inset-0 h-full w-full rounded-md object-scale-down"
          src={movieMashup.photo}
          alt={movieMashup.title}
          loading="lazy"
        />
      </div>
      <p className="text-sm text-gray-500">{movieMashup.description}</p>
      <p className="text-md text-gray-800">{movieMashup.treatment}</p>

      <div className="mashed-movies">
        <button
          onClick={() => handleMovieClick(movieMashup.firstMovie.id)}
          className="movie-card"
        >
          <h3>{movieMashup.firstMovie.title}</h3>
          <img
            src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movieMashup.firstMovie.photo}`}
            alt={movieMashup.firstMovie.title}
            className="h-auto w-full object-cover"
            loading="lazy"
          />
        </button>
        <button
          onClick={() => handleMovieClick(movieMashup.secondMovie.id)}
          className="movie-card"
        >
          <h3>{movieMashup.secondMovie.title}</h3>
          <img
            src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movieMashup.secondMovie.photo}`}
            alt={movieMashup.secondMovie.title}
            className="h-auto w-full object-cover"
            loading="lazy"
          />
        </button>
      </div>
    </div>
  )
}
