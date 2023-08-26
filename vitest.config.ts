import { configDefaults, defineConfig } from 'vitest/config'

const include = [
  'src/**/*'
]

const exclude = [
  ...configDefaults.exclude,
  'src/alias/*',
  'test{,s}/**',
  'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}',
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
      statements: 29,
      branches: 66,
      functions: 40,
      lines: 29
    }
  }
})
