import { exit } from 'node:process'
import { stripIndents } from 'common-tags'
import chalk from 'chalk'
import commandExists from 'command-exists'

import { getSwpmInfo } from '../helpers/info.js'

const commandVerification = async (cmd: string) => {
  try {
    await commandExists(cmd)
    return true
  } catch (error) {
    return false
  }
}

const aliases = {
  sp: 'swpm --pin <npm|yarn[@berry]|pnpm|bun>',
  spn: 'swpm --pin npm',
  spy: 'swpm --pin yarn',
  spyb: 'swpm --pin yarn@berry',
  spp: 'swpm --pin pnpm',
  spb: 'swpm --pin bun',
  si: 'swpm install',
  sif: 'swpm install --frozen',
  sa: 'swpm add <package>',
  sae: 'swpm add <package> --save-exact',
  sad: 'swpm add <package> --save-dev',
  sade: 'swpm add <package> --save-dev --save-exact',
  sag: 'swpm add <package> --global',
  srm: 'swpm remove <package>',
  srg: 'swpm remove <package> --global',
  sup: 'swpm update [<package>]',
  sug: 'swpm upgrade <package>',
  sui: 'swpm interactive',
  scr: 'swpm create <package>',
  sr: 'swpm run <command>',
  sx: 'swpx <package>',
  scn: 'swpm clean --modules',
  scl: 'swpm clean --lock',
  scb: 'swpm clean --build',
  scd: 'swpm clean --dist',
  scc: 'swpm clean --coverage',
  sca: 'swpm clean --all',
  scf: 'swpm clean --fresh && swpm install --frozen',
  sci: 'swpm clean --all && swpm install'
}

export const showCommandAlias = async () => {
  const { version: swpmVersion } = await getSwpmInfo()

  let message = ''
  message += `
    ${chalk.bold('Version:')}
    ${chalk.hex('#368fb9').bold('s')}${chalk.hex('#4e4e4e').bold('w')}${chalk.hex('#f8ae01').bold('p')}${chalk.hex('#e32e37').bold('m')}: \t${swpmVersion}

    ${chalk.bold('Alias:')}
    `

  for (const [alias, cmd] of Object.entries(aliases)) {
    if (await commandVerification(alias)) {
      message += `${chalk.hex('#368fb9').bold(alias)}: \t${cmd}\n`
    }
  }
  console.log(stripIndents`${message}`)

  exit(0)
}
