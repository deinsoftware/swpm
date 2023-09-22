import { platform, release } from 'node:os'
import { exit } from 'node:process'
import { spawn } from 'node:child_process'
import path from 'path'
import { fileURLToPath } from 'url'
import { wslToWindows } from 'wsl-path'

const isWSL = () => {
  const version = release().toLowerCase().trim()
  return version.includes('wsl') && version.includes('microsoft')
}

export const detectOs = () => {
  let os = platform().toLowerCase().replace(/[0-9]/g, '')
  if (os === 'linux') {
    os = isWSL() ? 'wsl' : os
  }
  return os
}

export const openExplorer = async (path: string) => {
  let cmd = ''
  switch (detectOs()) {
    case 'win':
      path ||= '='
      cmd = 'explorer'
      break
    case 'wsl':
      path = await wslToWindows(path || '=')
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
  console.log({ path })
  const child = spawn(cmd, [path])

  child.on('error', (err) => {
    console.error(err)
    child.kill()
    exit(1)
  })
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const currentPath = path.join(__dirname, '/')
openExplorer(currentPath)
