import { exit } from 'node:process'
import { stripIndents } from 'common-tags'
import chalk from 'chalk'
import { getCommandResult } from '../helpers/cmds.js'
import { getOriginIcon } from '../helpers/icons.js'
import { getSwpmInfo } from '../helpers/info.js'

export const showPackageInformation = async ({ origin, cmd, config, volta }) => {
  const nodeVersion = getCommandResult('node --version', volta)

  const isInstalled = !!(await getCommandResult(`command -v ${cmd}`))
  const packageVersion = isInstalled ? await getCommandResult(`${cmd} --version`, volta) : 'not found'

  const { version: swpmVersion } = await getSwpmInfo()

  let message = ''
  message += `${chalk.bold('using')}: \t${chalk.hex(config.color).bold(cmd)} \n`

  if (origin) {
    message += `${chalk.bold('origin')}: ${getOriginIcon(origin)} ${origin} \n`
  }

  if (volta) {
    message += `${chalk.bold('volta')}: \t${chalk.yellow('⚡')} detected \n`
  }

  message += `
    ${chalk.bold('Versions:')}
    ${chalk.hex('#368fb9').bold('s')}${chalk.hex('#4e4e4e').bold('w')}${chalk.hex('#f8ae01').bold('p')}${chalk.hex('#e32e37').bold('m')}: \t${swpmVersion}
    ${chalk.hex('#689e65').bold('Node')}: \t${nodeVersion?.replace(/v/, '')}
    ${chalk.hex(config.color).bold(cmd)}: \t${packageVersion}
  `
  if (!isInstalled) { // TODO: different message if npm was not found
    message += `

    Install ${chalk.hex(config.color).bold(cmd)} with ${chalk.blue.bold(`npm install ${cmd} --global`)} command
    Visit ${chalk.blue.bold(config.url)} for more information
    `
  }
  console.log(stripIndents`${message}`)

  exit(0)
}
