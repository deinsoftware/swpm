import { cwd, exit } from 'node:process'
import fs from 'node:fs/promises'
import { resolve as resolvePath } from 'node:path'

import packagesList from 'packages/list'
import { fileExists, pathExists } from './files.js'
import { getResultIcon } from 'helpers/icons'

const deleteResult = (result, name) => {
  const icon = getResultIcon(result === undefined ? 'success' : 'failure')
  console.log(`${icon} ${name}`)

  if (result !== undefined) {
    exit(1)
  }
}

export const deletePath = async (folderName) => {
  if (await pathExists(folderName)) {
    const path = resolvePath(cwd(), folderName)
    const result = await fs.rm(path, { force: true, recursive: true })
    deleteResult(result, folderName)
  }
}

export const deleteFile = async (fileName) => {
  if (await fileExists(fileName)) {
    const path = resolvePath(cwd(), fileName)
    const result = await fs.rm(path, { force: true })
    deleteResult(result, fileName)
  }
}

export const deleteModulesPath = async () => {
  for (const pkg of packagesList) {
    for (const modulePath of pkg.modulesPath) {
      await deletePath(modulePath)
    }
  }
}

export const deleteModulesFiles = async () => {
  for (const pkg of packagesList) {
    for (const moduleFile of pkg.modulesFile) {
      await deleteFile(moduleFile)
    }
  }
}

export const deleteLockFiles = async () => {
  for (const pkg of packagesList) {
    for (const lockFile of pkg.lockFiles) {
      await deleteFile(lockFile)
    }
  }
}

export const deleteLogFiles = async () => {
  for (const pkg of packagesList) {
    await deleteFile(pkg.logFile)
  }
}
