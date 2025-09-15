import "dotenv/config";
import express from "express";
import connectDB from "./config/mongodb.js";

import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql/index.js";
import { createPhysicianLoader } from "./graphql/loaders/index.js";

const app = express();

async function startServer() {
  await connectDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      loaders: {
        physician: createPhysicianLoader(), // Mỗi request 1 instance
      },
      // user, auth, ...
    }),
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen(process.env.APP_PORT, () => {
    console.log(
      `Server running at localhost ${process.env.APP_PORT}:${server.graphqlPath}`
    );
  });
}

startServer();
