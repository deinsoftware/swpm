import chalk from 'chalk'
import { describe, test, expect } from 'vitest'
import { getOriginIcon, getResultIcon } from './icons.js'

describe('getOriginIcon()', () => {
  test('should return empty when not has name parameter', () => {
    const result = getOriginIcon()
    expect(result).toBe('')
  })

  test('should return empty when name parameter is empty', () => {
    const name = ''
    const result = getOriginIcon(name)
    expect(result).toBe('')
  })

  test('should return empty when name parameter not exist', () => {
    const name = 'not'
    const result = getOriginIcon(name)
    expect(result).toBe('')
  })

  test('should return expected icon when name parameter exist', () => {
    const name = 'pinned'
    const expectedResult = '📌'
    const result = getOriginIcon(name)
    expect(result).toBe(expectedResult)
  })
})

describe('getResultIcon()', () => {
  test('should return empty when not has name parameter', () => {
    const result = getResultIcon()
    expect(result).toBe('')
  })

  test('should return empty when name parameter is empty', () => {
    const name = ''
    const result = getResultIcon(name)
    expect(result).toBe('')
  })

  test('should return empty when name parameter not exist', () => {
    const name = 'not'
    const result = getResultIcon(name)
    expect(result).toBe('')
  })

  test('should return expected icon when name parameter exist', () => {
    const name = 'failure'
    const expectedResult = chalk.red.bold('❌')
    const result = getResultIcon(name)
    expect(result).toBe(expectedResult)
  })
})
