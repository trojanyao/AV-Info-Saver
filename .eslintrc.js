/* eslint-disable */

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended'],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  globals: {
    require: 'readonly',
    module: 'readonly',
    __dirname: 'readonly',
  },
  rules: {
    'no-empty': 'off',
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'no-debugger': 'warn',
  },
}
