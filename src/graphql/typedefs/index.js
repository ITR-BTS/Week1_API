import { mergeTypeDefs } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";

const typesArray = loadFilesSync("./**/*.graphql");
const typeDefs = mergeTypeDefs(typesArray);

export default typeDefs;