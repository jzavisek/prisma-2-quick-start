import { GraphQLRequestContext } from 'apollo-server-types'

export interface Context extends GraphQLRequestContext {
  req: any
  res: any
  state: {
    userId?: number
  }
}
