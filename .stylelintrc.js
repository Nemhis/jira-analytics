module.exports = {
  processors: ['stylelint-processor-html'],
  extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss'],
  ignoreFiles: ['src/styles/normalize.scss'],
  rules: {
    'no-empty-source': null,
    'selector-class-pattern': null,
    'no-descending-specificity': null,
  },
};
