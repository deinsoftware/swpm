import { CommandModule } from 'yargs'
import { findVoltaGlobals, translateArgs } from '../../../helpers/args.js'
import cmdr, { setCommander } from '../../../translator/commander.js'

interface Options {
  package?: string
  'save-dev'?: boolean
  'save-optional'?: boolean
  'save-peer'?: boolean
  'global'?: boolean
}

const add: CommandModule<Record<string, unknown>, Options> = {
  command: 'add <package> [args] [FLAGS]',
  aliases: ['a'],
  describe: 'add package',

  builder: (yargs) =>
    yargs
      .positional('package', {
        type: 'string',
        desc: '<package>'
      })
      .conflicts('add', ['clean', 'install', 'remove', 'update', 'upgrade'])
      .option('save-dev', {
        alias: 'D',
        type: 'boolean',
        desc: 'add package as devDependencies',
        usage: '$0 add <package> --save-dev',
        implies: ['package'],
        conflicts: ['save-optional', 'save-peer']
      })
      .option('save-optional', {
        alias: 'O',
        type: 'boolean',
        desc: 'add package as optionalDependencies',
        usage: '$0 add <package> --save-optional',
        implies: ['package'],
        conflicts: ['save-dev', 'save-peer']
      })
      .option('save-peer', {
        type: 'boolean',
        desc: 'add package as peerDependencies',
        usage: '$0 add <package> --save-peer',
        implies: ['package'],
        conflicts: ['save-dev', 'save-optional']
      })
      .option('save-exact', {
        alias: 'E',
        type: 'boolean',
        desc: 'add package as exact version',
        usage: '$0 add <package> --save-exact',
        implies: ['package']
      })
      .option('global', {
        alias: 'g',
        type: 'boolean',
        desc: 'add package as global',
        usage: '$0 add <package> --global',
        implies: ['package']
      }),

  handler: (yargs) => {
    if (!yargs?.pkg) return

    if (yargs?.package && findVoltaGlobals({ yargs, cmdr, flags: ['add', 'install'] })
    ) {
      setCommander({
        cmd: 'volta',
        args: ['install', yargs.package]
      })
    }

    if (yargs?.['save-dev']) {
      translateArgs({ yargs, cmdr, flag: '--save-dev', alias: '-D' })
    }

    if (yargs?.['save-optional']) {
      translateArgs({ yargs, cmdr, flag: '--save-optional', alias: '-O' })
    }

    if (yargs?.['save-peer']) {
      translateArgs({ yargs, cmdr, flag: '--save-peer' })
    }

    if (yargs?.['save-exact']) {
      translateArgs({ yargs, cmdr, flag: '--save-exact', alias: '-E' })
    }
  }
}

export default add
