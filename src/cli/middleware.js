import { argv } from 'node:process'
import { cleanFlag, translateFlag } from '../helpers/args.js'
import { translateCommand } from '../helpers/cmds.js'
import { detectVoltaPin, getCurrentPackageManager } from '../helpers/get.js'
import { getPackageConfiguration } from '../packages/list.js'

const middleware = async (yargs) => {
  const pkg = {
    cmd: '',
    args: argv.slice(2)
  }
  globalThis.pkg = pkg
  globalThis.yargs = yargs

  if ('debug' in yargs) {
    cleanFlag('--debug')
    cleanFlag('-d')
  }

  if ('use' in yargs) {
    cleanFlag('--use')
    cleanFlag('-u')
    pkg.cmd = yargs.use
  }

  if ('pin' in yargs) {
    pkg.cmd = yargs.pin
  }

  if ('test' in yargs) {
    cleanFlag('--test')
    cleanFlag('-t')
    pkg.cmd = yargs.test
  }

  if (!pkg?.cmd || yargs?.info) {
    const { origin, cmd } = await getCurrentPackageManager()
    pkg.origin = origin
    pkg.cmd = cmd
    pkg.volta = await detectVoltaPin()
  }

  if (pkg?.cmd) {
    pkg.config = await getPackageConfiguration()
  }

  if ('global' in yargs) {
    translateFlag('--global', '-g')
  }

  if (yargs._.length) {
    translateCommand(yargs._[0])
  }
}

export default middleware
