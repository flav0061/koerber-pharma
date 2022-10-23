/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-strongly-recommended',
    '@vue/eslint-config-typescript'
  ],
  ignorePatterns: [
    'node_modules',
  ],
  rules: {
    'vue/no-arrow-functions-in-watch': 'error', // To make this available
    'vue/no-async-in-computed-properties': 'error', // computed properties should always be synchronous
    'vue/no-child-content': 'error', // if dom element has v-html or v-text nothing inside will be rendered
    'vue/no-computed-properties-in-data': 'error', // computed property cannot be accessed in data because is before initialization

    // Code Style: Readability
    'vue/prop-name-casing': 'error',
    'vue/no-multi-spaces': 'error',
    'vue/no-spaces-around-equal-signs-in-attribute': 'error',
    'vue/mustache-interpolation-spacing': 'error',
    'vue/multiline-html-element-content-newline': 'error',
    'vue/max-attributes-per-line': 'error',
    'vue/html-self-closing': 'error',
    'vue/html-indent': 'error',
    'vue/html-end-tags': 'error',
    'vue/html-closing-bracket-spacing': 'error',
    'vue/html-closing-bracket-newline': 'error',
  },
  overrides: [
    {
      files: [
        'cypress/e2e/**.{cy,spec}.{js,ts,jsx,tsx}'
      ],
      'extends': [
        'plugin:cypress/recommended'
      ]
    }
  ],
  parserOptions: {
    "parser": "@typescript-eslint/parser"
  }
}
