import { argv } from 'node:process'
import { cleanFlag, translateArgs } from '../helpers/args.js'
import { translateCommand } from '../helpers/cmds.js'
import { detectVoltaPin, getCurrentPackageManager } from '../helpers/get.js'
import { getPackageConfiguration } from '../packages/list.js'

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
  }

  if ('pin' in yargs) {
    pkg.cmd = yargs.pin
  }

  if ('test' in yargs) {
    cleanFlag(yargs, '--test')
    cleanFlag(yargs, '-t')
    pkg.cmd = yargs.test
  }

  if (!pkg?.cmd || yargs?.info) {
    const { origin, cmd } = await getCurrentPackageManager()
    pkg.origin = origin
    pkg.cmd = cmd

    pkg.volta = await detectVoltaPin()
  }

  if (pkg?.cmd) {
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
