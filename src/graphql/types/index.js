import rootTypes from './root.graphqls';
import testTypes from './test.graphqls';
import sendAccountCreateEmailTypes from './sendAccountCreateEmail.graphqls';
import redeemAccountCreateToken from './redeemAccountCreateToken.graphqls';
import customScalarTypes from './scalars.graphqls';

export const typeDefs = [
  rootTypes,
  customScalarTypes,
  testTypes,
  sendAccountCreateEmailTypes,
  redeemAccountCreateToken,
];
