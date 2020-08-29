import root from './root.graphqls';

import createChore from './createChore.graphqls';
import updateChore from './updateChore.graphqls';
import completeChore from './completeChore.graphqls';
import finishAccountCreate from './finishAccountCreate.graphqls';
import loginAccount from './loginAccount.graphqls';
import logoutAccount from './logoutAccount.graphqls';
import sendAccountCreateEmail from './sendAccountCreateEmail.graphqls';

export const typeDefs = [
  root,
  completeChore,
  updateChore,
  createChore,
  finishAccountCreate,
  loginAccount,
  logoutAccount,
  sendAccountCreateEmail,
];
