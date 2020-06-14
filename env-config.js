// environment variables
require('dotenv').config();

const fromProcessEnv = name => {
  return process.env[name];
};

const clientEnvironment = {
  APP_TITLE: fromProcessEnv('APP_TITLE'),
  LOCALSTORAGE_KEY: fromProcessEnv('LOCALSTORAGE_KEY'),
  RECAPTCHA_V3_SITE: fromProcessEnv('RECAPTCHA_V3_SITE'),
  RECAPTCHA_V2_SITE: fromProcessEnv('RECAPTCHA_V2_SITE'),
};

const serverSecrets = {
  GQL_TEST: fromProcessEnv('GQL_TEST'),
  RECAPTCHA_V3_SECRET: fromProcessEnv('RECAPTCHA_V3_SECRET'),
  RECAPTCHA_V2_SECRET: fromProcessEnv('RECAPTCHA_V2_SECRET'),
  SENDGRID_APIKEY: fromProcessEnv('SENDGRID_APIKEY'),
};

const serverEnvironment = Object.assign({}, clientEnvironment, serverSecrets);

module.exports = {
  serverEnvironment,
  serverSecrets,
  clientEnvironment,
};
