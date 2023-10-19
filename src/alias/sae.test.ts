import { it, expect, describe } from 'vitest'
import { testCommandResult } from '../../.vitest/helpers'

describe('sae', () => {
  it.each([
    ['npm', 'npm add vite --save-exact'],
    ['yarn', 'yarn add vite --exact'],
    ['yarn@berry', 'yarn add vite --exact'],
    ['pnpm', 'pnpm add vite --save-exact'],
    ['bun', 'bun add vite --exact']
  ])('%s', (pkg, expected) => {
    const result = testCommandResult(`sae vite --test ${pkg}`)
    expect(result).toBe(expected)
  })
})
