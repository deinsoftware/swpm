import install from './commands/install'
import add from './commands/add'
import remove from './commands/remove'
import update from './commands/update'
import upgrade from './commands/upgrade'
import interactive from './commands/interactive'
import clean from './commands/clean'

import debug from '../options/debug'
import use from '../options/use'
import pin from '../options/pin'
import test from '../options/test'
import mute from '../options/mute'
import alias from '../options/alias'
import info from '../options/info'

const commands = [
  install,
  add,
  remove,
  update,
  upgrade,
  interactive,
  clean
]

const options = {
  debug,
  use,
  pin,
  test,
  mute,
  alias,
  info
} as const

export { commands, options }
