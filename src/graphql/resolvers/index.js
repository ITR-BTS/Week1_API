import { mergeResolvers } from '@graphql-tools/merge';
import patientResolvers from './patientResolvers.js';
import physicianResolvers from './physicianResolvers.js';

const resolvers = mergeResolvers([patientResolvers, physicianResolvers]);
export default resolvers;