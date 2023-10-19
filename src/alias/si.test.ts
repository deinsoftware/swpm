import { it, expect, describe } from 'vitest'
import { testCommandResult } from '../../.vitest/helpers'
import { installCases, installFrozenCases, installLockCases } from '../cli/swpm/commands/install.test'

describe('si', () => {
  it.each(installCases)('%s', (pkg, expected) => {
    const result = testCommandResult(`si --test ${pkg}`)
    expect(result).toBe(expected)
  })
})

describe('si --frozen', () => {
  it.each(installFrozenCases)('%s', (pkg, expected) => {
    const result = testCommandResult(`si --frozen --test ${pkg}`)
    expect(result).toBe(expected)
  })
})

describe('si --package-lock', () => {
  it.each(installLockCases)('%s', (pkg, expected) => {
    const result = testCommandResult(`si --package-lock --test ${pkg}`)
    expect(result).toBe(expected)
  })
})
