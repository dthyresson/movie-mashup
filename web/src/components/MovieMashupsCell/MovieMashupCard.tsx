import type { MovieMashupsQuery } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

const MovieMashupCard = ({
  movieMashup,
}: {
  movieMashup: MovieMashupsQuery['movieMashups'][0]
}) => {
  return (
    <Link to={routes.movieMashup({ id: movieMashup.id })} className="block">
      <div className="flex h-full flex-col rounded-lg border border-orange-100 p-4 shadow-sm transition-all hover:scale-105 hover:cursor-pointer hover:bg-orange-50 hover:shadow-md hover:ring-2 hover:ring-red-400">
        <h2 className="mb-0 h-16 text-center font-movie-title text-xl font-normal text-gray-900">
          {movieMashup.title}
        </h2>
        <img
          src={movieMashup.photos[0]?.imageUrl}
          alt={movieMashup.title}
          className="h-48 w-full rounded-t-lg object-cover shadow-sm"
        />
        <div className="flex flex-grow flex-col justify-between space-y-4">
          <div className="mt-2 space-y-2">
            <p className="text-md font-movie-subtitle text-gray-800">
              {movieMashup.tagline}
            </p>
          </div>
          <p className="mt-auto text-center font-movie-body text-xs text-gray-400">
            <span className="font-bold">{movieMashup.firstMovie.title}</span>{' '}
            {' 💥 '}
            <span className="font-bold">{movieMashup.secondMovie.title}</span>
          </p>
        </div>
      </div>
    </Link>
  )
}

export default MovieMashupCard
