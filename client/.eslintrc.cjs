/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    // '@vue/eslint-config-airbnb',
    '@vue/eslint-config-prettier',
    '@vue/eslint-config-typescript'
    // 'prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
