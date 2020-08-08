import { QueryResolvers } from '../types/root.graphqls';

import { ContextInterface } from '../../context';
import { resolver as getAccountFromSessionResolver } from './getAccountFromSession';
import { resolver as getChoresResolver } from './getChores';

export const Query: Required<QueryResolvers<ContextInterface>> = {
  getAccountFromSession: getAccountFromSessionResolver,
  getChores: getChoresResolver,
};
