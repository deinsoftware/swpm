import { describe, test, expect } from 'vitest'
import { cleanFlag, translateArgs } from './args.js'

describe('cleanFlag()', () => {
  test('should not fail if flag or args are empty or not exists', () => {
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

describe('translateFlag()', () => {
  test('should not fail if flag, alias or args is empty or not exists', () => {
    const flag = ''
    const alias = ''
    const yargs = {
      pkg: {
        args: []
      }
    }
    const result = translateArgs(yargs, flag, alias)
    expect(result).toBeUndefined()
  })

  test('should not fail when flag is not present on yargs', () => {
    const flag = '--not-exists'
    const yargs = {}
    const result = translateArgs(yargs, flag)
    expect(result).toBeUndefined()
  })

  test('should replace a flag with his config translation', () => {
    const cmd = 'command'
    const flag = '--flag'
    const replace = '--new-flag'
    const yargs = {
      _: [cmd],
      flag: true,
      pkg: {
        args: [cmd, flag],
        config: {
          args: {
            [flag]: replace
          }
        }
      }
    }
    translateArgs(yargs, flag)
    expect(yargs.pkg.args.includes(flag)).toBeFalsy()
    expect(yargs.pkg.args[1]).toBe(replace)
  })

  test('should move a flag with his config translation', () => {
    const cmd = 'command'
    const flag = '--flag'
    const replace = ['flag', 1]
    const yargs = {
      flag: true,
      pkg: {
        _: [cmd],
        args: [cmd, 'package', flag],
        config: {
          args: {
            [flag]: replace
          }
        }
      }
    }
    translateArgs(yargs, flag)
    expect(yargs.pkg.args.includes(flag)).toBeFalsy()
    expect(yargs.pkg.args[1]).toBe(replace[0])
  })

  test('should replace the command when detect some flag', () => {
    const cmd = 'command'
    const flag = '--flag'
    const replace = {
      [flag]: {
        [cmd]: 'new-command'
      }
    }
    const yargs = {
      flag: true,
      _: [cmd],
      pkg: {
        args: [cmd, 'package', flag],
        config: {
          args: replace
        }
      }
    }
    translateArgs(yargs, flag)
    expect(yargs.pkg.args.includes(cmd)).toBeFalsy()
    expect(yargs.pkg.args.includes(flag)).toBeFalsy()
    expect(yargs.pkg.args[0]).toBe(replace[flag][cmd])
  })
})
