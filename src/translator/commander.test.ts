import { it, expect, describe, vi } from 'vitest'
import { CommanderPackage } from './commander.types.js'
import { getCommander } from './commander.js'

describe('getCommander', () => {
  it('should return the global commander object if it exists', async () => {
    vi.stubGlobal('commander', { args: ['foo', 'bar'] })
    const cmdr = getCommander()
    expect(cmdr).toEqual(globalThis.commander)
    vi.unstubAllGlobals()
  })

  it('should initialize the global commander object if it does not exist', async () => {
    vi.stubGlobal('commander', undefined)
    const commanderInitValues: CommanderPackage = {
      cmd: undefined,
      args: [],
      origin: undefined,
      config: undefined,
      volta: false
    }
    const cmdr = getCommander()

    expect(globalThis.commander).toEqual(commanderInitValues)
    expect(cmdr).toEqual(commanderInitValues)
    vi.unstubAllGlobals()
  })
})
