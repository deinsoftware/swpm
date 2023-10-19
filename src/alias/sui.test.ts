import { it, expect, describe } from 'vitest'
import { testCommandResult } from '../../.vitest/helpers'
import { interactiveCases } from '../cli/swpm/commands/interactive.test'

describe('sui', () => {
  it.each(interactiveCases)('%s', (pkg, expected) => {
    const result = testCommandResult(`sui --test ${pkg}`)
    expect(result).toBe(expected)
  })
})
