module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 'off',
    'camelcase': 'off',
    'comma-dangle': 'off',
    'no-trailing-spaces': 'off',
    'eol-last': 'off',
    'no-callback-literal': 'off',
    'vue/no-parsing-error': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
