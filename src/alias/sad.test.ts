import { it, expect, describe } from 'vitest'
import { testCommandResult } from '../../.vitest/helpers'

describe('sad', () => {
  it.each([
    ['npm', 'npm add vite --save-dev'],
    ['yarn', 'yarn add vite --dev'],
    ['yarn@berry', 'yarn add vite --dev'],
    ['pnpm', 'pnpm add vite --save-dev'],
    ['bun', 'bun add vite --dev']
  ])('%s', (pkg, expected) => {
    const result = testCommandResult(`sad vite --test ${pkg}`)
    expect(result).toBe(expected)
  })
})
