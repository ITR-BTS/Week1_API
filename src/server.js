import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { mergeResolvers } from '@graphql-tools/merge'

import connectDB from '~/config/mongodb.js'
import { typeDefs } from '~/schema.js'
import physicianResolvers from '~/resolvers/physicianResolver.js'
import patientResolvers from '~/resolvers/patientResolver.js'

const app = express()
const resolvers = mergeResolvers([
  patientResolvers,
  physicianResolvers
])

async function startServer() {
  await connectDB()

  const server = new ApolloServer({ typeDefs, resolvers })

  await server.start()
  server.applyMiddleware({ app })

  app.listen(8080, () => {
    console.log(`Server running at localhost:8080${server.graphqlPath}`)
  })
}

startServer()
// app.use(
//   cors(
//     {
//       origin: process.env.FRONTEND_URL || 'http://localhost:5173'
//     }
//   )
// )

