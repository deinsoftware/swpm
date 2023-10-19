import { findVoltaGlobals, translateArgs } from '../../../helpers/args.js'
import cmdr from '../../../translator/commander.js'

import type{ CommandModule } from 'yargs'

type OptionsProps = {
  'package'?: string,
  'save-dev'?: boolean,
  'save-optional'?: boolean,
  'save-peer'?: boolean,
  'global'?: boolean
}

const remove: CommandModule<Record<string, unknown>, OptionsProps> = {
  command: 'remove <package> [args]',
  aliases: ['r', 'rm', 'uninstall', 'un'],
  describe: 'remove package',

  builder: (yargs) =>
    yargs
      .conflicts('remove', ['add', 'clean', 'open', 'install', 'update', 'upgrade'])
      .positional('package', {
        type: 'string',
        desc: '<package>'
      })
      .option('save-dev', {
        alias: 'D',
        type: 'boolean',
        desc: 'remove package as devDependencies',
        usage: '$0 remove <package> --save-dev',
        implies: ['package'],
        conflicts: ['save-optional', 'save-peer']
      })
      .option('save-optional', {
        alias: 'O',
        type: 'boolean',
        desc: 'remove package as optionalDependencies',
        usage: '$0 remove <package> --save-optional',
        implies: ['package'],
        conflicts: ['save-dev', 'save-peer']
      })
      .option('save-peer', {
        type: 'boolean',
        desc: 'remove package as peerDependencies',
        usage: '$0 remove <package> --save-peer',
        implies: ['package'],
        conflicts: ['save-dev', 'save-optional']
      })
      .option('global', {
        alias: 'g',
        type: 'boolean',
        desc: 'remove package as global',
        usage: '$0 remove <package> --global',
        implies: ['package']
      }),

  handler: async (yargs) => {
    if (!cmdr?.cmd) return

    if (findVoltaGlobals({ yargs, cmdr, flags: ['uninstall', 'remove'] })
    ) {
      if (('pkg' in yargs) && ('package' in yargs)) {
        cmdr.cmd = 'volta'
        cmdr.args = ['uninstall', yargs.package!]
      }
    }

    if ('save-dev' in yargs) {
      await translateArgs({ yargs, cmdr, flag: '--save-dev', alias: '-D' })
    }

    if ('save-optional' in yargs) {
      await translateArgs({ yargs, cmdr, flag: '--save-optional', alias: '-O' })
    }

    if ('save-peer' in yargs) {
      await translateArgs({ yargs, cmdr, flag: '--save-peer' })
    }
  }
}

export default remove
