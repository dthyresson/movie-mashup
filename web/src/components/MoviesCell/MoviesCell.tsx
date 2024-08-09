import { useState } from 'react'

import type { MoviesQuery, MoviesQueryVariables } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'

// import { Link, routes } from '@redwoodjs/router'

export const beforeQuery = (props) => {
  return {
    variables: props,
  }
}

export const QUERY: TypedDocumentNode<MoviesQuery, MoviesQueryVariables> = gql`
  query MoviesQuery {
    movies {
      id
      title
      photo
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'gray' }}>Error: {error?.message}</div>
)

const GENERATE_MASHUP_MUTATION = gql`
  mutation GenerateMashupMutation($input: MashMoviesInput!) {
    mashMovies(input: $input) {
      id
    }
  }
`

const MashingAnimation = ({ movies, selectedMovies }) => {
  const selectedMovieData = movies.filter((movie) =>
    selectedMovies.includes(movie.id)
  )
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-2xl font-bold mb-8 animate-pulse">
        Mashing {selectedMovieData[0].title} with {selectedMovieData[1].title}
      </div>
      <div className="flex space-x-8">
        {selectedMovieData.map((movie) => (
          <div key={movie.id} className="text-center">
            <img
              src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.photo}`}
              alt={movie.title}
              className="w-24 h-36 object-cover rounded"
            />
            <p className="mt-2 text-sm">{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Success = ({ movies }: CellSuccessProps) => {
  const [selectedMovies, setSelectedMovies] = useState<number[]>([])
  const [isMashing, setIsMashing] = useState(false)
  const [mashMovies] = useMutation(GENERATE_MASHUP_MUTATION, {
    onCompleted: (data) => {
      console.log('data', data)
      navigate(routes.movieMashup({ id: data.mashMovies.id }))
    },
  })

  const handleMovieSelect = (movieId: number) => {
    if (selectedMovies.includes(movieId)) {
      setSelectedMovies(selectedMovies.filter((id) => id !== movieId))
    } else if (selectedMovies.length < 2) {
      const newSelection = [...selectedMovies, movieId]
      setSelectedMovies(newSelection)

      if (newSelection.length === 2) {
        setIsMashing(true)
        setTimeout(() => {
          console.log('mashing movies')
          mashMovies({
            variables: {
              input: {
                firstMovieId: newSelection[0],
                secondMovieId: newSelection[1],
              },
            },
          })
        }, 2000)
      }
    }
  }

  if (isMashing) {
    return <MashingAnimation movies={movies} selectedMovies={selectedMovies} />
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <div
          key={movie.id}
          onClick={() => handleMovieSelect(movie.id)}
          onKeyDown={(e) => e.key === 'Enter' && handleMovieSelect(movie.id)}
          role="button"
          tabIndex={0}
          aria-pressed={selectedMovies.includes(movie.id)}
          className={`cursor-pointer h-full ${
            selectedMovies.includes(movie.id) ? 'ring-2 ring-blue-500' : ''
          }`}
        >
          <div className="p-4 rounded-lg shadow-md overflow-hidden bg-gray-50 flex flex-col h-full">
            <img
              src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.photo}`}
              alt={movie.title}
              className="w-48 object-scale-down rounded border border-gray-500 mx-auto"
            />
            <div className="p-4 text-center flex-grow flex items-center justify-center">
              <h2 className="text-xl text-gray-600 font-semibold">
                {movie.title}
              </h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
