module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "prettier"],
  overrides: [
    {
      files: ["*.ts", "*.svelte"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "prettier",
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: ["./tsconfig.json", "./tsconfig.node.json"],
        tsconfigRootDir: __dirname,
      },
      rules: {
        "@typescript-eslint/require-await": ["error"],
        "@typescript-eslint/await-thenable": "off",
      },
    },
    {
      files: ["*.svelte"],
      extends: ["plugin:svelte/recommended", "prettier"],
      parser: "svelte-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    extraFileExtensions: [".svelte"],
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "no-param-reassign": ["error", { props: false }],
    "no-unused-vars": ["error", { args: "after-used", argsIgnorePattern: "^_" }],
    "require-await": ["error"],
    "require-yield": ["error"],
  },
  root: true,
};
