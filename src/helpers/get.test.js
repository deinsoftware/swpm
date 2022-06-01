import { describe, test, expect } from 'vitest'
import { getOriginIcon } from './icons.js'

describe('getOriginIcon()', () => {
  test('should return an empty string if name was not send', () => {
    const expectedResult = ''
    const result = getOriginIcon()
    expect(result).toBe(expectedResult)
  })

  test('should return an empty string if name was not found', () => {
    const expectedResult = ''
    const name = 'not'
    const result = getOriginIcon(name)
    expect(result).toBe(expectedResult)
  })

  test('should return an icon when name was found', () => {
    const expectedResult = '📌'
    const name = 'pinned'
    const result = getOriginIcon(name)
    expect(result).toBe(expectedResult)
  })
})
