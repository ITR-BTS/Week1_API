import { mergeTypeDefs } from '@graphql-tools/merge';
import patientTypedef from './patientTypedef.js';
import physicianTypedef from './physicianTypedef.js';

const typeDefs = mergeTypeDefs([patientTypedef, physicianTypedef]);
export default typeDefs;


