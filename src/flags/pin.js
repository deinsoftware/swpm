import chalk from 'chalk'
import { getPackageJson, savePackageJson } from '../helpers/files.js'

export const pinPackageManager = async () => {
  const { cmd, config } = globalThis.pkg
  const packageJson = await getPackageJson()

  if (packageJson) {
    packageJson.swpm = cmd
    await savePackageJson(packageJson)
    console.log(`${chalk.green.bold('Success')}: ${chalk.hex(config.color).bold(cmd)} was pinned on ${chalk.bold('package.json')} file.`)
    process.exit(0)
  }
}
