import { MutationResolvers } from '../types/root.graphqls';
import { resolver as sendAccountCreateEmailResolver } from './sendAccountCreateEmail';
import { scalars } from './scalars';

const Mutation: Required<MutationResolvers> = {
  sendAccountCreateEmail: sendAccountCreateEmailResolver,
};

export default { ...scalars, Mutation };
