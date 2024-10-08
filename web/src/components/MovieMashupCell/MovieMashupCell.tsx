import type {
  FindMovieMashupQuery,
  FindMovieMashupQueryVariables,
} from 'types/graphql'

import { Metadata } from '@redwoodjs/web'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import FailureComponent from 'src/components/FailureComponent'
import LoadingComponent from 'src/components/LoadingComponent'
import MovieMashupComponent from 'src/components/MovieMashupCell/MovieMashupComponent'

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
      photos {
        id
        imageUrl
      }
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

export const Loading = () => <LoadingComponent />

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindMovieMashupQueryVariables>) => (
  <FailureComponent error={error} />
)

export const Success = ({
  movieMashup,
}: CellSuccessProps<FindMovieMashupQuery, FindMovieMashupQueryVariables>) => {
  return (
    <>
      <Metadata
        title={movieMashup.title}
        description={movieMashup.tagline}
        ogImage={movieMashup.photos[0].imageUrl}
      />

      <MovieMashupComponent movieMashup={movieMashup} />
    </>
  )
}
