/**
 * Purpose: Tailwind CSS configuration for Vite + React app.
 * Inputs: content paths scan JSX/TSX files
 * Outputs: generated utility classes
 * Assumptions: Tailwind v3+
 * Side effects: none
 */

import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
