import { translateFlag } from '../../helpers/args.js'

const install = {
  command: 'install [FLAGS]',
  aliases: ['i'],
  desc: 'install packages from package.json',
  usage: '$0 install',
  conflicts: ['add'],
  builder: (yargs) => {
    yargs.option('package-lock', {
      alias: 'PL',
      type: 'boolean',
      description: 'ignore lock file when installing and prevents writing',
      usage: '$0 install --package-lock',
      conflicts: ['frozen-lockfile']
    })

    yargs.option('frozen-lockfile', {
      alias: 'FL',
      type: 'boolean',
      description: 'install from lock file (without updating it)',
      usage: '$0 install --frozen-lockfile',
      conflicts: ['package-lock']
    })

    yargs.middleware((yargs) => {
      if ('frozen-lockfile' in yargs) {
        translateFlag('--frozen-lockfile', '--FL')
      }
    })

    return yargs
  }
}

export default install
