#!/usr/bin/env node

import yargs from './swpm/config.js'

import { pinPackageManager } from '../flags/pin.js'
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

if (yargs?.pin) {
  cmdr.cmd = yargs.pin!
  await setPackageVersion(cmdr.cmd!)

  const { cmd, config } = cmdr
  if (cmd && config) {
    await pinPackageManager({ cmd, config })
  }
}

if (yargs?.test) {
  testCommand(cmdr)
}

if (yargs?.info && cmdr?.cmd && cmdr?.config && cmdr?.origin && cmdr?.volta) {
  const cmdrInfo: Required<CommanderPackage> = {
    cmd: cmdr.cmd,
    args: cmdr.args,
    origin: cmdr.origin,
    config: cmdr.config,
    volta: cmdr.volta
  }
  await showPackageInformation(cmdrInfo)
}

if (yargs?.alias) {
  await showCommandAlias()
}

if (cmdr?.cmd) {
  if (!yargs?.mute) {
    showCommand(cmdr)
  }
  await runCommand(cmdr)
}
