import { cwd, exit } from 'node:process'
import fs from 'node:fs/promises'
import { resolve as resolvePath } from 'node:path'
import chalk from 'chalk'

const packageName = 'package.json'

export const fileExists = async (path) => {
  try {
    await fs.stat(path)
    return true
  } catch (error) {
    return false
  }
}

export const getPackageJson = async (fileName = packageName) => {
  try {
    const path = resolvePath(cwd(), fileName)
    const pkg = await fs.readFile(path)
    if (pkg) {
      return JSON.parse(pkg)
    }
  } catch {
    return undefined
  }
}

export const lockFileExists = async (fileName) => {
  const path = resolvePath(cwd(), fileName)
  return fileExists(path)
}

export const savePackageJson = async (data, fileName = packageName) => {
  const exists = await fileExists(fileName)
  if (!exists) {
    console.error(`${chalk.red.bold('Error')}: there is no ${chalk.red.bold(fileName)} file on current path.`)
    exit(1)
  }

  const path = resolvePath(cwd(), fileName)
  try {
    const content = JSON.stringify(data, null, 2)
    await fs.writeFile(
      path,
      content,
      {
        encoding: 'utf8',
        flag: 'w+'
      })
  } catch (error) {
    console.error(`${chalk.red.bold('Error')}: ${chalk.bold(packageName)} file can't be saved.`)
    exit(1)
  }
}
