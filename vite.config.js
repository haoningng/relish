import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import htmlEnvPlugin from 'vite-plugin-html-env';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),htmlEnvPlugin()],
  test: {
    globals: true,
    environment: 'jsdom',  // Simulate a browser environment
    css: true,
    setupFiles: './vitest.setup.js', // Optional setup file for global mocks/configurations
    testMatch: ['**/*.test.jsx'],
  },
  server: {
    port: 3000
  }
})
