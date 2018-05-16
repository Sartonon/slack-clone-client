module.exports = {
  extends: ['airbnb'],
  rules: {
    'react/jsx-filename-extension': 0,
    'react/prop-types': 0,
    'object-curly-newline': 0,
    'no-use-before-define': 0,
    'no-confusing-arrow': 0,
    'arrow-parens': 0,
    'jsx-a11y/anchor-is-valid': 0,
  },
  globals: {
    document: 1,
  },
  parser: 'babel-eslint',
  env: {
    browser: 1,
  },
};
