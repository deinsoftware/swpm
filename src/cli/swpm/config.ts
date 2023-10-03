import path from 'node:path'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import { commands, options } from './cli.js'
import middleware from '../middleware.js'

const {argv} = Bun

const config = await yargs(hideBin(argv))
  .scriptName(path.basename(argv[1], path.extname(argv[1])))
  .command(commands)
  .options(options)
  .middleware(middleware)
  .usage('$0 [<command>] [args] [FLAGS]')
  .help()
  .version(false)
  .epilog(`dein Software © ${new Date().getFullYear()}`)
  .argv

export default config
