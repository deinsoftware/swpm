import { afterEach, it, describe, expect, vi } from 'vitest'
import { resolve as resolvePath } from 'node:path'
import { pathExists } from 'find-up'
import { getCommandResult } from './cmds.js'
import { getReposStatus, hasRepository } from './repos.js'

describe('getReposStatus()', () => {
  vi.mock('./cmds.ts', async () => {
    const mod = await vi.importActual<typeof import('./cmds.ts')>('./cmds.ts')
    return {
      ...mod,
      getCommandResult: vi.fn()
    }
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  it('should return ssh repository object', async () => {
    // Mock the dependencies
    vi.mocked(getCommandResult)
      .mockReturnValueOnce('git@github.com:username/repo.git')
      .mockReturnValueOnce('main')

    // Call the function
    const result = await getReposStatus()

    // Assertions
    expect(getCommandResult).toHaveBeenCalledTimes(2)
    expect(result).toEqual({
      url: 'https://github.com/username/repo',
      provider: 'github',
      current: 'main'
    })

    vi.mocked(getCommandResult).mockRestore()
  })

  it('should return ssh repository object without .git extension', async () => {
    // Mock the dependencies
    vi.mocked(getCommandResult)
      .mockReturnValueOnce('git@github.com:username/repo')
      .mockReturnValueOnce('main')

    // Call the function
    const result = await getReposStatus()

    // Assertions
    expect(getCommandResult).toHaveBeenCalledTimes(2)
    expect(result).toEqual({
      url: 'https://github.com/username/repo',
      provider: 'github',
      current: 'main'
    })

    vi.mocked(getCommandResult).mockRestore()
  })

  it('should return http repository object', async () => {
    // Mock the dependencies
    vi.mocked(getCommandResult)
      .mockReturnValueOnce('https://github.com/username/repo.git')
      .mockReturnValueOnce('main')

    // Call the function
    const result = await getReposStatus()

    // Assertions
    expect(getCommandResult).toHaveBeenCalledTimes(2)
    expect(result).toEqual({
      url: 'https://github.com/username/repo',
      provider: 'github',
      current: 'main'
    })

    vi.mocked(getCommandResult).mockRestore()
  })

  it('should return http repository object without .git extension', async () => {
    // Mock the dependencies
    vi.mocked(getCommandResult)
      .mockReturnValueOnce('https://github.com/username/repo')
      .mockReturnValueOnce('main')

    // Call the function
    const result = await getReposStatus()

    // Assertions
    expect(getCommandResult).toHaveBeenCalledTimes(2)
    expect(result).toEqual({
      url: 'https://github.com/username/repo',
      provider: 'github',
      current: 'main'
    })

    vi.mocked(getCommandResult).mockRestore()
  })
})

describe('hasRepository()', () => {
  vi.mock('find-up', async () => {
    const mod = await vi.importActual<typeof import('find-up')>('find-up')

    return {
      ...mod,
      pathExists: await vi.fn()
    }
  })

  const pathMock = vi.mocked(pathExists)

  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  it('should found a repository in current path', async () => {
    vi.mocked(pathExists).mockResolvedValue(true)
    const result = await hasRepository()
    expect(pathMock).toHaveBeenCalledTimes(1)
    expect(result).toBeTruthy()

    vi.mocked(pathExists).mockRestore()
  })

  it('should found not found a repository in current path', async () => {
    vi.mocked(pathExists).mockResolvedValue(false)
    const result = await hasRepository()
    expect(pathMock).toHaveBeenCalledTimes(1)
    expect(result).toBeFalsy()

    vi.mocked(pathExists).mockRestore()
  })
})
