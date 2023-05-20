/// <reference types="vitest" />
import { defineConfig } from 'vite'

import { resolve } from 'path'

export default defineConfig({
  test: {
    watch: false,
    setupFiles: ['./tests/setup.ts'],
    passWithNoTests: true,
    threads: false
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '/src')
    }
  }
})
