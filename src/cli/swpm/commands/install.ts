import { exit } from 'node:process'
import chalk from 'chalk'
import { stripIndents } from 'common-tags'
import { Yargs } from 'types/swpm.types'
import { Argv, CommandModule, MiddlewareFunction } from 'yargs'
import { translateArgs } from 'helpers/args'

const middleware: MiddlewareFunction = (yargs: Yargs) => {
  if ('package-lock' in yargs) {
    translateArgs(yargs, '--package-lock', '-P')
  }

  if ('frozen' in yargs) {
    translateArgs(yargs, '--frozen', '-F')
  }

  if ('FLAGS' in yargs || 'global' in yargs) {
    console.error(stripIndents`
      ${chalk.red.bold('Error')}: to install a specific ${chalk.bold('<package>')} please use ${chalk.bold('add')} command.

      ${chalk.blue.bold('swpm add <package> [FLAGS]')}
    `)

    // TODO: ask to auto transform install to add

    exit(1)
  }
}

const install: CommandModule = {
  command: 'install [FLAGS]',
  aliases: ['i'],
  describe: 'install packages from package.json',

  builder: (yargs: Argv<{}>) => {
    yargs.conflicts('install',['add', 'clean', 'remove', 'update', 'upgrade'])

    yargs.option('package-lock', {
      alias: 'P',
      type: 'boolean',
      description: 'ignore lock file when installing and prevents writing',
      usage: '$0 install --package-lock',
      conflicts: ['frozen']
    } as const)

    yargs.option('frozen', {
      alias: 'F',
      type: 'boolean',
      description: 'install from lock file (without updating it)',
      usage: '$0 install --frozen',
      conflicts: ['package-lock']
    } as const)

    yargs.middleware(middleware)

    return yargs
  },

  handler: (): void => {}
}

export default install
