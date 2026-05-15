import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [tailwindcss(), tanstackRouter({ target: 'solid', autoCodeSplitting: true }), solid(), tsconfigPaths()],
  resolve: {
    conditions: ['development', 'module', 'import', 'resolve'],
  },
  optimizeDeps: {
    exclude: ['@ui/solid', '@ui/core'],
  },
})