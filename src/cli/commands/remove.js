import { translateFlag } from '../../helpers/args.js'

const remove = {
  command: 'remove <package> [FLAGS]',
  aliases: ['r', 'rm', 'uninstall', 'un'],
  desc: 'remove package',
  conflicts: ['install, add'],
  builder: (yargs) => {
    yargs.positional('package', {
      type: 'string',
      desc: '<package>'
    })

    yargs.option('save-dev', {
      alias: 'D',
      type: 'boolean',
      desc: 'remove package as devDependencies',
      usage: '$0 remove <package> --save-dev',
      implies: ['package'],
      conflicts: ['save-optional, save-peer']
    })

    yargs.option('save-optional', {
      alias: 'O',
      type: 'boolean',
      desc: 'remove package as optionalDependencies',
      usage: '$0 remove <package> --save-optional',
      implies: ['package'],
      conflicts: ['save-dev, save-peer']
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

    yargs.middleware((yargs) => {
      if ('save-dev' in yargs) {
        translateFlag(yargs, '--save-dev', '-D')
      }

      if ('save-optional' in yargs) {
        translateFlag(yargs, '--save-optional', '-O')
      }

      if ('save-peer' in yargs) {
        translateFlag(yargs, '--save-peer')
      }
    })

    return yargs
  }
}

export default remove