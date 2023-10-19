import { it, expect, describe } from 'vitest'
import { testCommandResult } from '../../.vitest/helpers'
import { addCases } from '../cli/swpm/commands/add.test'

describe('sa', () => {
  it.each(addCases)('%s', (pkg, expected) => {
    const result = testCommandResult(`sa vite --test ${pkg}`)
    expect(result).toBe(expected)
  })
})
