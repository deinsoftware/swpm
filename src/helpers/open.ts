import { platform, release } from 'node:os'
import { exit, cwd } from 'node:process'
import { spawnSync } from 'node:child_process'
import { resolve as resolvePath } from 'node:path'
import { getCommandResult } from './cmds.js'
import { spinnies } from '../libs/spinnies.js'
import open from 'open'
import { stripIndents } from 'common-tags'
import chalk from 'chalk'

const wslToWindows = (path: string) => {
  const newPath = getCommandResult({ command: `wslpath -aw "${path}"` })?.replaceAll('\\', '\\\\')
  return newPath || path
}

const isWSL = () => {
  const version = release().toLowerCase().trim()
  return version.includes('wsl') && version.includes('microsoft')
}

/** returns node platform and 'wsl' if running in wsl */
export const detectOs = () => {
  let os = platform().toLowerCase().replaceAll(/\d/g, '')
  if (os === 'linux') {
    os = isWSL() ? 'wsl' : os
  }
  return os
}

const osConfig: Record<string, {path: string, cmd: string}> = {
  win: { path: '=', cmd: 'explorer' },
  wsl: { path: '.', cmd: 'explorer.exe' },
  linux: { path: '/', cmd: 'xdg-open' },
  macos: { path: '/', cmd: 'open' }
}

export const openFileExplorer = async (path: string = cwd()) => {
  let cmd = ''
  const os = detectOs()

  if (os in osConfig) {
    const config = osConfig[os]
    if (config?.cmd) {
      cmd = config.cmd
    }
  }

  if (os === 'wsl') {
    path = wslToWindows(path)
  }

  spinnies.add(path)
  const child = spawnSync(cmd, [path], { stdio: 'ignore' })

  if (child.status !== 0) {
    spinnies.succeed(path)
    exit(1)
  }

  spinnies.succeed(path)
  exit(0)
}

const isUrl = (url: string) => {
  return url.startsWith('http') || url.startsWith('https')
}

export const openBrowser = async (url: string) => {
  const urlId = url
  try {
    spinnies.add(urlId)
    if (!isUrl(url)) {
      url = resolvePath(url)  // Ensure absolute path
      if (detectOs() === 'wsl') {
        url = wslToWindows(url)
      }
      url = `file://${url.replaceAll('\\\\', '/')}`
    }

    await open(url, { wait: true })
    spinnies.succeed(urlId)
    exit(0)
  } catch (error) {
    spinnies.fail(urlId)

    if (error instanceof Error) {
      let browserId = ''
      if (error.message !== 'Exited with code 1') {
        browserId = error.message.split(':').at(-1)?.trim() ?? ''
      }
      console.error(stripIndents`
        ${chalk.red.bold('Error')}: no compatible browser ${chalk.bold(`${browserId ?? ' '}`)}found.
      `)
    }
    exit(1)
  }
}
