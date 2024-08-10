import type {
  MovieMashupsQuery,
  MovieMashupsQueryVariables,
} from 'types/graphql'

import type {
  CellFailureProps,
  CellSuccessProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import FailureComponent from 'src/components/FailureComponent'
import LoadingComponent from 'src/components/LoadingComponent'
import MovieMashupCard from 'src/components/MovieMashupsCell/MovieMashupCard'

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
export const Loading = () => <LoadingComponent />

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <FailureComponent error={error} />
)

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
