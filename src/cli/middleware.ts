import { argv } from 'node:process'
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
  setCommander({args: argv.slice(2)})

  if ('debug' in yargs) {
    cleanFlag({yargs, cmdr, flag: '--debug'})
    cleanFlag({yargs, cmdr, flag: '-d'})
  }

  if ('use' in yargs) {
    cleanFlag({yargs, cmdr, flag: '--use'})
    cleanFlag({yargs, cmdr, flag: '-u'})
    cmdr.cmd = yargs.use
    await setPackageVersion(yargs.use!)
  }

  if ('test' in yargs) {
    cleanFlag({yargs, cmdr, flag: '--test'})
    cleanFlag({yargs, cmdr, flag: '-t'})
    cmdr.cmd = yargs.test
  }

  if ('mute' in yargs) {
    cleanFlag({yargs, cmdr, flag: '--mute'})
    cleanFlag({yargs, cmdr, flag: '-m'})
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
    translateArgs({yargs, cmdr, flag: '--global', alias: '-g'})
  }

  if (yargs._.length) {
    translateCommand({yargs, cmdr})
  }
}

export default middleware
