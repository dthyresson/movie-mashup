export const schema = gql`
  type AuditLog {
    id: String!
    createdAt: DateTime!
    requestTime: DateTime!
    completionTime: DateTime!
    operationType: OperationType!
    prompt: String!
    model: String!
    tokenUsage: Int!
    movieMashup: MovieMashup!
    movieMashupId: String!
  }

  enum OperationType {
    MASHUP
    POSTER
  }

  type Query {
    auditLogs: [AuditLog!]! @requireAuth
    auditLog(id: String!): AuditLog @requireAuth
    auditLogsByMovieMashup(movieMashupId: String!): [AuditLog!]! @requireAuth
  }
`

// Note: We're not including any mutations as audit logs should only be
// created internally and not be modifiable through the API.

// The @requireAuth directive ensures that these queries are only
// accessible to authenticated users, as audit logs may contain
// sensitive information.
