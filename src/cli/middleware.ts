import { argv } from 'node:process'
import { cleanFlag, translateArgs } from '../helpers/args.js'
import { translateCommand } from '../helpers/cmds.js'
import { detectVoltaPin, getCurrentPackageManager } from '../helpers/get.js'
import { getPackageConfiguration } from '../packages/list.js'
import { setPackageVersion } from '../helpers/set.js'
import { InferredOptionTypes, MiddlewareFunction } from 'yargs'
import { CommanderPackage } from '../translator/commander.types.js'
import cmdr, { setCommander } from '../translator/commander.js'
import { options } from './swpx/cli.js'

const middleware: MiddlewareFunction<InferredOptionTypes<typeof options>> = async (yargs) => {
  setCommander({ args: argv.slice(2) })

  if (yargs?.debug) {
    cleanFlag({ yargs, cmdr, flag: '--debug' })
    cleanFlag({ yargs, cmdr, flag: '-d' })
  }

  if (yargs?.use) {
    cleanFlag({ yargs, cmdr, flag: '--use' })
    cleanFlag({ yargs, cmdr, flag: '-u' })
    cmdr.cmd = yargs.use
    await setPackageVersion(yargs.use!)
  }

  if (yargs?.test) {
    cleanFlag({ yargs, cmdr, flag: '--test' })
    cleanFlag({ yargs, cmdr, flag: '-t' })
    cmdr.cmd = yargs.test
  }

  if (yargs?.mute) {
    cleanFlag({ yargs, cmdr, flag: '--mute' })
    cleanFlag({ yargs, cmdr, flag: '-m' })
  }

  if (!(cmdr?.cmd) || yargs?.info) {
    const { origin, cmd } = await getCurrentPackageManager()
    cmdr.origin = origin
    cmdr.cmd = cmd
  }

  if (cmdr?.cmd) {
    cmdr.volta = await detectVoltaPin(cmdr as CommanderPackage) ?? false
    cmdr.config = await getPackageConfiguration(cmdr as CommanderPackage)
  }

  if (yargs?.global) {
    translateArgs({ yargs, cmdr, flag: '--global', alias: '-g' })
  }

  if (yargs._.length) {
    translateCommand({ yargs, cmdr })
  }
}

export default middleware
