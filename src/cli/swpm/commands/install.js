import { exit } from 'node:process'
import chalk from 'chalk'
import { stripIndents } from 'common-tags'
import { translateArgs } from '../../../helpers/args.js'

const middleware = (yargs) => {
  if ('package-lock' in yargs) {
    translateArgs(yargs, '--package-lock', '-P')
  }

  if ('frozen-lockfile' in yargs) {
    translateArgs(yargs, '--frozen', '-F')
  }

  if ('FLAGS' in yargs) {
    console.error(stripIndents`
      ${chalk.red.bold('Error')}: to install a specific ${chalk.bold('<package>')}
      please use ${chalk.bold('add')} command.

      ${chalk.blue.bold('swpm add <package> [FLAGS]')}
    `)

    // TODO: ask to auto transform install to add

    exit(1)
  }
}

const install = {
  command: 'install [FLAGS]',
  aliases: ['i'],
  desc: 'install packages from package.json',
  conflicts: ['add', 'clean', 'remove', 'update', 'upgrade'],
  builder: (yargs) => {
    yargs.option('package-lock', {
      alias: 'P',
      type: 'boolean',
      description: 'ignore lock file when installing and prevents writing',
      usage: '$0 install --package-lock',
      conflicts: ['frozen-lockfile']
    })

    yargs.option('frozen-lockfile', {
      alias: 'F',
      type: 'boolean',
      description: 'install from lock file (without updating it)',
      usage: '$0 install --frozen',
      conflicts: ['package-lock']
    })

    yargs.middleware(middleware)

    return yargs
  }
}

export default install
