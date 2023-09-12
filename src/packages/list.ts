import npm from './managers/npm'
import yarn from './managers/yarn'
import yarnBerry from './managers/yarn@berry'
import pnpm from './managers/pnpm'
import bun from './managers/bun'
import { PackageConfiguration, PackageManager } from './packages.types'

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

export const packageExists = (pkg: PackageManager) => {
  return availablePackages().includes(pkg)
}

export const getPackageConfiguration = async (pkg: Pick<PackageConfiguration, 'cmd'>)=> {
  try {
    const config = await import(`./managers/${pkg.cmd}.ts`)
    return config?.default
  } catch {
    return {}
  }
}

export default packageManagerList
