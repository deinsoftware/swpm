import chalk from 'chalk'
import { execCommand } from '../helpers/cmd.js'
import { getPackageConfiguration } from '../packages/list.js'

export const getPackageInformation = async (pkg) => {
  const config = await getPackageConfiguration(pkg)

  const isInstalled = !!execCommand(`command -v ${pkg}`)

  if (!isInstalled) {
    console.log(`${chalk.red.bold('Error')}: ${chalk.bold(pkg)} is not installed.`)
    console.log(`Use ${chalk.blue.bold(`npm install ${pkg} --global`)} to install it,`)
    if (config.url) {
      console.log(`or visit ${chalk.blue.bold(config.url)} for instructions.`)
    }
    return undefined
  }

  const nodeVersion = execCommand('node --version').replace(/v/, '')
  const packageVersion = execCommand(`${pkg} --version`)

  console.log(`${chalk.hex('#689e65').bold('Node')}: \t${nodeVersion}`)
  console.log(`${chalk.hex(config.color).bold(pkg)}: \t${packageVersion}`)
  process.exit(1)
}
