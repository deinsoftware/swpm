import { argv } from 'node:process'
import { cleanFlag, translateFlag } from '../helpers/args.js'
import { translateCommand } from '../helpers/cmds.js'
import { detectVoltaPin, getCurrentPackageManager } from '../helpers/get.js'
import { getPackageConfiguration } from '../packages/list.js'

const middleware = async (yargs) => {
  globalThis.yargs = yargs
  const pkg = {
    cmd: '',
    args: argv.slice(2)
  }
  globalThis.pkg = pkg

  if ('debug' in yargs) {
    cleanFlag('--debug')
    cleanFlag('-d')
  }

  if ('use' in yargs) {
    cleanFlag('--use')
    cleanFlag('-u')
    globalThis.pkg.cmd = yargs.use
  }

  if ('pin' in yargs) {
    globalThis.pkg.cmd = yargs.pin
  }

  if ('test' in yargs) {
    cleanFlag('--test')
    cleanFlag('-t')
    globalThis.pkg.cmd = yargs.test
  }

  if (!globalThis?.pkg?.cmd || yargs?.info) {
    const { origin, pkg } = await getCurrentPackageManager()
    globalThis.pkg.cmd = pkg
    globalThis.pkg.origin = origin
    globalThis.pkg.volta = await detectVoltaPin()
  }

  if (globalThis?.pkg?.cmd) {
    globalThis.pkg.config = await getPackageConfiguration()
  }

  if ('global' in yargs) {
    translateFlag('--global', '-g')
  }

  if (yargs._.length) {
    translateCommand(yargs._[0])
  }
}

export default middleware
