import { cwd, exit } from 'node:process'
import fs from 'node:fs/promises'
import { resolve as resolvePath } from 'node:path'

import packagesList from '../packages/list.js'
import { fileExists } from './files.js'
import { getResultIcon } from './icons.js'

const deleteResult = (result, name) => {
  const icon = getResultIcon(result === undefined ? 'success' : 'failure')
  console.log(`${icon} ${name}`)

  if (result !== undefined) {
    exit(1)
  }
}

export const deletePath = async (folder) => {
  const path = resolvePath(cwd(), folder)
  const result = await fs.rm(path, { force: true, recursive: true })
  deleteResult(result, folder)
}

export const deleteFile = async (fileName) => {
  const path = resolvePath(cwd(), fileName)
  const result = await fs.rm(path, { force: true })
  deleteResult(result, fileName)
}

export const deleteLockFiles = async () => {
  for (const pkg of packagesList) {
    if (await fileExists(pkg.lockFile)) {
      await deleteFile(pkg.lockFile)
    }
  }
}

export const deleteLogFiles = async () => {
  for (const pkg of packagesList) {
    if (await fileExists(pkg.logFile)) {
      await deleteFile(pkg.logFile)
    }
  }
}
