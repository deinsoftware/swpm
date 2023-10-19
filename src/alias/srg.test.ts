import { it, expect, describe } from 'vitest'
import { testCommandResult } from '../../.vitest/helpers'
import { removeGlobalCases } from '../cli/swpm/commands/remove.test'

describe('srg', () => {
  it.each(removeGlobalCases)('%s', (pkg, expected) => {
    const result = testCommandResult(`srg vite --test ${pkg}`)
    expect(result).toBe(expected)
  })
})
