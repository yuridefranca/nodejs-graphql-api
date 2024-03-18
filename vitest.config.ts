/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      provider: 'istanbul', // or 'v8',
      reporter: ['text', 'html'],
      exclude: ['src/server.ts', 'src/**/presentation/**'],
    },
    include: ['src/**/*.spec.ts'],
  },
});