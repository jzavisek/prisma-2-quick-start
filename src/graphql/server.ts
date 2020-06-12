import * as dotenv from 'dotenv'
dotenv.config()

import { ApolloServer } from 'apollo-server'
import { applyMiddleware } from 'graphql-middleware'
import { makeExecutableSchema } from 'graphql-tools'
import { db } from '@modules/db'
import { log } from '@modules/logger'
import { schema } from '@graphql/schema'
import { permissionsMiddleware } from '@graphql/middleware/permissions'
import { authMiddleware } from '@graphql/middleware/auth'
import { config } from '@modules/config'

const schemaWithMiddleware = applyMiddleware(
  makeExecutableSchema({
    typeDefs: schema.typeDefs,
    resolvers: schema.resolvers,
  }),
  authMiddleware,
  permissionsMiddleware
)

const server = new ApolloServer({
  schema: schemaWithMiddleware,
  schemaDirectives: schema.schemaDirectives,
  tracing: false,
  context: (request) => request,
  cors: {
    origin: '*',
    methods: 'GET,HEAD,POST',
  },
  playground: {
    settings: {
      'editor.theme': 'light',
      'editor.cursorShape': 'line',
    },
  },
  onHealthCheck: async () => await db.raw(`SELECT 1`),
})

const app = {
  async start() {
    await server.listen({ port: config.http.port })
  },
  stop() {
    if (server) {
      server.stop()
    }
  },
}

process.on('exit', app.stop)
process.on('SIGINT', app.stop)
process.on('uncaughtException', app.stop)

if (!module.parent) {
  app.start().then(() => {
    log.info(`🌍 Listening @${config.http.port}`)
  })
}
