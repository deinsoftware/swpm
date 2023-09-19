import { CommandModule } from 'yargs'
import { findVoltaGlobals, translateArgs } from 'helpers/args'
import cmdr, { setCommander } from 'translator/commander'

type Options = {
  'package'?: string,
  'save-dev'?: boolean,
  'save-optional'?: boolean,
  'save-peer'?: boolean,
  'global'?: boolean
}

const remove: CommandModule<Record<string, unknown>, Options> = {
  command: 'remove <package> [args] [FLAGS]',
  aliases: ['r', 'rm', 'uninstall', 'un'],
  describe: 'remove package',

  builder: (yargs) =>
    yargs
      .positional('package', {
        type: 'string',
        desc: '<package>'
      })
      .conflicts('remove',['add', 'clean', 'install', 'update', 'upgrade'])
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

  handler: (yargs) => {
    if (findVoltaGlobals({yargs, cmdr, flags: ['uninstall', 'remove']})
    ) {
      if (yargs?.pkg && yargs?.package){
        setCommander({
          cmd: 'volta',
          args: ['uninstall', yargs.package],
        })
      }
    }

    if ('save-dev' in yargs) {
      translateArgs({yargs, cmdr, flag: '--save-dev', alias: '-D'})
    }

    if ('save-optional' in yargs) {
      translateArgs({yargs, cmdr, flag: '--save-optional', alias: '-O'})
    }

    if ('save-peer' in yargs) {
      translateArgs({yargs, cmdr, flag: '--save-peer'})
    }
  }
}

export default remove
