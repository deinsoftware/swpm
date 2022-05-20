import install from './commands/install.js'
import add from './commands/add.js'

import debug from './options/debug.js'
import use from './options/use.js'
import pin from './options/pin.js'
import test from './options/test.js'
import info from './options/info.js'

const commands = [
  install,
  add
]

const options = {
  debug,
  use,
  pin,
  test,
  info
}

export { commands, options }
