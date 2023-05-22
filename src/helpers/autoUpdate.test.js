import { it, expect, describe, vi } from 'vitest'
import updateNotifier from 'update-notifier'
import { autoUpdate } from './autoUpdate.js'
import { getCommandResult } from './cmds.js'
import { getSwpmInfo } from './info.js'

describe('autoUpdate()', () => {
  vi.mock('./info.js')
  getSwpmInfo.mockResolvedValue({ name: 'swpm', version: '1.0.0' })

  vi.mock('update-notifier')

  it('should check for updates', async () => {
    await autoUpdate({})
    expect(updateNotifier).toHaveBeenCalled()
  })

  it('should check for updates without volta', async () => {
    updateNotifier.mockResolvedValue({ update: { type: 'latest', current: '1.0.0', latest: '1.0.1' }, notify: vi.fn() })
    vi.mock('./cmds.js', () => ({
      getCommandResult: vi.fn().mockImplementation(() => '')
    }))
    const yargs = {
      pkg: {
        config: {
          install: 'swpm add swpm --global'
        }
      }
    }
    await autoUpdate(yargs)
    expect(updateNotifier).toHaveBeenCalled()
  })

  it('should check for updates without volta and not install command', async () => {
    updateNotifier.mockResolvedValue({ update: { type: 'latest', current: '1.0.0', latest: '1.0.1' }, notify: vi.fn() })
    vi.mock('./cmds.js', () => ({
      getCommandResult: vi.fn().mockImplementation(() => '')
    }))
    await autoUpdate({})
    expect(updateNotifier).toHaveBeenCalled()
  })

  it('should check for updates with volta', async () => {
    updateNotifier.mockResolvedValue({ update: { type: 'major', current: '1.0.0', latest: '2.0.0' }, notify: vi.fn() })
    vi.mock('./cmds.js')
    getCommandResult.mockImplementation(() => '1.1.0')

    await autoUpdate({})
    expect(updateNotifier).toHaveBeenCalled()
  })
})
