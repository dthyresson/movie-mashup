export const schema = gql`
  input SetMovieMashupPhotoInput {
    movieMashupId: String!
    photoId: String!
  }

  type Mutation {
    setMovieMashupPhoto(input: SetMovieMashupPhotoInput!): MovieMashup!
      @rateLimited(identifier: "setMovieMashupPhoto")
  }
`
