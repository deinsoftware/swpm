import chalk from 'chalk'
import { getPackageInformation, lockFileExists } from '../helpers/files.js'
import packagesList from '../packages/list.js'

const packageName = 'package.json'

const searchOnPackageJson = () => {
  const packageJson = getPackageInformation()
  if (!packageJson || !('swpm' in packageJson)) {
    return undefined
  }
  return packageJson?.swpm
}

const searchForLockFiles = async () => {
  for (const pkg of packagesList) {
    if (lockFileExists(pkg.lockFile)) {
      return pkg.cmd
    }
  }

  return undefined
}

export const getCurrentPackageManager = async () => {
  const pinned = searchOnPackageJson()
  if (pinned) {
    return pinned
  }

  const lock = await searchForLockFiles()
  if (lock) {
    return lock
  }

  console.log(`${chalk.yellow.bold('Warning')}: there is no Package Manager pinned on ${chalk.bold(packageName)} or a ${chalk.bold('lock')} file to infer it.`)
}
