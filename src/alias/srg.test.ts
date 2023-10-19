import { it, expect, describe } from 'vitest'
import { testCommandResult } from '../../.vitest/helpers'

describe('srg', () => {
  it.each([
    ['npm', 'npm uninstall vite --location=global'],
    ['yarn', 'yarn global remove vite'],
    ['yarn@berry', 'yarn global remove vite'],
    ['pnpm', 'pnpm uninstall vite --global'],
    ['bun', 'bun remove vite --global']
  ])('%s', (pkg, expected) => {
    const result = testCommandResult(`srg vite --test ${pkg}`)
    expect(result).toBe(expected)
  })
})
