import npm from './managers/npm'
import yarn from './managers/yarn'
import yarnBerry from './managers/yarn@berry'
import pnpm from './managers/pnpm'
import bun from './managers/bun'
import { PackageManagerList } from 'packages/packages.types'
import { CommanderPackage } from 'translator/commander.types'

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

export const getPackageConfiguration = async (cmdr: Pick<CommanderPackage, 'cmd'>)=> {
  try {
    const config = await import(`./managers/${cmdr.cmd}.ts`)
    return config?.default
  } catch {
    return {}
  }
}

export default packageManagerList
