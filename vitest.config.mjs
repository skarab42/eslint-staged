import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['source'],
      exclude: ['source/bin'],
      reporter: ['text', 'json', 'html'],
    },
  },
});
