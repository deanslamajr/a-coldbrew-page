import { MutationResolvers } from '../types/sendAccountCreateEmail.graphqls';
import { verifyRecaptchaV3 } from './adapters/recaptcha';
import { RECAPTCHA_ACTION_CREATE_ACCOUNT } from '../../helpers/constants';

export const resolver: MutationResolvers['sendAccountCreateEmail'] = async (
  _parent,
  args,
  _context,
  _info
) => {
  const { input } = args;

  // Verify Recaptcha
  const isRecaptchaV3TokenValid = await verifyRecaptchaV3({
    token: input.recaptchaV3Response,
    expectedAction: RECAPTCHA_ACTION_CREATE_ACCOUNT,
  });

  if (!isRecaptchaV3TokenValid) {
    return {
      recaptchaPassed: false,
    };
  }

  // Generate and Persist Single Use Code

  // Send Email

  return {
    recaptchaPassed: true,
  };
};
