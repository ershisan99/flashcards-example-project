module.exports = {
  extends: ['@it-incubator/eslint-config', 'plugin:storybook/recommended'],
  rules: {
    'no-console': ['warn', {
      allow: ['warn', 'error']
    }]
  }
};