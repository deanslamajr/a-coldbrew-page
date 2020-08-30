import { MutationResolvers } from '../types/mutations/updateChore.graphqls';
import { Chore as ChoreFromDb } from '../types/shared.graphqls';

import { ContextInterface } from '../../context';

import { choreVersion } from '../../../helpers/constants';

import { Accounts, Chores } from '../services/db';
import { getValuesFromInstance } from '../services/db/utils';

export const resolver: NonNullable<MutationResolvers<
  ContextInterface
>['updateChore']> = async (_parent, args, context, _info) => {
  let wasUpdateSuccess = false;
  let doesChoreExist = false;
  let hasAccountSession = false;

  let updatedChore: ChoreFromDb | null = null;

  try {
    const accountId = context.session.getAccountId();

    if (accountId) {
      const accountThatInvokedMutations = await Accounts.findOne({
        where: { id: accountId },
      });
      if (accountThatInvokedMutations) {
        hasAccountSession = true;

        const { chore: choreFromArgs } = args.input;

        const choreFromDb = await Chores.findOne({
          where: { id: choreFromArgs.id },
        });

        if (choreFromDb) {
          doesChoreExist = true;

          await choreFromDb.update({
            summary: choreFromArgs.summary,
            description: choreFromArgs.description,
            dueDate: choreFromArgs.dueDate,
            version: choreVersion,
          });

          wasUpdateSuccess = true;

          const choreInstance = getValuesFromInstance<Chores>(choreFromDb);

          updatedChore = {
            id: choreInstance.id,
            summary: choreInstance.summary,
            description: choreInstance.description,
            dueDate: choreInstance.dueDate,
            version: choreInstance.version,
          };
        }
      } else {
        // @TODO better logging
        console.error(
          `There is no Account associated with accountId:${accountId}.`
        );
      }
    } else {
      // @TODO better logging
      console.error(
        'Mutation does not have an accountId in associated session.'
      );
    }
  } catch (error) {
    // @TODO better logging
    console.error(error);
  }

  return {
    doesChoreExist,
    hasAccountSession,
    wasUpdateSuccess,
    updatedChore,
  };
};
