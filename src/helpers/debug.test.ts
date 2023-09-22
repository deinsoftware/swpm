import { it, expect, describe, vi } from 'vitest'
import { inspect } from 'node:util'
import { debug } from './debug.js'

describe('debug', () => {
  it('should log the object with default options', () => {
    const object = { foo: 'bar' }
    const consoleSpy = vi.spyOn(console, 'log')

    const options = {
      showHidden: false,
      depth: null,
      colors: true
    }
    const inspector = inspect(object, options)
    // @ts-expect-error object is intentionally wrong
    debug(object)

    expect(consoleSpy).toHaveBeenCalledWith(inspector)

    consoleSpy.mockRestore()
  })
})
