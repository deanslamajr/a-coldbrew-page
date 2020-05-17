import store from 'store2';
import getConfig from 'next/config';

import { ClientCacheInterface } from '../types';
import { mockClientCache } from './mockChoreData';

const { publicRuntimeConfig } = getConfig();

const getLocalstorageKey = (): string => {
  return publicRuntimeConfig.LOCALSTORAGE_KEY || 'acp';
};

export const getCache = (): ClientCacheInterface => {
  const rehydratedClientData = store(getLocalstorageKey());
  return rehydratedClientData || mockClientCache;
};

export const setCache = (cache: ClientCacheInterface): void => {
  store(getLocalstorageKey(), cache);
};
