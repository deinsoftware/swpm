import path from 'node:path'

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import { options } from 'cli/swpx/cli'
import middleware from 'cli/middleware'

const {argv} = Bun

const config = await yargs(hideBin(argv))
  .scriptName(path.basename(argv[1], path.extname(argv[1])))
  .options(options)
  .middleware(middleware)
  .usage('$0 [<command>] [FLAGS]')
  .help()
  .version(false)
  .epilog(`dein Software © ${new Date().getFullYear()}`)
  .argv

export default config
