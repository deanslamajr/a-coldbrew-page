import { Op } from 'sequelize';

import { Chore, QueryResolvers } from '../../types/queries/getChores.graphqls';

import { ContextInterface } from '../../context';

import { Accounts, Chores } from '../services/db';
import { getValuesFromInstance } from '../services/db/utils';

const transformResponse = (choresResponse: Chores[]): Chore[] => {
  return choresResponse.map(chore => {
    const choreInstance = getValuesFromInstance(chore);

    return {
      id: choreInstance.id,
      summary: choreInstance.summary,
      description: choreInstance.description,
      dueDate: choreInstance.dueDate,
      version: choreInstance.version,
    };
  });
};

export const resolver: NonNullable<QueryResolvers<
  ContextInterface
>['getChores']> = async (_parent, _args, context, _info) => {
  let chores = [] as Chore[];
  let hasAccountSession = false;

  const accountId = context.session.getAccountId();

  if (accountId) {
    hasAccountSession = true;
    const choresResponse = await Chores.findAll({
      where: {
        completedAt: {
          [Op.is]: null,
        },
      },
      include: [
        {
          model: Accounts,
          as: 'ownedByAccounts',
          through: {
            where: {
              accountId,
            },
          },
        },
      ],
    });

    chores = transformResponse(choresResponse);
  }

  return {
    chores,
    hasAccountSession,
  };
};
