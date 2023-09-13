import { runCommand, showCommand } from './cmds.js'
import packagesList from 'packages/list'
import { PackageManager } from 'packages/packages.types.js'

export const setPackageVersion = async (cmd: PackageManager) => {
  const getPackageVersion = packagesList.filter((pkg) => pkg.cmd === cmd) ?? []

  if (getPackageVersion.length) {
    const [config] = getPackageVersion

    if (config.version) {
      const pkg = {
        origin: null,
        cmd,
        args: ['set', 'version', config.version],
        config
      }

      showCommand(pkg)
      await runCommand(pkg)
    }
  }
}
