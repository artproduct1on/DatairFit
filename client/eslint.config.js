import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"

export default tseslint.config(
  { ignores: ["build", "dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true },],
      "react/prop-types": "off",
      "no-unused-vars": "off",
      "no-undef": "error",
      "semi": ["error", "always",],
      "indent": ["warn", 2, { "SwitchCase": 1 }],
      "no-var": "error",
      "quotes": ["warn", "double",],
      "eol-last": ["warn", "always",],
      "no-plusplus": "off",
      "comma-dangle": "off",
      "prefer-destructuring": "off",
      "no-param-reassign": "off",
      "max-len": ["warn", 150, { ignoreUrls: true, },],
      "object-curly-spacing": ["warn", "always",],
      "array-bracket-spacing": ["warn", "never",],
      "space-before-blocks": ["warn", "always",],
      "arrow-spacing": ["warn", { before: true, after: true, },],
      "keyword-spacing": ["warn", { before: true, after: true, },],
      "space-infix-ops": "warn",
      "spaced-comment": ["warn", "always"],
      "comma-spacing": ["warn", { "before": false, "after": true }],
      "func-call-spacing": ["warn", "never"],
      "no-multiple-empty-lines": ["warn", { "max": 1 }],
      "object-curly-newline": ["error", { ImportDeclaration: { multiline: true, consistent: true }, }],
      "react/react-in-jsx-scope": "off",
    },
  },
)
