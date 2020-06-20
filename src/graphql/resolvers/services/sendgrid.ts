import sgMail from '@sendgrid/mail';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { APP_DOMAIN },
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
