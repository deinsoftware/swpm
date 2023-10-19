import { it, expect, describe } from 'vitest'
import { testCommandResult } from '../../.vitest/helpers'
import { addDevCases } from '../cli/swpm/commands/add.test'

describe('sad', () => {
  it.each(addDevCases)('%s', (pkg, expected) => {
    const result = testCommandResult(`sad vite --test ${pkg}`)
    expect(result).toBe(expected)
  })
})
