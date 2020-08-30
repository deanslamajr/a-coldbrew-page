import { useCallback } from 'react';

import {
  ChoreInput,
  useCreateChoreMutation,
} from '../graphql-client/mutations/createChore.graphql';

import { useChores as useChoresContext } from '../contexts/ChoresContext';

import { addChore as addChoreToClientCache } from '../helpers/clientCache';
import { transformDateToDueDate } from '../helpers/dueDates';
import { sortChores } from '../helpers/chores';

import { ChoreInterface } from '../types';

type UseAddChore = () => [(chore: ChoreInput) => Promise<void>, boolean];

export const useAddChore: UseAddChore = () => {
  const [chores, setChores] = useChoresContext();
  const [createChore, { loading: isLoading }] = useCreateChoreMutation();

  const addChore = useCallback(
    async (chore: ChoreInput) => {
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
        newChore = addChoreToClientCache(chore);
      }

      const newChoresList = chores ? [...chores, newChore] : [newChore];
      const sortedChores = sortChores(newChoresList);

      setChores(sortedChores);
    },
    [chores, createChore, setChores]
  );

  return [addChore, isLoading];
};
