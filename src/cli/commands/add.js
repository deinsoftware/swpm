import { translateFlag } from '../../helpers/args.js'

const add = {
  command: 'add <package> [FLAGS]',
  aliases: ['a'],
  desc: 'add package',
  conflicts: ['install'],
  builder: (yargs) => {
    yargs.positional('package', {
      type: 'string',
      desc: '<package>'
    })

    yargs.option('save-dev', {
      alias: 'D',
      type: 'boolean',
      desc: 'add package as devDependencies',
      usage: '$0 add <package> --save-dev',
      implies: ['package']
    })

    yargs.option('save-exact', {
      alias: 'E',
      type: 'boolean',
      desc: 'add package as devDependencies',
      usage: '$0 add <package> --save-exact',
      implies: ['package']
    })

    yargs.option('global', {
      alias: 'g',
      type: 'boolean',
      desc: 'add package as global',
      usage: '$0 add <package> --global',
      implies: ['package']
    })

    yargs.middleware((yargs) => {
      if ('save-dev' in yargs) {
        translateFlag('--save-dev', '-D')
      }

      if ('save-exact' in yargs) {
        translateFlag('--save-exact', '-E')
      }
    })

    return yargs
  }
}

export default add
