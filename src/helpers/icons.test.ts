import { it, expect, describe } from 'vitest'
import { getOriginIcon } from './icons.js'

describe('getOriginIcon()', () => {
  it('should return expected icon when name parameter exist', () => {
    const name = 'pinned'
    const expectedResult = '📌'
    const result = getOriginIcon(name)
    expect(result).toBe(expectedResult)
  })
})
