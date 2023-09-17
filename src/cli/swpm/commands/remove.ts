import { Argv, CommandModule, MiddlewareFunction } from 'yargs'
import { Yargs } from 'types/swpm.types'
import { findVoltaGlobals, translateArgs } from 'helpers/args'

const middleware: MiddlewareFunction = (yargs: Yargs) => {
  if (findVoltaGlobals(yargs, ['uninstall', 'remove'])
  ) {
    yargs.pkg.cmd = 'volta'
    yargs.pkg.args = ['uninstall', yargs.package]
  }

  if ('save-dev' in yargs) {
    translateArgs(yargs, '--save-dev', '-D')
  }

  if ('save-optional' in yargs) {
    translateArgs(yargs, '--save-optional', '-O')
  }

  if ('save-peer' in yargs) {
    translateArgs(yargs, '--save-peer')
  }
}

const remove: CommandModule = {
  command: 'remove <package> [args] [FLAGS]',
  aliases: ['r', 'rm', 'uninstall', 'un'],
  describe: 'remove package',

  builder: (yargs: Argv<{}>) => {
    yargs.positional('package', {
      type: 'string',
      desc: '<package>'
    })

    yargs.conflicts('remove',['add', 'clean', 'install', 'update', 'upgrade'])

    yargs.option('save-dev', {
      alias: 'D',
      type: 'boolean',
      desc: 'remove package as devDependencies',
      usage: '$0 remove <package> --save-dev',
      implies: ['package'],
      conflicts: ['save-optional', 'save-peer']
    })

    yargs.option('save-optional', {
      alias: 'O',
      type: 'boolean',
      desc: 'remove package as optionalDependencies',
      usage: '$0 remove <package> --save-optional',
      implies: ['package'],
      conflicts: ['save-dev', 'save-peer']
    })

    yargs.option('save-peer', {
      type: 'boolean',
      desc: 'remove package as peerDependencies',
      usage: '$0 remove <package> --save-peer',
      implies: ['package'],
      conflicts: ['save-dev', 'save-optional']
    })

    yargs.option('global', {
      alias: 'g',
      type: 'boolean',
      desc: 'remove package as global',
      usage: '$0 remove <package> --global',
      implies: ['package']
    })

    yargs.middleware(middleware)

    return yargs
  },

  handler: (): void => {}
}

export default remove
