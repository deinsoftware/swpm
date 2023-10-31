import { exit, env } from 'node:process'
import { stripIndents } from 'common-tags'
import chalk from 'chalk'
import semver from 'semver'
import commandExists from 'command-exists'
import { getPackageJson, lockFileExists } from '../helpers/files.js'
import packagesList, { packageExists } from '../packages/list.js'

import type { PackageManagerList } from '../packages/packages.types.js'
import type { CommanderPackage, PackageJson } from '../translator/commander.types.js'

const propertyExists = (packageJson: PackageJson, property: string) => {
  return (property in packageJson)
}

const getPackageManager = (packageJson: PackageJson, property: 'packageManager') => {
  let [cmd = '', version = '']: string[] = packageJson?.[property]?.split('@') ?? ['', '']

  if (version) {
    const compatiblePackage = packagesList.filter((pkg) => {
      return (
        pkg.semver &&
        pkg.cmd.startsWith(cmd) &&
        semver.satisfies(version, pkg.semver)
      )
    }) ?? []

    if (compatiblePackage && compatiblePackage.length > 0) {
      const pkg = compatiblePackage.at(0)
      if (pkg && cmd in pkg) {
        cmd = pkg.cmd
      }
    }
  }

  return cmd
}

const getPropertyValue = async (packageJson: PackageJson, property: 'swpm' | 'packageManager') => {
  if (!packageJson || !propertyExists(packageJson, property)) {
    return
  }

  let prop = packageJson?.[property]
  if (property === 'packageManager') {
    prop = getPackageManager(packageJson, property)
  }
  if (prop && packageExists(prop as PackageManagerList)) {
    return prop
  }
}

const searchForLockFiles = async () => {
  for (const pkg of packagesList) {
    const exists = (
      await Promise.all(pkg.lockFiles.map(lockFileExists))
    ).every(Boolean)

    if (exists) {
      return pkg.cmd
    }
  }
}

const searchForEnv = (name: 'SWPM') => {
  if (!(name in env)) {
    return
  }

  const value = env[name]
  if (value && packageExists(value as PackageManagerList)) {
    return value
  }

  console.error(stripIndents`
    ${chalk.red.bold('Error')}: the value (${chalk.bold(value)}) in SWPM environment variable is not valid.
    Fix it using one of this values ${chalk.blue.bold('<npm|yarn[@berry]|pnpm|bun>')}.
  `)
  exit(1)
}

export const getCurrentPackageManager = async (): Promise<{origin: CommanderPackage['origin'], cmd: PackageManagerList} | undefined> => {
  const packageJson = await getPackageJson()

  if (packageJson) {
    const pinned = await getPropertyValue(packageJson, 'swpm') as PackageManagerList
    if (pinned && packageExists(pinned)) {
      return { origin: 'pinned', cmd: pinned }
    }

    // https://nodejs.org/api/corepack.html
    const packageManager = await getPropertyValue(packageJson, 'packageManager') as PackageManagerList
    if (packageManager && packageExists(packageManager)) {
      return { origin: 'packageManager', cmd: packageManager }
    }
  }

  const lock = await searchForLockFiles() as PackageManagerList
  if (lock && packageExists(lock)) {
    return { origin: 'lock', cmd: lock }
  }

  const envSwpm = searchForEnv('SWPM') as PackageManagerList
  if (envSwpm && packageExists(envSwpm)) {
    return { origin: 'environment', cmd: envSwpm }
  }
}

// https://volta.sh/
export const detectVoltaPin = async (cmdr: CommanderPackage) => {
  if (!cmdr?.cmd) return

  const isVoltaInstalled = await commandVerification('volta')
  if (!isVoltaInstalled) return

  const packageJson = await getPackageJson()
  if (!packageJson) return

  const prop = 'volta'
  if (!propertyExists(packageJson, prop)) return
  if (packageJson[prop] === undefined) return

  return (cmdr.cmd in packageJson[prop])
}

export const commandVerification = async (cmd: PackageManagerList) => {
  try {
    await commandExists(cmd)
    return true
  } catch (error) {
    return false
  }
}
