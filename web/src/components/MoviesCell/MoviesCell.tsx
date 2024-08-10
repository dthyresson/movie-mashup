import { useState, useEffect } from 'react'

import type { MoviesQuery, MoviesQueryVariables } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

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
    <div className="flex h-[80vh] flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-red-100 px-4">
      <div className="mb-8 text-center text-2xl font-bold text-orange-600 sm:text-3xl md:text-4xl">
        <span className="inline-block animate-spin">🎬</span>
        <span className="mx-4 inline-block font-movie-title">Mashing!</span>
        <span className="inline-block animate-spin">🍿</span>
      </div>
      <div className="flex flex-col space-y-8 sm:flex-row sm:space-x-8 sm:space-y-0 md:space-x-16">
        {selectedMovieData.map((movie, index) => (
          <div
            key={movie.id}
            className={`flex transform flex-col items-center ${
              index === 0
                ? 'animate-[wiggle_1s_ease-in-out_infinite]'
                : 'animate-[wiggle_1s_ease-in-out_infinite_reverse]'
            }`}
          >
            <img
              src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.photo}`}
              alt={movie.title}
              className="h-8 object-scale-down transition-all duration-300 md:h-14 lg:h-20"
            />
            <p className="mt-4 text-center font-movie-title text-lg font-normal text-gray-800 sm:text-xl">
              {movie.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

interface MoviesCellProps extends CellSuccessProps {
  firstMovieId: string
  secondMovieId: string
}

export const Success = ({
  movies,
  firstMovieId,
  secondMovieId,
}: MoviesCellProps) => {
  const [selectedMovies, setSelectedMovies] = useState<string[]>(() => {
    const initialSelection: string[] = []
    if (firstMovieId && firstMovieId.trim() !== '') {
      initialSelection.push(firstMovieId)
    }
    if (secondMovieId && secondMovieId.trim() !== '') {
      initialSelection.push(secondMovieId)
    }
    return initialSelection
  })
  const [isMashing, setIsMashing] = useState(false)
  const [mashMovies] = useMutation(GENERATE_MASHUP_MUTATION, {
    onCompleted: (data) => {
      console.log('data', data)
      navigate(routes.movieMashup({ id: data.mashMovies.id }))
    },
    onError: (error) => {
      console.log('error', error)
      toast.error('Failed to create movie mashup')
      setIsMashing(false)
      setSelectedMovies([])
    },
  })

  const handleMovieSelect = (movieId: string) => {
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

  useEffect(() => {
    if (selectedMovies.length === 1) {
      toast.success("🍿 Awesome choice! Now, let's find its perfect partner!", {
        duration: 3000,
      })
    }
  }, [selectedMovies])

  if (isMashing) {
    return <MashingAnimation movies={movies} selectedMovies={selectedMovies} />
  }

  return (
    <>
      <h1 className="mb-4 px-2 text-center font-movie-subtitle text-3xl font-bold text-orange-600">
        Ready for a cinematic adventure?
      </h1>
      {selectedMovies.length === 0 && (
        <p className="mb-6 px-2 text-center font-movie-body text-xl text-red-500">
          🥤 Pick two movies and let&apos;s create movie magic!
        </p>
      )}
      <div className="grid grid-cols-2 gap-4 p-8 text-gray-800 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:p-0">
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => handleMovieSelect(movie.id)}
            onKeyDown={(e) => e.key === 'Enter' && handleMovieSelect(movie.id)}
            role="button"
            tabIndex={0}
            aria-pressed={selectedMovies.includes(movie.id)}
            className={`h-full cursor-pointer ${
              selectedMovies.includes(movie.id) ? 'ring-2 ring-orange-500' : ''
            }`}
          >
            <div className="flex h-full flex-col rounded-lg border border-orange-100 p-4 transition-transform hover:scale-105 hover:bg-orange-50 hover:text-orange-500 hover:ring-2 hover:ring-red-400">
              <div className="flex h-full flex-col">
                <h2 className="mb-4 text-center font-movie-title text-xl font-normal">
                  {movie.title}
                </h2>
                <div className="flex flex-grow items-end justify-center">
                  <img
                    src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.photo}`}
                    alt={movie.title}
                    className="w-20 rounded-md border border-slate-100 object-contain shadow-md md:w-24 lg:w-48"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
