import { type } from 'node:os'
import { argv } from 'node:process'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { cleanArguments } from './helpers/cmd.js'
import { getCurrentPackageManager } from './options/get.js'
import { availablePackages, getPackageConfiguration } from './packages/list.js'

const yargv = await yargs(hideBin(process.argv))

  .command({
    command: 'install',
    aliases: ['i'],
    desc: 'install packages from package.json',
    usage: '$0 install',
    conflicts: ['add'],
    builder: (yargs) => {
      yargs.option('package-lock', {
        alias: 'PL',
        type: 'boolean',
        description: 'ignore package.lock when installing and prevents writing',
        usage: '$0 install <package> --save-dev',
        implies: ['package'],
        global: false
      })
    }
  })

  .command({
    command: 'add <package>',
    aliases: ['a'],
    desc: 'add package',
    usage: '$0 add <package> [--save-dev --global]',
    conflicts: ['install'],
    builder: (yargs) => {
      yargs.positional('package', {
        type: 'string',
        desc: '<package[@<#.#.#|latest>]> '
      })

      yargs.option('save-dev', {
        alias: 'D',
        type: 'boolean',
        desc: 'add package as devDependencies',
        usage: '$0 install <package> --save-dev',
        implies: ['package']
      })

      yargs.option('global', {
        alias: 'g',
        type: 'boolean',
        desc: 'add package as global',
        usage: '$0 install <package> --global',
        implies: ['package']
      })

      return yargs
    },
    handler: (argv) => {
      console.log(`setting ${argv.key} to ${argv.value}`)
    }
  })

  .option(
    'debug',
    {
      alias: 'd',
      describe: 'debug yargs parameters',
      type: 'boolean',
      default: false,
      hidden: true
    }
  )

  .option(
    'use',
    {
      alias: 'u',
      describe: 'use a package manager',
      choices: availablePackages(),
      conflicts: ['pin']
    }
  )

  .option(
    'pin',
    {
      alias: 'p',
      describe: 'pin a package manager',
      choices: availablePackages(),
      conflicts: ['use']
    }
  )

  .option(
    'test',
    {
      alias: 't',
      describe: 'test command (without running)',
      choices: availablePackages(),
      conflicts: ['pin', 'use']
    }
  )

  .option(
    'info',
    {
      describe: 'show information and versions',
      type: 'boolean',
      conflicts: ['pin', 'use', 'test']
    }
  )

  .middleware(async (yargs) => {
    const pkg = {
      cmd: '',
      args: argv.slice(2)
    }
    yargs.pkg = pkg

    if (yargs?.use) {
      cleanArguments(yargs.pkg.args, '--use', '-u')
      yargs.pkg.cmd = yargs.use
    }

    if (yargs?.pin) {
      yargs.pkg.cmd = yargs.pin
    }

    if (yargs?.test) {
      cleanArguments(yargs.pkg.args, '--see', '-s')
      yargs.pkg.cmd = yargs.test
    }

    if (!yargs?.pkg?.cmd || yargs?.info) {
      yargs.pkg.cmd = await getCurrentPackageManager()
    }

    if (yargs?.pkg?.cmd) {
      yargs.pkg.config = await getPackageConfiguration(yargs.pkg.cmd)
    }
  })

  .help()
  .version(false)
  .epilog('dein Software - copyright 2022')
  .argv

export default yargv
