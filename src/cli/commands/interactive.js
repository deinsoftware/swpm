const interactive = {
  command: 'interactive [FLAGS]',
  aliases: ['ui'],
  desc: 'update packages interactive',
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

export default interactive
