const path = require('path');

// https://stackoverflow.com/questions/10776600/testing-for-equality-of-regular-expressions
function regexEqual(x, y) {
  return (
    x instanceof RegExp &&
    y instanceof RegExp &&
    x.source === y.source &&
    x.global === y.global &&
    x.ignoreCase === y.ignoreCase &&
    x.multiline === y.multiline
  );
}

module.exports = {
  stories: ['../stories/**/*.stories.@(ts|tsx|js|jsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async config => {
    // this allows absolute paths in imports!
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve(__dirname, '../src'),
    ];

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // example loading a mock package
      'next/config': path.join(__dirname, './mocks/next-config.js'),
    };

    const babelWebpackRules = config.module.rules.find(rule =>
      regexEqual(/\.js$/, rule.test)
    );
    config.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      use: [babelWebpackRules.use[0], { loader: 'graphql-let/loader' }],
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
};
