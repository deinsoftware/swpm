import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { availablePackages } from './packages/list.js'

const argv = yargs(hideBin(process.argv))
  .option(
    'pin',
    {
      alias: 'p',
      describe: 'pin a package manager',
      choices: availablePackages()
    }
  )
  .option(
    'use',
    {
      alias: 'u',
      describe: 'use a package manager',
      choices: availablePackages()
    }

  )
  .option(
    'see',
    {
      alias: 's',
      describe: 'show equivalent command',
      choices: availablePackages()
    }
  )
  .option(
    'get',
    {
      alias: 'g',
      describe: 'get current package manager'
    }
  )
  .option(
    'info',
    {
      alias: 'i',
      describe: 'current package manager information'
    }
  )
  .help()
  .version()
  .argv

export default argv
