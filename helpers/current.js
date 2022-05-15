import fs from 'node:fs/promises'
import { resolve as resolvePath } from 'node:path'
import { createRequire } from 'module'
import list from '../packages/list.js'

const require = createRequire(import.meta.url)

const searchOnPackageJson = () => {
  try {
    const packageJson = require('../package.json')
    if (!('swpm' in packageJson)) {
      return undefined
    }
    return packageJson?.swpm
  } catch (error) {
    return undefined
  }
}

const exists = async (path) => {
  try {
    await fs.access(path)
    return true
  } catch {
    return false
  }
}

const searchForLockFiles = async () => {
  for (const pkg of list) {
    const path = resolvePath(process.cwd(), pkg.lockFile)
    const result = await exists(path)
    if (result) {
      return pkg.cmd
    }
  }

  return undefined
}

const searchGlobalConfiguration = () => {
  return undefined
}

export const getCurrent = async () => {
  let pkg = searchOnPackageJson()

  if (!pkg) {
    pkg = await searchForLockFiles()
  }

  if (!pkg) {
    pkg = searchGlobalConfiguration()
  }

  // if (!pck){ //Default
  //   pkg = 'npm'
  // }

  return pkg
}
