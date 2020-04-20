import { QueryResolvers } from '../types/root.graphqls';
import { resolver as homePageResolver } from './home';
import { scalars } from './scalars';

const Query: Required<QueryResolvers> = {
  homePage: homePageResolver,
};

export default { ...scalars, Query };
