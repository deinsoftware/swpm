import { it, expect, describe } from 'vitest'
import { availableProviders, providerExists, getProviderConfiguration } from './list.js'

describe('availablePackages()', () => {
  it('should return a list of available packages', () => {
    const expectedResult = ['github', 'gitlab', 'bitbucket']
    const result = availableProviders()
    expect(result).toMatchObject(expectedResult)
  })
})

describe('providerExists()', () => {
  it('should return true if cmd exists', () => {
    const provider = 'github'
    const result = providerExists(provider)
    expect(result).toBeTruthy()
  })
})

describe('getProviderConfiguration', () => {
  it('should return the default configuration when the provider file exists', async () => {
    const provider = { id: 'github' } as const
    const config = await getProviderConfiguration(provider, 'js')
    expect(config).toBeDefined()
  })

  it('should return an empty object when the provider file does not exist', async () => {
    const provider = { id: 'foobar' }
    // @ts-expect-error inexistent provider
    const config = await getProviderConfiguration(provider, 'ts')
    expect(config).toEqual({})
  })
})
