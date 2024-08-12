export const schema = gql`
  type MovieMashup {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    title: String!
    tagline: String!
    treatment: String!
    description: String!
    photos: [Photo!]!
    firstMovie: Movie!
    firstMovieId: String!
    secondMovie: Movie!
    secondMovieId: String!
    movies: [Movie]!
  }

  type Query {
    movieMashups: [MovieMashup!]! @skipAuth
    movieMashup(id: String!): MovieMashup @skipAuth
  }

  input CreateMovieMashupInput {
    title: String!
    tagline: String!
    treatment: String!
    description: String!
    falModel: String!
    imageUrl: String!
    firstMovieId: String!
    secondMovieId: String!
  }

  input UpdateMovieMashupInput {
    title: String
    tagline: String
    treatment: String
    description: String
    falModel: String
    imageUrl: String
    firstMovieId: String
    secondMovieId: String
  }
  input MashMoviesInput {
    firstMovieId: String!
    secondMovieId: String!
  }

  type Mutation {
    mashMovies(input: MashMoviesInput!): MovieMashup!
      @rateLimited(identifier: "mashMovies")
    createMovieMashup(input: CreateMovieMashupInput!): MovieMashup! @blocked
    updateMovieMashup(
      id: String!
      input: UpdateMovieMashupInput!
    ): MovieMashup! @blocked
    deleteMovieMashup(id: String!): MovieMashup! @blocked
  }
`
