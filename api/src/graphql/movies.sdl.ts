export const schema = gql`
  type Movie {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    title: String!
    overview: String
    releaseDate: DateTime
    photo: String!
    firstMovieMashups: [MovieMashup]!
    secondMovieMashups: [MovieMashup]!
    mashups: [MovieMashup]!
  }

  type Query {
    movies: [Movie!]! @skipAuth
    movie(id: String!): Movie @skipAuth
  }

  input CreateMovieInput {
    id: String!
    title: String!
    overview: String
    releaseDate: DateTime
    photo: String!
  }

  input UpdateMovieInput {
    title: String
    overview: String
    releaseDate: DateTime
    photo: String
  }

  type Mutation {
    createMovie(input: CreateMovieInput!): Movie! @blocked
    updateMovie(id: String!, input: UpdateMovieInput!): Movie! @blocked
    deleteMovie(id: String!): Movie! @blocked
  }
`
