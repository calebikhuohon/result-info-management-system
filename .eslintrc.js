module.exports = {
  env: {
    'es6': true,
    'node': true,
    'mocha': true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaFeatures: true,
    sourceType: 'module',
  },
  rules: {
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'no-case-declarations': 'off',
    'eqeqeq': 'warn',
    'quote-props': ['warn', 'consistent-as-needed'],
    'no-console': 0,
    'keyword-spacing': ['error']
  },
};
