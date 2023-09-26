import { configDefaults, defineConfig } from 'vitest/config'

const include = [
  'src/**/*'
]

const exclude = [
  ...configDefaults.exclude,
  'src/alias/*',
  'src/libs/*',
  'test{,s}/**',
  'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}',
  '**/*{.,-}types.{js,cjs,mjs,ts,tsx,jsx}',
  '**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}'
]

export default defineConfig({
  test: {
    globals: true,
    reporters: ['verbose'],
    include: ['./src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: [
      ...configDefaults.exclude,
      '**/test.{js,cjs,mjs,ts,tsx,jsx}'
    ],
    coverage: {
      all: true,
      reporter: ['text', 'html', 'lcov'],
      include: [...include],
      exclude: [...exclude],
      statements: 22,
      branches: 57,
      functions: 34,
      lines: 22
    }
  }
})
