import install from './commands/install.js'
import add from './commands/add.js'
import remove from './commands/remove.js'
import update from './commands/update.js'
import upgrade from './commands/upgrade.js'
import interactive from './commands/interactive.js'
import clean from './commands/clean.js'

import debug from '../options/debug.js'
import use from '../options/use.js'
import pin from '../options/pin'
import test from '../options/test.js'
import mute from '../options/mute.js'
import alias from '../options/alias'
import info from '../options/info.js'

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
}

export { commands, options }
