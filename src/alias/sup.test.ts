import { it, expect, describe } from 'vitest'
import { testCommandResult } from '../../.vitest/helpers'
import { updateCases } from '../cli/swpm/commands/update.test'

describe('sup', () => {
  it.each(updateCases)('%s', (pkg, expected) => {
    const result = testCommandResult(`sup vite --test ${pkg}`)
    expect(result).toBe(expected)
  })
})
