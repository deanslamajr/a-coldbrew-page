import { QueryResolvers } from '../types/root.graphqls';

import { ContextInterface } from '../../context';
import { resolver as getAccountFromSessionResolver } from './getAccountFromSession';

export const Query: Required<QueryResolvers<ContextInterface>> = {
  getAccountFromSession: getAccountFromSessionResolver,
};
