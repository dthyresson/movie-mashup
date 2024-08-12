export const schema = gql`
  type Photo {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    falModel: String!
    imageUrl: String!
    movieMashup: MovieMashup
    movieMashupId: String
  }

  type Query {
    photos: [Photo!]! @blocked
    photo(id: String!): Photo @blocked
  }

  input CreatePhotoInput {
    realism: Realism!
    movieMashupId: String
  }

  input UpdatePhotoInput {
    falModel: String
    imageUrl: String
    movieMashupId: String
  }

  type Mutation {
    createPhoto(input: CreatePhotoInput!): MovieMashup!
      @rateLimited(identifier: "createPhoto")
    updatePhoto(id: String!, input: UpdatePhotoInput!): Photo! @blocked
    deletePhoto(id: String!): Photo! @blocked
  }
`
