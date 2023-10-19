import { it, expect, describe } from 'vitest'
import { testCommandResult } from '../../.vitest/helpers'
import { addSaveExact } from '../cli/swpm/commands/add.test'

describe('sae', () => {
  it.each(addSaveExact)('%s', (pkg, expected) => {
    const result = testCommandResult(`sae vite --test ${pkg}`)
    expect(result).toBe(expected)
  })
})
