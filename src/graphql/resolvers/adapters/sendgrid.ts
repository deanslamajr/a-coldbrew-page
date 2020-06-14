import sgMail from '@sendgrid/mail';
import getConfig from 'next/config';

const {
  serverRuntimeConfig: { SENDGRID_APIKEY },
} = getConfig();

export const sendEmail = async (messageConfig: {
  to: string;
  subject: string;
  text: string;
  html: string;
}): Promise<boolean> => {
  try {
    const sendConfig = {
      ...messageConfig,
      // @TODO move this to an env var
      from: 'noreply@coldbrew.page',
    };
    sgMail.setApiKey(SENDGRID_APIKEY);
    const [response] = await sgMail.send(sendConfig);
    console.log('sendgrid response:', response);
    return true;
  } catch (error) {
    console.log('sendgrid error:', error);
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
  // @TODO - replace the domain (and protocol) hardcoding with an env var e.g. APP_DOMAIN="https://a.coldbrew.page"
  const accountCreateLink = `https://a.coldbrew.page/a/create?c=${token}`;
  const copy =
    'Welcome, friend! Please use the following link to finish creating your new account at coldbrew.page';
  const text = `${copy} : ${accountCreateLink}`;
  const html = `<strong>${copy}.<br>${accountCreateLink}</strong>`;
  return sendEmail({
    to: toEmail,
    subject: 'Welcome to coldbrew.page!',
    text,
    html,
  });
};
