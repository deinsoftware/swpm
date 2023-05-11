import { runCommand, showCommand } from '../helpers/cmds.js'
import packagesList from '../packages/list.js'

export const setPackageVersion = async ($0, cmd) => {
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
      await runCommand($0, pkg)
    }
  }
}
