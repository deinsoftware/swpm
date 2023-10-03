import { CommandModule } from 'yargs'
import { translateArgs } from '../../../helpers/args.js'
import cmdr from '../../../translator/commander.js'

type OptionsProps = {
  package?: string
  'save-dev'?: boolean
  'save-optional'?: boolean
  'save-peer'?: boolean
  'global'?: boolean
}

const add: CommandModule<Record<string, unknown>, OptionsProps> = {
  command: 'add <package> [args]',
  aliases: ['a'],
  describe: 'add package',

  builder: (yargs) =>
    yargs
      .conflicts('add', ['clean', 'open', 'install', 'remove', 'update', 'upgrade'])
      .positional('package', {
        type: 'string',
        desc: '<package>'
      })
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
    if (!cmdr?.cmd) return

    if ('save-dev' in yargs) {
      translateArgs({ yargs, cmdr, flag: '--save-dev', alias: '-D' })
    }

    if ('save-optional' in yargs) {
      translateArgs({ yargs, cmdr, flag: '--save-optional', alias: '-O' })
    }

    if ('save-peer' in yargs) {
      translateArgs({ yargs, cmdr, flag: '--save-peer' })
    }

    if ('save-exact' in yargs) {
      translateArgs({ yargs, cmdr, flag: '--save-exact', alias: '-E' })
    }
  }
}

export default add
