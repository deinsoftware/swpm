import { it, expect, describe } from 'vitest'
import { testCommandResult } from '../../.vitest/helpers'
import { addPackageCases, addVoltaCases } from '../cli/swpm/commands/add.test'
import { commandVerification } from '../../bin/src/helpers/get'

const isVoltaInstalled = await commandVerification('volta')

describe('sag', () => {
  it.each(isVoltaInstalled ? addVoltaCases : addPackageCases)('%s', (pkg, expected) => {
    const result = testCommandResult(`sag vite --test ${pkg}`)
    expect(result).toBe(expected)
  })
})

describe('sag --global not available for deno', () => {
  it('deno', () => {
    const result = testCommandResult('sag vite --test deno')
    expect(result).toBe('')
  })
})
