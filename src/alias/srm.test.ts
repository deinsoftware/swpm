import { it, expect, describe } from 'vitest'
import { testCommandResult } from '../../.vitest/helpers'

describe('srm', () => {
  it.each([
    ['npm', 'npm uninstall vite'],
    ['yarn', 'yarn remove vite'],
    ['yarn@berry', 'yarn remove vite'],
    ['pnpm', 'pnpm uninstall vite'],
    ['bun', 'bun remove vite']
  ])('%s', (pkg, expected) => {
    const result = testCommandResult(`srm vite --test ${pkg}`)
    expect(result).toBe(expected)
  })
})
