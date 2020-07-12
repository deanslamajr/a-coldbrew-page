import moment from 'moment';
import bcrypt from 'bcryptjs';

import { MutationResolvers } from '../types/finishAccountCreate.graphqls';

import { ContextInterface } from '../../context';

import { Accounts, NewAccountTokens } from '../services/db';
import { getValuesFromInstance } from '../services/db/utils';
import {
  SendEmailResponse,
  sendAccountCreatedSuccessEmail,
} from '../services/sendgrid';

const isLessThanAnHourOld = (date: Date): boolean => {
  const hoursAgo = Math.abs(moment(date).diff(Date.now(), 'hours'));
  return hoursAgo < 1;
};

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export const resolver: NonNullable<MutationResolvers<
  ContextInterface
>['finishAccountCreate']> = async (_parent, args, context, _info) => {
  const { input } = args;
  let wasTokenValid = false;
  let accountCreateSuccess = false;

  // @TODO ACQUIRE A LOCK SO THAT QUERY AND MUTATION ARE ATOMIC
  const newAccountToken = await NewAccountTokens.findOne({
    where: { code: input.token },
  });

  if (newAccountToken) {
    const tokenValues = getValuesFromInstance(newAccountToken);

    wasTokenValid =
      isLessThanAnHourOld(tokenValues.created_at) && !tokenValues.has_been_used;

    if (wasTokenValid) {
      const hashedPassword = await hashPassword(input.password);

      const [newAccount] = await Promise.all<
        Accounts,
        NewAccountTokens,
        SendEmailResponse
      >([
        Accounts.create({
          email: tokenValues.email,
          password: hashedPassword,
          lastLoginAt: new Date(),
        }),
        // eslint-disable-next-line @typescript-eslint/camelcase
        newAccountToken.update({ has_been_used: true }),
        sendAccountCreatedSuccessEmail({ toEmail: tokenValues.email }),
      ]);

      const newAccountValues = getValuesFromInstance(newAccount);
      context.session.setAccountId(newAccountValues.id);
      accountCreateSuccess = true;
    }
  }

  return {
    accountCreateSuccess,
    wasTokenValid,
  };
};
