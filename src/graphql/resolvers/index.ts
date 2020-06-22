import { MutationResolvers } from '../types/root.graphqls';
import { resolver as sendAccountCreateEmailResolver } from './sendAccountCreateEmail';
import { resolver as redeemAccountCreateTokenResolver } from './redeemAccountCreateToken';
import { scalars } from './scalars';

const Mutation: Required<MutationResolvers> = {
  redeemAccountCreateToken: redeemAccountCreateTokenResolver,
  sendAccountCreateEmail: sendAccountCreateEmailResolver,
};

export default { ...scalars, Mutation };
