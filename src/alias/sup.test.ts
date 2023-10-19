import { it, expect, describe } from 'vitest'
import { testCommandResult } from '../../.vitest/helpers'

describe('sup', () => {
  it.each([
    ['npm', 'npm update vite'],
    ['yarn', 'yarn upgrade vite'],
    ['yarn@berry', 'yarn semver up vite'],
    ['pnpm', 'pnpm update vite'],
    ['bun', 'bun update vite']
  ])('%s', (pkg, expected) => {
    const result = testCommandResult(`sup vite --test ${pkg}`)
    expect(result).toBe(expected)
  })
})
