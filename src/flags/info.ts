import { exit } from 'node:process'
import { stripIndents } from 'common-tags'
import chalk from 'chalk'
import commandExists from 'command-exists'

import { getCommandResult } from 'helpers/cmds'
import { getOriginIcon } from 'helpers/icons'
import { OriginIcons } from 'helpers/icons.types'
import { getSwpmInfo } from 'helpers/info'
import { PackageConfiguration, PackageManagerList } from 'packages/packages.types'

const commandVerification = async (cmd: string) => {
  try {
    await commandExists(cmd)
    return true
  } catch (error) {
    return false
  }
}

type Props = {
  origin?: OriginIcons,
  cmd: PackageManagerList,
  config: Pick<PackageConfiguration, 'color' | 'url'>
  volta?: boolean
}

export const showPackageInformation = async ({ origin, cmd, config, volta }: Props) => {
  const bunVersion = getCommandResult('bun --version', volta)

  const isInstalled = await commandVerification(cmd)
  const packageVersion = isInstalled ? getCommandResult(`${cmd} --version`, volta) : 'not found'

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
    ${chalk.hex('#689e65').bold('Bun')}: \t${bunVersion?.replace(/v/, '')}
    ${chalk.hex(config.color).bold(cmd)}: \t${packageVersion}
  `
  if (!isInstalled) {
    message += `

    Install ${chalk.hex(config.color).bold(cmd)}>. Visit ${chalk.blue.bold(config.url)} for more information
    `
  }
  console.log(stripIndents`${message}`)

  exit(0)
}
