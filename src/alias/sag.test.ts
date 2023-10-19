import { it, expect, describe } from 'vitest'
import { testCommandResult } from '../../.vitest/helpers'
import { addPackageCases, addVoltaCases } from '../cli/swpm/commands/add.test'

const voltaVersion = testCommandResult('volta --version')

describe('sag', () => {
  it.each(voltaVersion ? addVoltaCases : addPackageCases)('%s', (pkg, expected) => {
    const result = testCommandResult(`sag vite --test ${pkg}`)
    expect(result).toBe(expected)
  })
})
