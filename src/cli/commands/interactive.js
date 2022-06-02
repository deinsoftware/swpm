import { translateArgs } from '../../helpers/args.js'

const middleware = (yargs) => {
  if ('latest' in yargs) {
    translateArgs(yargs, '--latest', '-L')
  }
}

const interactive = {
  command: 'interactive [args] [FLAGS]',
  aliases: ['ui'],
  desc: 'update packages interactive',
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
      usage: '$0 interactive --latest'
    })

    yargs.option('global', {
      alias: 'g',
      type: 'boolean',
      desc: 'update package as global',
      usage: '$0 update --global'
    })

    yargs.middleware(middleware)

    return yargs
  }
}

export default interactive
