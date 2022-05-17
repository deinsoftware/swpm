import chalk from 'chalk'
import { getPackageJson, lockFileExists } from '../helpers/files.js'
import packagesList, { getPackageConfiguration, packageExists } from '../packages/list.js'

const packageName = 'package.json'

export const showCurrentPackageManager = async (pkg) => {
  const config = await getPackageConfiguration(pkg)
  console.log(`Package Manager: ${chalk.hex(config.color).bold(pkg)}`)
  process.exit(1)
}

const searchOnPackageJson = async () => {
  const packageJson = await getPackageJson()
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
    const exists = await lockFileExists(pkg.lockFile)
    if (exists) {
      return pkg.cmd
    }
  }

  return undefined
}

export const getCurrentPackageManager = async () => {
  const pinned = await searchOnPackageJson()
  if (pinned) {
    return pinned
  }

  const lock = await searchForLockFiles()
  if (lock) {
    return lock
  }

  console.log(`${chalk.yellow.bold('Warning')}: there is no Package Manager pinned on ${chalk.bold(packageName)} or a ${chalk.bold('lock')} file to infer it.`)
  process.exit(1)
}
