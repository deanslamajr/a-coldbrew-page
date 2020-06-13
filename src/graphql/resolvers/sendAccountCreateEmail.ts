import { MutationResolvers } from '../types/sendAccountCreateEmail.graphqls';

export const resolver: MutationResolvers['sendAccountCreateEmail'] = async (
  _parent,
  args,
  _context,
  _info
) => {
  const { input } = args;
  return {
    recaptchaPassed: true,
  };
};
