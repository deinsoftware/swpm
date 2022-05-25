import { describe, test, expect } from 'vitest'
import { cleanFlag } from './args.js'

describe('helpers/args', () => {
  describe('cleanFlag()', () => {
    test('should not fail if flag or args is empty or not exists', () => {
      const flag = ''
      const yargs = {
        pkg: {
          args: []
        }
      }
      const result = cleanFlag(yargs, flag)
      expect(result).toBeUndefined()
    })

    test('should not fail when flag is not present on yargs', () => {
      const flag = '--not-exists'
      const yargs = {}
      const result = cleanFlag(yargs, flag)
      expect(result).toBeUndefined()
    })

    test('should remove key for bolean flags', () => {
      const flag = '--flag'
      const yargs = {
        flag: true,
        pkg: {
          args: ['command', flag]
        }
      }
      cleanFlag(yargs, flag)
      expect(yargs.pkg.args.includes(flag)).toBeFalsy()
    })

    test('should remove key and value for non boolean flags', () => {
      const flag = '--flag'
      const value = 'value'
      const yargs = {
        flag: 'value',
        pkg: {
          args: ['command', flag, value]
        }
      }
      cleanFlag(yargs, flag)
      expect(yargs.pkg.args.includes(flag)).toBeFalsy()
      expect(yargs.pkg.args.includes(value)).toBeFalsy()
    })
  })
})
