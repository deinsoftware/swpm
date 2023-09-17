import { runCommand, showCommand } from './cmds.js'
import packagesList from 'packages/list'
import { PackageManagerList } from 'packages/packages.types'
import { PackageCommand } from 'types/swpm.types'

export const setPackageVersion = async (packageName: PackageManagerList) => {
  const getPackageVersion = packagesList.filter((pkg) => pkg.cmd === packageName) ?? []

  if (getPackageVersion.length) {
    const [config] = getPackageVersion

    if (config.version) {
      const pkg: PackageCommand = {
        cmd: packageName,
        args: ['set', 'version', config.version],
        origin: null,
        config
      }

      showCommand(pkg)
      await runCommand(pkg)
    }
  }
}
