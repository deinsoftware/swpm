import { resolve as resolvePath } from 'node:path'
import { pathExists } from 'find-up'
import { cwd } from 'node:process'
import { getCommandResult } from './cmds.js'
import { Repository } from './repos.types.js'
import { getProviderConfiguration } from '../git/list.js'
import { Providers } from '../git/providers.types.js'

const gitCurrentBranch = () => {
  return getCommandResult({ command: 'git branch --show-current' })
}

export const getReposStatus = async () => {
  const origin = getCommandResult({ command: 'git config remote.origin.url' })
  const host = new URL(origin)?.hostname
  const provider = host?.split('.').at(0) as Providers

  const config = await getProviderConfiguration({ id: provider })

  let url = origin.replace(`git@${origin}`, `https://${origin}/`)
  if (url.endsWith('.git')) {
    url = url.slice(0, -4)
  }

  const current = gitCurrentBranch()

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
