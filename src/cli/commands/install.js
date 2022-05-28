import { exit } from 'node:process'
import chalk from 'chalk'
import { stripIndents } from 'common-tags'
import { translateFlag } from '../../helpers/args.js'

const middleware = (yargs) => {
  if ('frozen-lockfile' in yargs) {
    translateFlag(yargs, '--frozen-lockfile', '--FL')
  }

  if ('FLAGS' in yargs) {
    console.log(stripIndents`
      ${chalk.red.bold('Error')}: to install a specific ${chalk.bold('<package>')} 
      please use ${chalk.bold('add')} command.

      ${chalk.blue.bold('swpm add <package> [FLAGS]')}
    `)

    // TODO: ask to auto transform

    exit(1)
  }
}

const install = {
  command: 'install [FLAGS]',
  aliases: ['i'],
  desc: 'install packages from package.json',
  conflicts: ['add, remove'],
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

    yargs.middleware(middleware)

    return yargs
  }
}

export default install
