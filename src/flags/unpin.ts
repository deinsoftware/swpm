import { exit } from 'node:process'
import chalk from 'chalk'
import { getPackageJson, savePackageJson } from '../helpers/files.js'
import { PackageConfiguration } from '../packages/packages.types.js'

type Props = {
  config: Pick<PackageConfiguration, 'color'>
}

export const unpinPackageManager = async ({ config }: Props) => {
  const packageJson = await getPackageJson()
  const currentCmd = packageJson?.swpm

  if (!currentCmd) {
    console.error(`${chalk.red.bold('Error')}: there is no package manager pinned on ${chalk.bold('package.json')} file.`)
    exit(1)
  }

  if (packageJson) {
    const newPackageJson = { ...packageJson }
    delete newPackageJson.swpm

    await savePackageJson(newPackageJson)
    console.log(`${chalk.green.bold('success')}: ${chalk.hex(config.color).bold(currentCmd)} was unpinned on ${chalk.bold('package.json')} file.`)
    exit(0)
  }
}
