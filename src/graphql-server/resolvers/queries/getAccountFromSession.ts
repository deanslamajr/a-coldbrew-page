import { QueryResolvers } from '../../types/queries/getAccountFromSession.graphqls';

import { ContextInterface } from '../../context';
import { Accounts } from '../services/db';
import { getValuesFromInstance } from '../services/db/utils';

export const resolver: NonNullable<QueryResolvers<
  ContextInterface
>['getAccountFromSession']> = async (_parent, _args, context, _info) => {
  let email = null;
  const accountId = context.session.getAccountId();

  if (accountId) {
    const account = await Accounts.findOne({ where: { id: accountId } });
    if (account) {
      const accountValues = getValuesFromInstance(account);
      email = accountValues.email;
    }
  }

  return {
    email,
  };
};
