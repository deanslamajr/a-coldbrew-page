import { useEffect } from 'react';
import { WatchQueryFetchPolicy } from 'apollo-client';

import {
  Chores,
  useChores as useChoresContext,
} from '../contexts/ChoresContext';

import { getChores as getChoresFromClientCache } from '../helpers/clientCache';
import { transformDateToDueDate } from '../helpers/dueDates';
import { sortChores } from '../helpers/chores';

import {
  Chore as ChoreFromDb,
  useGetChoresQuery,
} from '../graphql-client/queries/getChores.graphql';

import { ChoreInterface } from '../types';

interface UseChoresParams {
  fetchPolicy?: WatchQueryFetchPolicy;
}
type UseChores = (
  options?: UseChoresParams
) => {
  chores: Chores;
  refetchChores: ReturnType<typeof useGetChoresQuery>['refetch'];
};

const transformDbChoreToUIChore = (
  choreFromDb: ChoreFromDb[]
): ChoreInterface[] => {
  return choreFromDb.map(chore => ({
    ...chore,
    dueDate: transformDateToDueDate(new Date(chore.dueDate)),
  }));
};

export const useChores: UseChores = (
  options = { fetchPolicy: 'cache-first' }
) => {
  const [chores, setChores] = useChoresContext();

  const fetchPolicy = options?.fetchPolicy || 'network-only';

  const {
    data: choresFetchResponse,
    loading: isLoadingGetChores,
    refetch: refetchChores,
  } = useGetChoresQuery({ fetchPolicy });

  // get chores
  useEffect(() => {
    if (!isLoadingGetChores) {
      let chores = [] as ChoreInterface[];

      // From DB
      if (
        choresFetchResponse?.getChores.hasAccountSession &&
        Array.isArray(choresFetchResponse?.getChores.chores)
      ) {
        chores = transformDbChoreToUIChore(
          choresFetchResponse?.getChores.chores as ChoreFromDb[]
        );
      } else {
        // From localstorage
        chores = getChoresFromClientCache();
      }

      const sortedChores = sortChores(chores);
      setChores(sortedChores);
    }
  }, [choresFetchResponse, isLoadingGetChores, setChores]);

  return {
    chores,
    refetchChores,
  };
};
