import { it, expect, describe } from 'vitest'
import { testCommandResult } from '../../.vitest/helpers'

describe('sa', () => {
  it.each([
    ['npm', 'npm add vite'],
    ['yarn', 'yarn add vite'],
    ['yarn@berry', 'yarn add vite'],
    ['pnpm', 'pnpm add vite'],
    ['bun', 'bun add vite']
  ])('%s', (pkg, expected) => {
    const result = testCommandResult(`sa vite --test ${pkg}`)
    expect(result).toBe(expected)
  })
})
