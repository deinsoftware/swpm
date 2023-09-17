import install from 'cli/swpm/commands/install'
import add from 'cli/swpm/commands/add'
import remove from 'cli/swpm/commands/remove'
import update from 'cli/swpm/commands/update'
import upgrade from 'cli/swpm/commands/upgrade'
import interactive from 'cli/swpm/commands/interactive'
import clean from 'cli/swpm/commands/clean'

import debug from 'cli/options/debug'
import use from 'cli/options/use'
import pin from 'cli/options/pin'
import test from 'cli/options/test'
import mute from 'cli/options/mute'
import alias from 'cli/options/alias'
import info from 'cli/options/info'

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
