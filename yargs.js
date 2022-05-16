import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { packageNameList } from './packages/list.js'

const argv = yargs(hideBin(process.argv))
  .option(
    'pin',
    {
      alias: 'p',
      describe: 'pin a package manager',
      choices: packageNameList()
    }
  )
  .option(
    'use',
    {
      alias: 'u',
      describe: 'use a package manager',
      choices: packageNameList()
    }

  )
  .option(
    'see',
    {
      alias: 's',
      describe: 'show equivalent command',
      choices: packageNameList()
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
