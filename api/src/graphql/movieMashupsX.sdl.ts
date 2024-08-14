export const schema = gql`
  type PaginatedMovieMashups implements PaginatedItems {
    items: [MovieMashup!]!
    count: Int!
    page: Int!
    limit: Int!
  }

  input MashMoviesInput {
    firstMovieId: String!
    secondMovieId: String!
    realism: String!
  }

  type Query {
    paginatedMovieMashups(page: Int!, limit: Int!): PaginatedMovieMashups
      @skipAuth
  }

  type Mutation {
    mashMovies(input: MashMoviesInput!): MovieMashup!
      @rateLimited(identifier: "mashMovies")
  }
`
