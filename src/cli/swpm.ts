#!/usr/bin/env node

import yargs from './swpm/config.js'

import { pinPackageManager } from '../flags/pin.js'
import { unpinPackageManager } from '../flags/unpin.js'
import { showPackageInformation } from '../flags/info.js'
import { showCommandAlias } from '../flags/alias.js'
import { testCommand } from '../flags/test.js'

import { autoUpdate } from '../libs/autoUpdate.js'
import { showCommand, runCommand } from '../helpers/cmds.js'
import { setPackageVersion } from '../helpers/set.js'
import cmdr from '../translator/commander.js'
import { CommanderPackage } from '../translator/commander.types.js'
import { debug } from '../helpers/debug.js'

if (yargs.debug) {
  debug(yargs)
  debug(cmdr)
}

await autoUpdate(cmdr)

if ('pin' in yargs) {
  cmdr.cmd = yargs.pin!
  await setPackageVersion(cmdr.cmd!)

  const { cmd, config } = cmdr
  if (cmd && config) {
    await pinPackageManager({ cmd, config })
  }
}

if ('unpin' in yargs) {
  const { config } = cmdr
  if (config) {
    await unpinPackageManager({ config })
  }
}

if ('test' in yargs) {
  testCommand(cmdr)
}

if (('info' in yargs) && ('cmd' in cmdr) && ('config' in cmdr) && ('origin' in cmdr) && ('volta' in cmdr)) {
  const cmdrInfo: Required<CommanderPackage> = {
    cmd: cmdr.cmd!,
    args: cmdr.args!,
    origin: cmdr.origin!,
    config: cmdr.config!,
    volta: cmdr.volta!
  }
  await showPackageInformation(cmdrInfo)
}

if ('alias' in yargs) {
  await showCommandAlias()
}

if ('cmd' in cmdr) {
  if (!yargs?.mute) {
    showCommand(cmdr)
  }
  await runCommand(cmdr)
}
