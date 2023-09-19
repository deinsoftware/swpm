import { describe, test, expect } from 'bun:test'
import { translateCommand, getCommandResult } from './cmds.js'
import { ArgumentsCamelCase } from 'yargs'
import { CommanderPackage } from 'translator/commander.types.js'
import npm from 'packages/managers/npm.js'

describe('translateCommand()', () => {
  test('should not fail if pkg or key are empty', () => {
    const flag: string = ''
    const args: string[] = [flag]

    const yargs: ArgumentsCamelCase = {
      $0: 'swpm',
      _: args
    }
    const cmdr: CommanderPackage = {
      args: args,
      config: {
        ...npm,
        cmds: {}
      }
    }

    const result = translateCommand({yargs, cmdr})
    expect(result).toBeFalsy()
  })

  test('should not change args if key does not exists', () => {
    const command: string = 'command'
    const flag: string = '--bool'
    const args: string[] = [command, flag]

    const yargs: ArgumentsCamelCase = {
      $0: 'swpm',
      _: args,
    }
    const cmdr: CommanderPackage = {
      args: args,
      config: {
        ...npm,
        cmds: {}
      }
    }

    translateCommand({yargs, cmdr})
    expect(cmdr.args.includes(command)).toBeTruthy()
  })

  test('should replace args if key exists', () => {
    const command: string = 'command'
    const flag: string = '--flag'
    const replace: string = 'new-command'
    const args: string[] = [command, flag]

    const yargs: ArgumentsCamelCase = {
      $0: 'swpm',
      _: args,
    }
    const cmdr: CommanderPackage = {
      args: args,
      config: {
        ...npm,
        cmds: {
          [command]: replace
        }
      }
    }

    translateCommand({yargs, cmdr})
    expect(cmdr.args.includes(command)).toBeFalsy()
    expect(cmdr.args.includes(replace)).toBeTruthy()
  })

  test('should add positional args', () => {
    const command: string = 'command'
    const flag: string = '--port'
    const value: string = '3000'
    const args: string[] = [command, flag, value]

    const yargs: ArgumentsCamelCase = {
      $0: 'swpm',
      _: args,
    }

    const cmdr: CommanderPackage = {
      args: args,
      config: {
        ...npm,
        cmds: {
          [command]: { '--': '--' }
        }
      }
    }

    translateCommand({yargs, cmdr})
    expect(cmdr.args.includes('--')).toBeTruthy()
    const index = cmdr.args.findIndex(arg => arg === '--')
    expect(cmdr.args[index + 1].startsWith('--')).toBeTruthy()
  })
})

describe('getCommandResult()', () => {
  test('should return the command result', () => {
    const command = 'echo a'
    const expected = 'a'
    const result = getCommandResult({command})
    expect(result).toBe(expected)
  })

  test('should return empty when command fail', () => {
    const command = 'foo bar'
    const expected = ''
    const result = getCommandResult({command})
    expect(result).toBe(expected)
  })
})
