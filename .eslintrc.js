module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
      'plugin:@typescript-eslint/recommended',
      'prettier/@typescript-eslint',
      'react-app',
      'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/explicit-function-return-type": "off"
  },
};