import { useEffect } from 'react';
import { WatchQueryFetchPolicy } from 'apollo-client';

import {
  Chores,
  useChores as useChoresContext,
} from '../contexts/ChoresContext';

import {
  addChore as addChoreToClientCache,
  getChores as getChoresFromClientCache,
  setChores as updateChoresOnClientCache,
} from '../helpers/clientCache';
import { sortDueDatesFn, transformDateToDueDate } from '../helpers/dueDates';

import {
  Chore as ChoreFromDb,
  useGetChoresQuery,
} from '../graphql-client/queries/getChores.graphql';
import {
  ChoreInput,
  useCreateChoreMutation,
} from '../graphql-client/mutations/createChore.graphql';

import { ChoreInterface } from '../types';

interface UseChoresParams {
  fetchPolicy?: WatchQueryFetchPolicy;
}
type UseChores = (
  options?: UseChoresParams
) => {
  chores: Chores;
  addChore: (chore: ChoreInput) => Promise<void>;
  completeChore: (choreId: string) => Promise<void>;
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

const sortChores = (chores: ChoreInterface[]): ChoreInterface[] => {
  return chores.slice().sort(({ dueDate: a }, { dueDate: b }) => {
    return sortDueDatesFn(a, b);
  });
};

export const useChores: UseChores = (
  options = { fetchPolicy: 'network-only' }
) => {
  const [chores, setChores] = useChoresContext();

  const fetchPolicy = options?.fetchPolicy || 'network-only';

  const {
    data: choresFetchResponse,
    loading: isLoadingGetChores,
    refetch: refetchChores,
  } = useGetChoresQuery({ fetchPolicy });

  const [createChore] = useCreateChoreMutation();

  // get chores
  useEffect(() => {
    if (!isLoadingGetChores) {
      let chores = [] as ChoreInterface[];

      // From DB
      if (
        choresFetchResponse?.getChores.hasAccountSession &&
        choresFetchResponse?.getChores.chores
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

  const completeChore = async (id: string): Promise<void> => {
    const newChoresList = chores ? [...chores] : ([] as ChoreInterface[]);

    const index = newChoresList.findIndex(chore => chore.id === id);
    if (index > -1) {
      newChoresList.splice(index, 1);
    }
    const sortedChores = sortChores(newChoresList);
    setChores(sortedChores);
    updateChoresOnClientCache(sortedChores);
  };

  const addChore = async (chore: ChoreInput) => {
    const createChoreResponse = await createChore({
      variables: {
        input: {
          chore,
        },
      },
    });
    let newChore: ChoreInterface;
    if (createChoreResponse?.data?.createChore.newChore) {
      const newChoreFromDb = createChoreResponse.data.createChore.newChore;
      newChore = {
        id: newChoreFromDb.id,
        summary: newChoreFromDb.summary,
        description: newChoreFromDb.description,
        dueDate: transformDateToDueDate(new Date(newChoreFromDb.dueDate)),
        version: newChoreFromDb.version,
      };
    } else {
      // @TODO use localstorage when user doesn't have session
      newChore = addChoreToClientCache(chore);
    }

    const newChoresList = chores ? [...chores, newChore] : [newChore];
    const sortedChores = sortChores(newChoresList);
    setChores(sortedChores);
  };

  return {
    chores,
    addChore,
    completeChore,
    refetchChores,
  };
};
