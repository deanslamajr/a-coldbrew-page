import rootTypes from './root.graphqls';
import homePageTypes from './homePage.graphqls';
import sendAccountCreateEmailTypes from './sendAccountCreateEmail.graphqls';
import customScalarTypes from './scalars.graphqls';

export const typeDefs = [
  rootTypes,
  customScalarTypes,
  homePageTypes,
  sendAccountCreateEmailTypes,
];
