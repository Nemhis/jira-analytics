module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  // parser: '@typescript-eslint/parser',
  // plugins: ['@typescript-eslint'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    quotes: ['error', 'single'],
    'prettier/prettier': [
      'error',
      {
        plugins: ['@trivago/prettier-plugin-sort-imports'],
        singleQuote: true,
        printWidth: 120,
        endOfLine: 'auto',
        importOrder: [
          '^@/utils/(.*)$',
          '^@/@types/(.*)$',
          '^@/adapters/(.*)$',
          '^@/enums/(.*)$',
          '^@/config',
          '^@/const',
          '^@/store/(.*)$',
          '^@/router/(.*)$',
          '^@/assets/(.*)$',
          '^@/composables/(.*)$',
          '^@/components/(.*)$',
          '^[./]',
        ],
      },
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'any',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/valid-v-slot': [
      'error',
      {
        allowModifiers: true,
      },
    ],
    'vue/multi-word-component-names': 'off',
    'vue/attributes-order': [
      'error',
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          ['UNIQUE', 'SLOT'],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'ATTR_DYNAMIC',
          'EVENTS',
          'ATTR_STATIC',
          'ATTR_SHORTHAND_BOOL',
          'CONTENT',
        ],
        alphabetical: false,
      },
    ],
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};
