
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import connectDB from './config/mongodb.js'
import { ApolloServer } from 'apollo-server-express'
import { mergeResolvers } from '@graphql-tools/merge';
import patientResolvers from './graphql/resolvers/patientResolvers.js'
// import physicianResolvers from './graphql/resolvers/physicianResolvers.js'
import { typeDefs } from './graphql/schema.js'
// import patientRouter from './routes/v1/patientRoute.js'
// import physicianRouter from './routes/v1/physicianRoute.js'
const app = express()
app.use(express.json())

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:5173',
      'https://studio.apollographql.com'
    ],
    credentials: true
  })
);
//routes
// app.use('/api/v1/patients', patientRouter)
// app.use('/api/v1/physicians', physicianRouter)

//mongoose
connectDB()


const PORT = process.env.PORT || 5000

const resolvers = mergeResolvers([patientResolvers]);

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  // app.use('/graphql', expressMiddleware(server));
  server.applyMiddleware({ app, path: '/graphql' });
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`GraphQL endpoint ready at http://localhost:${PORT}/graphql`);
  });
}

startApolloServer();

export default app