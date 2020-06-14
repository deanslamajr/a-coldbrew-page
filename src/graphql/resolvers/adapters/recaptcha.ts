import getConfig from 'next/config';
import axios from 'axios';
import qs from 'query-string';

import { RECAPTCHA_THRESHOLD } from '../../../helpers/constants';

const {
  serverRuntimeConfig: { RECAPTCHA_V3_SECRET },
} = getConfig();

const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';

export const verifyRecaptchaV3 = async ({
  token,
  expectedAction,
}: {
  token: string;
  expectedAction: string;
}): Promise<boolean> => {
  const verifyPayload = {
    response: token,
    secret: RECAPTCHA_V3_SECRET,
  };
  const {
    data: recaptchaVerifyResponse = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      challenge_ts: '',
      hostname: '',
      success: false,
      action: '',
      score: 0,
    },
  } = await axios.post(verifyUrl, qs.stringify(verifyPayload));

  if (
    !recaptchaVerifyResponse.success ||
    recaptchaVerifyResponse.action !== expectedAction ||
    recaptchaVerifyResponse.score < RECAPTCHA_THRESHOLD
  ) {
    return false;
  }
  return true;
};
