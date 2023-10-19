import { it, expect, describe } from 'vitest'
import { testCommandResult } from '../../.vitest/helpers'
import { upgradeCases } from '../cli/swpm/commands/upgrade.test'

describe('sug', () => {
  it.each(upgradeCases)('%s', (pkg, expected) => {
    const result = testCommandResult(`sug vite --test ${pkg}`)
    expect(result).toBe(expected)
  })
})
