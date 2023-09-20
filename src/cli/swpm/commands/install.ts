import { CommandModule } from 'yargs'
import { exit } from 'node:process'
import chalk from 'chalk'
import { stripIndents } from 'common-tags'
import { translateArgs } from '../../../helpers/args.js'
import cmdr from '../../../translator/commander.js'
import prompts from 'prompts'
import { spreadCommand } from '../../../helpers/cmds.js'

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

  handler: async(yargs) => {
    if (yargs?.['package-lock']) {
      translateArgs({yargs, cmdr, flag: '--package-lock', alias: '-P'})
    }

    if (yargs?.frozen) {
      translateArgs({yargs, cmdr, flag: '--frozen', alias: '-F'})
    }

    if (yargs.FLAGS || yargs?.global ) {
      const args  = ['add', ...cmdr.args.slice(1)]
      const command  = chalk.blue.bold(`swpm ${args.join(' ')}`)

      console.error(stripIndents`
        ${chalk.red.bold('Error')}: to install a specific ${chalk.bold('<package>')} please use ${chalk.bold('add')} command.
      `)

      const response = await prompts({
        type: 'confirm',
        name: 'value',
        message: `Do you want to re-run as ${command}`,
        initial: true
      })

      if (!response.value) {
        console.error(
          stripIndents`Re-run as ${command}`
        )
        exit(1)
      }

      spreadCommand({cmd: 'swpm', args})
    }
  }
}

export default install
