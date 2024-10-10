module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest', // Allows the use of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  extends: ['plugin:@typescript-eslint/recommended'], // Uses the linting rules from @typescript-eslint/eslint-plugin
  env: {
    node: true, // Enable Node.js global variables
  },
  rules: {
    'no-console': 'off',
    'no-var': 'error',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': 'req|res|next|__' }],
    'semi': 'error',
    'semi-spacing': 'error',
    'eqeqeq': 'warn',
    'no-invalid-this': 'error',
    'no-return-assign': 'error',
    'no-unused-expressions': ['error', { 'allowTernary': true }],
    'no-useless-concat': 'error',
    'no-useless-return': 'error',
    'no-constant-condition': 'warn',
    'no-multi-spaces': 'error',
    'space-in-parens': 'error',
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'no-mixed-spaces-and-tabs': 'warn',
    'space-before-blocks': 'error',
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'quotes': ['error', 'single'],
    'keyword-spacing': 'error',
    'multiline-ternary': ['error', 'never'],
    'no-mixed-operators': 'error',
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 1 }],
    'no-whitespace-before-property': 'error',
    'nonblock-statement-body-position': 'error',
    'object-property-newline': [
      'error',
      { 'allowAllPropertiesOnSameLine': true }
    ],
    //* ES6
    'arrow-spacing': 'error',
    'no-confusing-arrow': 'error',
    'no-duplicate-imports': 'error',
    'object-shorthand': 'off',
    'prefer-const': 'error',
    'prefer-template': 'warn'
  },
};