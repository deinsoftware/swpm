import { translateArgs } from '../../../helpers/args.js'

const middleware = (yargs) => {
  if ('save-exact' in yargs) {
    translateArgs(yargs, '--save-exact', '-E')
  }

  if ('latest' in yargs) {
    translateArgs(yargs, '--latest', '-L')
  }
}

const upgrade = {
  command: 'upgrade <package> [args] [FLAGS]',
  aliases: ['ug'],
  desc: 'upgrade package to latest',
  conflicts: ['add', 'clean', 'install', 'remove', 'upgrade'],
  builder: (yargs) => {
    yargs.positional('package', {
      type: 'string',
      desc: '<package>'
    })

    yargs.option('latest', {
      alias: 'L',
      type: 'boolean',
      desc: 'upgrade the latest version of the package',
      usage: '$0 upgrade <package> --latest',
      implies: ['package']
    })

    yargs.option('save-exact', {
      alias: 'E',
      type: 'boolean',
      desc: 'upgrade package as exact version',
      usage: '$0 add <package> --save-exact',
      implies: ['package']
    })

    yargs.option('global', {
      alias: 'g',
      type: 'boolean',
      desc: 'upgrade package as global',
      usage: '$0 upgrade <package> --global',
      implies: ['package']
    })

    yargs.middleware(middleware)

    return yargs
  }
}

export default upgrade
