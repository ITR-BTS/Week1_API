import 'dotenv/config'
import express from "express";
import connectDB from "./config/mongodb.js";

import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql/index.js";

const app = express();

async function startServer() {
  await connectDB();

  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();
  server.applyMiddleware({ app });

  app.listen(process.env.APP_PORT, () => {
    console.log(
      `Server running at localhost ${process.env.APP_PORT}:${server.graphqlPath}`
    );
  });
}

startServer();
