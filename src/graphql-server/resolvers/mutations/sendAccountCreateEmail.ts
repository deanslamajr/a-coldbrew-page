import { MutationResolvers } from '../types/sendAccountCreateEmail.graphqls';
import { RECAPTCHA_ACTION_CREATE_ACCOUNT } from '../../../helpers/constants';
import { verifyRecaptchaV3, verifyRecaptchaV2 } from '../services/recaptcha';
import { sendAccountCreateEmail } from '../services/sendgrid';
import { NewAccountTokens } from '../services/db';

export const resolver: NonNullable<MutationResolvers['sendAccountCreateEmail']> = async (
  _parent,
  args,
  _context,
  _info
) => {
  const { input } = args;

  // Verify Recaptcha
  let recaptchaPassed = false;
  if (input.recaptchaV3Token) {
    recaptchaPassed = await verifyRecaptchaV3({
      token: input.recaptchaV3Token,
      expectedAction: RECAPTCHA_ACTION_CREATE_ACCOUNT,
    });
  } else if (input.recaptchaV2Token) {
    recaptchaPassed = await verifyRecaptchaV2(input.recaptchaV2Token);
  }

  if (!recaptchaPassed) {
    return {
      recaptchaPassed: false,
      emailSendSuccess: false,
    };
  }

  // @TODO verify that the given email doesn't already exist in Accounts table

  const token = await NewAccountTokens.create({ email: input.email });

  // Send Email
  const emailSendSuccess = await sendAccountCreateEmail({
    toEmail: input.email,
    token: token.get('code'),
  });

  return {
    recaptchaPassed: true,
    emailSendSuccess,
  };
};
