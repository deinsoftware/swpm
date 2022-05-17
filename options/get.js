import chalk from 'chalk'
import { getPackageJson, lockFileExists } from '../helpers/files.js'
import packagesList, { packageExists } from '../packages/list.js'

const packageName = 'package.json'

const searchOnPackageJson = () => {
  const packageJson = getPackageJson()
  if (!packageJson || !('swpm' in packageJson)) {
    return undefined
  }

  const pinned = packageJson?.swpm
  if (pinned && packageExists(pinned)) {
    return packageJson?.swpm
  }

  console.log(`${chalk.red.bold('Error')}: Package Manager (${chalk.bold(pinned)}) pinned on ${chalk.bold(packageName)} file is not valid.`)
  console.log(`Use ${chalk.blue.bold('npm --pin <npm|yarn|pnpm>')} to fix it.`)
  process.exit(1)
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
