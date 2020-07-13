import { MutationResolvers } from '../types/sendAccountCreateEmail.graphqls';
import { RECAPTCHA_ACTION_CREATE_ACCOUNT } from '../../../helpers/constants';
import { verifyRecaptchaV3, verifyRecaptchaV2 } from '../services/recaptcha';
import { sendAccountCreateEmail } from '../services/sendgrid';
import { Accounts, NewAccountTokens } from '../services/db';

export const resolver: NonNullable<MutationResolvers['sendAccountCreateEmail']> = async (
  _parent,
  args,
  _context,
  _info
) => {
  const { input } = args;

  let recaptchaPassed = false;
  let emailSendSuccess = false;

  // Verify Recaptcha
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
      recaptchaPassed,
      emailSendSuccess,
    };
  }

  // verify that the given email doesn't already exist in Accounts table
  const account = await Accounts.findOne({ where: { email: input.email } });
  if (account) {
    return {
      recaptchaPassed,
      emailSendSuccess,
    };
  }

  const token = await NewAccountTokens.create({ email: input.email });

  // Send Email
  emailSendSuccess = await sendAccountCreateEmail({
    toEmail: input.email,
    token: token.get('code'),
  });

  return {
    recaptchaPassed,
    emailSendSuccess,
  };
};
