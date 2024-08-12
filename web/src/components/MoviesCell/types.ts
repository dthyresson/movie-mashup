import type { CellSuccessProps } from '@redwoodjs/web'

export type Movie = {
  id: string
  title: string
  photo: string
}

export type MovieSelectorProps = {
  movies: Movie[]
  onSelectionComplete: (selectedMovies: string[]) => void
  initialSelection?: string[]
  maxSelection?: number
  realism: string
  setRealism: (realism: string) => void
}

export type MoviesCellProps = CellSuccessProps & {
  firstMovieId: string
  secondMovieId: string
}
