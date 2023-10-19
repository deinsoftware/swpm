import { it, expect, describe } from 'vitest'
import { testCommandResult } from '../../.vitest/helpers'

describe('sif', () => {
  it.each([
    ['npm', 'npm ci'],
    ['yarn', 'yarn install --frozen-lockfile'],
    ['yarn@berry', 'yarn install --immutable'],
    ['pnpm', 'pnpm install --frozen-lockfile'],
    ['bun', 'bun install --frozen-lockfile']
  ])('%s', (pkg, expected) => {
    const result = testCommandResult(`sif --test ${pkg}`)
    expect(result).toBe(expected)
  })
})
