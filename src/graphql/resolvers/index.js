import { mergeResolvers } from '@graphql-tools/merge';
import patientResolvers from './patientResolvers.js';
import physicianResolvers from './physicianResolvers.js';
import analysisResolvers from './analysisResolvers.js';

const resolvers = mergeResolvers([patientResolvers, physicianResolvers, analysisResolvers]);
export default resolvers;