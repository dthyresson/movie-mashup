import { useState, useEffect } from 'react'

import { toast } from '@redwoodjs/web/toast'

import type { MovieSelectorProps } from 'src/components/MoviesCell/types'

const MovieCard = ({ movie, isSelected, onSelect }) => (
  <div
    onClick={() => onSelect(movie.id)}
    onKeyDown={(e) => e.key === 'Enter' && onSelect(movie.id)}
    role="button"
    tabIndex={0}
    aria-pressed={isSelected}
    className={`h-full cursor-pointer ${
      isSelected ? 'ring-2 ring-orange-500' : ''
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
)

const MovieSelector = ({
  movies,
  onSelectionComplete,
  initialSelection = [],
  maxSelection = 2,
}: MovieSelectorProps) => {
  const [selectedMovies, setSelectedMovies] =
    useState<string[]>(initialSelection)

  const handleMovieSelect = (movieId: string) => {
    if (selectedMovies.includes(movieId)) {
      setSelectedMovies(selectedMovies.filter((id) => id !== movieId))
    } else if (selectedMovies.length < maxSelection) {
      const newSelection = [...selectedMovies, movieId]
      setSelectedMovies(newSelection)

      if (newSelection.length === maxSelection) {
        onSelectionComplete(newSelection)
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

  return (
    <>
      <h1 className="mb-4 px-2 text-center font-movie-subtitle text-3xl font-bold text-orange-600">
        Ready for a cinematic adventure?
      </h1>
      {selectedMovies.length === 0 && (
        <p className="mb-6 px-2 text-center font-movie-body text-xl text-red-500">
          🥤 Pick {maxSelection} movies and let&apos;s create movie magic!
        </p>
      )}
      <div className="grid grid-cols-2 gap-4 p-8 text-gray-800 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:p-0">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isSelected={selectedMovies.includes(movie.id)}
            onSelect={handleMovieSelect}
          />
        ))}
      </div>
    </>
  )
}

export default MovieSelector
