import { useCallback } from 'react';

import { useChores as useChoresContext } from '../contexts/ChoresContext';

import { updateChore as updateChoreInClientCache } from '../helpers/clientCache';
import { transformDateToDueDate } from '../helpers/dueDates';
import { sortChores } from '../helpers/chores';

import { ChoreInterface } from '../types';
import {
  ChoreUpdate,
  useUpdateChoreMutation,
} from '../graphql-client/mutations/updateChore.graphql';

export const useUpdateChore = () => {
  const [updateChoreGql] = useUpdateChoreMutation();
  const [chores, setChores] = useChoresContext();

  const updateChore = useCallback(
    async (updateChoreInput: ChoreUpdate) => {
      const updateChoreResponse = await updateChoreGql({
        variables: {
          input: {
            chore: updateChoreInput,
          },
        },
      });

      let updatedChore: ChoreInterface;

      if (updateChoreResponse?.data?.updateChore?.updatedChore) {
        const updatedChoreFromDb =
          updateChoreResponse?.data?.updateChore?.updatedChore;
        updatedChore = {
          id: updatedChoreFromDb.id,
          summary: updatedChoreFromDb.summary,
          description: updatedChoreFromDb.description,
          dueDate: transformDateToDueDate(new Date(updatedChoreFromDb.dueDate)),
          version: updatedChoreFromDb.version,
        };
      } else {
        updatedChore = updateChoreInClientCache(updateChoreInput);
      }

      const newChoresList = [...(chores as ChoreInterface[])];
      const index = newChoresList.findIndex(
        chore => chore.id === updatedChore.id
      );
      if (index === -1) {
        throw new Error(
          `Chore with id:${updatedChore.id} not found in component state!`
        );
      }

      newChoresList.splice(index, 1);
      newChoresList.push(updatedChore);
      const sortedChores = sortChores(newChoresList);

      setChores(sortedChores);
    },
    [updateChoreGql, chores, setChores]
  );

  return updateChore;
};
