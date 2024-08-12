export const schema = gql`
  type Photo {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    imageUrl: String!
    movieMashup: MovieMashup
    movieMashupId: String
  }

  type Query {
    photos: [Photo!]! @blocked
    photo(id: String!): Photo @blocked
  }

  input CreatePhotoInput {
    imageUrl: String!
    movieMashupId: String
  }

  input UpdatePhotoInput {
    imageUrl: String
    movieMashupId: String
  }

  type Mutation {
    createPhoto(input: CreatePhotoInput!): Photo! @blocked
    updatePhoto(id: String!, input: UpdatePhotoInput!): Photo! @blocked
    deletePhoto(id: String!): Photo! @blocked
  }
`
