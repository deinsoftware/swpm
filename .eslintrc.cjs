module.exports = {
  plugins: ['@typescript-eslint'],
  extends: ['standard', 'eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  env: {
    es2021: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type']
  }

}
