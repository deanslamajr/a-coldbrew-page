import { Resolver, HomePage } from '../types/homePage.graphqls';
import { get as getHome } from './models/home';

export const resolver: Resolver<HomePage> = async (
  _parent,
  _args,
  _context,
  _info
) => {
  const data = await getHome();

  return {
    test: data?.test,
  };
};
