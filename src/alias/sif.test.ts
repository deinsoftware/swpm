import { it, expect, describe } from 'vitest'
import { testCommandResult } from '../../.vitest/helpers'
import { installFrozenCases } from '../cli/swpm/commands/install.test'

describe('sif', () => {
  it.each(installFrozenCases)('%s', (pkg, expected) => {
    const result = testCommandResult(`sif --test ${pkg}`)
    expect(result).toBe(expected)
  })
})
