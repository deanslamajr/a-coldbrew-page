import getConfig from 'next/config';

import { HomePage } from '../../types/homePage.graphqls';

const { serverRuntimeConfig } = getConfig();

export const get: () => Promise<HomePage> = async () => {
  return { test: serverRuntimeConfig.GQL_TEST };
};
