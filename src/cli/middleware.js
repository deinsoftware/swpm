import { argv } from 'node:process'
import { cleanFlag, translateArgs } from '../helpers/args.js'
import { translateCommand } from '../helpers/cmds.js'
import { detectVoltaPin, getCurrentPackageManager } from '../helpers/get.js'
import { getPackageConfiguration } from 'packages/list'
import { setPackageVersion } from 'helpers/set'

const middleware = async (yargs) => {
  const pkg = {
    cmd: '',
    args: argv.slice(2)
  }
  yargs.pkg = pkg

  if ('debug' in yargs) {
    cleanFlag(yargs, '--debug')
    cleanFlag(yargs, '-d')
  }

  if ('use' in yargs) {
    cleanFlag(yargs, '--use')
    cleanFlag(yargs, '-u')
    pkg.cmd = yargs.use
    await setPackageVersion(yargs.use)
  }

  if ('pin' in yargs) {
    pkg.cmd = yargs.pin
  }

  if ('test' in yargs) {
    cleanFlag(yargs, '--test')
    cleanFlag(yargs, '-t')
    pkg.cmd = yargs.test
  }

  if ('mute' in yargs) {
    cleanFlag(yargs, '--mute')
    cleanFlag(yargs, '-m')
  }

  if (!pkg?.cmd || yargs?.info) {
    const { origin, cmd } = await getCurrentPackageManager()
    pkg.origin = origin
    pkg.cmd = cmd
  }

  if (pkg?.cmd) {
    pkg.volta = await detectVoltaPin(pkg)
    pkg.config = await getPackageConfiguration(pkg)
  }

  if ('global' in yargs) {
    translateArgs(yargs, '--global', '-g')
  }

  if (yargs._.length) {
    translateCommand(yargs)
  }
}

export default middleware
