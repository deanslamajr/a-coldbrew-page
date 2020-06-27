import { MutationResolvers } from '../types/root.graphqls';
import { resolver as sendAccountCreateEmailResolver } from './sendAccountCreateEmail';
import { resolver as finishAccountCreateResolver } from './finishAccountCreate';
import { scalars } from './scalars';

const Mutation: Required<MutationResolvers> = {
  finishAccountCreate: finishAccountCreateResolver,
  sendAccountCreateEmail: sendAccountCreateEmailResolver,
};

export default { ...scalars, Mutation };
