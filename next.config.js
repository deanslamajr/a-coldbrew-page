/* eslint-disable @typescript-eslint/no-var-requires */
const { clientEnvironment, serverEnvironment } = require('./env-config');

module.exports = {
  webpack(config, options) {
    config.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      use: [options.defaultLoaders.babel, { loader: 'graphql-let/loader' }],
    });

    config.module.rules.push({
      test: /\.graphqls$/,
      exclude: /node_modules/,
      use: [
        { loader: 'graphql-tag/loader' },
        { loader: 'graphql-let/schema/loader' },
      ],
    });

    return config;
  },
  // Will only be available on the server side
  serverRuntimeConfig: serverEnvironment,
  // Will be available on both server and client
  publicRuntimeConfig: clientEnvironment,
};
