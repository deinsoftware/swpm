import { exit } from 'node:process'
import { stripIndents } from 'common-tags'
import chalk from 'chalk'

import { getCommandResult } from '../helpers/cmds.js'
import { getOriginIcon } from '../helpers/icons.js'
import { getSwpmInfo } from '../helpers/info.js'
import { CommanderPackage } from '../translator/commander.types.js'
import { commandVerification } from '../helpers/get.js'

export const showNoPackageDetected = () => {
  console.error(stripIndents`
  ${chalk.red.bold('Error')}: no Package Manager or Environment Variable was found.

  Please review if the current path has a ${chalk.bold('package.json')} or a ${chalk.bold('lock')} file.
  Highly recommend pin a Package Manager with ${chalk.blue.bold('swpm --pin <npm|yarn[@berry]|pnpm|bun>')} command.
`)
  exit(1)
}

export const showPackageInformation = async ({ cmd, origin, config }: CommanderPackage) => {
  const bunVersion = getCommandResult({ command: 'bun --version' })

  const { version: swpmVersion } = await getSwpmInfo()

  const color = config?.color ?? chalk.reset()
  const url = config?.url ?? ''

  let message = stripIndents`${chalk.hex('#368fb9').bold('s')}${chalk.hex('#4e4e4e').bold('w')}${chalk.hex('#f8ae01').bold('p')}${chalk.hex('#e32e37').bold('m')} for ${chalk.hex('#fbf0df').bold('Bun')}
  --------------------------------`
  if (cmd) {
    message += `${chalk.bold('using')}: \t${chalk.hex(color).bold(cmd)} \n`
  } else {
    message += stripIndents`
      No Package Manager or Environment Variable was found.

      Please review if the current path has a ${chalk.bold('package.json')} or a ${chalk.bold('lock')} file.
      Highly recommend pin a Package Manager with ${chalk.blue.bold('swpm --pin <npm|yarn[@berry]|pnpm|bun>')} command.
    `
    message += '\n'
  }

  if (origin) {
    message += `${chalk.bold('origin')}: ${getOriginIcon(origin)} ${origin} \n`
  }

  message += `
    ${chalk.bold('Versions:')}
    ${chalk.hex('#368fb9').bold('s')}${chalk.hex('#4e4e4e').bold('w')}${chalk.hex('#f8ae01').bold('p')}${chalk.hex('#e32e37').bold('m')}: \t${swpmVersion}
    ${chalk.hex('#fbf0df').bold('Bun')}: \t${bunVersion?.replace(/v/, '')}
    `

  const isInstalled = !!cmd && await commandVerification(cmd)
  const packageVersion = isInstalled ? getCommandResult({ command: `${cmd} --version` }) : 'not found'
  if (config?.cmd) {
    message += `${chalk.hex(color).bold(cmd)}: \t${packageVersion}`
  }
  if (!isInstalled && config?.cmd) {
    message += `

    Install ${chalk.hex(color).bold(cmd)}.`
    if (url) {
      message += `Visit ${chalk.blue.bold(url)} for more information`
    }
  }

  console.log(stripIndents`${message}`)

  exit(0)
}
