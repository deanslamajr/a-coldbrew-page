import bcrypt from 'bcrypt';

import { MutationResolvers } from '../types/loginAccount.graphqls';

import { Accounts } from './services/db';
import { getValuesFromInstance } from './services/db/utils';

export const resolver: NonNullable<MutationResolvers['loginAccount']> = async (
  _parent,
  args,
  _context,
  _info
) => {
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
    }
  }

  return {
    wasLoginSuccess,
  };
};
