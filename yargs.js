import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const argv = yargs(hideBin(process.argv))
  .option(
    'pin',
    {
      alias: 'p',
      describe: 'pin a package manager',
      choices: ['npm', 'yarn', 'pnpm']
    }
  )
  .option(
    'use',
    {
      alias: 'u',
      describe: 'use a package manager',
      choices: ['npm', 'yarn', 'pnpm']
    }
  )
  .option(
    'get',
    {
      alias: 'g',
      describe: 'get current package manager'
    }
  )
  .help()
  .version()
  .argv

export default argv
