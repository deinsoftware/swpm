import { afterEach, it, expect, describe, vi } from 'vitest'
import { checkErrorMessage } from './messages'
import { exit } from 'node:process'

describe('checkErrorMessage', () => {
  vi.mock('node:process', async () => {
    const mod = await vi.importActual<typeof import('node:process')>('node:process')
    return {
      ...mod,
      exit: await vi.fn()
    }
  })
  const exitMock = vi.mocked(exit)
  const consoleErrorSpy = vi.spyOn(console, 'error')
  const consoleInfoSpy = vi.spyOn(console, 'info')

  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  it('should log error message if errorMessage is provided', () => {
    const errorMessage = 'Some error message'
    const $0 = 'command-name'
    const command = 'some-command'

    checkErrorMessage($0, command, errorMessage)

    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining(errorMessage))
  })

  it('should log a help message with available options', () => {
    const $0 = 'command-name'
    const command = 'some-command'

    checkErrorMessage($0, command)

    expect(consoleInfoSpy).toHaveBeenCalledWith(expect.stringContaining(`${$0} ${command} --help`))
  })

  it('should exit with code 1', () => {
    const $0 = 'command-name'
    const command = 'some-command'

    checkErrorMessage($0, command)

    expect(exitMock).toHaveBeenCalledWith(1)
  })
})
