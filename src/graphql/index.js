import { createPhysicianLoader } from "./loaders/index.js";

export { default as typeDefs } from "./typedefs/index.js";
export { default as resolvers } from "./resolvers/index.js";

export const context = ({ req }) => ({
  loaders: {
    physician: createPhysicianLoader(), // Mỗi request 1 instance
  },
  // user, auth, ...
});
