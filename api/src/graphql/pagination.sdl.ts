export const schema = gql`
  interface PaginatedItems {
    page: Int!
    limit: Int!
    totalItems: Int!
    totalPages: Int!
  }
`
