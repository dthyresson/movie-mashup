import { useState } from 'react'

import type { MoviesQuery, MoviesQueryVariables } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellFailureProps, TypedDocumentNode } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FailureComponent from 'src/components/FailureComponent'
import LoadingComponent from 'src/components/LoadingComponent'
import MovieSelector from 'src/components/MoviesCell/MovieSelector'
import type { MoviesCellProps } from 'src/components/MoviesCell/types'
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

export const Loading = () => <LoadingComponent />

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <FailureComponent error={error} />
)

const GENERATE_MASHUP_MUTATION = gql`
  mutation GenerateMashupMutation($input: MashMoviesInput!) {
    mashMovies(input: $input) {
      id
    }
  }
`

export const Success = ({
  movies,
  firstMovieId,
  secondMovieId,
}: MoviesCellProps) => {
  const [isMashing, setIsMashing] = useState(false)
  const [_selectedMovies, setSelectedMovies] = useState<string[]>([])
  const [realism, setRealism] = useState('LOW')
  const [mashMovies] = useMutation(GENERATE_MASHUP_MUTATION, {
    onQueryUpdated: (query) => {
      console.log('query', query)
    },
    onCompleted: (data) => {
      console.log('data', data)
      setIsMashing(false)
      toast.success('Movie mashup created')
      navigate(routes.movieMashup({ id: data.mashMovies.id }))
    },
    onError: (error) => {
      console.log('error', error)
      toast.error('Failed to create movie mashup')
      setIsMashing(false)
      setSelectedMovies([])
    },
  })

  const handleSelectionComplete = (newSelection: string[]) => {
    setSelectedMovies(newSelection)
    toast.loading(`Mashing movies ...`, {
      duration: 7_000,
    })
    setIsMashing(true)
    setTimeout(() => {
      console.log('mashing movies')
      mashMovies({
        variables: {
          input: {
            firstMovieId: newSelection[0],
            secondMovieId: newSelection[1],
            realism,
          },
        },
      })
    }, 1_000)
  }

  if (isMashing) {
    return <LoadingComponent />
  }

  return (
    <MovieSelector
      movies={movies}
      onSelectionComplete={handleSelectionComplete}
      initialSelection={[firstMovieId, secondMovieId].filter(Boolean)}
      realism={realism}
      setRealism={setRealism}
    />
  )
}
