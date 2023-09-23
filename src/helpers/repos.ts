import { getCommandResult } from './cmds.js'

export const getRepoUrl = () => {
  let url = getCommandResult({ command: 'git config remote.origin.url' })
    .replace('git@github.com', 'https://github.com/')

  if (url.endsWith('.git')) {
    url = url.slice(0, -4)
  }
  return url
}

export const gitCurrentBranch = () => {
  return getCommandResult({ command: 'git branch --show-current' })
}
