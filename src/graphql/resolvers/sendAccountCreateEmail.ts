import { MutationResolvers } from '../types/sendAccountCreateEmail.graphqls';
import { RECAPTCHA_ACTION_CREATE_ACCOUNT } from '../../helpers/constants';
import { verifyRecaptchaV3 } from './adapters/recaptcha';
import { sendAccountCreateEmail } from './adapters/sendgrid';

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
      emailSendSuccess: false,
    };
  }

  // Generate and Persist Single Use Token
  // @TODO actually implement this
  const token = 'taco17';

  // Send Email
  const emailSendSuccess = await sendAccountCreateEmail({
    toEmail: input.email,
    token,
  });

  return {
    recaptchaPassed: true,
    emailSendSuccess,
  };
};
