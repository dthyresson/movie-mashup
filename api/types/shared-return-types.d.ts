import type {
  Movie as PMovie,
  MovieMashup as PMovieMashup,
  Photo as PPhoto,
} from '@prisma/client'

// You may very reasonably ask yourself, 'what is this file?' and why do I need it.

// Roughly, this file ensures that when a resolver wants to return a type - that
// type will match a prisma model. This is useful because you can trivially extend
// the type in the SDL and not have to worry about type mis-matches because the thing
// you returned does not include those functions.

// This gets particularly valuable when you want to return a union type, an interface,
// or a model where the prisma model is nested pretty deeply (GraphQL connections, for example.)
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
  falModel: string
  imageUrl: string
  movieMashupId?: string | null
}

export interface MashMoviesInput {
  __typename?: 'MashMoviesInput'
  firstMovieId: string
  realism: string
  secondMovieId: string
}

export interface Mutation {
  __typename?: 'Mutation'
  createMovie: PMovie
  createMovieMashup: PMovieMashup
  createPhoto: PPhoto
  deleteMovie: PMovie
  deleteMovieMashup: PMovieMashup
  deletePhoto: PPhoto
  mashMovies: PMovieMashup
  updateMovie: PMovie
  updateMovieMashup: PMovieMashup
  updatePhoto: PPhoto
}

export interface Query {
  __typename?: 'Query'
  movie?: PMovie | null
  movieMashup?: PMovieMashup | null
  movieMashups: PMovieMashup[]
  movies: PMovie[]
  photo?: PPhoto | null
  photos: PPhoto[]
  redwood?: Redwood | null
}

export type Realism = 'HIGH' | 'LOW' | 'MEDIUM' | 'ULTRA'

export interface Redwood {
  __typename?: 'Redwood'
  currentUser?: JSON | null
  prismaVersion?: string | null
  version?: string | null
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
export type Movie = PMovie
export type MovieMashup = PMovieMashup
export type Photo = PPhoto
