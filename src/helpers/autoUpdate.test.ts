import { it, expect, describe, vi } from 'vitest'
import updateNotifier from 'update-notifier'
import { autoUpdate } from './autoUpdate'
import npm from '../packages/managers/npm'

describe('autoUpdate()', () => {
  vi.mock('./info', () => ({
    getSwpmInfo: vi.fn(() => ({ name: 'swpm', version: '1.0.0' }))
  }))

  const mocks = vi.hoisted(() => {
    return {
      autoUpdate: vi.fn(),
    }
  })

  vi.mock('update-notifier')

  it('should check for updates', async () => {
    await autoUpdate({args: ['']})
    expect(updateNotifier).toHaveBeenCalled()
  })

  it('should check for updates without volta', async () => {
    // const value = { update: { type: 'latest', current: '1.0.0', latest: '1.0.1' }, notify: vi.fn() }
    // vi.mocked(autoUpdate).mockReturnValue(value)
    vi.mock('./cmds', () => ({
      getCommandResult: vi.fn(() => '')
    }))
    const cmdr = {
        args: [''],
        config: {
          ...npm,
          install: 'swpm add swpm --global'
        }
    }
    await autoUpdate(cmdr)
    expect(updateNotifier).toHaveBeenCalled()
  })

  it('should check for updates without volta and not install command', async () => {
    // updateNotifier.mockResolvedValue(() => ({ update: { type: 'latest', current: '1.0.0', latest: '1.0.1' }, notify: vi.fn() }))
    vi.mock('./cmds', () => ({
      getCommandResult: vi.fn(() => '')
    }))
    await autoUpdate({args: ['']})
    expect(updateNotifier).toHaveBeenCalled()
  })

  it('should check for updates with volta', async () => {
    // updateNotifier.mockResolvedValue({ update: { type: 'major', current: '1.0.0', latest: '2.0.0' }, notify: vi.fn() })
    vi.mock('./cmds', () => ({
      getCommandResult: vi.fn(() => '1.1.0')
    }))

    await autoUpdate({args: ['']})
    expect(updateNotifier).toHaveBeenCalled()
  })
})
