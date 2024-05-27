// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
// const globals = require("globals");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: process.cwd()
      }
    }
  },
  // @ts-expect-error Some types mismatch
  eslintPluginPrettierRecommended
);
