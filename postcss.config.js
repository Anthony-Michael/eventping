/**
 * Purpose: PostCSS config for Tailwind and Autoprefixer.
 * Inputs: CSS files processed by Vite
 * Outputs: compiled CSS with Tailwind utilities
 * Assumptions: Vite handles CSS pipeline
 * Side effects: none
 */

export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
