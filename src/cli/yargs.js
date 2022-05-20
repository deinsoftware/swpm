import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import { commands, options } from './cli.js'
import middleware from './middleware.js'

const yargv = await yargs(hideBin(process.argv))
  .commands(commands)
  .options(options)
  .middleware(middleware)
  .usage('$0 [<command>] [--] [args] [FLAGS]')
  .help()
  .version(false)
  .epilog('dein Software - copyright 2022')
  .argv

export default yargv
