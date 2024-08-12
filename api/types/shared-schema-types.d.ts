export interface CreateMovieInput {
  __typename?: 'CreateMovieInput'
  id: string
  overview?: string | null
  photo: string
  releaseDate?: DateTime | null
  title: string
}

export interface CreateMovieMashupInput {
  __typename?: 'CreateMovieMashupInput'
  description: string
  falModel: string
  firstMovieId: string
  imageUrl: string
  secondMovieId: string
  tagline: string
  title: string
  treatment: string
}

export interface CreatePhotoInput {
  __typename?: 'CreatePhotoInput'
  movieMashupId?: string | null
  realism: Realism
}

export interface MashMoviesInput {
  __typename?: 'MashMoviesInput'
  firstMovieId: string
  realism: string
  secondMovieId: string
}

export interface Movie {
  __typename?: 'Movie'
  createdAt: DateTime
  firstMovieMashups: Array<MovieMashup>
  id: string
  mashups: Array<MovieMashup>
  overview?: string | null
  photo: string
  releaseDate?: DateTime | null
  secondMovieMashups: Array<MovieMashup>
  title: string
  updatedAt: DateTime
}

export interface MovieMashup {
  __typename?: 'MovieMashup'
  createdAt: DateTime
  description: string
  firstMovie: Movie
  firstMovieId: string
  id: string
  movies: Array<Movie>
  photos: Photo[]
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
  createPhoto: MovieMashup
  deleteMovie: Movie
  deleteMovieMashup: MovieMashup
  deletePhoto: Photo
  mashMovies: MovieMashup
  setMovieMashupPhoto: MovieMashup
  updateMovie: Movie
  updateMovieMashup: MovieMashup
  updatePhoto: Photo
}

export interface Photo {
  __typename?: 'Photo'
  createdAt: DateTime
  falModel: string
  id: string
  imageUrl: string
  movieMashup?: MovieMashup | null
  movieMashupId?: string | null
  updatedAt: DateTime
}

export interface Query {
  __typename?: 'Query'
  movie?: Movie | null
  movieMashup?: MovieMashup | null
  movieMashups: MovieMashup[]
  movies: Movie[]
  photo?: Photo | null
  photos: Photo[]
  redwood?: Redwood | null
}

export type Realism = 'HIGH' | 'LOW' | 'MEDIUM' | 'ULTRA'

export interface Redwood {
  __typename?: 'Redwood'
  currentUser?: JSON | null
  prismaVersion?: string | null
  version?: string | null
}

export interface SetMovieMashupPhotoInput {
  __typename?: 'SetMovieMashupPhotoInput'
  movieMashupId: string
  photoId: string
}

export interface UpdateMovieInput {
  __typename?: 'UpdateMovieInput'
  overview?: string | null
  photo?: string | null
  releaseDate?: DateTime | null
  title?: string | null
}

export interface UpdateMovieMashupInput {
  __typename?: 'UpdateMovieMashupInput'
  description?: string | null
  falModel?: string | null
  firstMovieId?: string | null
  imageUrl?: string | null
  secondMovieId?: string | null
  tagline?: string | null
  title?: string | null
  treatment?: string | null
}

export interface UpdatePhotoInput {
  __typename?: 'UpdatePhotoInput'
  falModel?: string | null
  imageUrl?: string | null
  movieMashupId?: string | null
}

type DateTime = any
type JSON = any
