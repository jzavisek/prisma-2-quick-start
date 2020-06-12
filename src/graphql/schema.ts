import * as path from 'path'
import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas'

import { ValidateInputDirective } from '@graphql/directives/validate-input'

const typeDefs = mergeTypes(
  [
    ...fileLoader(path.join(__dirname, '../domain/**/*.gql')),
    ...fileLoader(path.join(__dirname, './**/*.gql')),
  ],
  { all: true }
)

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, '../domain/**/*.resolvers.*')))

const schemaDirectives = {
  validateInput: ValidateInputDirective,
}

const schema = {
  typeDefs,
  resolvers,
  schemaDirectives,
}

export { schema }
