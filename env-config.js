// environment variables
require('dotenv').config();

const fromProcessEnv = name => {
  return process.env[name] || '';
};

const clientEnvironment = {
  APP_DOMAIN: fromProcessEnv('APP_DOMAIN'),
  APP_TITLE: fromProcessEnv('APP_TITLE'),
  LOCALSTORAGE_KEY: fromProcessEnv('LOCALSTORAGE_KEY'),
  RECAPTCHA_V3_SITE: fromProcessEnv('RECAPTCHA_V3_SITE'),
  RECAPTCHA_V2_SITE: fromProcessEnv('RECAPTCHA_V2_SITE'),
};

const serverSecrets = {
  DB_DBNAME: fromProcessEnv('DB_DBNAME'),
  DB_HOST: fromProcessEnv('DB_HOST'),
  DB_USERNAME: fromProcessEnv('DB_USERNAME'),
  DB_PASSWORD: fromProcessEnv('DB_PASSWORD'),
  RECAPTCHA_V3_SECRET: fromProcessEnv('RECAPTCHA_V3_SECRET'),
  RECAPTCHA_V2_SECRET: fromProcessEnv('RECAPTCHA_V2_SECRET'),
  SENDGRID_APIKEY: fromProcessEnv('SENDGRID_APIKEY'),
  SENDGRID_FROM_EMAIL: fromProcessEnv('SENDGRID_FROM_EMAIL'),
  SESSION_COOKIE_SECRET: fromProcessEnv('SESSION_COOKIE_SECRET'),
};

const serverEnvironment = Object.assign({}, clientEnvironment, serverSecrets);

module.exports = {
  serverEnvironment,
  serverSecrets,
  clientEnvironment,
};
