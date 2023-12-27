module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 1,
    'vue/no-parsing-error': [2, { "x-invalid-end-tag": false }],
    'no-empty': 1,
    'vue/no-mutating-props': 0,
    'vue/multi-word-component-names': 1,
  }
}
