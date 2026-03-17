import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import prettier from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'

export default [
  js.configs.recommended,

  ...tseslint.configs.recommended,

  ...vue.configs['flat/recommended'],

  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser
      }
    }
  },

  {
    rules: {
      // JS
      'no-console': 'warn',
      'no-var': 'error',
      'no-multiple-empty-lines': ['warn', { max: 1 }],
      'no-unexpected-multiline': 'error',
      'no-debugger': 'warn',
      semi: ['error', 'never'],
      quotes: ['error', 'single'],

      // TS
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'off',

      // Vue
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-vars': 'warn',
      'vue/html-self-closing': 'off'
    }
  },
  prettier
]
