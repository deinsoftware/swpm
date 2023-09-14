import { argv } from 'node:process'
import { cleanFlag, translateArgs } from '../helpers/args.js'
import { translateCommand } from '../helpers/cmds.js'
import { detectVoltaPin, getCurrentPackageManager } from 'helpers/get'
import { getPackageConfiguration } from 'packages/list'
import { setPackageVersion } from 'helpers/set'
import { MiddlewareFunction } from 'yargs'
import { PackageCommand, Yargs } from 'types/swpm.types'

const middleware: MiddlewareFunction = async (yargs: Yargs) => {
  const pkg: Partial<PackageCommand> = {
    args: argv.slice(2)
  }

  if ('debug' in yargs) {
    cleanFlag(yargs, '--debug')
    cleanFlag(yargs, '-d')
  }

  if (yargs.hasOwnProperty('use')) {
    cleanFlag(yargs, '--use')
    cleanFlag(yargs, '-u')
    pkg.cmd = yargs?.use!
    await setPackageVersion(yargs.use!)
  }

  if (yargs.hasOwnProperty('pin')) {
    pkg.cmd = yargs.pin!
  }

  if (yargs.hasOwnProperty('test')) {
    cleanFlag(yargs, '--test')
    cleanFlag(yargs, '-t')
    pkg.cmd = yargs.test!
  }

  if (yargs.hasOwnProperty('mute')) {
    cleanFlag(yargs, '--mute')
    cleanFlag(yargs, '-m')
  }

  if (!pkg?.cmd || yargs?.info) {
    const { origin, cmd } = await getCurrentPackageManager()
    pkg.origin = origin
    pkg.cmd = cmd
  }

  if (pkg?.cmd) {
    pkg.volta = await detectVoltaPin(pkg as PackageCommand)
    pkg.config = await getPackageConfiguration(pkg as PackageCommand)
  }

  if ('global' in yargs) {
    translateArgs(yargs, '--global', '-g')
  }

  if (yargs._.length) {
    translateCommand(yargs)
  }
}

export default middleware
