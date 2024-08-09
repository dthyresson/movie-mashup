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

const MashupComponent = ({ movieMashup }) => {
  const handleMovieClick = (movieId: string) => {
    navigate(routes.newMovieMashup({ firstMovieId: movieId }))
  }

  return (
    <div className="mx-auto max-w-3xl overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="flex flex-col items-center justify-center gap-4 p-6">
        <h2 className="mb-2 text-3xl font-bold text-gray-800">
          {movieMashup.title}
        </h2>
        <div className="relative mb-6 aspect-video w-full max-w-2xl">
          <img
            className="absolute inset-0 h-full w-full rounded-md border border-gray-200 object-contain"
            src={movieMashup.photo}
            alt={movieMashup.title}
            loading="lazy"
          />
        </div>
        <h3 className="mb-4 text-xl font-semibold text-gray-600">
          {movieMashup.tagline}
        </h3>
        <p className="mb-4 text-sm text-gray-500">{movieMashup.description}</p>
        <p className="mb-6 text-lg text-gray-800">{movieMashup.treatment}</p>

        <div className="flex justify-center">
          <div className="grid grid-cols-2  gap-6">
            {[movieMashup.firstMovie, movieMashup.secondMovie].map((movie) => (
              <button
                key={movie.id}
                onClick={() => handleMovieClick(movie.id)}
                className="group flex flex-col items-center overflow-hidden rounded-md border border-gray-200 p-4 shadow-sm transition-transform hover:scale-105 hover:shadow-md"
              >
                <div className="flex items-center justify-center border border-gray-200">
                  <img
                    src={`https://www.themoviedb.org/t/p/w185_and_h278_bestv2${movie.photo}`}
                    alt={movie.title}
                    loading="lazy"
                    className="max-h-36 max-w-full object-contain"
                  />
                </div>
                <h3 className="mt-2 text-center font-semibold text-gray-800 group-hover:text-blue-600">
                  {movie.title}
                </h3>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const Success = ({
  movieMashup,
}: CellSuccessProps<FindMovieMashupQuery, FindMovieMashupQueryVariables>) => {
  return <MashupComponent movieMashup={movieMashup} />
}
