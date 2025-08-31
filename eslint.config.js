/**
 * Purpose: ESLint flat config (v9+) with TypeScript, React, Security, and Prettier integration.
 * Inputs: source files; TS project at tsconfig.json
 * Outputs: lint diagnostics; zero warnings in CI
 * Assumptions: Node 20+; strict TypeScript
 * Side effects: none
 */

import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import securityPlugin from 'eslint-plugin-security';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  { ignores: ['dist', 'node_modules', 'coverage', '.husky'] },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: process.cwd(),
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      security: securityPlugin,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      'max-lines-per-function': ['warn', { max: 80, skipComments: true, skipBlankLines: true }],
      complexity: ['warn', { max: 8 }],

      '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],

      'security/detect-object-injection': 'off',
    },
  },
  {
    files: ['tests/**/*.{ts,tsx}', '**/*.test.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  },
  // Disable stylistic rules in favor of Prettier
  eslintConfigPrettier,
];
