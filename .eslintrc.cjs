module.exports = {
  extends: ["@it-incubator/eslint-config", "plugin:storybook/recommended"],
  plugins: ["myPlugin"],
  rules: {
    "no-console": ["warn", {
      allow: ["warn", "error"]
    }],
    "myPlugin/no-wrong-redux-import": "error"
  },
  overrides: [{
    "files": ["**/*.stories.tsx"],
    "rules": {
      "react-hooks/rules-of-hooks": "off",
      'no-console': 'off'
    }
  }]
};