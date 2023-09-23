import { platform, release } from 'node:os'
import { exit, cwd } from 'node:process'
import { spawnSync } from 'node:child_process'
import { pathToFileURL } from 'node:url'
import { getCommandResult } from './cmds.js'
import { spinnies } from '../libs/spinnies.js'
import open from 'open'
import { stripIndents } from 'common-tags'
import chalk from 'chalk'

const wslToWindows = (path: string) => {
  const newPath = getCommandResult({ command: `wslpath -w ${path}` })
  return !newPath ? path : newPath
}

const isWSL = () => {
  const version = release().toLowerCase().trim()
  return version.includes('wsl') && version.includes('microsoft')
}

const detectOs = () => {
  let os = platform().toLowerCase().replace(/[0-9]/g, '')
  if (os === 'linux') {
    os = isWSL() ? 'wsl' : os
  }
  return os
}

export const openExplorer = (path: string = cwd()) => {
  let cmd = ''
  switch (detectOs()) {
    case 'win':
      path ||= '='
      cmd = 'explorer'
      break
    case 'wsl':
      path = wslToWindows(path || '=')
      cmd = 'explorer.exe'
      break
    case 'linux':
      path ||= '/'
      cmd = 'xdg-open'
      break
    case 'macos':
      path ||= '/'
      cmd = 'open'
      break
  }

  spinnies.add(path)
  const child = spawnSync(cmd, [path, '2>&1'], { stdio: 'inherit', shell: true })

  if (child.status !== 0) { // TODO: open the file but return it as error
    spinnies.fail(path)
    exit(1)
  }

  spinnies.succeed(path)
  return child.status
}

const isUrl = (url: string) => {
  return url.startsWith('http') || url.startsWith('https')
}

export const openBrowser = async (url: string) => {
  try {
    spinnies.add(url)
    if (!isUrl(url)) {
      if (detectOs() === 'wsl') {
        url = wslToWindows(url)
      }
      url = pathToFileURL(url).toString()
    }

    await open(url, { wait: true })
    spinnies.succeed(url)
  } catch (error) {
    await spinnies.fail(url)

    if (error instanceof Error) {
      const browserId = error.message.split(':').at(-1)?.trim()
      console.error(stripIndents`
        ${chalk.red.bold('Error')}: no compatible browser ${chalk.bold(browserId)} found.
      `)
    }
  }
}
