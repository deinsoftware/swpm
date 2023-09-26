import { resolve as resolvePath } from 'node:path'
import { pathExists } from 'find-up'
import { cwd } from 'node:process'
import { getCommandResult } from './cmds.js'
import { Repository } from './repos.types.js'

const gitCurrentBranch = () => {
  return getCommandResult({ command: 'git branch --show-current' })
}

const providersUrl: Record<string, {pull: string, branch: string}> = {
  'github.com': { pull: 'pulls', branch: 'tree' },
  'gitlab.com': { pull: '-/merge_requests', branch: '-/tree' },
  'bitbucket.org': { pull: 'pull-requests', branch: 'src' }
}

export const gerReposStatus = (): Repository => {
  const host = getCommandResult({ command: 'git config remote.origin.url' })

  const provider = new URL(host)?.hostname

  let url = host.replace(`git@${provider}`, `https://${provider}/`)
  if (url.endsWith('.git')) {
    url = url.slice(0, -4)
  }

  const current = gitCurrentBranch()

  const paths = providersUrl[provider]

  return { url, provider, current, paths }
}

export const hasRepository = async () => {
  const gitPath = await resolvePath(cwd(), '.git')
  return await pathExists(gitPath)
}
