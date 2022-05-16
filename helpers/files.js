import fs from 'node:fs/promises'
import { resolve as resolvePath } from 'node:path'
import { createRequire } from 'module'
import chalk from 'chalk'

const packageName = 'package.json'

export const fileExists = async (path) => {
  try {
    await fs.access(path)
    return true
  } catch {
    return false
  }
}

export const getPackageInformation = (path = import.meta.url) => {
  const require = createRequire(path)
  try {
    return require(`../${packageName}`)
  } catch (error) {
    return undefined
  }
}

export const lockFileExists = async (fileName) => {
  const path = resolvePath(process.cwd(), fileName)
  const result = await fileExists(path)
  return result
}

export const savePackageManager = async (data) => {
  if (!fileExists(packageName)) {
    console.log(`${chalk.red.bold('Error')}: there is no ${chalk.red.bold(packageName)} file on current path.`)
    return undefined
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
