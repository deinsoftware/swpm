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
  yargs.pkg = pkg

  if ('debug' in yargs) {
    cleanFlag(yargs, pkg, '--debug')
    cleanFlag(yargs, pkg, '-d')
  }

  if ('use' in yargs) {
    cleanFlag(yargs, pkg, '--use')
    cleanFlag(yargs, pkg, '-u')
    pkg.cmd = yargs.use
  }

  if ('pin' in yargs) {
    pkg.cmd = yargs.pin
  }

  if ('test' in yargs) {
    cleanFlag(yargs, pkg, '--test')
    cleanFlag(yargs, pkg, '-t')
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
    translateFlag(yargs, pkg, '--global', '-g')
  }

  if (yargs._.length) {
    translateCommand(pkg, yargs._[0])
  }
}

export default middleware
