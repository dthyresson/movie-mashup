export interface CreateMovieInput {
  __typename?: 'CreateMovieInput'
  photo: string
  title: string
}

export interface CreateMovieMashupInput {
  __typename?: 'CreateMovieMashupInput'
  firstMovieId: string
  photo: string
  secondMovieId: string
  tagline: string
  title: string
  treatment: string
}

export interface Movie {
  __typename?: 'Movie'
  createdAt: DateTime
  firstMovieMashups: Array<MovieMashup>
  id: string
  mashups: Array<MovieMashup>
  photo: string
  secondMovieMashups: Array<MovieMashup>
  title: string
  updatedAt: DateTime
}

export interface MovieMashup {
  __typename?: 'MovieMashup'
  createdAt: DateTime
  firstMovie: Movie
  firstMovieId: string
  id: string
  movies: Array<Movie>
  photo: string
  secondMovie: Movie
  secondMovieId: string
  tagline: string
  title: string
  treatment: string
  updatedAt: DateTime
}

export interface Mutation {
  __typename?: 'Mutation'
  createMovie: Movie
  createMovieMashup: MovieMashup
  deleteMovie: Movie
  deleteMovieMashup: MovieMashup
  updateMovie: Movie
  updateMovieMashup: MovieMashup
}

export interface Query {
  __typename?: 'Query'
  movie?: Movie | null
  movieMashup?: MovieMashup | null
  movieMashups: MovieMashup[]
  movies: Movie[]
  redwood?: Redwood | null
}

export interface Redwood {
  __typename?: 'Redwood'
  currentUser?: JSON | null
  prismaVersion?: string | null
  version?: string | null
}

export interface UpdateMovieInput {
  __typename?: 'UpdateMovieInput'
  photo?: string | null
  title?: string | null
}

export interface UpdateMovieMashupInput {
  __typename?: 'UpdateMovieMashupInput'
  firstMovieId?: string | null
  photo?: string | null
  secondMovieId?: string | null
  tagline?: string | null
  title?: string | null
  treatment?: string | null
}

type DateTime = any
type JSON = any
