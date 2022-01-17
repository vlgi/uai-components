/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "airbnb-base",
  ],
  plugins: ["svelte3", "@typescript-eslint"],
  overrides: [
    {
      files: ["*.svelte"],
      processor: "svelte3/svelte3",
      rules: {
        "import/first": "off",
        "import/no-duplicates": "off",
        "import/no-mutable-exports": "off",
        "import/no-unresolved": "off",
      },
    },
    {
      files: ["*.ts", "*.svelte"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
      },
      rules: {
        "comma-dangle": "off",
        "comma-spacing": "off",
        "brace-style": "off",
        "no-extra-semi": "off",
        "require-await": "off",
        "object-curly-spacing": "off",
        "@typescript-eslint/comma-dangle": ["error", "always-multiline"],
        "@typescript-eslint/comma-spacing": ["error", { before: false, after: true }],
        "@typescript-eslint/brace-style": ["error", "1tbs"],
        "@typescript-eslint/no-extra-semi": ["error"],
        "@typescript-eslint/require-await": ["error"],
        "@typescript-eslint/object-curly-spacing": ["error", "always"],
        "@typescript-eslint/type-annotation-spacing": [
          "error",
          { before: false, after: true },
        ],
      },
    },
    {
      files: ["*.svelte"],
      rules: {
        "no-multiple-empty-lines": "off",
      },
    },
  ],
  settings: {
    "svelte3/typescript": () => require("typescript"),
    "svelte3/ignore-styles": ({ lang }) => {
      if (lang === "css" || lang === undefined || lang === null) {
        return false;
      }
      return true;
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2019,
    extraFileExtensions: [".svelte", ".cjs"],
  },
  rules: {
    indent: ["error", 2],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "linebreak-style": ["error", "unix"],
    "no-param-reassign": ["error", { props: false }],
    "no-unused-vars": ["error", { args: "after-used", argsIgnorePattern: "^_" }],
    "import/prefer-default-export": ["off"],
    "comma-dangle": ["error", "always-multiline"],
    "comma-spacing": ["error", { before: false, after: true }],
    "brace-style": ["error", "1tbs"],
    "no-extra-semi": ["error"],
    "require-await": ["error"],
    "require-yield": ["error"],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "import/extensions": "off",
    "no-plusplus": "off",
    "import/no-extraneous-dependencies": "off",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
  },
};
