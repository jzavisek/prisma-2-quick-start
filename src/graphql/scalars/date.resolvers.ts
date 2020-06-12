import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

const dateScalarType = new GraphQLScalarType({
  name: 'Date',
  description: 'Description of my custom scalar type',
  parseValue(value) {
    // From client
    return new Date(value)
  },
  serialize(value) {
    // Sent to client
    return value.toISOString()
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return ast.value
    }
    return null
  },
})

export default {
  Date: dateScalarType,
}
