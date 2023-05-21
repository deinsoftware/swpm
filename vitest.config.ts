import { configDefaults, defineConfig } from 'vitest/config'

const include = [
  'src/**/*',
]

const exclude = [
  ...configDefaults.exclude,
  'src/alias/*',
  'test{,s}/**',
  'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}',
  '**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}',
]

export default defineConfig({
  test: {
    globals: true,
    reporters: ['verbose'],
    coverage: {
      all: true,
      reporter: ["text", "html", "lcov"],
      statements: 27,
      branches: 52,
      functions: 26,
      lines: 27,
    },
  },
});
