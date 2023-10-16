import { argv } from 'node:process'
import { cleanFlag, translateArgs } from '../helpers/args.js'
import { translateCommand } from '../helpers/cmds.js'
import { detectVoltaPin, getCurrentPackageManager } from '../helpers/get.js'
import { getPackageConfiguration } from '../packages/list.js'
import { setPackageVersion } from '../helpers/set.js'
import { InferredOptionTypes, MiddlewareFunction } from 'yargs'
import cmdr from '../translator/commander.js'
import { options as swpmOptions } from './swpm/cli.js'
import { options as swpxOptions } from './swpx/cli.js'
import { PackageManagerList } from '../packages/packages.types.js'

type Props = InferredOptionTypes<typeof swpmOptions> | InferredOptionTypes<typeof swpxOptions>
const middleware: MiddlewareFunction<Props> = async (yargs) => {
  cmdr.args = argv.slice(2)

  if ('debug' in yargs) {
    cleanFlag({ yargs, cmdr, flag: '--debug' })
    cleanFlag({ yargs, cmdr, flag: '-d' })
  }

  if ('use' in yargs) {
    cleanFlag({ yargs, cmdr, flag: '--use' })
    cleanFlag({ yargs, cmdr, flag: '-u' })
    cmdr.cmd = yargs.use
    await setPackageVersion(yargs.use!)
  }

  if ('pin' in yargs && yargs?.pin) {
    cmdr.cmd = yargs.pin as PackageManagerList
  }

  if ('test' in yargs) {
    cleanFlag({ yargs, cmdr, flag: '--test' })
    cleanFlag({ yargs, cmdr, flag: '-t' })
    cmdr.cmd = yargs.test
  }

  if ('mute' in yargs) {
    cleanFlag({ yargs, cmdr, flag: '--mute' })
    cleanFlag({ yargs, cmdr, flag: '-m' })
  }

  if (!cmdr?.cmd || yargs?.info) {
    const { origin, cmd } = await getCurrentPackageManager() ?? {}
    cmdr.origin = origin
    cmdr.cmd = cmd
  }

  if (cmdr?.cmd) {
    cmdr.volta = await detectVoltaPin(cmdr) ?? false
    cmdr.config = await getPackageConfiguration(cmdr)

    if ('global' in yargs) {
      await translateArgs({ yargs, cmdr, flag: '--global', alias: '-g' })
    }

    if (yargs._.length) {
      translateCommand({ yargs, cmdr })
    }
  }
}

export default middleware
