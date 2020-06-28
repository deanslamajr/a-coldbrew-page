import bcrypt from 'bcrypt';

import { MutationResolvers } from '../types/loginAccount.graphqls';

import { ContextInterface } from '../context';

import { Accounts } from './services/db';
import { getValuesFromInstance } from './services/db/utils';

export const resolver: NonNullable<MutationResolvers<
  ContextInterface
>['loginAccount']> = async (_parent, args, context, _info) => {
  const { input } = args;
  let wasLoginSuccess = false;

  const account = await Accounts.findOne({
    where: { email: input.email },
  });

  if (account) {
    const accountValues = getValuesFromInstance(account);

    const isCorrectPassword = await bcrypt.compare(
      input.password,
      accountValues.password
    );

    const isUserActive = accountValues.is_active;

    if (isCorrectPassword && isUserActive) {
      wasLoginSuccess = true;
      context.session.setAccountId(accountValues.id);
    }
  }

  return {
    wasLoginSuccess,
  };
};
