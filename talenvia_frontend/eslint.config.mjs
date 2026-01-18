import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

/**
 * ESLint Flat Config for the Talenvia React frontend.
 * - Browser + CRA env globals (window/document/process + common Web APIs).
 * - eslint:recommended + react + react-hooks.
 * - Prettier integration.
 */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        window: "readonly",
        document: "readonly",
        process: "readonly",
        fetch: "readonly",
        Headers: "readonly",
        URL: "readonly",
        FileReader: "readonly",

        // Test globals (CRA/Jest)
        test: "readonly",
        expect: "readonly",
        jest: "readonly",
      },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      prettier: prettierPlugin,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      "no-unused-vars": ["error", { varsIgnorePattern: "React|App" }],

      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "error",

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      "prettier/prettier": "warn",
    },
  },
  js.configs.recommended,
  eslintConfigPrettier,
];
