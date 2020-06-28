import { MutationResolvers } from '../types/root.graphqls';
import { ContextInterface } from '../../context';
import { resolver as sendAccountCreateEmailResolver } from './sendAccountCreateEmail';
import { resolver as finishAccountCreateResolver } from './finishAccountCreate';
import { resolver as loginAccountResolver } from './loginAccount';

export const Mutation: Required<MutationResolvers<ContextInterface>> = {
  finishAccountCreate: finishAccountCreateResolver,
  loginAccount: loginAccountResolver,
  sendAccountCreateEmail: sendAccountCreateEmailResolver,
};
