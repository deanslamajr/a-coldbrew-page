import sgMail from '@sendgrid/mail';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { APP_DOMAIN, APP_TITLE },
  serverRuntimeConfig: { SENDGRID_APIKEY, SENDGRID_FROM_EMAIL },
} = getConfig();

const sendEmail = async (messageConfig: {
  to: string;
  subject: string;
  text: string;
  html: string;
}): Promise<boolean> => {
  try {
    const sendConfig = {
      ...messageConfig,
      from: SENDGRID_FROM_EMAIL,
    };
    sgMail.setApiKey(SENDGRID_APIKEY);
    await sgMail.send(sendConfig);
    return true;
  } catch (error) {
    // @TODO log error
    console.error('sendgrid error:', error);
    return false;
  }
};

export interface SendEmailResponse {
  emailWasSentSuccessfully: boolean;
}

export const sendAccountCreatedSuccessEmail = async ({
  toEmail,
}: {
  toEmail: string;
}): Promise<SendEmailResponse> => {
  const text = `Hi again! Your new "${APP_TITLE}" account has been created successfully. You will have been logged in automatically as part of the account create process but if you ever need to log back in, use this email address (${toEmail}) at ${APP_DOMAIN}/a/login`;
  const html = `Hi again!<br>Your new "${APP_TITLE}" account has been created successfully. You will have been logged in automatically as part of the account create process but if you ever need to log back in, use this email address (${toEmail}) at the <a href=${APP_DOMAIN}/a/login>login page</a>.`;

  const emailWasSentSuccessfully = await sendEmail({
    to: toEmail,
    subject: 'coldbrew.page account created!',
    text,
    html,
  });

  return { emailWasSentSuccessfully };
};

export const sendAccountCreateEmail = ({
  toEmail,
  token,
}: {
  toEmail: string;
  token: string;
}): Promise<boolean> => {
  const accountCreateLink = `${APP_DOMAIN}/a/create?t=${token}`;
  const text = `Welcome, friend! Please use the following link to finish creating your new account: ${accountCreateLink}`;
  const html = `Welcome, friend!<br>Please use <a href=${accountCreateLink}>this link</a> to finish creating your new account.`;
  return sendEmail({
    to: toEmail,
    subject: 'Welcome to coldbrew.page!',
    text,
    html,
  });
};
