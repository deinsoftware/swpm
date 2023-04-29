import { exit, env } from 'node:process'
import { stripIndents } from 'common-tags'
import chalk from 'chalk'
import semver from 'semver'
import { getPackageJson, lockFileExists } from './files.js'
import packagesList, { packageExists } from '../packages/list.js'

const packageName = 'package.json'

const propertyExists = (packageJson, property) => {
  return (property in packageJson)
}

const getPackageManager = (packageJson, property) => {
  let [cmd, version] = packageJson?.[property]?.split('@') ?? ['', '']

  if (version) {
    const compatiblePackage = packagesList.filter((pkg) => {
      return (
        pkg.semver &&
        pkg.cmd.startsWith(cmd) &&
        semver.satisfies(version, pkg.semver)
      )
    }) ?? []
    if (compatiblePackage.length) {
      const [pkg] = compatiblePackage
      cmd = pkg.cmd
    }
  }

  return `${cmd}`
}

const getPropertyValue = async (packageJson, property) => {
  if (!packageJson || !propertyExists(packageJson, property)) {
    return
  }

  let prop = packageJson?.[property]
  if (property === 'packageManager') {
    prop = getPackageManager(packageJson, property)
  }
  if (prop && packageExists(prop)) {
    return prop
  }

  console.error(stripIndents`
    ${chalk.red.bold('Error')}: the value (${chalk.bold(prop)}) in property on ${chalk.bold(packageName)} file is not valid.
    Use ${chalk.blue.bold('npm --pin <npm|yarn[@berry]|pnpm|bun>')} to fix it.
  `)
  exit(1)
}

const searchForLockFiles = async () => {
  for (const pkg of packagesList) {
    const exists = pkg.lockFiles.every(async (lockFile) => await lockFileExists(lockFile))
    if (exists) {
      return pkg.cmd
    }
  }
}

const searchForEnv = (name) => {
  if (!(name in env)) {
    return
  }

  const value = env[name]
  if (value && packageExists(value)) {
    return value
  }

  console.error(stripIndents`
    ${chalk.red.bold('Error')}: the value (${chalk.bold(value)}) in SWPM environment variable is not valid.
    Fix it using one of this values ${chalk.blue.bold('<npm|yarn[@berry]|pnpm|bun>')}.
  `)
  exit(1)
}

export const getCurrentPackageManager = async () => {
  const packageJson = await getPackageJson()

  if (packageJson) {
    const pinned = await getPropertyValue(packageJson, 'swpm')
    if (pinned) { return { origin: 'pinned', cmd: pinned } }

    // https://nodejs.org/api/corepack.html
    const packageManager = await getPropertyValue(packageJson, 'packageManager')
    if (packageManager) { return { origin: 'packageManager', cmd: packageManager } }
  }

  const envSwpm = searchForEnv('SWPM')
  if (envSwpm) { return { origin: 'environment', cmd: envSwpm } }

  const lock = await searchForLockFiles()
  if (lock) { return { origin: 'lock', cmd: lock } }

  console.error(stripIndents`
    ${chalk.red.bold('Error')}: no Package Manager or Environment Variable was found.

    Please review if the current path has a ${chalk.bold(packageName)} or a ${chalk.bold('lock')} file.
    Highly recommend pin a Package Manager with ${chalk.blue.bold('swpm --pin <npm|yarn[@berry]|pnpm|bun>')} command.
  `)
  exit(1)
}

// https://volta.sh/
export const detectVoltaPin = async (pkg) => {
  const packageJson = await getPackageJson()

  if (packageJson) {
    return (
      propertyExists(packageJson, 'volta') &&
      (pkg?.cmd in packageJson?.volta)
    )
  }
}
