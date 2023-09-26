import { afterEach, it, expect, describe, vi } from 'vitest'
import { exit } from 'node:process'
import { spreadCommand } from '../helpers/cmds.js'

describe('Your test suite description', () => {
  vi.mock('./sa.js', async () => {
    const mod = await vi.importActual<typeof import('./sa.js')>('./sa.js')
    return {
      ...mod,
      spreadCommand: await vi.fn()
    }
  })

  vi.mock('node:process', async () => {
    const mod = await vi.importActual<typeof import('node:process')>('node:process')
    return {
      ...mod,
      exit: await vi.fn()
    }
  })
  const exitMock = vi.mocked(exit)

  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  it('Your test case description', () => {
    vi.mocked(spreadCommand)
    // Mock process.argv
    const originalArgv = process.argv
    process.argv = ['add', 'typescript']

    // Call the code under test
    const args = ['add', ...process.argv.slice(2)]
    spreadCommand({ cmd: 'swpm', args })

    expect(exitMock).toHaveBeenCalledWith(0)

    // expect(spreadCommand).toHaveBeenCalled()
    // expect(spreadCommand).toHaveBeenCalledWith({ cmd: 'swpm', args: ['add', 'typescript'] }),

    // Restore process.argv
    process.argv = originalArgv
  })
})
