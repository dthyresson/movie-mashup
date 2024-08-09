import type {
  MovieMashup,
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
      <div className="flex h-full flex-col rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md">
        <img
          src={movieMashup.photo}
          alt={movieMashup.title}
          className="w-full rounded-lg border border-gray-200 object-scale-down shadow-sm"
        />
        <div className="flex flex-grow flex-col justify-between space-y-4">
          <div className="mt-2 space-y-2">
            <h2 className="text-xl font-bold">{movieMashup.title}</h2>
            <p className="text-sm text-gray-500">{movieMashup.tagline}</p>
          </div>
          <p className="mt-auto text-center text-xs text-gray-400">
            Mashup of {movieMashup.firstMovie.title} and{' '}
            {movieMashup.secondMovie.title}
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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {movieMashups.map((item) => (
        <MovieMashupCard key={item.id} movieMashup={item} />
      ))}
    </div>
  )
}
