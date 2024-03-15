/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      provider: 'istanbul', // or 'v8',
      reporter: ['text', 'html'],    
    },
    include: ['src/**/*.spec.ts'],
  },
});