import { Transaction } from 'sequelize';

import { MutationResolvers } from '../types/createChore.graphqls';

import { ContextInterface } from '../../context';

import { Accounts, sequelize } from '../services/db';
import { getValuesFromInstance } from '../services/db/utils';

export const resolver: NonNullable<MutationResolvers<
  ContextInterface
>['createChore']> = async (_parent, args, context, _info) => {
  let wasCreateSuccess = false;
  let hasAccountSession = false;
  let transaction: Transaction | null = null;
  try {
    const accountId = context.session.getAccountId();

    if (accountId) {
      const accountThatInvokedMutations = await Accounts.findOne({
        where: { id: accountId },
      });
      if (accountThatInvokedMutations) {
        hasAccountSession = true;
        // const accountThatInvokedMutationsValues = getValuesFromInstance(
        //   accountThatInvokedMutations
        // );

        transaction = await sequelize.transaction();

        const chore = await accountThatInvokedMutations.$create(
          'choresCreated',
          {
            summary: args.input.chore.summary,
            description: args.input.chore.description,
            dueDate: args.input.chore.dueDate,
          },
          { transaction }
        );
        // @see https://sequelize.org/master/manual/advanced-many-to-many.html
        await chore.$add('ownedByAccounts', [accountThatInvokedMutations], {
          transaction,
        });

        transaction.commit();

        wasCreateSuccess = true;
        // if we reach the catch after the last action of the commit right above here
        // we probably don't want to rollback bc the db part of this resolver finished correctly
        transaction = null;
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

    if (transaction) {
      transaction.rollback();
    }
  }

  return {
    hasAccountSession,
    wasCreateSuccess,
  };
};
