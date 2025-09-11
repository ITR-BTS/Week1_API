import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'

import connectDB from './config/mongodb.js'
import physicianResolvers from './graphql/resolvers/physicianResolver.js'
import patientResolvers from './graphql/resolvers/patientResolver.js'
import physicianTypeDef from './graphql/typedefs/physicianTypedef.js'
import patientTypeDef from './graphql/typedefs/patientTypedef.js'

const app = express()
const resolvers = mergeResolvers([
  patientResolvers,
  physicianResolvers
])

const typeDefs = mergeTypeDefs([
  physicianTypeDef,
  patientTypeDef
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

