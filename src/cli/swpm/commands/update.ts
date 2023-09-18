import { CommandModule } from 'yargs'

type Options = {
  'package'?: string
  'global'?: boolean
}

const update: CommandModule<Record<string, unknown>, Options> = {
  command: 'update <package> [args] [FLAGS]',
  aliases: ['up', 'ud'],
  describe: 'update package',

  builder: (yargs)  =>
    yargs
      .positional('package', {
        type: 'string',
        desc: '<package>'
      })
      .conflicts('update',['add', 'clean', 'install', 'remove', 'upgrade'])
      .option('global', {
        alias: 'g',
        type: 'boolean',
        desc: 'update package as global',
        usage: '$0 update <package> --global',
        implies: ['package']
      }),

  handler: () => {}
}

export default update