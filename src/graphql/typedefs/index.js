import { mergeTypeDefs } from "@graphql-tools/merge";
import patientTypedef from "./patientTypedef.js";
import physicianTypedef from "./physicianTypedef.js";
import analysisTypeDef from "./analysisTypedef.js";

const typeDefs = mergeTypeDefs([
  patientTypedef,
  physicianTypedef,
  analysisTypeDef,
]);
export default typeDefs;
