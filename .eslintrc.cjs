/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    '@vunbo',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:vue/vue3-recommended',
    './.eslintrc-auto-import.json',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    "vue/max-attributes-per-line": ["error", {
      "singleline": {
        "max": 2
      },
      "multiline": {
        "max": 1
      }
    }]
  }
}
