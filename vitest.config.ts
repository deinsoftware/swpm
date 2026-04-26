import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    reporters: ['verbose'],
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: [
      ...configDefaults.exclude,
      'bin/**',
      'dist/**',
      '**/test.{js,cjs,mjs,ts,tsx,jsx}'
    ],
    coverage: {
      provider: 'v8', // o 'istanbul'
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*'],
      exclude: [
        ...configDefaults.exclude,
        'bin/**',
        'src/alias/**',
        'src/cli/**',
        'src/libs/**',
        '**/*.types.ts',
        '**/*.test.ts'
      ],
      thresholds: {
        statements: 51,
        branches: 76,
        functions: 55,
        lines: 51
      }
    }
  }
})
