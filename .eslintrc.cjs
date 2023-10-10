module.exports = {
  extends: ['@it-incubator/eslint-config', 'plugin:storybook/recommended'],
  plugins: ['myPlugin'],
  rules: {
    'myPlugin/no-wrong-redux-import': 'error',
  },
  overrides: [
    {
      files: ['**/*.stories.tsx'],
      rules: {
        'react-hooks/rules-of-hooks': 'off',
        'no-console': 'off',
      },
    },
  ],
}
