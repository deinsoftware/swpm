import bitBucket from './providers/bitbucket.js'
import gitHub from './providers/github.js'
import gitLab from './providers/gitlab.js'

import type { Repository } from '../helpers/repos.types.js'
import type { Providers } from './providers.types.js'

export const providersList = [
  gitHub,
  gitLab,
  bitBucket
]

export const availableProviders = () => {
  return providersList.map((provider) => provider.id)
}

export const providerExists = (provider: Providers) => {
  return availableProviders().includes(provider)
}

export const getProviderConfiguration = async (repo: Required< Pick<Repository, 'id'>>, ext: 'js' | 'ts' = 'js') => {
  try {
    const fileName = repo.id
    const config = await import(`./providers/${fileName}.${ext}`)
    return config?.default
  } catch {
    return {}
  }
}
