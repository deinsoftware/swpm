import { resolve as resolvePath } from 'node:path'
import { pathExists } from 'find-up'
import { cwd } from 'node:process'
import { getCommandResult } from './cmds.js'
import { getProviderConfiguration } from '../git/list.js'

import type { Repository } from './repos.types.js'
import type { Providers } from '../git/providers.types.js'

const gitCurrentBranch = () => {
  return getCommandResult({ command: 'git branch --show-current' })
}

const gitOrigin = () => {
  return getCommandResult({ command: 'git config remote.origin.url' })
}

export const getReposStatus = async () => {
  const origin = gitOrigin()
  const current = gitCurrentBranch()

  let url = origin
  if (url.startsWith('git@')) {
    url = url.split(':').join('/')
    url = url.replace('git@', 'https://')
  }
  if (url.endsWith('.git')) {
    url = url.slice(0, -4)
  }

  const { hostname } = new URL(url)
  const provider = hostname?.split('.').at(0) as Providers
  const config = await getProviderConfiguration({ id: provider })

  const repository: Repository = {
    ...config,
    url,
    provider,
    current
  }

  return repository
}

export const hasRepository = async () => {
  const gitPath = await resolvePath(cwd(), '.git')
  return await pathExists(gitPath)
}
