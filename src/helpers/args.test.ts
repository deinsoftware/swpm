import { describe, test, expect } from 'bun:test'
import { cleanFlag, translateArgs } from './args.js'
import { CommanderPackage } from 'translator/commander.types.js'
import { ArgumentsCamelCase } from 'yargs'
import npm from 'packages/managers/npm.js'


describe('cleanFlag()', () => {
  test('should not fail if flag or args are empty or not exists', () => {
    const flag: string = ''
    const args: string[] = [flag]

    const yargs: ArgumentsCamelCase = {
      $0: 'swpm',
      _: args
    }
    const cmdr: CommanderPackage = {
      args: args
    }

    const result = cleanFlag({yargs, cmdr, flag})
    expect(result).toBeUndefined()
  })

  test('should not fail when flag is not present on yargs', () => {
    const flag: string = '--not-exists'
    const args: string[] = [flag]

    const yargs: ArgumentsCamelCase = {
      $0: 'swpm',
      _: args
    }
    const cmdr: CommanderPackage = {
      args: args
    }

    const result = cleanFlag({yargs, cmdr, flag})
    expect(result).toBeUndefined()
  })

  test('should remove key for bolean flags', () => {
    const command: string = 'command'
    const flag: string = '--bool'
    const args: string[] = [command, flag]

    const yargs: ArgumentsCamelCase = {
      $0: 'swpm',
      _: args,
      [flag.replaceAll('-', '')]: true
    }
    const cmdr: CommanderPackage = {
      args: args,
    }

    cleanFlag({yargs, cmdr, flag})
    expect(cmdr.args.includes(flag)).toBeFalsy()
  })

  test('should remove key and value for non boolean flags', () => {
    const command: string = 'command'
    const flag: string = '--test'
    const value: string = 'npm'
    const args: string[] = [command, flag, value]

    const yargs: ArgumentsCamelCase = {
      $0: 'swpm',
      _: args,
      [flag.replaceAll('-', '')]: value
    }
    const cmdr: CommanderPackage = {
      args: args,
    }

    cleanFlag({yargs, cmdr, flag})
    expect(cmdr.args.includes(flag)).toBeFalsy()
    expect(cmdr.args.includes(value)).toBeFalsy()
  })
})

describe('translateArgs()', () => {
  test('should not fail if flag, alias or args is empty or not exists', () => {
    const flag: string = ''
    const alias: string = ''
    const args: string[] = [flag]

    const yargs: ArgumentsCamelCase = {
      $0: 'swpm',
      _: args,
    }
    const cmdr: CommanderPackage = {
      args: args,
    }
    const result = translateArgs({yargs, cmdr, flag, alias})
    expect(result).toBeUndefined()
  })

  test('should not fail when flag is not present on yargs', () => {
    const flag: string = '--not-exists'
    const args: string[] = [flag]

    const yargs: ArgumentsCamelCase = {
      $0: 'swpm',
      _: args
    }
    const cmdr: CommanderPackage = {
      args: args
    }

    const result = translateArgs({yargs, cmdr, flag})
    expect(result).toBeUndefined()
  })

  test('should replace a flag with his config translation', () => {
    const command: string = 'command'
    const flag: string = '--flag'
    const replace: string = '--new-flag'
    const args: string[] = [command, flag]

    const yargs: ArgumentsCamelCase = {
      $0: 'swpm',
      _: args,
      [flag.replaceAll('-', '')]: true,
    }
    const cmdr: CommanderPackage = {
      args: args,
      config: {
        ...npm,
        args: {
          [flag]: replace
        }
      }
    }

    translateArgs({yargs, cmdr, flag})
    expect(cmdr.args.includes(flag)).toBeFalsy()
    expect(cmdr.args[1]).toBe(replace)
  })

  test('should move a flag with his config translation', () => {
    const command: string = 'command'
    const flag: string = '--flag'
    const replace: [string, number] = ['flag', 1]
    const args: string[] = [command, flag]

    const yargs: ArgumentsCamelCase = {
      $0: 'swpm',
      _: args,
      [flag.replaceAll('-', '')]: true,
    }
    const cmdr: CommanderPackage = {
      args: args,
      config: {
        ...npm,
        args: {
          [flag]: replace
        }
      }
    }

    translateArgs({yargs, cmdr, flag})
    expect(cmdr.args.includes(flag)).toBeFalsy()
    expect(cmdr.args[1]).toBe(replace[0])
  })

  test('should replace the command when detect some flag', () => {
    const command: string = 'command'
    const flag: string = '--flag'
    const replace = {
      [flag]: {
        [command]: 'new-command'
      }
    }
    const args: string[] = [command, flag]

    const yargs: ArgumentsCamelCase = {
      $0: 'swpm',
      _: args,
      [flag.replaceAll('-', '')]: true,
    }
    const cmdr: CommanderPackage = {
      args: args,
      config: {
        ...npm,
        args: replace
      }
    }

    translateArgs({yargs, cmdr, flag})
    expect(cmdr.args.includes(command)).toBeFalsy()
    expect(cmdr.args.includes(flag)).toBeFalsy()
    expect(cmdr.args[0]).toBe(replace[flag][command])
  })
})
