import { stripIndents } from 'common-tags'
import chalk from 'chalk'
import { getPackageJson, lockFileExists } from '../helpers/files.js'
import packagesList, { packageExists } from '../packages/list.js'

const packageName = 'package.json'

const propertyExists = (packageJson, property) => {
  return (property in packageJson)
}

const getPropertyValue = async (packageJson, property) => {
  if (!packageJson || !propertyExists(packageJson, property)) {
    return
  }

  const prop = (property === 'packageManager') ? packageJson?.[property]?.split('@')?.[0] : packageJson?.[property]
  if (prop && packageExists(prop)) {
    return prop
  }

  console.log(stripIndents`
    ${chalk.red.bold('Error')}: the value (${chalk.bold(prop)}) in property on ${chalk.bold(packageName)} file is not valid.
    Use ${chalk.blue.bold('npm --pin <npm|yarn|pnpm>')} to fix it.
  `)
  process.exit(1)
}

const searchForLockFiles = async () => {
  for (const pkg of packagesList) {
    const exists = await lockFileExists(pkg.lockFile)
    if (exists) {
      return pkg.cmd
    }
  }
}

export const getCurrentPackageManager = async () => {
  const packageJson = await getPackageJson()

  if (packageJson) {
    const pinned = await getPropertyValue(packageJson, 'swpm')
    if (pinned) { return pinned }

    // https://nodejs.org/api/corepack.html
    const packageManager = await getPropertyValue(packageJson, 'packageManager')
    if (packageManager) { return packageManager }

    const lock = await searchForLockFiles()
    if (lock) { return lock }
  }

  console.log(stripIndents`
    ${chalk.red.bold('Error')}: no Package Manager was found.

    Please review if the current path has a ${chalk.bold(packageName)} or a ${chalk.bold('lock')} file.
    Highly recommend pin a Package Manager with ${chalk.blue.bold('swpm --pin <npm|yarn|pnpm>')} command.
  `)
  process.exit(1)
}

// https://volta.sh/
export const detectVoltaPin = async () => {
  const packageJson = await getPackageJson()

  if (packageJson) {
    const exists = propertyExists(packageJson, 'volta')
    return exists
  }
}
