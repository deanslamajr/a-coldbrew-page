import rootTypes from './root.graphqls';
import homePageTypes from './homePage.graphqls';
import customScalarTypes from './scalars.graphqls';

export const typeDefs = [rootTypes, customScalarTypes, homePageTypes];
