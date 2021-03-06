import { exit } from 'node:process'
import chalk from 'chalk'
import { getPackageJson, savePackageJson } from '../helpers/files.js'

export const pinPackageManager = async ({ cmd, config }) => {
  const packageJson = await getPackageJson()

  if (packageJson) {
    packageJson.swpm = cmd
    await savePackageJson(packageJson)
    console.log(`${chalk.green.bold('Success')}: ${chalk.hex(config.color).bold(cmd)} was pinned on ${chalk.bold('package.json')} file.`)
    exit(0)
  }
}
