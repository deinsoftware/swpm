import { argv } from 'node:process'
import { cleanFlag, translateFlag } from '../helpers/args.js'
import { detectVoltaPin, getCurrentPackageManager } from '../flags/get.js'
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
    globalThis.pkg.cmd = await getCurrentPackageManager()
    globalThis.pkg.volta = await detectVoltaPin()
  }

  if (globalThis?.pkg?.cmd) {
    globalThis.pkg.config = await getPackageConfiguration(globalThis.pkg.cmd)
  }

  if ('global' in yargs) {
    translateFlag('--global', '-g')
  }
}

export default middleware
