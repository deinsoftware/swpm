import { it, expect, describe } from 'vitest'
import { testCommandResult } from '../../.vitest/helpers'

describe('sui', () => {
  it.each([
    ['npm', ''],
    ['yarn', 'yarn upgrade-interactive'],
    ['yarn@berry', 'yarn upgrade-interactive'],
    ['pnpm', 'pnpm upgrade --interactive'],
    ['bun', '']
  ])('%s', (pkg, expected) => {
    const result = testCommandResult(`sui --test ${pkg}`)
    expect(result).toBe(expected)
  })
})
