import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'

import connectDB from './config/mongodb.js'
import { typeDefs, resolvers } from './graphql/index.js';

const app = express()

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

