import debug from 'cli/options/debug'
import use from 'cli/options/use'
import test from 'cli/options/test'
import mute from 'cli/options/mute'
import alias from 'cli/options/alias'
import info from 'cli/options/info'

const options = {
  debug,
  use,
  test,
  mute,
  alias,
  info
} as const

export { options }
