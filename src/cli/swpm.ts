#!/usr/bin/env node

import { inspect } from 'node:util'
import yargs from './swpm/config.js'

import { pinPackageManager } from 'flags/pin'
import { showPackageInformation } from 'flags/info'
import { showCommandAlias } from 'flags/alias'
import { testCommand } from 'flags/test'

import { autoUpdate } from '../helpers/autoUpdate.js'
import { showCommand, runCommand } from '../helpers/cmds.js'
import { setPackageVersion } from 'helpers/set'
import cmdr from 'translator/commander.js'

if (yargs.debug) {
  console.log(
    inspect(
      yargs,
      {
        showHidden: false,
        depth: null,
        colors: true
      }
    )
  )
}

await autoUpdate(cmdr)

if ('pin' in yargs) {
  cmdr.cmd = yargs.pin!
  await setPackageVersion(cmdr.cmd)

  const {cmd, config} = cmdr
  if (cmd && config) {
    await pinPackageManager({cmd, config})
  }
}

if (yargs?.pin) {

}

if (yargs?.test) {
  testCommand(cmdr)
}

if (yargs?.info) {
  await showPackageInformation(cmdr)
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
