import npm from './managers/npm.js'
import yarn from './managers/yarn.js'
import yarnBerry from './managers/yarn@berry.js'
import pnpm from './managers/pnpm.js'
import bun from './managers/bun.js'
import { PackageManagerList } from './packages.types.js'
import { CommanderPackage } from '../translator/commander.types.js'

const packageManagerList = [
  npm,
  yarn,
  yarnBerry,
  pnpm,
  bun
]

export const availablePackages = () => {
  return packageManagerList.map((pkg) => pkg.cmd)
}

export const packageExists = (pkg: PackageManagerList) => {
  return availablePackages().includes(pkg)
}

export const getPackageConfiguration = async (cmdr: Pick<CommanderPackage, 'cmd'>, ext: 'js' | 'ts' = 'js') => {
  try {
    const config = await import(`./managers/${cmdr.cmd}.${ext}`)
    return config?.default
  } catch {
    return {}
  }
}

export default packageManagerList
