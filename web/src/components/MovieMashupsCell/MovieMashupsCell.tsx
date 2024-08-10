import type {
  MovieMashupsQuery,
  MovieMashupsQueryVariables,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

export const QUERY: TypedDocumentNode<
  MovieMashupsQuery,
  MovieMashupsQueryVariables
> = gql`
  query MovieMashupsQuery {
    movieMashups {
      id
      title
      tagline
      photo
      firstMovie {
        title
      }
      secondMovie {
        title
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

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
          src={movieMashup.photo}
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

export const Success = ({
  movieMashups,
}: CellSuccessProps<MovieMashupsQuery>) => {
  return (
    <div className="grid grid-cols-1 gap-4 p-8 sm:grid-cols-2 md:grid-cols-3 md:px-4 lg:grid-cols-4 ">
      {movieMashups.map((item) => (
        <MovieMashupCard key={item.id} movieMashup={item} />
      ))}
    </div>
  )
}
