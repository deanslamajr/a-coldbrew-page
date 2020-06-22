import { MutationResolvers } from '../types/redeemAccountCreateToken.graphqls';

export const resolver: NonNullable<MutationResolvers['redeemAccountCreateToken']> = async (
  _parent,
  args,
  _context,
  _info
) => {
  const { input } = args;
  let wasTokenValid = false;

  console.log('inside resolver, input:', input);

  await new Promise(resolve => setTimeout(resolve, 10000));

  console.log('after timeout');

  return {
    wasTokenValid,
  };
};
