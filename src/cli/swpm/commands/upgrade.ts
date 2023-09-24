import { CommandModule } from 'yargs'
import { translateArgs } from '../../../helpers/args.js'
import cmdr from '../../../translator/commander.js'

type OptionsProps = {
  'package'?: string
  'latest'?: boolean
  'save-exact'?: boolean
  'global'?: boolean
}

const upgrade: CommandModule<Record<string, unknown>, OptionsProps> = {
  command: 'upgrade <package> [args]',
  aliases: ['ug'],
  describe: 'upgrade package to latest',

  builder: (yargs) =>
    yargs
      .conflicts('upgrade', ['add', 'clean', 'open', 'install', 'remove', 'upgrade'])
      .positional('package', {
        type: 'string',
        desc: '<package>'
      })
      .option('latest', {
        alias: 'L',
        type: 'boolean',
        desc: 'upgrade the latest version of the package',
        usage: '$0 upgrade <package> --latest',
        implies: ['package']
      })
      .option('save-exact', {
        alias: 'E',
        type: 'boolean',
        desc: 'upgrade package as exact version',
        usage: '$0 add <package> --save-exact',
        implies: ['package']
      })
      .option('global', {
        alias: 'g',
        type: 'boolean',
        desc: 'upgrade package as global',
        usage: '$0 upgrade <package> --global',
        implies: ['package']
      }),

  handler: (yargs) => {
    if (!cmdr?.cmd) return

    if ('save-exact' in yargs) {
      translateArgs({ yargs, cmdr, flag: '--save-exact', alias: '-E' })
    }

    if ('latest' in yargs) {
      translateArgs({ yargs, cmdr, flag: '--latest', alias: '-L' })
    }
  }
}

export default upgrade
