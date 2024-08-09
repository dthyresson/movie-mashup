export const schema = gql`
  type Movie {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    title: String!
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
    photo: String!
  }

  input UpdateMovieInput {
    title: String
    photo: String
  }

  type Mutation {
    createMovie(input: CreateMovieInput!): Movie! @blocked
    updateMovie(id: String!, input: UpdateMovieInput!): Movie! @blocked
    deleteMovie(id: String!): Movie! @blocked
  }
`
