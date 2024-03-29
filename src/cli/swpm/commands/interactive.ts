import { translateArgs } from '../../../helpers/args.js'
import cmdr from '../../../translator/commander.js'

import type { CommandModule } from 'yargs'

type OptionsProps = {
  'package'?: string
  'latest'?: boolean
  'global'?: boolean
}

const interactive: CommandModule<Record<string, unknown>, OptionsProps> = {
  command: 'interactive [args]',
  aliases: ['ui'],
  describe: 'update packages interactive',

  builder: (yargs) =>
    yargs
      .conflicts('interactive', ['add', 'clean', 'open', 'install', 'remove', 'upgrade'])
      .option('latest', {
        alias: 'L',
        type: 'boolean',
        desc: 'upgrade interactive the latest version of packages',
        usage: '$0 interactive --latest'
      })
      .option('global', {
        alias: 'g',
        type: 'boolean',
        desc: 'upgrade interactive global packages',
        usage: '$0 interactive --global'
      }),

  handler: async (yargs) => {
    if (!cmdr?.cmd) return

    if ('latest' in yargs) {
      await translateArgs({ yargs, cmdr, flag: '--latest', alias: '-L' })
    }
  }
}

export default interactive
