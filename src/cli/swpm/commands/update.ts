import { CommandModule } from 'yargs'

type OptionsProps = {
  'package'?: string
  'global'?: boolean
}

const update: CommandModule<Record<string, unknown>, OptionsProps> = {
  command: 'update <package> [args]',
  aliases: ['up', 'ud'],
  describe: 'update package',

  builder: (yargs) =>
    yargs
      .conflicts('update', ['add', 'clean', 'open', 'install', 'remove', 'upgrade'])
      .positional('package', {
        type: 'string',
        desc: '<package>'
      })
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
