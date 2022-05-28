import { argv } from 'node:process'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import { commands, options } from './cli.js'
import middleware from './middleware.js'

const config = await yargs(hideBin(argv))
  .commands(commands)
  .options(options)
  .middleware(middleware)
  .usage('$0 [<command>] [--] [args] [FLAGS]')
  .help()
  .version(false)
  .epilog('dein Software - copyright 2022')
  .argv

export default config
