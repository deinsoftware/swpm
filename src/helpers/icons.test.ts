import chalk from 'chalk'
import { describe, test, expect } from 'bun:test'
import { getOriginIcon, getResultIcon } from 'helpers/icons'

describe('getOriginIcon()', () => {
  test('should return expected icon when name parameter exist', () => {
    const name = 'pinned'
    const expectedResult = '📌'
    const result = getOriginIcon(name)
    expect(result).toBe(expectedResult)
  })
})

describe('getResultIcon()', () => {
  test('should return expected icon when name parameter exist', () => {
    const name = 'failure'
    const expectedResult = chalk.red.bold('❌')
    const result = getResultIcon(name)
    expect(result).toBe(expectedResult)
  })
})
