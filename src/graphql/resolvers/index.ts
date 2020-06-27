import { MutationResolvers } from '../types/root.graphqls';
import { resolver as sendAccountCreateEmailResolver } from './sendAccountCreateEmail';
import { resolver as finishAccountCreateResolver } from './finishAccountCreate';
import { resolver as loginAccountResolver } from './loginAccount';
import { scalars } from './scalars';

const Mutation: Required<MutationResolvers> = {
  finishAccountCreate: finishAccountCreateResolver,
  loginAccount: loginAccountResolver,
  sendAccountCreateEmail: sendAccountCreateEmailResolver,
};

export default { ...scalars, Mutation };
