import { cleanFlag, translateArgs } from 'helpers/args'
import { translateCommand } from 'helpers/cmds'
import { detectVoltaPin, getCurrentPackageManager } from 'helpers/get'
import { getPackageConfiguration } from 'packages/list'
import { setPackageVersion } from 'helpers/set'
import { InferredOptionTypes, MiddlewareFunction } from 'yargs'
import { CommanderPackage } from 'translator/commander.types'
import cmdr, { setCommander } from 'translator/commander'
import { options } from 'cli/swpx/cli'

const middleware: MiddlewareFunction<InferredOptionTypes<typeof options>> = async (yargs) => {

  const {argv} = Bun

  setCommander({args: argv.slice(2)})

  if ('debug' in yargs) {
    cleanFlag(cmdr, '--debug')
    cleanFlag(cmdr, '-d')
  }

  if ('use' in yargs) {
    cleanFlag(cmdr, '--use')
    cleanFlag(cmdr, '-u')
    cmdr.cmd = yargs.use
    await setPackageVersion(yargs.use!)
  }

  if ('test' in yargs) {
    cleanFlag(cmdr, '--test')
    cleanFlag(cmdr, '-t')
    cmdr.cmd = yargs.test
  }

  if ('mute' in yargs) {
    cleanFlag(cmdr, '--mute')
    cleanFlag(cmdr, '-m')
  }

  if (!('cmd' in cmdr) || 'info' in yargs) {
    const { origin, cmd } = await getCurrentPackageManager()
    cmdr.origin = origin
    cmdr.cmd = cmd
  }

  if ('cmd' in cmdr) {
    cmdr.volta = await detectVoltaPin(cmdr as CommanderPackage) ?? false
    cmdr.config = await getPackageConfiguration(cmdr as CommanderPackage)
  }

  if ('global' in yargs) {
    translateArgs(yargs, cmdr, '--global', '-g')
  }

  if (yargs._.length) {
    translateCommand(yargs, cmdr)
  }
}

export default middleware
