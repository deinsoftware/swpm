import { resolve as resolvePath } from 'node:path'
import { pathExists } from 'find-up'
import { cwd } from 'node:process'
import { getCommandResult } from './cmds.js'

const gitCurrentBranch = () => {
  return getCommandResult({ command: 'git branch --show-current' })
}

const pullRequest: Record<string, string> = {
  'github.com': 'pulls',
  'gitlab.com': '-/merge_requests',
  'bitbucket.org': 'pull-requests'
}

export const gerReposStatus = () => {
  const host = getCommandResult({ command: 'git config remote.origin.url' })

  const provider = new URL(host)?.hostname

  let url = host.replace(`git@${provider}`, `https://${provider}/`)
  if (url.endsWith('.git')) {
    url = url.slice(0, -4)
  }

  const current = gitCurrentBranch()

  const pullPath = pullRequest[provider]

  return { url, provider, current, pullPath }
}

export const hasRepository = async () => {
  const gitPath = await resolvePath(cwd(), '.git')
  return await pathExists(gitPath)
}
