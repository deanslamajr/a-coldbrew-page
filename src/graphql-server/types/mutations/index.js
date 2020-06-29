import root from './root.graphqls';

import finishAccountCreate from './finishAccountCreate.graphqls';
import loginAccount from './loginAccount.graphqls';
import logoutAccount from './logoutAccount.graphqls';
import sendAccountCreateEmail from './sendAccountCreateEmail.graphqls';

export const typeDefs = [
  root,
  finishAccountCreate,
  loginAccount,
  logoutAccount,
  sendAccountCreateEmail,
];
