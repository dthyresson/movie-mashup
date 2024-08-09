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
    movies: [Movie!]! @requireAuth
    movie(id: String!): Movie @requireAuth
  }

  input CreateMovieInput {
    title: String!
    photo: String!
  }

  input UpdateMovieInput {
    title: String
    photo: String
  }

  type Mutation {
    createMovie(input: CreateMovieInput!): Movie! @requireAuth
    updateMovie(id: String!, input: UpdateMovieInput!): Movie! @requireAuth
    deleteMovie(id: String!): Movie! @requireAuth
  }
`
