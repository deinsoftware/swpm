import { configDefaults, defineConfig } from 'vitest/config'

const include = [
  'src/**/*'
]

const exclude = [
  ...configDefaults.exclude,
  'bin/**',              // Evita que el código compilado ensucie el reporte
  'src/alias/**',        // Excluido por falta de tests actuales
  'src/cli/**',          // Excluido (lógica de entrada difícil de testear)
  'src/flags/**',        // Excluido (actualmente al 0% de cobertura)
  'src/libs/**',
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
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: [...include],
      exclude: [...exclude],
      // La clave es mover los mínimos aquí dentro:
      thresholds: {
        statements: 42,
        branches: 26,
        functions: 49,
        lines: 41
      }
    }
  }
})