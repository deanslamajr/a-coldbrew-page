import { MutationResolvers } from '../types/root.graphqls';
import { ContextInterface } from '../../context';
import { resolver as sendAccountCreateEmailResolver } from './sendAccountCreateEmail';
import { resolver as finishAccountCreateResolver } from './finishAccountCreate';
import { resolver as loginAccountResolver } from './loginAccount';
import { resolver as logoutAccountResolver } from './logoutAccount';

export const Mutation: Required<MutationResolvers<ContextInterface>> = {
  finishAccountCreate: finishAccountCreateResolver,
  loginAccount: loginAccountResolver,
  logoutAccount: logoutAccountResolver,
  sendAccountCreateEmail: sendAccountCreateEmailResolver,
};
