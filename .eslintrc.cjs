module.exports = {
  root: true,
  env: {
    es2022: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"],
    tsconfigRootDir: __dirname,
    sourceType: "module",
    ecmaVersion: "latest",
  },
  plugins: ["@typescript-eslint", "react", "security"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:security/recommended",
    "prettier",
  ],
  settings: {
    react: { version: "detect" },
  },
  rules: {
    // Clarity over cleverness: prefer small, cohesive functions
    "max-lines-per-function": ["warn", { max: 80, skipComments: true, skipBlankLines: true }],
    "complexity": ["warn", { max: 8 }],

    // TypeScript strictness and safety
    "@typescript-eslint/explicit-function-return-type": ["warn", { allowExpressions: true }],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/consistent-type-imports": ["warn", { prefer: "type-imports" }],

    // Security tightening examples (tune as needed per project)
    "security/detect-object-injection": "off", // noisy; revisit when code exists
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      rules: {
        // Ensure each file starts with a brief header docstring (enforced via review; lint hint)
        "header/header": "off",
      },
    },
    {
      files: ["**/*.tsx"],
      extends: ["plugin:react/recommended"],
    },
    {
      files: ["tests/**/*.{ts,tsx}", "**/*.test.{ts,tsx}"],
      env: { node: true },
      globals: { describe: "readonly", it: "readonly", test: "readonly", expect: "readonly" },
      rules: {
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
      },
    },
    {
      files: ["*.js", "*.cjs", "*.mjs"],
      parser: null,
    },
  ],
};


