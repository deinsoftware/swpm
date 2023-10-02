import { cwd } from 'node:process'
import fs from 'node:fs/promises'
import { resolve as resolvePath } from 'node:path'

import packagesList from '../packages/list.js'
import { fileExists, pathExists } from '../helpers/files.js'
import { spinnies } from '../libs/spinnies.js'

export const deletePath = async (folderName: string) => {
  if (await pathExists(folderName)) {
    spinnies.add(folderName)
    const path = resolvePath(cwd(), folderName)
    try {
      await fs.rm(path, { force: true, recursive: true })
    } catch {
      spinnies.fail(folderName)
    } finally {
      spinnies.succeed(folderName)
    }
  }
}

export const deleteFile = async (fileName: string) => {
  if (await fileExists(fileName)) {
    spinnies.add(fileName)
    const path = resolvePath(cwd(), fileName)
    try {
      await fs.rm(path, { force: true })
    } catch {
      spinnies.fail(fileName)
    } finally {
      spinnies.succeed(fileName)
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
