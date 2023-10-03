import { describe, test, expect } from 'bun:test'
import { getOriginIcon } from 'helpers/icons.js'

describe('getOriginIcon()', () => {
  test('should return an empty string if name was not send', () => {
    const expectedResult = ''
    // @ts-expect-error expected result is intentionally empty
    const result = getOriginIcon()
    expect(result).toBe(expectedResult)
  })

  test('should return an empty string if name was not found', () => {
    const expectedResult = ''
    const name = 'not'
    // @ts-expect-error name is intentionally a non existent icon
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
