import { useState } from 'react'

import { Link, navigate, routes } from '@redwoodjs/router'

// New reusable components
const OverlayButton = ({ onClick, children, className }) => (
  <button
    onClick={onClick}
    className={`absolute bottom-2 rounded-full bg-white p-1 shadow-md ${className}`}
  >
    {children}
  </button>
)

const OverlayContent = ({ show, onClose, className, children }) =>
  show && (
    <button
      className={`absolute inset-0 flex cursor-pointer items-center justify-center bg-opacity-75 p-4 ${className}`}
      onClick={onClose}
    >
      {children}
    </button>
  )

const MovieButton = ({ movie, onClick }) => (
  <button
    key={movie.id}
    onClick={(e) => {
      e.stopPropagation()
      onClick(movie.id)
    }}
    className="group flex w-full flex-col items-center overflow-hidden rounded-md bg-white p-4 shadow-sm transition-transform hover:scale-105 hover:bg-orange-100 hover:shadow-md hover:ring-2 hover:ring-red-600"
  >
    <div className="flex items-center justify-center rounded-sm border border-orange-200 p-1">
      <img
        src={`https://www.themoviedb.org/t/p/w185_and_h278_bestv2${movie.photo}`}
        alt={movie.title}
        loading="lazy"
        className="max-h-36 max-w-full object-contain"
      />
    </div>
    <h3 className="mt-2 truncate text-center font-movie-title font-normal text-gray-800 group-hover:text-red-600 ">
      {movie.title}
    </h3>
  </button>
)

const MovieMashupComponent = ({ movieMashup }) => {
  const [showDescription, setShowDescription] = useState(false)
  const [showMovies, setShowMovies] = useState(false)
  const handleMovieClick = (movieId: string) => {
    navigate(routes.newMovieMashup({ firstMovieId: movieId }))
  }

  return (
    <div className="mx-auto my-0 max-w-3xl bg-white">
      <div className="flex flex-col items-center justify-center gap-4 p-6">
        <h2 className="mb-2 font-movie-title text-3xl font-normal text-gray-800">
          {movieMashup.title}
        </h2>
        <div className="relative mb-2 aspect-video w-full max-w-2xl bg-gradient-to-b from-slate-50 via-slate-200 to-slate-100">
          <img
            className="border-gra -200 absolute inset-0 h-full w-full object-contain p-4"
            src={movieMashup.photo}
            alt={movieMashup.title}
            loading="lazy"
          />
          <OverlayButton
            onClick={() => setShowDescription(true)}
            className="right-2"
          >
            <span className="h-6 w-6 text-gray-600">🥤</span>
          </OverlayButton>
          <OverlayButton
            onClick={() => setShowMovies(true)}
            className="right-12"
          >
            <span className="h-6 w-6 text-gray-600">🎬</span>
          </OverlayButton>
          <OverlayContent
            show={showDescription}
            onClose={() => setShowDescription(false)}
            className="bg-red-500"
          >
            <p className="text-center font-movie-body text-lg text-white">
              {movieMashup.description}
            </p>
          </OverlayContent>
          <OverlayContent
            show={showMovies}
            onClose={() => setShowMovies(false)}
            className="bg-amber-500"
          >
            <div className="mx-auto flex w-full max-w-xs flex-col gap-4">
              <h4 className="mb-4 text-xl font-bold text-white">
                Pick a movie for a new mashup
              </h4>
              <div className="grid grid-cols-2 gap-6">
                {[movieMashup.firstMovie, movieMashup.secondMovie].map(
                  (movie) => (
                    <MovieButton
                      key={movie.id}
                      movie={movie}
                      onClick={handleMovieClick}
                    />
                  )
                )}
              </div>
            </div>
          </OverlayContent>
        </div>
        <h3 className="mb-2 font-movie-subtitle text-xl font-semibold text-gray-600">
          {movieMashup.tagline}
        </h3>
        <p className="font-movie-body text-lg text-gray-800">
          {movieMashup.treatment}
        </p>
        <nav className="mt-4 flex items-center justify-center">
          <Link
            to={routes.newMovieMashup({
              firstMovieId: movieMashup.firstMovie.id,
            })}
            className="text-normal mr-2 font-movie-body text-gray-500 hover:text-orange-500"
          >
            {movieMashup.firstMovie.title}
          </Link>
          💥
          <Link
            to={routes.newMovieMashup({
              secondMovieId: movieMashup.secondMovie.id,
            })}
            className="text-normal ml-2 font-movie-body font-normal text-gray-500 hover:text-orange-500"
          >
            {movieMashup.secondMovie.title}
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default MovieMashupComponent
