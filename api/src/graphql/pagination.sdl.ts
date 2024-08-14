export const schema = gql`
  interface PaginatedItems {
    count: Int!
    page: Int!
    limit: Int!
    totalPages: Int!
  }
`
