import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    reporters: ['verbose'],
    coverage: {
      all: true,
      reporter: ['text', 'html', 'lcov'],
      statements: 27,
      branches: 53,
      functions: 28,
      lines: 27,
    }
  }
})
