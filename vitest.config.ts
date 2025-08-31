/**
 * Purpose: Vitest configuration for unit tests with coverage.
 * Inputs: none
 * Outputs: exported config used by Vitest CLI
 * Assumptions: ESM project, Node test environment
 * Side effects: none
 */

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
    },
  },
});
