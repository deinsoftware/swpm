import { Argv, CommandModule } from 'yargs'

const update: CommandModule = {
  command: 'update <package> [args] [FLAGS]',
  aliases: ['up', 'ud'],
  describe: 'update package',

  builder: (yargs: Argv<{}>)  => {
    yargs.positional('package', {
      type: 'string',
      desc: '<package>'
    })

    yargs.conflicts('update',['add', 'clean', 'install', 'remove', 'upgrade'])

    yargs.option('global', {
      alias: 'g',
      type: 'boolean',
      desc: 'update package as global',
      usage: '$0 update <package> --global',
      implies: ['package']
    })

    return yargs
  },

  handler: (): void => {}
}

export default update