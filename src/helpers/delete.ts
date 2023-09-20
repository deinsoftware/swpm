import { cwd, exit } from 'node:process'
import fs from 'node:fs/promises'
import { resolve as resolvePath } from 'node:path'

import packagesList from '../packages/list.js'
import { fileExists, pathExists } from '../helpers/files.js'
import { getResultIcon } from '../helpers/icons.js'

const deleteResult = async (result: boolean, name: string) => {
  const icon = getResultIcon(result ? 'success' : 'failure')
  console.log(`${icon} ${name}`)

  if (result !== undefined) {
    exit(1)
  }
}

export const deletePath = async (folderName: string) => {
  if (await pathExists(folderName)) {
    const path = resolvePath(cwd(), folderName)
    let result = true
    try {
      await fs.rm(path, { force: true, recursive: true })
    } catch {
      result = false
    } finally {
      await deleteResult(result, folderName)
    }
  }
}

export const deleteFile = async (fileName: string) => {
  if (await fileExists(fileName)) {
    const path = resolvePath(cwd(), fileName)
    let result = true
    try {
      await fs.rm(path, { force: true })
    } catch {
      result = false
    } finally {
      deleteResult(result, fileName)
    }
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
