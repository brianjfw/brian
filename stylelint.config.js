module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier'
  ],
  plugins: [
    'stylelint-scss'
  ],
  ignoreFiles: ["./assets/scss/reset/**/*"],
  rules: {
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": [true, {
      "ignoreAtRules": [
        "include",
        "use",
        "function",
        "return",
        "mixin",
        "each",
        "for",
        "if",
        "else",
        "forward",
        "extend"
      ]
    }],
    "no-descending-specificity": null,
    "selector-pseudo-class-no-unknown": [true, {
      "ignorePseudoClasses": ["global"]
    }],
    "property-no-unknown": [true, {
      "ignoreProperties": ["composes"]
    }],
    "declaration-colon-newline-after": null,
    "value-keyword-case": null,
    "scss/dollar-variable-pattern": "^[a-zA-Z][a-zA-Z0-9]*(-[a-zA-Z0-9]+)*$",
    "scss/selector-no-redundant-nesting-selector": true
  }
}
