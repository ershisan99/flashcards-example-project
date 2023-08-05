module.exports = {
  extends: ['@it-incubator/eslint-config', 'plugin:storybook/recommended'],
  plugins:['myPlugin'],
  rules: {
    'no-console': ['warn', {
      allow: ['warn', 'error']
    }],
    "myPlugin/no-wrong-redux-import": "error"
  }
};