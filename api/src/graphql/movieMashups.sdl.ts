export const schema = gql`
  type MovieMashup {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    title: String!
    tagline: String!
    treatment: String!
    photo: String!
    firstMovie: Movie!
    firstMovieId: String!
    secondMovie: Movie!
    secondMovieId: String!
    movies: [Movie]!
  }

  type Query {
    movieMashups: [MovieMashup!]! @requireAuth
    movieMashup(id: String!): MovieMashup @requireAuth
  }

  input CreateMovieMashupInput {
    title: String!
    tagline: String!
    treatment: String!
    photo: String!
    firstMovieId: String!
    secondMovieId: String!
  }

  input UpdateMovieMashupInput {
    title: String
    tagline: String
    treatment: String
    photo: String
    firstMovieId: String
    secondMovieId: String
  }

  type Mutation {
    createMovieMashup(input: CreateMovieMashupInput!): MovieMashup! @requireAuth
    updateMovieMashup(
      id: String!
      input: UpdateMovieMashupInput!
    ): MovieMashup! @requireAuth
    deleteMovieMashup(id: String!): MovieMashup! @requireAuth
  }
`
