import { describe, test, expect } from 'vitest'
import { translateCommand, getCommandResult } from './cmds.js'

describe('translateCommand()', () => {
  test('should not fail if does not receive pkg or key parameters', () => {
    const result = translateCommand()
    expect(result).toBeFalsy()
  })

  test('should not fail if pkg or key are empty', () => {
    const yargs = {
      pkg: {
        args: [],
        config: {
          cmds: {}
        }
      }
    }
    const result = translateCommand(yargs)
    expect(result).toBeFalsy()
  })

  test('should not change args if key does not exists', () => {
    const key = 'command'
    const yargs = {
      _: [key],
      pkg: {
        args: [key],
        config: {
          cmds: {}
        }
      }
    }
    translateCommand(yargs)
    expect(yargs.pkg.args.includes(key)).toBeTruthy()
  })

  test('should replace args if key exists', () => {
    const key = 'command'
    const replaceCommand = 'new-command'
    const yargs = {
      _: [key],
      pkg: {
        args: [key],
        config: {
          cmds: {
            [key]: replaceCommand
          }
        }
      }
    }
    translateCommand(yargs)
    expect(yargs.pkg.args.includes(key)).toBeFalsy()
    expect(yargs.pkg.args.includes(replaceCommand)).toBeTruthy()
  })
})

describe('getCommandResult()', () => {
  test('should return false when can run the command', () => {
    const result = getCommandResult()
    expect(result).toBeFalsy()
  })

  test('should return the command result', () => {
    const cmd = 'echo a'
    const print = 'a'
    const result = getCommandResult(cmd)
    expect(result).toBe(print)
  })
})
