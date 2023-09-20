import { it, expect, describe } from 'vitest'
import chalk from 'chalk'
import { getOriginIcon, getResultIcon } from './icons'

describe('getOriginIcon()', () => {
  it('should return expected icon when name parameter exist', () => {
    const name = 'pinned'
    const expectedResult = '📌'
    const result = getOriginIcon(name)
    expect(result).toBe(expectedResult)
  })
})

describe('getResultIcon()', () => {
  it('should return expected icon when name parameter exist', () => {
    const name = 'failure'
    const expectedResult = chalk.red.bold('❌')
    const result = getResultIcon(name)
    expect(result).toBe(expectedResult)
  })
})
