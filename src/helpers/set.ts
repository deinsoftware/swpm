import { runCommand, showCommand } from './cmds.js'
import packagesList from 'packages/list'
import { PackageManager } from 'packages/packages.types'
import { PackageCommand } from 'types/swpm.types'

export const setPackageVersion = async (cmd: PackageManager) => {
  const getPackageVersion = packagesList.filter((pkg) => pkg.cmd === cmd) ?? []

  if (getPackageVersion.length) {
    const [config] = getPackageVersion

    if (config.version) {
      const pkg: PackageCommand = {
        cmd,
        args: ['set', 'version', config.version],
        origin: null,
        config
      }

      showCommand(pkg)
      await runCommand(pkg)
    }
  }
}
