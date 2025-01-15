module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2022: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  ignorePatterns: ["**/vendor/*.js"],
  rules: {
    "object-shorthand": "off",
    "no-void": "off",
    "no-return-assign": "off"
  }
}
