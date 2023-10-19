import { it, expect, describe } from 'vitest'
import { testCommandResult } from '../../.vitest/helpers'
import { removeCases } from '../cli/swpm/commands/remove.test'

describe('srm', () => {
  it.each(removeCases)('%s', (pkg, expected) => {
    const result = testCommandResult(`srm vite --test ${pkg}`)
    expect(result).toBe(expected)
  })
})
