module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: ['prettier'],
  ignorePatterns: ['public/**/*.*'],
  // add your custom rules here
  rules: {
    'prettier/prettier': 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-unused-vars': 'off',
    'prefer-const': 'off',
    'prefer-rest-params': 'off',
    semicolon: 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/custom-event-name-casing': 'off',
    'vue/valid-v-slot': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/multi-word-component-names': 'off', // Nuxt compatible
    'vue/require-valid-default-prop': 'off', // Nuxt compatible
    'vue/require-default-prop': 'off', // Nuxt compatible
    'vue/valid-attribute-name': 'off',
    'vue/valid-model-definition': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/ban-types': [
      'off',
      {
        types: {
          '{}': false,
        },
        extendDefaults: true,
      },
    ],
  },

  parserOptions: {
    parser: '@typescript-eslint/parser',
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
  ignorePatterns: ['node_modules/*', 'src/stories/*', 'public/*', 'dist/*'],
}
