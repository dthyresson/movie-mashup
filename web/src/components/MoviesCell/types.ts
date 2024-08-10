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
}

export type MoviesCellProps = CellSuccessProps & {
  firstMovieId: string
  secondMovieId: string
}
