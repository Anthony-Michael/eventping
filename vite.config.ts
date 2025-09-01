/**
 * Purpose: Vite configuration for React app with strict env handling.
 * Inputs: process.env with PUBLIC_ prefixed variables
 * Outputs: dev server and build configuration
 * Assumptions: Node 20+, ESM, React 18+
 * Side effects: none
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  envPrefix: 'PUBLIC_',
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    sourcemap: true,
    target: 'es2022',
  },
});
