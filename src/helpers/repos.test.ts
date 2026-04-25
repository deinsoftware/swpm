import { afterEach, it, describe, expect, vi } from 'vitest'
import { pathExists } from 'path-exists'
import { getCommandResult } from './cmds.js'
import { getReposStatus, hasRepository } from './repos.js'

vi.mock('./cmds.ts', async () => {
  const mod = await vi.importActual<typeof import('./cmds.ts')>('./cmds.ts')
  return {
    ...mod,
    getCommandResult: vi.fn()
  }
})

vi.mock('path-exists', async () => {
  const mod = await vi.importActual<typeof import('path-exists')>('path-exists')

  return {
    ...mod,
    pathExists: vi.fn()
  }
})

describe('getReposStatus()', () => {

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
  })
})

describe('hasRepository()', () => {

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
  })

  it('should found not found a repository in current path', async () => {
    vi.mocked(pathExists).mockResolvedValue(false)
    const result = await hasRepository()
    expect(pathMock).toHaveBeenCalledTimes(1)
    expect(result).toBeFalsy()
  })
})
