module.exports = {
  extends: ['airbnb', 'eslint:recommended', 'plugin:react/recommended'],
  /*"plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],*/
  rules: {
    'react/jsx-filename-extension': 0,
    'react/prop-types': 0,
  },
  globals: {
    document: 1,
  },
  parser: 'babel-eslint',
  env: {
    browser: 1,
  },
};
