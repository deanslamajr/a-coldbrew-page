import { MutationResolvers } from '../types/root.graphqls';
import { ContextInterface } from '../../context';

import { resolver as createChoreResolver } from './createChore';
import { resolver as updateChoreResolver } from './updateChore';
import { resolver as completeChoreResolver } from './completeChore';
import { resolver as sendAccountCreateEmailResolver } from './sendAccountCreateEmail';
import { resolver as finishAccountCreateResolver } from './finishAccountCreate';
import { resolver as loginAccountResolver } from './loginAccount';
import { resolver as logoutAccountResolver } from './logoutAccount';

export const Mutation: Required<MutationResolvers<ContextInterface>> = {
  createChore: createChoreResolver,
  updateChore: updateChoreResolver,
  completeChore: completeChoreResolver,
  finishAccountCreate: finishAccountCreateResolver,
  loginAccount: loginAccountResolver,
  logoutAccount: logoutAccountResolver,
  sendAccountCreateEmail: sendAccountCreateEmailResolver,
};
