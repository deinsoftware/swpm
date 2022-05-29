import { describe, test, expect } from 'vitest'
import { getCommandResult } from './cmds.js'

describe('getCommandResult()', () => {
  test('should return false when can run the command', () => {
    const result = getCommandResult()
    expect(result).toBeFalsy()
  })

  test('should return the command result', () => {
    const cmd = 'echo "a"'
    const print = 'a'
    const result = getCommandResult(cmd)
    expect(result).toBe(print)
  })
})