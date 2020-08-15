import { MutationResolvers } from '../types/mutations/createChore.graphqls';

import { ContextInterface } from '../../context';

import { Accounts, Chores } from '../services/db';
import { getValuesFromInstance } from '../services/db/utils';

export const resolver: NonNullable<MutationResolvers<
  ContextInterface
>['completeChore']> = async (_parent, args, context, _info) => {
  let wasSuccess = false;
  let hasAccountSession = false;

  try {
    const accountId = context.session.getAccountId();

    if (accountId) {
      const accountThatInvokedMutations = await Accounts.findOne({
        where: {
          id: accountId,
          isActive: true,
        },
        include: [
          {
            model: Chores,
            as: 'chores',
            through: {
              where: {
                choreId: args.input.choreId,
              },
            },
          },
        ],
      });

      if (accountThatInvokedMutations) {
        hasAccountSession = true;

        const accountThatInvokedMutationsInstance = getValuesFromInstance(
          accountThatInvokedMutations
        );

        if (accountThatInvokedMutationsInstance.chores?.length) {
          const completedChore = accountThatInvokedMutationsInstance.chores[0];
          await completedChore.update({ completedAt: new Date() });
          wasSuccess = true;
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
    hasAccountSession,
    wasSuccess,
  };
};
