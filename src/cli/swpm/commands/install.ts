import { CommandModule } from 'yargs'
import { exit } from 'node:process'
import chalk from 'chalk'
import { stripIndents } from 'common-tags'
import { translateArgs } from 'helpers/args'
import cmdr from 'translator/commander'

type Options = {
  'package-lock'?: boolean,
  'frozen'?: boolean
}

const install: CommandModule<Record<string, unknown>, Options> = {
  command: 'install [FLAGS]',
  aliases: ['i'],
  describe: 'install packages from package.json',

  builder: (yargs) =>
    yargs
      .conflicts('install',['add', 'clean', 'remove', 'update', 'upgrade'])
      .option('package-lock', {
        alias: 'P',
        type: 'boolean',
        description: 'ignore lock file when installing and prevents writing',
        usage: '$0 install --package-lock',
        conflicts: ['frozen']
      } as const)
      .option('frozen', {
        alias: 'F',
        type: 'boolean',
        description: 'install from lock file (without updating it)',
        usage: '$0 install --frozen',
        conflicts: ['package-lock']
      } as const),

  handler: (yargs) => {
    if ('package-lock' in yargs) {
      translateArgs(yargs, cmdr,'--package-lock', '-P')
    }

    if ('frozen' in yargs) {
      translateArgs(yargs, cmdr, '--frozen', '-F')
    }

    if ('FLAGS' in yargs || 'global' in yargs) {
      console.error(stripIndents`
        ${chalk.red.bold('Error')}: to install a specific ${chalk.bold('<package>')} please use ${chalk.bold('add')} command.

        ${chalk.blue.bold('swpm add <package> [FLAGS]')}
      `)

      // TODO: ask to auto transform install to add
      // https://github.com/terkelg/prompts

      exit(1)
    }
  }
}

export default install
