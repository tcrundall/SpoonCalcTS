// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  // {
  //   files: ["**/*.{js,jsx,ts,tsx}"],
  //   rules: {
  //     indent: ["error", 2], // change to 2 if you prefer
  //     "react/jsx-indent": ["error", 2],
  //     "react/jsx-indent-props": ["error", 2],
  //   },
  // },
]);
