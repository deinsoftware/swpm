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

export const getPackageJson = async () => {
  try {
    const path = resolvePath(process.cwd(), packageName)
    const pkg = await fs.readFile(path)
    if (pkg) {
      return JSON.parse(pkg)
    }
  } catch {
    return undefined
  }
}

export const lockFileExists = async (fileName) => {
  const path = resolvePath(process.cwd(), fileName)
  return fileExists(path)
}

export const savePackageJson = async (data) => {
  const exists = await fileExists(packageName)
  if (!exists) {
    console.log(`${chalk.red.bold('Error')}: there is no ${chalk.red.bold(packageName)} file on current path.`)
    process.exit(1)
  }

  const path = resolvePath(process.cwd(), packageName)
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
    console.log(`${chalk.red.bold('Error')}: ${chalk.bold(packageName)} file can't be saved.`)
  }
}
