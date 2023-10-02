import { exit } from 'node:process'
import fs from 'node:fs/promises'
import chalk from 'chalk'
import { findUp } from 'find-up'
import { PackageJson } from '../translator/commander.types.js'

const PACKAGE_NAME = 'package.json'

export const fileExists = async (path: string) => {
  try {
    const result = await Bun.file(path).exists()
    return result
  } catch (error) {
    return false
  }
}

export const pathExists = async (path: string) => {
  try {
    await fs.access(path)
    return true
  } catch (error) {
    return false
  }
}

export const getPackageJson = async (fileName: `${string}.json` = packageName): Promise<PackageJson | undefined> => {
  try {
    const closestPackageJsonPath = await findUp(fileName)
    if (!closestPackageJsonPath) {
      return undefined
    }

    const file = await Bun.file(closestPackageJsonPath, { type: "application/json" })
    if (!file.exists()) {
      return undefined
    }

    const contents = await file.json()
    return contents

  } catch {
    return undefined
  }
}

export const lockFileExists = async (fileName: string) => {
  const closestLockfilePath = await findUp(fileName)
  if (!closestLockfilePath) return false

  return fileExists(closestLockfilePath)
}

export const savePackageJson = async (data: PackageJson, fileName: string = packageName) => {
  const closestPackageJsonPath = await findUp(fileName)
  if (!closestPackageJsonPath) {
    console.error(`${chalk.red.bold('Error')}: there is no ${chalk.red.bold(fileName)} file on current path.`)
    exit(1)
  }

  const exists = await fileExists(closestPackageJsonPath)
  if (!exists) {
    console.error(`${chalk.red.bold('Error')}: there is no ${chalk.red.bold(fileName)} file on current path.`)
    exit(1)
  }

  try {
    const content = JSON.stringify(data, null, 2)
    await Bun.write(closestPackageJsonPath, content)
  } catch (error) {
    console.error(`${chalk.red.bold('Error')}: ${chalk.bold(packageName)} file can't be saved.`)
    exit(1)
  }
}
