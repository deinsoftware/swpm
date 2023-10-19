import { it, expect, describe } from 'vitest'
import { testCommandResult } from '../../.vitest/helpers'

describe('sade', () => {
  it.each([
    ['npm', 'npm add vite --save-dev --save-exact'],
    ['yarn', 'yarn add vite --dev --exact'],
    ['yarn@berry', 'yarn add vite --dev --exact'],
    ['pnpm', 'pnpm add vite --save-dev --save-exact'],
    ['bun', 'bun add vite --dev --exact']
  ])('%s', (pkg, expected) => {
    const result = testCommandResult(`sade vite --test ${pkg}`)
    expect(result).toBe(expected)
  })
})
