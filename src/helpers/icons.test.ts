import { it, expect, describe } from 'vitest'
import { getOriginIcon } from './icons.js'

describe('getOriginIcon()', () => {
  it('should return an empty string if name was not send', () => {
    const expectedResult = ''
    // @ts-expect-error
    const result = getOriginIcon()
    expect(result).toBe(expectedResult)
  })

  it('should return an empty string if name was not found', () => {
    const expectedResult = ''
    const name = 'not'
    // @ts-expect-error
    const result = getOriginIcon(name)
    expect(result).toBe(expectedResult)
  })

  it('should return an icon when name was found', () => {
    const expectedResult = '📌'
    const name = 'pinned'
    const result = getOriginIcon(name)
    expect(result).toBe(expectedResult)
  })
})
