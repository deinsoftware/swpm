import { exit } from 'node:process'
import { stripIndents } from 'common-tags'
import chalk from 'chalk'
import commandExists from "command-exists";

import { getSwpmInfo } from '../helpers/info.js'

const commandVerification = async (cmd) => {
  try {
    await commandExists(cmd)
    return true
  } catch (error) {
    return false
  }
}

const aliases = {
  si: 'swpm install',
  sa: 'swpm add <package>',
  sae: 'swpm add <package> --save-exact',
  sad: 'swpm add <package> --save-dev',
  sade: 'swpm add <package> --save-dev --save-exact',
  sag: 'swpm add <package> --global',
  scn: 'swpm clean --node-modules',
  scl: 'swpm clean --lock',
  scb: 'swpm clean --build',
  scc: 'swpm clean --coverage',
  sca: 'swpm clean --all',
  sci: 'swpm clean --all + swpm install',
  sr: 'swpm run <script>',
  sx: 'swpx <package>',
}

export const showCommandAlias = async () => {
  const { version: swpmVersion } = await getSwpmInfo()

  let message = ''
  message += `
    ${chalk.bold('Version:')}
    ${chalk.hex('#368fb9').bold('s')}${chalk.hex('#4e4e4e').bold('w')}${chalk.hex('#f8ae01').bold('p')}${chalk.hex('#e32e37').bold('m')}: \t${swpmVersion}

    ${chalk.bold('Alias:')}
    `

  Object.entries(aliases).forEach(([alias, cmd]) => {
    if (commandVerification(alias)) {
      message += `${chalk.hex('#368fb9').bold(alias)}: \t${cmd}\n`
    }
  })

  console.log(stripIndents`${message}`)

  exit(0)
}