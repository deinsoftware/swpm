import { exit } from 'node:process'
import chalk from 'chalk'
import { getPackageJson, savePackageJson } from '../helpers/files.js'
import { PackageConfiguration } from '../packages/packages.types.js'

type Props = {
  cmd: PackageConfiguration['cmd']
  config: Pick<PackageConfiguration, 'color'>
}

export const pinPackageManager = async ({ cmd, config }: Props) => {
  const packageJson = await getPackageJson()

  if (packageJson) {
    packageJson.swpm = cmd
    await savePackageJson(packageJson)
    console.log(`${chalk.green.bold('success')}: ${chalk.hex(config.color).bold(cmd)} was pinned on ${chalk.bold('package.json')} file.`)
    exit(0)
  }
}
