import debug from '../options/debug'
import use from '../options/use'
import test from '../options/test'
import mute from '../options/mute'
import alias from '../options/alias'
import info from '../options/info'

const options = {
  debug,
  use,
  test,
  mute,
  alias,
  info
} as const

export { options }
