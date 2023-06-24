module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue',
  ],
  ignoreFiles: ['static/**/*.css', 'assets/**/*.*'],
  defaultSeverity: 'warning',
  ignoreDisables: true,
  rules: {
    'selector-pseudo-element-no-unknown': null, // ::v-deep
    'at-rule-no-unknown': null,
    'at-rule-empty-line-before': null,
    'no-descending-specificity': null,
    'no-empty-source': null,
    'value-keyword-case': ['lower', { ignoreProperties: ['/^\\$/'] }], // https://github.com/stylelint/stylelint/issues/4622
    'selector-class-pattern': null, // Allow BEM pattern
    'scss/dollar-variable-pattern': null, // Align with Design system naming
    'value-no-vendor-prefix': null, // Allow -webkit-box for multiline clamps
    'property-no-vendor-prefix': null, // Allow -webkit-appearance for range styling
    'color-function-notation': null, // Allow SCSS short color methods
    'function-no-unknown': [true, { ignoreFunctions: ['px2rem'] }],
    'declaration-property-value-no-unknown': null,
    'custom-property-pattern': null,
    'custom-property-empty-line-before': null, // Allow usage in template
  },
}
