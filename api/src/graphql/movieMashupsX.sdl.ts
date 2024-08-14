export const schema = gql`
  type PaginatedMovieMashups implements PaginatedItems {
    items: [MovieMashup!]!
    page: Int!
    limit: Int!
    totalItems: Int!
    totalPages: Int!
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
