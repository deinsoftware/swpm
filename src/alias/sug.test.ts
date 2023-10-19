import { it, expect, describe } from 'vitest'
import { testCommandResult } from '../../.vitest/helpers'

describe('sug', () => {
  it.each([
    ['npm', 'npm add vite@latest'],
    ['yarn', 'yarn upgrade vite --latest'],
    ['yarn@berry', 'yarn up vite'],
    ['pnpm', 'pnpm update vite --latest'],
    ['bun', '']
  ])('%s', (pkg, expected) => {
    const result = testCommandResult(`sug vite --test ${pkg}`)
    expect(result).toBe(expected)
  })
})
