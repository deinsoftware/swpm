const update = {
  command: 'update <package> [args] [FLAGS]',
  aliases: ['up', 'ud'],
  desc: 'update package',
  conflicts: ['add', 'clean', 'install', 'remove', 'upgrade'],
  builder: (yargs) => {
    yargs.positional('package', {
      type: 'string',
      desc: '<package>'
    })

    yargs.option('global', {
      alias: 'g',
      type: 'boolean',
      desc: 'update package as global',
      usage: '$0 update <package> --global',
      implies: ['package']
    })

    return yargs
  }
}

export default update
