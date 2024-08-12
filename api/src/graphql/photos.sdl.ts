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

  input SetMovieMashupPhotoInput {
    movieMashupId: String!
    photoId: String!
  }

  type Mutation {
    createPhoto(input: CreatePhotoInput!): MovieMashup!
      @rateLimited(identifier: "createPhoto")
    setMovieMashupPhoto(input: SetMovieMashupPhotoInput!): MovieMashup!
      @rateLimited(identifier: "setMovieMashupPhoto")
    updatePhoto(id: String!, input: UpdatePhotoInput!): Photo! @blocked
    deletePhoto(id: String!): Photo! @blocked
  }
`
