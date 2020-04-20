// environment variables
require('dotenv').config();

const fromProcessEnv = name => {
  return process.env[name];
};

const clientEnvironment = {
  APP_TITLE: fromProcessEnv('APP_TITLE'),
};

const serverSecrets = {
  GQL_TEST: fromProcessEnv('GQL_TEST'),
};

const serverEnvironment = Object.assign({}, clientEnvironment, serverSecrets);

module.exports = {
  serverEnvironment,
  serverSecrets,
  clientEnvironment,
};
