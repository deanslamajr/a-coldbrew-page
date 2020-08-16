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
  let chores: Chore[] | null = null;
  let hasAccountSession = false;

  const accountId = context.session.getAccountId();

  if (accountId) {
    const activeAccountAndIncompleteChores = await Accounts.findOne({
      where: {
        id: accountId,
        isActive: true,
      },
      include: [
        {
          model: Chores,
          as: 'chores',
          required: false,
          where: {
            completedAt: {
              [Op.is]: null,
            },
            isActive: true,
          },
        },
      ],
    });

    if (activeAccountAndIncompleteChores) {
      hasAccountSession = true;

      const activeAccountAndIncompleteChoresInstance = getValuesFromInstance(
        activeAccountAndIncompleteChores
      );

      if (Array.isArray(activeAccountAndIncompleteChoresInstance.chores)) {
        chores = transformResponse(
          activeAccountAndIncompleteChoresInstance.chores
        );
      }
    }
  }

  return {
    chores,
    hasAccountSession,
  };
};
