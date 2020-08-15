import { useCallback } from 'react';

import { useChores as useChoresContext } from '../contexts/ChoresContext';

import { setChores as updateChoresOnClientCache } from '../helpers/clientCache';
import { sortChores } from '../helpers/chores';

import { ChoreInterface } from '../types';

import { useCompleteChoreMutation } from '../graphql-client/mutations/completeChore.graphql';

export const useCompleteChore = () => {
  const [chores, setChores] = useChoresContext();
  const [markChoreComplete] = useCompleteChoreMutation();

  const completeChore = useCallback(
    async (id: string): Promise<void> => {
      // attempt to make update on DB
      const markChoreCompleteResponse = await markChoreComplete({
        variables: {
          input: {
            choreId: id,
          },
        },
      });

      // Update app cache
      const newChoresList = chores ? [...chores] : ([] as ChoreInterface[]);

      const index = newChoresList.findIndex(chore => chore.id === id);
      if (index > -1) {
        newChoresList.splice(index, 1);
      }
      const sortedChores = sortChores(newChoresList);
      setChores(sortedChores);

      // if user doesn't have session, make update to localstorage
      if (!markChoreCompleteResponse?.data?.completeChore.hasAccountSession) {
        updateChoresOnClientCache(sortedChores);
      }
    },
    [chores, markChoreComplete, setChores]
  );

  return completeChore;
};
