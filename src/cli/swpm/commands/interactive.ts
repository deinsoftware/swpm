import { Argv, CommandModule, MiddlewareFunction } from 'yargs'
import { Yargs } from 'types/swpm.types'
import { translateArgs } from 'helpers/args'

const middleware: MiddlewareFunction = (yargs: Yargs) => {
  if ('latest' in yargs) {
    translateArgs(yargs, '--latest', '-L')
  }
}

const interactive: CommandModule = {
  command: 'interactive [args] [FLAGS]',
  aliases: ['ui'],
  describe: 'update packages interactive',

  builder: (yargs: Argv<{}>) => {
    yargs.positional('package', {
      type: 'string',
      desc: '<package>'
    })

    yargs.conflicts('interactive',['add', 'clean', 'install', 'remove', 'upgrade'])

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
  },

  handler: (): void => {}
}

export default interactive
