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
      statements: 29,
      branches: 66,
      functions: 40,
      lines: 29,
    }
  }
})
