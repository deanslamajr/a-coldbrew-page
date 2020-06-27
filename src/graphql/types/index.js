import customScalarTypes from './scalars.graphqls';
import { typeDefs as queryTypes } from './queries';
import { typeDefs as mutationTypes } from './mutations';

export const typeDefs = [...queryTypes, ...mutationTypes, customScalarTypes];
