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
      include: [...include],
      exclude: [...exclude],
      reporter: ['text', 'html', 'lcov'],
      statements: 30,
      branches: 67,
      functions: 41,
      lines: 30,
    }
  }
})
