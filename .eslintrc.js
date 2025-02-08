module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs/eslint-config',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'prettier'
  ],
  ignorePatterns: ["**/vendor/*.js"],
  // add your custom rules here
  rules: {
    "object-shorthand": "off",
    "no-void": "off",
    "no-return-assign" : "off",
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 120,
        tabWidth: 2
      }
    ],
    'vue/multi-word-component-names': 'off',
  }
}
