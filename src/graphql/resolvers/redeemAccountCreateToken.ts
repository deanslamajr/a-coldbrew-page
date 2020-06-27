import moment from 'moment';

import { MutationResolvers } from '../types/redeemAccountCreateToken.graphqls';

import { NewAccountTokens } from './services/db';
import { getValuesFromInstance } from './services/db/utils';

const isLessThanAnHourOld = (date: Date): boolean => {
  const hoursAgo = Math.abs(moment(date).diff(Date.now(), 'hours'));
  return hoursAgo < 1;
};

export const resolver: NonNullable<MutationResolvers['redeemAccountCreateToken']> = async (
  _parent,
  args,
  _context,
  _info
) => {
  const { input } = args;
  let wasTokenValid = false;

  // @TODO ACQUIRE A LOCK SO THAT QUERY AND MUTATION ARE ATOMIC
  const newAccountToken = await NewAccountTokens.findOne({
    where: { code: input.token },
  });

  if (newAccountToken) {
    const tokenValues = getValuesFromInstance(newAccountToken);

    wasTokenValid =
      isLessThanAnHourOld(tokenValues.created_at) && !tokenValues.has_been_used;

    if (wasTokenValid) {
      // eslint-disable-next-line @typescript-eslint/camelcase
      await newAccountToken.update({ has_been_used: true });
    }
  }

  return {
    wasTokenValid,
  };
};
