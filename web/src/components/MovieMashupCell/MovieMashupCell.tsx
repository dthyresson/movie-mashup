import { useState } from 'react'

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
  const [showDescription, setShowDescription] = useState(false)
  const [showMovies, setShowMovies] = useState(false)
  const handleMovieClick = (movieId: string) => {
    navigate(routes.newMovieMashup({ firstMovieId: movieId }))
  }

  return (
    <div className="mx-auto my-6 max-w-3xl overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="flex flex-col items-center justify-center gap-4 p-6">
        <h2 className="mb-2 font-movie-title text-3xl font-bold text-gray-800">
          {movieMashup.title}
        </h2>
        <div className="relative mb-6 aspect-video w-full max-w-2xl bg-gradient-to-b from-gray-200 via-gray-100 to-gray-300">
          <img
            className="border-gra -200 absolute inset-0 h-full w-full  object-contain p-4"
            src={movieMashup.photo}
            alt={movieMashup.title}
            loading="lazy"
          />
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowDescription(true)
            }}
            className="absolute bottom-2 right-2 rounded-full bg-white p-1 shadow-md"
          >
            <span className="h-6 w-6 text-gray-600">🥤</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowMovies(true)
            }}
            className="absolute bottom-2 right-12 rounded-full bg-white p-1 shadow-md"
          >
            <span className="h-6 w-6 text-gray-600">🎬</span>
          </button>
          {showDescription && (
            <button
              className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black bg-opacity-75 p-4"
              onClick={() => setShowDescription(false)}
            >
              <p className="text-center font-movie-body text-white">
                {movieMashup.description}
              </p>
            </button>
          )}
          {showMovies && (
            <button
              className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black bg-opacity-75 p-4"
              onClick={() => setShowMovies(false)}
            >
              <div className="grid grid-cols-2 gap-6">
                {[movieMashup.firstMovie, movieMashup.secondMovie].map(
                  (movie) => (
                    <button
                      key={movie.id}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleMovieClick(movie.id)
                      }}
                      className="group flex w-full flex-col items-center overflow-hidden rounded-md bg-white p-4 shadow-sm transition-transform hover:scale-105 hover:shadow-md"
                    >
                      <div className="flex items-center justify-center border border-gray-200">
                        <img
                          src={`https://www.themoviedb.org/t/p/w185_and_h278_bestv2${movie.photo}`}
                          alt={movie.title}
                          loading="lazy"
                          className="max-h-36 max-w-full object-contain"
                        />
                      </div>
                      <h3 className="mt-2 text-center font-movie-title font-semibold text-gray-800 group-hover:text-blue-600">
                        {movie.title}
                      </h3>
                    </button>
                  )
                )}
              </div>
            </button>
          )}
        </div>
        <h3 className=" mb-4 font-movie-subtitle text-xl font-semibold text-gray-600">
          {movieMashup.tagline}
        </h3>
        <p className="mb-6 font-movie-body text-lg text-gray-800">
          {movieMashup.treatment}
        </p>
      </div>
    </div>
  )
}

export const Success = ({
  movieMashup,
}: CellSuccessProps<FindMovieMashupQuery, FindMovieMashupQueryVariables>) => {
  return <MashupComponent movieMashup={movieMashup} />
}
