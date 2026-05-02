import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import globals from 'globals'

export default tseslint.config(
  {
    ignores: ['**/build/**', '**/coverage/**', '**/bin/**', '**/dist/**', '**/node_modules/**']
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2021
      }
    },
    rules: {
      'semi': ['error', 'never'],            // without ;
      'quotes': ['error', 'single'],         // single quotes
      'indent': ['error', 2],                // 2 spaces
      'comma-dangle': ['error', 'never'],    // no trailing comma
      'object-curly-spacing': ['error', 'always'],

      // Reglas de TypeScript para swpm
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  }
)