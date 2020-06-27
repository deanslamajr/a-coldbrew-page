import root from './root.graphqls';

import finishAccountCreate from './finishAccountCreate.graphqls';
import loginAccount from './loginAccount.graphqls';
import sendAccountCreateEmail from './sendAccountCreateEmail.graphqls';

export const typeDefs = [
  root,
  finishAccountCreate,
  loginAccount,
  sendAccountCreateEmail,
];
